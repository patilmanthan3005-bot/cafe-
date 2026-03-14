/* ============================================================
   CAFE OF HEAVEN — ADMIN PANEL JS
   Connected to PHP + MySQL backend via fetch() API calls
   ============================================================ */

const ADMIN_SECRET_KEY = 'COFH2026';
const API = 'api'; // path to your api folder

// ════════════════════════════════════════
//   INIT — check session
// ════════════════════════════════════════
(function init() {
  const session = sessionStorage.getItem('coh_admin_logged_in');
  if (session === 'true') {
    const admin = JSON.parse(sessionStorage.getItem('coh_admin') || '{}');
    showAdminPanel(admin.name || 'Admin');
  }
})();

// ════════════════════════════════════════
//   LOGIN / SIGNUP TAB SWITCH
// ════════════════════════════════════════
function alSwitchTab(tab) {
  document.getElementById('alTabLogin').classList.toggle('active',  tab === 'login');
  document.getElementById('alTabSignup').classList.toggle('active', tab === 'signup');
  document.getElementById('alPanelLogin').classList.toggle('hidden',  tab !== 'login');
  document.getElementById('alPanelSignup').classList.toggle('hidden', tab !== 'signup');
  clearLoginErrors();
}

function clearLoginErrors() {
  document.querySelectorAll('.al-err').forEach(e => e.textContent = '');
  document.querySelectorAll('.input-error').forEach(e => e.classList.remove('input-error'));
  const box = document.getElementById('alLoginErrBox');
  if (box) box.classList.add('hidden');
}

function setErr(inputId, errId, msg) {
  const inp = document.getElementById(inputId);
  const err = document.getElementById(errId);
  if (inp) inp.classList.add('input-error');
  if (err) err.textContent = msg;
}

// ════════════════════════════════════════
//   ADMIN LOGIN (localStorage — no PHP needed)
// ════════════════════════════════════════
function adminLogin() {
  clearLoginErrors();
  const email = document.getElementById('alLoginEmail').value.trim();
  const pass  = document.getElementById('alLoginPass').value;
  let valid = true;

  if (!email) { setErr('alLoginEmail','alLoginEmailErr','Email is required.'); valid = false; }
  if (!pass)  { setErr('alLoginPass', 'alLoginPassErr', 'Password is required.'); valid = false; }
  if (!valid) return;

  const admins = JSON.parse(localStorage.getItem('coh_admins') || '[]');
  const admin  = admins.find(a => a.email.toLowerCase() === email.toLowerCase());

  if (!admin) {
    const box = document.getElementById('alLoginErrBox');
    box.textContent = '❌ No admin account found for ' + email + '. Please create one first.';
    box.classList.remove('hidden');
    return;
  }

  if (admin.password !== pass) {
    setErr('alLoginPass', 'alLoginPassErr', 'Incorrect password.');
    return;
  }

  sessionStorage.setItem('coh_admin_logged_in', 'true');
  sessionStorage.setItem('coh_admin', JSON.stringify({ name: admin.name, email: admin.email }));
  showToast('✅ Welcome back, ' + admin.name + '!');
  setTimeout(() => showAdminPanel(admin.name), 800);
}

// ════════════════════════════════════════
//   ADMIN SIGNUP (localStorage)
// ════════════════════════════════════════
function adminSignup() {
  clearLoginErrors();
  const name   = document.getElementById('alSignupName').value.trim();
  const email  = document.getElementById('alSignupEmail').value.trim();
  const secret = document.getElementById('alSignupSecret').value.trim();
  const pass   = document.getElementById('alSignupPass').value;
  let valid = true;

  if (!name)   { setErr('alSignupName',   'alSignupNameErr',   'Name is required.'); valid = false; }
  if (!email)  { setErr('alSignupEmail',  'alSignupEmailErr',  'Email is required.'); valid = false; }
  if (!secret) { setErr('alSignupSecret', 'alSignupSecretErr', 'Secret key is required.'); valid = false; }
  else if (secret !== ADMIN_SECRET_KEY) {
    setErr('alSignupSecret', 'alSignupSecretErr', 'Invalid secret key. Ask the owner.');
    valid = false;
  }
  if (!pass)            { setErr('alSignupPass', 'alSignupPassErr', 'Password is required.'); valid = false; }
  else if (pass.length < 8) { setErr('alSignupPass', 'alSignupPassErr', 'Min. 8 characters.'); valid = false; }
  if (!valid) return;

  const admins = JSON.parse(localStorage.getItem('coh_admins') || '[]');
  if (admins.find(a => a.email.toLowerCase() === email.toLowerCase())) {
    setErr('alSignupEmail', 'alSignupEmailErr', 'This email is already registered.');
    return;
  }

  admins.push({ name, email, password: pass });
  localStorage.setItem('coh_admins', JSON.stringify(admins));

  sessionStorage.setItem('coh_admin_logged_in', 'true');
  sessionStorage.setItem('coh_admin', JSON.stringify({ name, email }));
  showToast('🎉 Admin account created!');
  setTimeout(() => showAdminPanel(name), 800);
}

