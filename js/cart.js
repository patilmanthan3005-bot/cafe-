// ════════════════════════════════════════════════════════════
//   CAFE OF HEAVEN — CART JS  (collision-safe IIFE version)
//   Wrapped in IIFE so it never clashes with main.js globals
//   Public functions needed by HTML onclick= are on window
// ════════════════════════════════════════════════════════════

(function () {
  'use strict';

  const GST_RATE = 0.10;

  const PROMOS = {
    'HEAVEN10':  { pct: 10, label: '10% off with HEAVEN10'  },
    'WELCOME20': { pct: 20, label: '20% off with WELCOME20' },
    'CAFE5':     { pct:  5, label: '5% off with CAFE5'      },
  };

  const FREE_ITEM_MAP = {
    'Free Coffee':    { name: '☕ Free Coffee',    price: 0, qty: 1 },
    'Free Snack':     { name: '🍩 Free Snack',     price: 0, qty: 1 },
    'Free Croissant': { name: '🥐 Free Croissant', price: 0, qty: 1 },
  };

  let promoDiscount = 0;

  /* ── GET CART ── */
  function cartGet() {
    try {
      const raw = localStorage.getItem('coh_cart');
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return {};
      if (Array.isArray(parsed)) {
        const obj = {};
        parsed.forEach((item, i) => {
          const key = String(item.id || item.name || 'item_' + i);
          obj[key] = { name: String(item.name || key), price: Number(item.price || 0), qty: Number(item.qty || 1), img: item.img || '' };
        });
        return obj;
      }
      const obj = {};
      for (const [k, v] of Object.entries(parsed)) {
        if (!v || typeof v !== 'object') continue;
        obj[k] = { ...v, name: String(v.name || v.title || k), price: Number(v.price || v.cost || 0), qty: Number(v.qty || v.quantity || 1), img: v.img || '' };
      }
      return obj;
    } catch (e) { console.warn('[Cart] parse error:', e); return {}; }
  }

  function cartSave(c) { localStorage.setItem('coh_cart', JSON.stringify(c)); cartCountUpdate(); }

  /* ── RENDER ── */
  function cartRender() {
    const cart   = cartGet();
    const reward = rewardGet();
    const displayCart = { ...cart };
    if (reward && reward.type === 'free' && FREE_ITEM_MAP[reward.label]) {
      displayCart['__reward_free__'] = { ...FREE_ITEM_MAP[reward.label], isFreeReward: true };
    }
    const keys   = Object.keys(displayCart);
    const empty  = document.getElementById('cartEmpty');
    const layout = document.getElementById('cartLayout');
    if (!empty || !layout) return;
    if (keys.length === 0) {
      empty.style.display  = 'flex';
      layout.style.display = 'none';
      summaryUpdate(cart);
      return;
    }
    empty.style.display  = 'none';
    layout.style.display = 'grid';
    document.getElementById('cartItemsList').innerHTML = keys.map((k, i) => buildCard(k, displayCart[k], i)).join('');
    summaryUpdate(cart);
  }

  /* ── BUILD ONE CARD ── */
  function buildCard(key, item, idx) {
    const safeKey   = key.replace(/[^a-zA-Z0-9]/g, '-');
    const name      = String(item.name || key);
    const emoji     = emojiExtract(name) || '🍽️';
    const cleanName = name.replace(/^[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\s]+/u, '').trim() || name;
    const qty       = Number(item.qty)   || 1;
    const price     = Number(item.price) || 0;
    const isFree    = item.isFreeReward === true;
    const imgSrc    = item.img || '';

    let visual;
    if (isFree) {
      visual = '<div class="ci-emoji" style="background:linear-gradient(135deg,#d0f0d0,#e8f8e8);border-color:#80c880;">' + emoji + '</div>';
    } else if (imgSrc) {
      visual = '<div class="ci-img-wrap" id="imgwrap-' + safeKey + '">'
        + '<img src="' + imgSrc + '" alt="' + cleanName + '" class="ci-img"'
        + ' data-fallback="' + emoji + '" onload="this.style.opacity=1"'
        + ' onerror="window._cartImgErr(this)">'
        + '</div>';
    } else {
      visual = '<div class="ci-emoji">' + emoji + '</div>';
    }

    const priceHtml = isFree
      ? '<span style="color:#27ae60;font-weight:700;font-size:.85rem;">FREE 🎁</span>'
      : '&#8377;' + (price * qty);

    const unitHtml = isFree
      ? '<span style="color:#27ae60;">🎉 Spin Reward</span>'
      : '&#8377;' + price + ' per item';

    const controls = isFree
      ? '<div style="background:#e8f8e8;border-radius:30px;padding:6px 14px;font-size:.75rem;color:#2a7a2a;font-weight:700;border:1.5px solid #80c880;flex-shrink:0;">Reward Item</div>'
      : '<div class="ci-qty-row">'
          + '<button class="ci-qty-btn" onclick="cartQtyChange(\'' + key + '\',-1)">&#8722;</button>'
          + '<span class="ci-qty-num" id="qty-' + safeKey + '">' + qty + '</span>'
          + '<button class="ci-qty-btn" onclick="cartQtyChange(\'' + key + '\',1)">+</button>'
        + '</div>';

    const removeBtn = isFree ? ''
      : '<button class="ci-remove" onclick="cartItemRemove(\'' + key + '\')" title="Remove">&#x2715;</button>';

    const cardStyle = isFree ? 'border-color:#80c880;background:linear-gradient(135deg,#f0fff0,#fff);' : '';

    return '<div class="cart-item" id="ci-' + safeKey + '" style="' + cardStyle + 'animation-delay:' + (idx * 0.06) + 's">'
      + visual
      + '<div class="ci-info">'
        + '<div class="ci-name" title="' + cleanName + '">' + cleanName + '</div>'
        + '<div class="ci-unit">' + unitHtml + '</div>'
      + '</div>'
      + controls
      + '<div class="ci-price" id="price-' + safeKey + '">' + priceHtml + '</div>'
      + removeBtn
      + '</div>';
  }

  function emojiExtract(str) {
    const m = String(str).match(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u);
    return m ? m[0] : null;
  }

  /* ── QTY CHANGE ── */
  function qtyChange(key, delta) {
    const cart = cartGet();
    if (!cart[key]) return;
    const newQty = (Number(cart[key].qty) || 1) + delta;
    if (newQty <= 0) { itemRemove(key); return; }
    cart[key].qty = newQty;
    cartSave(cart);
    const sk = key.replace(/[^a-zA-Z0-9]/g, '-');
    const qEl = document.getElementById('qty-'   + sk);
    const pEl = document.getElementById('price-' + sk);
    if (qEl) qEl.textContent = newQty;
    if (pEl) pEl.textContent = '\u20B9' + (Number(cart[key].price) * newQty);
    summaryUpdate(cart);
  }

  /* ── REMOVE ITEM ── */
  function itemRemove(key) {
    const sk = key.replace(/[^a-zA-Z0-9]/g, '-');
    const el = document.getElementById('ci-' + sk);
    if (el) { el.style.transition = 'all .25s ease'; el.style.transform = 'scale(.88) translateX(20px)'; el.style.opacity = '0'; }
    setTimeout(function () {
      const cart = cartGet();
      delete cart[key];
      cartSave(cart);
      cartRender();
      cartToast('🗑️ Item removed');
    }, 250);
  }

  /* ── SUMMARY ── */
  function summaryUpdate(cart) {
    const keys     = Object.keys(cart);
    const subtotal = keys.reduce(function (s, k) { return s + (Number(cart[k].price) * (Number(cart[k].qty) || 1)); }, 0);
    const gst      = Math.round(subtotal * GST_RATE);
    const reward   = rewardGet();
    let rewardDisc = 0, rewardLabel = '';
    if (reward) {
      if (reward.type === 'pct')  { rewardDisc = Math.round((subtotal + gst) * Number(reward.value) / 100); rewardLabel = (reward.emoji || '🎉') + ' ' + reward.label + ' applied!'; }
      if (reward.type === 'flat') { rewardDisc = Math.min(Number(reward.value), subtotal + gst);             rewardLabel = (reward.emoji || '🎉') + ' ' + reward.label + ' applied!'; }
      if (reward.type === 'free') { rewardLabel = (reward.emoji || '🎁') + ' ' + reward.label + ' added to your order!'; }
    }
    const promoDisc = Math.round((subtotal + gst) * promoDiscount / 100);
    const totalDisc = rewardDisc + promoDisc;
    const total     = Math.max(0, subtotal + gst - totalDisc);
    function sid(id) { return document.getElementById(id); }
    if (sid('csSubtotal')) sid('csSubtotal').textContent = '₹' + subtotal;
    if (sid('csGst'))      sid('csGst').textContent      = '₹' + gst;
    if (sid('csTotal'))    sid('csTotal').textContent    = '₹' + total;
    const discRow = sid('csDiscountRow');
    if (discRow) discRow.style.display = totalDisc > 0 ? 'flex' : 'none';
    if (totalDisc > 0) {
      if (sid('csDiscount'))      sid('csDiscount').textContent      = '-₹' + totalDisc;
      if (sid('csDiscountLabel')) sid('csDiscountLabel').textContent = reward ? (reward.emoji || '🎉') + ' Reward Discount' : '🎉 Discount';
    }
    const rt = sid('csRewardTag');
    if (rt) { rt.style.display = (reward && rewardLabel) ? 'block' : 'none'; if (reward && rewardLabel) rt.textContent = rewardLabel; }
  }

  /* ── REWARD ── */
  function rewardGet() {
    try { return JSON.parse(localStorage.getItem('coh_reward') || 'null'); } catch (e) { return null; }
  }

  /* ── PROMO ── */
  function promoApply() {
    const code  = document.getElementById('promoInput').value.trim().toUpperCase();
    const msg   = document.getElementById('promoMsg');
    const promo = PROMOS[code];
    if (!code) { msg.className = 'cs-promo-msg err'; msg.textContent = 'Please enter a promo code.'; return; }
    if (promo) { promoDiscount = promo.pct; msg.className = 'cs-promo-msg ok'; msg.textContent = '✅ ' + promo.label; summaryUpdate(cartGet()); cartToast('🏷️ Promo code applied!'); }
    else       { promoDiscount = 0; msg.className = 'cs-promo-msg err'; msg.textContent = '❌ Invalid promo code.'; summaryUpdate(cartGet()); }
  }

  /* ── CLEAR CART ── */
  function modalShow() { document.getElementById('cartModal').classList.add('show'); }
  function modalHide() { document.getElementById('cartModal').classList.remove('show'); }
  function cartClear() { localStorage.removeItem('coh_cart'); modalHide(); cartCountUpdate(); cartRender(); cartToast('🗑️ Cart cleared'); }
  var modal = document.getElementById('cartModal');
  if (modal) modal.addEventListener('click', function (e) { if (e.target === this) modalHide(); });

  /* ── CHECKOUT ── */
  function checkout() {
    var cart = cartGet();
    if (!Object.keys(cart).length) {
      alert('Your cart is empty! Please add items before checking out.');
      return;
    }
    window.location.href = 'payment.html';
  }

  /* ── CART COUNT ── */
  function cartCountUpdate() {
    var cart = cartGet();
    var el   = document.getElementById('cartCount');
    if (el) el.textContent = Object.values(cart).reduce(function (s, i) { return s + (Number(i.qty) || 1); }, 0);
  }

  /* ── TOAST ── */
  function cartToast(msg) {
    var t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(function () { t.classList.remove('show'); }, 2400);
  }

  /* ════════════════════════════════
     EXPOSE to window — needed by onclick= in cart.html
     ════════════════════════════════ */
  window.cartQtyChange    = qtyChange;
  window.cartItemRemove   = itemRemove;
  window.confirmClearCart = modalShow;
  window.closeCartModal   = modalHide;
  window.clearCart        = cartClear;
  window.proceedCheckout  = checkout;
  window.applyPromo       = promoApply;

  /* image onerror handler — referenced by buildCard */
  window._cartImgErr = function (img) {
    var fb   = img.getAttribute('data-fallback') || '🍽️';
    var wrap = img.parentElement;
    if (wrap) wrap.outerHTML = '<div class="ci-emoji">' + fb + '</div>';
  };

  /* ── INIT ── */
  console.log('[Cart] Starting. coh_cart =', localStorage.getItem('coh_cart'));
  cartCountUpdate();
  cartRender();

  var reward = rewardGet();
  if (reward) {
    var rmsg = reward.type === 'free' ? '🎁 Free item added: ' + reward.label : '🎉 Reward active: ' + reward.label;
    setTimeout(function () { cartToast(rmsg); }, 500);
  }

})();
