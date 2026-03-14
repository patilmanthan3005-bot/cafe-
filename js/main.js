/* ============================================================
   CAFE OF HEAVEN — SHARED JAVASCRIPT
   Handles: cart, favourites, toast, qty controls
   ============================================================ */

// ── STORAGE HELPERS ──
const getCart  = () => JSON.parse(localStorage.getItem('coh_cart') || '{}');
const getFavs  = () => JSON.parse(localStorage.getItem('coh_favs') || '[]');
const saveCart = (c) => localStorage.setItem('coh_cart', JSON.stringify(c));
const saveFavs = (f) => localStorage.setItem('coh_favs', JSON.stringify(f));

// ── CART COUNTS ──
const cartCount = (c) => Object.values(c).reduce((s,i) => s + i.qty, 0);
const cartTotal = (c) => Object.values(c).reduce((s,i) => s + i.qty * i.price, 0);

// ── TOAST ──
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2400);
}

// ── UPDATE NAV CART COUNT ──
function updateNavCart() {
  const c = getCart();
  const el = document.getElementById('cartCount');
  if (el) el.textContent = cartCount(c);
}

// ── FLOATING CART BUTTON (menu page) ──
function updateFloatCart() {
  const c = getCart();
  const count = cartCount(c);
  const total = cartTotal(c);
  const fc = document.getElementById('floatCart');
  if (!fc) return;
  if (count > 0) {
    fc.classList.remove('hidden');
    const ft = document.getElementById('floatTotal');
    const fn = document.getElementById('floatCount');
    if (ft) ft.textContent = '₹' + total;
    if (fn) fn.textContent = count;
  } else {
    fc.classList.add('hidden');
  }
}

// ── ADD / QTY RENDER (menu & favourites pages) ──
function renderCardAction(id) {
  const wrap = document.getElementById('ca-' + id);
  if (!wrap) return;
  const c = getCart();
  const qty = c[id]?.qty || 0;
  if (qty === 0) {
    wrap.innerHTML = `<button class="add-btn" onclick="addItem(${id})">+ Add</button>`;
  } else {
    wrap.innerHTML = `
      <div class="qty-ctrl">
        <button class="qty-btn" onclick="changeQty(${id}, -1)">−</button>
        <span class="qty-num">${qty}</span>
        <button class="qty-btn" onclick="changeQty(${id}, +1)">+</button>
      </div>`;
  }
}

function changeQty(id, delta) {
  const c = getCart();
  if (!c[id]) return;
  c[id].qty += delta;
  if (c[id].qty <= 0) delete c[id];
  saveCart(c);
  updateNavCart();
  updateFloatCart();
  renderCardAction(id);
}

// ── HEART / FAVOURITES ──
function toggleFav(id) {
  const favs = getFavs();
  const idx = favs.indexOf(id);
  if (idx > -1) favs.splice(idx, 1);
  else favs.push(id);
  saveFavs(favs);
  const btn = document.getElementById('fav-' + id);
  if (btn) {
    btn.classList.toggle('faved', favs.includes(id));
    btn.style.animation = 'none';
    btn.offsetHeight;
    btn.style.animation = '';
  }
  showToast(favs.includes(id) ? '❤️ Saved to Favourites!' : '🤍 Removed from Favourites');
}

// ── INIT (runs on every page load) ──
document.addEventListener('DOMContentLoaded', () => {
  updateNavCart();
  updateFloatCart();
});