// ════════════════════════════════════════
//   SHOW ADMIN PANEL
// ════════════════════════════════════════
function showAdminPanel(name) {
  document.getElementById('adminLoginWrap').classList.add('hidden');
  document.getElementById('adminWrap').classList.remove('hidden');
  document.getElementById('topbarAdmin').textContent = '👤 ' + name;
  loadDashboard();
  renderMenuTable();
  renderOrdersTable();
  renderCustomersTable();
  renderRewardsGrid();
}

// ════════════════════════════════════════
//   LOGOUT
// ════════════════════════════════════════
function adminLogout() {
  sessionStorage.removeItem('coh_admin_logged_in');
  sessionStorage.removeItem('coh_admin');
  document.getElementById('adminWrap').classList.add('hidden');
  document.getElementById('adminLoginWrap').classList.remove('hidden');
  showToast('👋 Logged out successfully.');
}

// ════════════════════════════════════════
//   SIDEBAR NAVIGATION
// ════════════════════════════════════════
function showSection(name, btn) {
  document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.snav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('sec-' + name).classList.add('active');
  btn.classList.add('active');
  const titles = { dashboard:'Dashboard', menu:'Menu Items', orders:'Orders', customers:'Customers', rewards:'Rewards', spin:'Spin Rounds' };
  document.getElementById('topbarTitle').textContent = titles[name] || name;
  if (window.innerWidth <= 800) document.getElementById('sidebar').classList.remove('open');
  if (name === 'spin') renderSpinTable();
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// ════════════════════════════════════════
//   DASHBOARD — loads from PHP API
// ════════════════════════════════════════
async function loadDashboard() {
  try {
    // Load orders from DB
    const ordersRes = await fetch(`${API}/orders/get.php`);
    const orders    = await ordersRes.json();

    // Load menu from DB
    const menuRes = await fetch(`${API}/menu/get.php`);
    const menu    = await menuRes.json();

    // Load earnings graph
    let earnings = [];
try {
  const earnRes = await fetch(`${API}/earnings/get.php`);
  earnings = await earnRes.json();
} catch(e) { console.warn('Earnings API not available yet.'); }

    // Stats
    const totalRevenue = orders.reduce((s, o) => s + parseFloat(o.total || 0), 0);
    document.getElementById('statTotalOrders').textContent = orders.length;
    document.getElementById('statRevenue').textContent     = '₹' + totalRevenue.toFixed(0);
    document.getElementById('statMenuItems').textContent   = menu.length;

    // Unique customers from orders
    const uniqueEmails = [...new Set(orders.map(o => o.email).filter(Boolean))];
    document.getElementById('statCustomers').textContent = uniqueEmails.length;

    // Recent orders list
    const recentEl = document.getElementById('recentOrdersList');
    if (!orders.length) {
      recentEl.innerHTML = '<p class="empty-state">No orders yet.</p>';
    } else {
      recentEl.innerHTML = orders.slice(0, 5).map(o => `
        <div class="recent-order-row">
          <span><strong>#${o.id}</strong> — ${o.customer_name || 'Guest'}</span>
          <span class="status-badge status-${(o.status || 'Pending').toLowerCase()}">${o.status || 'Pending'}</span>
          <span style="color:var(--brown);font-weight:700;">₹${o.total}</span>
        </div>`).join('');
    }

    // Top selling items
    const topEl = document.getElementById('topItemsList');
    const itemCount = {};
    orders.forEach(o => {
      try {
        const items = typeof o.items === 'string' ? JSON.parse(o.items) : o.items;
        if (items && typeof items === 'object') {
          Object.values(items).forEach(i => {
            const name = i.name || 'Unknown';
            itemCount[name] = (itemCount[name] || 0) + (parseInt(i.qty) || 1);
          });
        }
      } catch(e) {}
    });
    const sorted = Object.entries(itemCount).sort((a,b) => b[1]-a[1]).slice(0,5);
    if (!sorted.length) {
      topEl.innerHTML = '<p class="empty-state">No data yet.</p>';
    } else {
      topEl.innerHTML = sorted.map(([name, qty]) => `
        <div class="top-item-row">
          <span>${name}</span>
          <span style="font-weight:700;color:var(--brown);">${qty} sold</span>
        </div>`).join('');
    }

    // Earnings chart
    renderEarningsChart(earnings);

  } catch(e) {
    console.warn('[Admin] Dashboard load error:', e);
    document.getElementById('recentOrdersList').innerHTML = '<p class="empty-state">Could not load data. Is the server running?</p>';
  }
}

// ════════════════════════════════════════
//   EARNINGS CHART (Chart.js)
// ════════════════════════════════════════
let earningsChartInstance = null;

function renderEarningsChart(data) {
  // Add canvas to dashboard if not already there
  const dashCard = document.querySelector('#sec-dashboard .dash-row');
  if (dashCard && !document.getElementById('earningsChartWrap')) {
    const wrap = document.createElement('div');
    wrap.className = 'dash-card';
    wrap.id = 'earningsChartWrap';
    wrap.style.gridColumn = '1 / -1';
    wrap.innerHTML = '<div class="dc-head">📊 Last 7 Days Earnings</div><canvas id="earningsChart" height="100"></canvas>';
    dashCard.appendChild(wrap);
  }

  const ctx = document.getElementById('earningsChart');
  if (!ctx) return;

  // Load Chart.js dynamically if not loaded
  if (typeof Chart === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js';
    script.onload = () => drawChart(ctx, data);
    document.head.appendChild(script);
  } else {
    drawChart(ctx, data);
  }
}

function drawChart(ctx, data) {
  if (earningsChartInstance) earningsChartInstance.destroy();
  earningsChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(d => d.date),
      datasets: [
        {
          label: 'Earnings (₹)',
          data: data.map(d => d.total),
          borderColor: '#c8a96e',
          backgroundColor: 'rgba(200,169,110,0.15)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#c8a96e',
          pointRadius: 5,
        },
        {
          label: 'Orders',
          data: data.map(d => d.orders),
          borderColor: '#27ae60',
          backgroundColor: 'rgba(39,174,96,0.08)',
          tension: 0.4,
          fill: false,
          pointBackgroundColor: '#27ae60',
          pointRadius: 4,
          yAxisID: 'y2',
        }
      ]
    },
    options: {
      responsive: true,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { position: 'top' },
        tooltip: {
          callbacks: {
            label: ctx => ctx.dataset.label === 'Earnings (₹)'
              ? ' ₹' + ctx.raw
              : ' ' + ctx.raw + ' orders'
          }
        }
      },
      scales: {
        y:  { beginAtZero: true, ticks: { callback: v => '₹' + v } },
        y2: { beginAtZero: true, position: 'right', grid: { drawOnChartArea: false } }
      }
    }
  });
}

