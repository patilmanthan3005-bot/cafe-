// ════════════════════════════════
//   CAFE OF HEAVEN — FAVOURITES JS
// ════════════════════════════════

const catEmojis = {
  coffee:'☕', baked:'🥐', cakes:'🎂',
  pizza:'🍕', burger:'🍔', pasta:'🍝', souvenir:'🎁'
};

// ════════════════════════════════
//   LOAD ALL SAVED FAVOURITES
// ════════════════════════════════
function loadAllFavs() {
  const all = [];

  // 1. Menu items (coh_menu_favs)
  try {
    const arr = JSON.parse(localStorage.getItem('coh_menu_favs') || '[]');
    arr.forEach(f => {
      all.push({
        id:    String(f.id),
        type:  'menu',
        emoji: catEmojis[f.cat] || '🍽️',
        img:   f.img  || null,
        name:  f.name || 'Menu Item',
        desc:  f.desc || 'A favourite from our menu.',
        price: f.price || 0,
        cat:   f.cat  || '',
      });
    });
  } catch(e) { console.warn('coh_menu_favs error', e); }

  // 2. Mood picks (coh_favs)
  try {
    const arr = JSON.parse(localStorage.getItem('coh_favs') || '[]');
    arr.forEach(f => {
      all.push({
        id:    'mood-' + String(f.id || f.mood),
        type:  'mood',
        emoji: f.emoji || '☕',
        img:   null,
        name:  f.name  || 'Mood Drink',
        desc:  'Your saved mood-based recommendation.',
        price: f.price || 0,
        cat:   '',
      });
    });
  } catch(e) { console.warn('coh_favs error', e); }

  // 3. Custom builds (coh_custom_favs)
  try {
    const arr = JSON.parse(localStorage.getItem('coh_custom_favs') || '[]');
    arr.forEach((f, i) => {
      all.push({
        id:    'custom-' + i,
        type:  'custom',
        emoji: f.mode === 'coffee' ? '☕' : '🍹',
        img:   null,
        name:  f.name || (f.mode === 'coffee' ? 'Custom Coffee' : 'Custom Beverage'),
        desc:  'Custom build — ' + (f.layers ? f.layers.length : 0) + ' ingredients, size ' + (f.size || 'M') + '.',
        price: f.price || 80,
        cat:   '',
      });
    });
  } catch(e) { console.warn('coh_custom_favs error', e); }

  return all;
}

// ════════════════════════════════
//   RENDER
// ════════════════════════════════
function render() {
  const items     = loadAllFavs();
  const grid      = document.getElementById('favGrid');
  const empty     = document.getElementById('favEmpty');
  const clearWrap = document.getElementById('favClearWrap');
  const countPill = document.getElementById('favCountPill');

  countPill.textContent = items.length
    ? items.length + ' saved item' + (items.length !== 1 ? 's' : '')
    : '';

  if (items.length === 0) {
    grid.innerHTML = '';
    empty.classList.add('show');
    clearWrap.style.display = 'none';
    return;
  }

  empty.classList.remove('show');
  clearWrap.style.display = 'block';
  grid.innerHTML = items.map((item, i) => buildCard(item, i)).join('');
}

// ════════════════════════════════
//   BUILD ONE CARD
// ════════════════════════════════
function buildCard(item, idx) {
  const safeId = String(item.id).replace(/[^a-zA-Z0-9]/g, '-');

  const imgHtml = item.img
    ? `<img src="${item.img}" alt="${item.name}" loading="lazy"
           style="width:100%;height:100%;object-fit:cover;display:block;"
           onerror="this.style.display='none';document.getElementById('emoji-${safeId}').style.display='flex'">`
    : '';

  const emojiHtml = `<div id="emoji-${safeId}"
    style="display:${item.img ? 'none' : 'flex'};align-items:center;justify-content:center;
           width:100%;height:100%;font-size:3.5rem;background:linear-gradient(135deg,#f5e6cc,#e8d0a8);">
    ${item.emoji}
  </div>`;

  const typeLabel = item.type === 'mood' ? '😊 Mood Pick'
    : item.type === 'custom' ? '🎨 Custom Build'
    : '🍽️ Menu Item';

  return `
  <div class="fav-card" style="animation-delay:${idx * 0.07}s" id="fc-${safeId}">
    <div class="fc-img-wrap">
      ${imgHtml}
      ${emojiHtml}
      <span class="fc-type-chip">${typeLabel}</span>
      <button class="fc-remove-btn" onclick="removeItem('${item.id}','${item.type}')" title="Remove">✕</button>
    </div>
    <div class="fc-body">
      <div class="fc-name">${item.name}</div>
      <div class="fc-desc">${item.desc}</div>
    </div>
    <div class="fc-footer">
      <div class="fc-price">₹${item.price}</div>
      <button class="fc-cart-btn" id="cartbtn-${safeId}"
        onclick="addToCart('${item.id}','${item.name.replace(/'/g,"\\'")}',${item.price},'${item.img || ''}')">
        🛒 Add to Cart
      </button>
    </div>
  </div>`;
}