// ════════════════════════════════════════
//   MENU MANAGEMENT — PHP API
// ════════════════════════════════════════
let editingMenuId  = null;
let menuFilterCat  = 'all';
let menuSearchQ    = '';
let allMenuItems   = [];

async function renderMenuTable() {
  try {
    const res  = await fetch(`${API}/menu/get.php`);
    allMenuItems = await res.json();
  } catch(e) {
    allMenuItems = [];
    console.warn('[Admin] Menu load error:', e);
  }

  let items = [...allMenuItems];
  if (menuFilterCat !== 'all') items = items.filter(i => i.category === menuFilterCat);
  if (menuSearchQ)              items = items.filter(i => i.name.toLowerCase().includes(menuSearchQ));

  const tbody = document.getElementById('menuTableBody');
  if (!items.length) {
    tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No items found.</td></tr>';
    return;
  }

  const catLabels = { coffee:'☕ Coffee', baked:'🥐 Baked', cakes:'🎂 Cakes',
    pizza:'🍕 Pizza', burger:'🍔 Burgers', pasta:'🍝 Pasta', souvenir:'🎁 Souvenirs' };

  tbody.innerHTML = items.map(item => `
    <tr>
      <td style="color:var(--text-mid);font-size:0.75rem;">#${item.id}</td>
      <td><strong>${item.emoji || ''} ${item.name}</strong></td>
      <td>${catLabels[item.category] || item.category}</td>
      <td style="font-weight:700;color:var(--brown);">₹${item.price}</td>
      <td><span class="badge badge-${item.available == 1 ? 'veg' : 'hot'}">${item.available == 1 ? '✅ Available' : '❌ Unavailable'}</span></td>
      <td>
        <button class="btn-edit"   onclick="editMenuItem(${item.id})">✏️ Edit</button>
        <button class="btn-delete" onclick="deleteMenuItem(${item.id})">🗑️ Delete</button>
      </td>
    </tr>`).join('');
}

function filterMenuItems(q) { menuSearchQ = q.toLowerCase(); renderMenuTable(); }
function filterMenuCat(cat) { menuFilterCat = cat; renderMenuTable(); }

function openMenuModal(id = null) {
  editingMenuId = id;
  document.getElementById('menuModalTitle').textContent = id ? 'Edit Menu Item' : 'Add Menu Item';
  if (id) {
    const item = allMenuItems.find(i => i.id === id);
    if (!item) return;
    document.getElementById('mName').value  = item.name;
    document.getElementById('mCat').value   = item.category;
    document.getElementById('mPrice').value = item.price;
    document.getElementById('mImg').value   = item.emoji || '';
    document.getElementById('mDesc').value  = '';
  } else {
    ['mName','mPrice','mImg','mDesc'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('mCat').value = 'coffee';
    ['mVeg','mHot','mNew','mSpecial'].forEach(id => document.getElementById(id).checked = false);
  }
  document.getElementById('menuModal').classList.remove('hidden');
}

function closeMenuModal() { document.getElementById('menuModal').classList.add('hidden'); }
function editMenuItem(id) { openMenuModal(id); }

async function saveMenuItem() {
  const name  = document.getElementById('mName').value.trim();
  const price = parseFloat(document.getElementById('mPrice').value);
  if (!name)       { showToast('⚠️ Item name is required.'); return; }
  if (isNaN(price)){ showToast('⚠️ Valid price is required.'); return; }

  const payload = {
    name,
    price,
    category:  document.getElementById('mCat').value,
    emoji:     document.getElementById('mImg').value.trim(),
    available: 1
  };

  try {
    if (editingMenuId) {
      // UPDATE
      payload.id = editingMenuId;
      await fetch(`${API}/menu/update.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      showToast('✅ Item updated!');
    } else {
      // ADD
      await fetch(`${API}/menu/add.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      showToast('✅ Item added!');
    }
    closeMenuModal();
    renderMenuTable();
    loadDashboard();
  } catch(e) {
    showToast('❌ Error saving item. Check server.');
    console.error(e);
  }
}

async function deleteMenuItem(id) {
  if (!confirm('Delete this menu item?')) return;
  try {
    await fetch(`${API}/menu/delete.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    showToast('🗑️ Item deleted.');
    renderMenuTable();
    loadDashboard();
  } catch(e) {
    showToast('❌ Error deleting item.');
  }
}

// ════════════════════════════════════════
//   ORDERS — PHP API
// ════════════════════════════════════════
let orderFilterStatus = 'all';
let editingOrderId    = null;
let allOrders         = [];

async function renderOrdersTable() {
  try {
    const res = await fetch(`${API}/orders/get.php`);
    allOrders = await res.json();
  } catch(e) {
    allOrders = [];
    console.warn('[Admin] Orders load error:', e);
  }

  let orders = [...allOrders];
  if (orderFilterStatus !== 'all') {
    orders = orders.filter(o => (o.status || '').toLowerCase() === orderFilterStatus.toLowerCase());
  }

  const tbody = document.getElementById('ordersTableBody');
  if (!orders.length) {
    tbody.innerHTML = '<tr><td colspan="7" class="empty-state">No orders found.</td></tr>';
    return;
  }

  tbody.innerHTML = orders.map(o => {
    // Parse items
    let itemsText = '-';
    try {
      const items = typeof o.items === 'string' ? JSON.parse(o.items) : o.items;
      if (items && typeof items === 'object') {
        itemsText = Object.values(items).map(i => `${i.name} ×${i.qty}`).join(', ');
      }
    } catch(e) { itemsText = o.items || '-'; }

    return `
    <tr>
      <td style="font-weight:700;color:var(--brown);">#${o.id}</td>
      <td>
        <strong>${o.customer_name || 'Guest'}</strong>
        <div style="font-size:0.75rem;color:var(--text-mid);">${o.phone || ''}</div>
      </td>
      <td style="max-width:180px;font-size:0.78rem;">${itemsText}</td>
      <td style="font-weight:700;">₹${o.total}</td>
      <td><span class="status-badge status-${(o.status || 'Pending').toLowerCase()}">${statusLabel(o.status)}</span></td>
      <td style="font-size:0.78rem;color:var(--text-mid);">${o.placed_at || '-'}</td>
      <td><button class="btn-status" onclick="openOrderModal(${o.id}, '${o.status}')">✏️ Status</button></td>
    </tr>`;
  }).join('');
}

function statusLabel(s) {
  const labels = { Pending:'⏳ Pending', Preparing:'👨‍🍳 Preparing', Ready:'✅ Ready', Delivered:'🚀 Delivered', Cancelled:'❌ Cancelled' };
  return labels[s] || s || 'Pending';
}

function filterOrders(status) { orderFilterStatus = status; renderOrdersTable(); }

function openOrderModal(id, currentStatus) {
  editingOrderId = id;
  document.getElementById('oModalId').textContent    = '#' + id;
  document.getElementById('oModalStatus').value      = currentStatus || 'Pending';
  document.getElementById('orderModal').classList.remove('hidden');
}

function closeOrderModal() { document.getElementById('orderModal').classList.add('hidden'); }

async function updateOrderStatus() {
  const status = document.getElementById('oModalStatus').value;
  try {
    await fetch(`${API}/orders/update_status.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editingOrderId, status })
    });
    showToast('✅ Order status updated!');
    closeOrderModal();
    renderOrdersTable();
    loadDashboard();
  } catch(e) {
    showToast('❌ Error updating status.');
  }
}