// ════════════════════════════════
//   REMOVE ONE ITEM
// ════════════════════════════════
function removeItem(id, type) {
  const safeId = String(id).replace(/[^a-zA-Z0-9]/g, '-');
  const card = document.getElementById('fc-' + safeId);
  if (card) {
    card.style.transition = 'all .28s ease';
    card.style.transform  = 'scale(0.85)';
    card.style.opacity    = '0';
  }

  setTimeout(() => {
    if (type === 'menu') {
      let arr = JSON.parse(localStorage.getItem('coh_menu_favs') || '[]');
      arr = arr.filter(f => String(f.id) !== String(id));
      localStorage.setItem('coh_menu_favs', JSON.stringify(arr));

    } else if (type === 'mood') {
      const moodId = String(id).replace('mood-', '');
      let arr = JSON.parse(localStorage.getItem('coh_favs') || '[]');
      arr = arr.filter(f => String(f.id || f.mood) !== moodId);
      localStorage.setItem('coh_favs', JSON.stringify(arr));

    } else if (type === 'custom') {
      const idx = parseInt(String(id).replace('custom-', ''));
      let arr = JSON.parse(localStorage.getItem('coh_custom_favs') || '[]');
      if (!isNaN(idx)) arr.splice(idx, 1);
      localStorage.setItem('coh_custom_favs', JSON.stringify(arr));
    }

    showToast('🤍 Removed from Favourites');
    render();
  }, 280);
}

// ════════════════════════════════
//   ADD TO CART
// ════════════════════════════════
function addToCart(id, name, price, img) {
  const cart = JSON.parse(localStorage.getItem('coh_cart') || '{}');
  const key  = 'fav-' + id;
  if (cart[key]) {
    cart[key].qty++;
  } else {
    cart[key] = { name: name, price: Number(price), qty: 1, img: img || '' };
  }
  localStorage.setItem('coh_cart', JSON.stringify(cart));
  updateCartCount();

  const safeId = String(id).replace(/[^a-zA-Z0-9]/g, '-');
  const btn = document.getElementById('cartbtn-' + safeId);
  if (btn) {
    btn.textContent = '✅ Added!';
    btn.style.background = '#2e7d32';
    btn.style.color = '#fff';
    setTimeout(() => {
      btn.textContent = '🛒 Add to Cart';
      btn.style.background = '';
      btn.style.color = '';
    }, 1800);
  }

  showToast('🛒 ' + name + ' added to cart!');
}

// ════════════════════════════════
//   CLEAR ALL
// ════════════════════════════════
function confirmClear() { document.getElementById('favModalBg').classList.add('show'); }
function closeModal()    { document.getElementById('favModalBg').classList.remove('show'); }
function clearAll() {
  localStorage.removeItem('coh_menu_favs');
  localStorage.removeItem('coh_favs');
  localStorage.removeItem('coh_custom_favs');
  closeModal();
  showToast('🗑️ All favourites cleared');
  render();
}
document.getElementById('favModalBg').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// ════════════════════════════════
//   CART COUNT + TOAST
// ════════════════════════════════
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('coh_cart') || '{}');
  const el = document.getElementById('cartCount');
  if (el) el.textContent = Object.values(cart).reduce((s, i) => s + i.qty, 0);
}
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2400);
}

// ── INIT ──
updateCartCount();
render();