// ════════════════════════════════════════
//   CUSTOMERS — from orders table
// ════════════════════════════════════════
let customerSearchQ = '';

async function renderCustomersTable() {
  try {
    const res  = await fetch(`${API}/orders/get.php`);
    const orders = await res.json();

    // Build unique customers from orders
    const customerMap = {};
    orders.forEach(o => {
      const email = o.email || '';
      if (!email) return;
      if (!customerMap[email]) {
        customerMap[email] = {
          name:    o.customer_name || 'Guest',
          email:   email,
          phone:   o.phone || '-',
          address: o.address || '-',
          orders:  0,
          spent:   0,
          joined:  o.placed_at || '-'
        };
      }
      customerMap[email].orders++;
      customerMap[email].spent += parseFloat(o.total || 0);
    });

    let customers = Object.values(customerMap);
    if (customerSearchQ) {
      customers = customers.filter(c =>
        c.name.toLowerCase().includes(customerSearchQ) ||
        c.email.toLowerCase().includes(customerSearchQ)
      );
    }

    document.getElementById('statCustomers').textContent = customers.length;

    const tbody = document.getElementById('customersTableBody');
    if (!customers.length) {
      tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No customers yet.</td></tr>';
      return;
    }

    tbody.innerHTML = customers.map((c, i) => `
      <tr>
        <td style="color:var(--text-mid);">${i + 1}</td>
        <td><strong>${c.name}</strong></td>
        <td>${c.email}</td>
        <td>${c.phone}</td>
        <td style="font-weight:700;color:var(--brown);">${c.orders} orders — ₹${c.spent.toFixed(0)}</td>
        <td style="font-size:0.75rem;color:var(--text-mid);">${c.joined}</td>
      </tr>`).join('');

  } catch(e) {
    console.warn('[Admin] Customers load error:', e);
    document.getElementById('customersTableBody').innerHTML =
      '<tr><td colspan="6" class="empty-state">Could not load customers.</td></tr>';
  }
}

function filterCustomers(q) { customerSearchQ = q.toLowerCase(); renderCustomersTable(); }

// ════════════════════════════════════════
//   REWARDS — PHP API
// ════════════════════════════════════════
let editingRewardId = null;
let allRewards      = [];

async function renderRewardsGrid() {
  try {
    const res  = await fetch(`${API}/rewards/get.php`);
    allRewards = await res.json();
  } catch(e) {
    allRewards = [];
    console.warn('[Admin] Rewards load error:', e);
  }

  const grid = document.getElementById('rewardsGrid');
  if (!allRewards.length) {
    grid.innerHTML = '<p class="empty-state" style="grid-column:1/-1;">No rewards yet. Add some spin rewards!</p>';
    return;
  }

  const typeLabels = { free_item:'🎁 Free Item', discount:'💸 Discount', points:'⭐ Bonus Points', try_again:'🔄 Try Again' };

  grid.innerHTML = allRewards.map(r => `
    <div class="reward-card">
      <div class="rc-color" style="background:${r.emoji ? 'transparent' : '#C8962E'};font-size:2rem;text-align:center;">${r.emoji || '🎁'}</div>
      <div class="rc-label">${r.label}</div>
      <div class="rc-type">${typeLabels[r.type] || r.type} — ${r.value}</div>
      <div class="rc-prob" style="color:${r.active == 1 ? '#27ae60' : '#e74c3c'};">${r.active == 1 ? '✅ Active' : '❌ Inactive'}</div>
      <div class="rc-actions">
        <button class="btn-delete" onclick="deleteReward(${r.id})">🗑️ Delete</button>
      </div>
    </div>`).join('');
}

function openRewardModal() {
  editingRewardId = null;
  document.getElementById('rewardModalTitle').textContent = 'Add Reward';
  ['rLabel','rValue','rProb'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('rType').value  = 'free_item';
  document.getElementById('rColor').value = '#C8962E';
  document.getElementById('rewardModal').classList.remove('hidden');
}

function closeRewardModal() { document.getElementById('rewardModal').classList.add('hidden'); }

async function saveReward() {
  const label = document.getElementById('rLabel').value.trim();
  const value = document.getElementById('rValue').value.trim();
  const type  = document.getElementById('rType').value;
  const emoji = document.getElementById('rColor').value;

  if (!label) { showToast('⚠️ Reward label is required.'); return; }
  if (!value) { showToast('⚠️ Reward value is required.'); return; }

  try {
    await fetch(`${API}/rewards/add.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ label, type, value, emoji: '🎁' })
    });
    showToast('✅ Reward added!');
    closeRewardModal();
    renderRewardsGrid();
  } catch(e) {
    showToast('❌ Error saving reward.');
    console.error(e);
  }
}

async function deleteReward(id) {
  if (!confirm('Delete this reward?')) return;
  try {
    await fetch(`${API}/rewards/delete.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    showToast('🗑️ Reward deleted.');
    renderRewardsGrid();
  } catch(e) {
    showToast('❌ Error deleting reward.');
  }
}

// ════════════════════════════════════════
//   SPIN ROUNDS MANAGER (localStorage)
// ════════════════════════════════════════
const MAX_DAILY_SPINS = 2;

function getSpinBonus()   { try { return JSON.parse(localStorage.getItem('coh_spin_bonus') || '{}'); } catch(e) { return {}; } }
function saveSpinBonus(d) { localStorage.setItem('coh_spin_bonus', JSON.stringify(d)); }

let spinSearchQ = '';

async function renderSpinTable() {
  // Get customers from orders
  const res    = await fetch(`${API}/orders/get.php`).catch(() => ({ json: () => [] }));
  const orders = await res.json().catch(() => []);

  const customerMap = {};
  orders.forEach(o => {
    const email = o.email || '';
    if (!email || customerMap[email]) return;
    customerMap[email] = { name: o.customer_name || 'Guest', email };
  });

  let customers = Object.values(customerMap);
  if (spinSearchQ) {
    customers = customers.filter(c =>
      c.name.toLowerCase().includes(spinSearchQ) ||
      c.email.toLowerCase().includes(spinSearchQ)
    );
  }

  const tbody = document.getElementById('spinTableBody');
  if (!customers.length) {
    tbody.innerHTML = '<tr><td colspan="5" class="empty-state">No customers found.</td></tr>';
    updateSpinStats(customers);
    return;
  }

  const bonus = getSpinBonus();
  tbody.innerHTML = customers.map((c, i) => {
    const extraSpins   = bonus[c.email] || 0;
    const totalAllowed = MAX_DAILY_SPINS + extraSpins;
    const hasBonus     = extraSpins > 0;
    return `
    <tr id="spin-row-${i}">
      <td>
        <div class="sc-customer-name">${c.name}</div>
        <div class="sc-customer-email">${c.email}</div>
      </td>
      <td><span class="spin-base-badge">${MAX_DAILY_SPINS} base</span></td>
      <td><span class="spin-bonus-badge ${hasBonus ? 'has-bonus' : ''}" id="bonus-badge-${i}">+${extraSpins} bonus</span></td>
      <td><span class="spin-total-badge ${hasBonus ? 'total-boosted' : ''}" id="total-badge-${i}">${totalAllowed} total</span></td>
      <td class="spin-actions-cell">
        <button class="btn-spin-add" onclick="grantSpins('${c.email}', ${i}, 1)">+1 Spin</button>
        <button class="btn-spin-add" onclick="grantSpins('${c.email}', ${i}, 2)">+2 Spins</button>
        <button class="btn-spin-custom" onclick="openCustomSpinModal('${c.email}', '${c.name}')">Custom</button>
        ${extraSpins > 0 ? `<button class="btn-spin-reset" onclick="resetSpins('${c.email}', ${i})">Reset</button>` : ''}
      </td>
    </tr>`;
  }).join('');

  updateSpinStats(customers);
}

function filterSpinCustomers(q) { spinSearchQ = q.toLowerCase(); renderSpinTable(); }

function grantSpins(email, rowIdx, count) {
  const bonus = getSpinBonus();
  bonus[email] = (bonus[email] || 0) + count;
  saveSpinBonus(bonus);
  showToast(`🎡 +${count} spin${count > 1 ? 's' : ''} granted to ${email}`);
  renderSpinTable();
}

function resetSpins(email, rowIdx) {
  if (!confirm(`Reset all bonus spins for ${email}?`)) return;
  const bonus = getSpinBonus();
  delete bonus[email];
  saveSpinBonus(bonus);
  showToast('🔄 Bonus spins reset.');
  renderSpinTable();
}

let customSpinEmail = '';

function openCustomSpinModal(email, name) {
  customSpinEmail = email;
  document.getElementById('csModalName').textContent    = name || email;
  document.getElementById('csModalEmail').textContent   = email;
  const bonus = getSpinBonus();
  document.getElementById('csModalCurrent').textContent = (bonus[email] || 0) + ' bonus spin(s) currently';
  document.getElementById('csSpinCount').value = '';
  document.getElementById('csSpinNote').value  = '';
  document.getElementById('customSpinModal').classList.remove('hidden');
}

function closeCustomSpinModal() { document.getElementById('customSpinModal').classList.add('hidden'); }

function saveCustomSpins() {
  const count = parseInt(document.getElementById('csSpinCount').value);
  if (isNaN(count) || count < 1 || count > 20) { showToast('⚠️ Enter a number between 1 and 20.'); return; }
  const bonus = getSpinBonus();
  bonus[customSpinEmail] = (bonus[customSpinEmail] || 0) + count;
  saveSpinBonus(bonus);
  closeCustomSpinModal();
  showToast(`🎡 +${count} spin(s) granted!`);
  renderSpinTable();
}

function updateSpinStats(customers = []) {
  const bonus      = getSpinBonus();
  const withBonus  = Object.keys(bonus).filter(e => bonus[e] > 0).length;
  const totalBonus = Object.values(bonus).reduce((s, v) => s + v, 0);
  document.getElementById('spinStatCustomers').textContent  = customers.length;
  document.getElementById('spinStatWithBonus').textContent  = withBonus;
  document.getElementById('spinStatTotalBonus').textContent = totalBonus;
}

// ════════════════════════════════════════
//   TOAST
// ════════════════════════════════════════
function showToast(msg) {
  const t = document.getElementById('adminToast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2600);
}
