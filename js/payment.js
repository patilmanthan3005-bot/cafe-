// ════════════════════════════════════════════════════════════
//   CAFE OF HEAVEN — PAYMENT JS
//   - Delivery only (no pickup)
//   - QR code for UPI & Wallet
//   - EmailJS receipt to customer Gmail
//   - Success popup with no Spin & Win
// ════════════════════════════════════════════════════════════

(function () {
  'use strict';

  /* ══════════════════════════════════════════════════════
       ★ STEP 1 — Fill in your EmailJS details here
       Get them free at: https://www.emailjs.com
     ══════════════════════════════════════════════════════ */
  var EMAILJS_SERVICE_ID  = 'service_ewt5f1c';    // e.g. 'service_abc123'
  var EMAILJS_TEMPLATE_ID = 'template_zq67shu';   // e.g. 'template_xyz789'
  var EMAILJS_PUBLIC_KEY  = 'HtoqazFt2JItSfruj';    // e.g. 'aBcDeFgHiJ'

  /* ══════════════════════════════════════════════════════
       ★ STEP 2 — This QR points to your own site
       When customer scans → browser opens → order confirmed
       No real money moves — it's a demo/fake payment flow
     ══════════════════════════════════════════════════════ */
  var QR_PAYMENT_URL = window.location.href; // scans back to same page

  /* Config */
  var GST_RATE    = 0.10;
  var WALLET_IDS  = {
    paytm:      'cafeofheaven@paytm',
    amazon:     'cafeofheaven@apl',
    mobikwik:   'cafeofheaven@ikwik',
    freecharge: 'cafeofheaven@fc',
  };

  /* State */
  var selectedPay      = 'card';
  var selectedWallet   = 'paytm';
  var addressConfirmed = false;
  var orderTotal       = 0;

  /* ══════════════════════════════════════
       READ CART FROM LOCALSTORAGE
     ══════════════════════════════════════ */
  function getCart() {
    try {
      var raw = localStorage.getItem('coh_cart');
      if (!raw) return {};
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return {};
      if (Array.isArray(parsed)) {
        var obj = {};
        parsed.forEach(function(item, i) {
          var k = String(item.id || item.name || 'item_' + i);
          obj[k] = { name: item.name || k, price: Number(item.price || 0), qty: Number(item.qty || 1), img: item.img || '' };
        });
        return obj;
      }
      var obj = {};
      Object.entries(parsed).forEach(function(entry) {
        var k = entry[0], v = entry[1];
        if (!v || typeof v !== 'object') return;
        obj[k] = Object.assign({}, v, {
          name:  String(v.name  || k),
          price: Number(v.price || 0),
          qty:   Number(v.qty   || 1),
          img:   v.img || ''
        });
      });
      return obj;
    } catch(e) { return {}; }
  }

  /* ══════════════════════════════════════
       RENDER ORDER SUMMARY (right panel)
     ══════════════════════════════════════ */
  function renderSummary() {
    var cart     = getCart();
    var keys     = Object.keys(cart);
    var subtotal = 0;
    var html     = '';

    if (keys.length === 0) {
      html = '<p style="color:var(--text-mid);font-size:.88rem;">Cart is empty. <a href="menu.html" style="color:var(--gold);">Browse menu →</a></p>';
    } else {
      keys.forEach(function(k) {
        var item  = cart[k];
        var name  = String(item.name || k);
        var emoji = extractEmoji(name) || '🍽️';
        var clean = name.replace(/^[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\s]+/u, '').trim() || name;
        var qty   = Number(item.qty)   || 1;
        var price = Number(item.price) || 0;
        var line  = price * qty;
        subtotal += line;
        var imgSrc  = item.img || '';
        var imgHtml = imgSrc
          ? '<img src="' + imgSrc + '" class="iimg" onerror="this.style.display=\'none\'" alt="' + clean + '">'
          : '<span style="font-size:1.4rem;">' + emoji + '</span>';
        html += '<div class="order-item">'
          + '<div class="item-left">' + imgHtml + '<span class="iname">' + clean + ' \u00d7' + qty + '</span></div>'
          + '<span>\u20b9' + line + '</span>'
          + '</div>';
      });
    }

    var gst  = Math.round(subtotal * GST_RATE);
    orderTotal = subtotal + gst;

    // Check reward discount
    var discountVal = 0;
    try {
      var reward = JSON.parse(localStorage.getItem('coh_reward') || 'null');
      if (reward) {
        if (reward.type === 'pct')  discountVal = Math.round(orderTotal * Number(reward.value) / 100);
        if (reward.type === 'flat') discountVal = Math.min(Number(reward.value), orderTotal);
      }
    } catch(e) {}
    orderTotal = Math.max(0, orderTotal - discountVal);

    document.getElementById('orderItems').innerHTML  = html;
    document.getElementById('sumSub').textContent    = '₹' + subtotal;
    document.getElementById('sumTax').textContent    = '₹' + gst;
    document.getElementById('sumTotal').textContent  = '₹' + orderTotal;
    document.getElementById('payBtn').textContent    = 'Pay ₹' + orderTotal + ' →';

    var discRow = document.getElementById('sumDiscountRow');
    if (discountVal > 0 && discRow) {
      discRow.style.display = 'flex';
      document.getElementById('sumDiscount').textContent = '-₹' + discountVal;
    }

    // Build QR codes now that total is known
    buildUpiQr();
    buildWalletQr();
  }

  function extractEmoji(str) {
    var m = String(str).match(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u);
    return m ? m[0] : null;
  }

  /* ══════════════════════════════════════
       QR CODE — UPI
       Generates a QR that links back to
       THIS page — when scanned, customer
       lands on the page and can confirm order
     ══════════════════════════════════════ */
  function buildUpiQr() {
    var container = document.getElementById('qrCodeContainer');
    if (!container || typeof QRCode === 'undefined') return;

    // QR encodes the current page URL
    // When customer scans → browser opens → they see order confirmed
    var qrText = QR_PAYMENT_URL + (QR_PAYMENT_URL.includes('?') ? '&' : '?') + 'scanned=1&amount=' + orderTotal;

    document.getElementById('qrAmountLabel').textContent = 'Pay ₹' + orderTotal;
    container.innerHTML = '';
    try {
      new QRCode(container, {
        text:         qrText,
        width:        180,
        height:       180,
        colorDark:    '#3B1F0A',
        colorLight:   '#ffffff',
        correctLevel: QRCode.CorrectLevel.M
      });
    } catch(e) {
      container.innerHTML = '<p style="color:#aaa;font-size:.8rem;padding:20px;">QR generation failed</p>';
    }
  }

  /* ══════════════════════════════════════
       QR CODE — WALLET
     ══════════════════════════════════════ */
  function buildWalletQr() {
    var container = document.getElementById('walletQrContainer');
    if (!container || typeof QRCode === 'undefined') return;

    var walletId = WALLET_IDS[selectedWallet] || WALLET_IDS.paytm;
    var qrText   = QR_PAYMENT_URL + (QR_PAYMENT_URL.includes('?') ? '&' : '?') + 'wallet=' + selectedWallet + '&amount=' + orderTotal;

    document.getElementById('walletAmountLabel').textContent = 'Pay ₹' + orderTotal;
    document.getElementById('walletIdLabel').textContent     = walletId;
    container.innerHTML = '';
    try {
      new QRCode(container, {
        text:         qrText,
        width:        180,
        height:       180,
        colorDark:    '#3B1F0A',
        colorLight:   '#ffffff',
        correctLevel: QRCode.CorrectLevel.M
      });
    } catch(e) {
      container.innerHTML = '<p style="color:#aaa;font-size:.8rem;padding:20px;">QR generation failed</p>';
    }
  }

  /* ══════════════════════════════════════
       UPI APP DEEP LINKS (mobile)
     ══════════════════════════════════════ */
  window.openUpiApp = function(app) {
    showToast('Opening ' + app + '...');
  };

  /* ══════════════════════════════════════
       ADDRESS CONFIRMATION
     ══════════════════════════════════════ */
  window.confirmAddress = function() {
    var name  = (document.getElementById('custName')  || {}).value || '';
    var phone = (document.getElementById('custPhone') || {}).value || '';
    var email = (document.getElementById('custEmail') || {}).value || '';
    var line1 = (document.getElementById('addrLine1') || {}).value || '';
    var city  = (document.getElementById('addrCity')  || {}).value || '';
    var pin   = (document.getElementById('addrPin')   || {}).value || '';

    name  = name.trim();
    phone = phone.trim();
    email = email.trim();
    line1 = line1.trim();
    city  = city.trim();
    pin   = pin.trim();

    if (!name)              { showToast('⚠️ Please enter your full name');            return; }
    if (!phone)             { showToast('⚠️ Please enter your phone number');         return; }
    if (!email)             { showToast('⚠️ Please enter your email for receipt');    return; }
    if (!line1)             { showToast('⚠️ Please enter your house/flat address');   return; }
    if (!city)              { showToast('⚠️ Please enter your city');                 return; }
    if (pin.length < 6)     { showToast('⚠️ Please enter a valid 6-digit PIN code'); return; }

    addressConfirmed = true;
    var btn = document.getElementById('confirmAddrBtn');
    btn.classList.add('confirmed');
    btn.textContent = '✅ Address Confirmed';
    document.getElementById('addrConfirmedMsg').style.display = 'block';
    showToast('✅ Address confirmed!');

    setTimeout(function() {
      document.getElementById('panelPayment').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 400);
  };

  /* ══════════════════════════════════════
       PAYMENT METHOD SWITCH
     ══════════════════════════════════════ */
  window.selectPay = function(type, el) {
    selectedPay = type;
    document.querySelectorAll('.pay-method').forEach(function(m) { m.classList.remove('active'); });
    el.classList.add('active');
    ['card','upi','wallet','cod'].forEach(function(t) {
      var f = document.getElementById('form-' + t);
      if (f) f.classList.toggle('show', t === type);
    });
  };

  /* ══════════════════════════════════════
       WALLET SELECTION
     ══════════════════════════════════════ */
  window.selectWallet = function(el, wallet) {
    selectedWallet = wallet;
    document.querySelectorAll('.wallet-opt').forEach(function(w) { w.classList.remove('active'); });
    el.classList.add('active');
    buildWalletQr();
  };

  /* ══════════════════════════════════════
       CARD FORMAT
     ══════════════════════════════════════ */
  window.formatCard = function(inp) {
    var v = inp.value.replace(/\D/g,'').substring(0,16);
    inp.value = v.replace(/(.{4})/g,'$1  ').trim();
    var brand = document.getElementById('cardBrand');
    if (brand) brand.textContent = v.startsWith('4') ? '💙' : v.startsWith('5') ? '❤️' : '💳';
  };

  /* ══════════════════════════════════════
       PLACE ORDER
     ══════════════════════════════════════ */
  window.placeOrder = function() {
    if (!addressConfirmed) {
      showToast('⚠️ Please confirm your delivery address first');
      document.getElementById('panelPickup').scrollIntoView({ behavior: 'smooth' });
      return;
    }
    var cart = getCart();
    if (!Object.keys(cart).length) { showToast('⚠️ Your cart is empty!'); return; }

    if (selectedPay === 'upi') {
      var upiId = (document.getElementById('upiIdInput') || {}).value || '';
      if (!upiId.trim()) {
        showToast('⚠️ Please enter your UPI ID or scan the QR');
        return;
      }
    }

    var btn = document.getElementById('payBtn');
    btn.textContent = 'Processing... ⏳';
    btn.disabled    = true;

    setTimeout(function() {
      finishOrder(cart);
    }, 1800);
  };

  /* ══════════════════════════════════════
       FINISH ORDER + SEND EMAIL
     ══════════════════════════════════════ */
  function finishOrder(cart) {
    var orderId = 'COH-' + Math.floor(1000 + Math.random() * 9000);
    var pts     = Math.floor(orderTotal / 10);
    var loyPts  = parseInt(localStorage.getItem('coh_loyalty') || '0') + pts;
    localStorage.setItem('coh_loyalty', loyPts);

    // Collect customer info
    var custName  = ((document.getElementById('custName')  || {}).value || 'Customer').trim();
    var custEmail = ((document.getElementById('custEmail') || {}).value || '').trim();
    var custPhone = ((document.getElementById('custPhone') || {}).value || '').trim();
    var addrLine1 = ((document.getElementById('addrLine1') || {}).value || '').trim();
    var addrLine2 = ((document.getElementById('addrLine2') || {}).value || '').trim();
    var addrCity  = ((document.getElementById('addrCity')  || {}).value || '').trim();
    var addrPin   = ((document.getElementById('addrPin')   || {}).value || '').trim();
    var custNote  = ((document.getElementById('custNote')  || {}).value || '').trim();

    var fullAddress = addrLine1 + (addrLine2 ? ', ' + addrLine2 : '') + ', ' + addrCity + ' - ' + addrPin;

    // Build items list for email
    var itemLines = Object.values(cart).map(function(i) {
      var clean = String(i.name).replace(/^[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\s]+/u,'').trim() || i.name;
      return '• ' + clean + ' × ' + i.qty + '  —  ₹' + (Number(i.price) * Number(i.qty));
    }).join('\n');

    var gst      = Math.round((orderTotal / 1.10) * 0.10); // back-calc GST
    var subtotal = orderTotal - gst;

    // Success popup details
    var detailText = '🛵 Delivering to: ' + fullAddress + '\n💳 Payment: ' + selectedPay.toUpperCase();
    if (custNote) detailText += '\n📝 Note: ' + custNote;

    // ── SAVE ORDER TO DATABASE ──
    var orderData = {
      customer: {
        name:  custName,
        phone: custPhone,
        email: custEmail
      },
      address:  fullAddress,
      items:    cart,
      subtotal: subtotal,
      gst:      gst,
      discount: 0,
      total:    orderTotal,
      payment:  selectedPay || 'cod',
      note:     custNote || ''
    };

    fetch('api/orders/add.php', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(orderData)
    })
    .then(function(res) { return res.json(); })
    .then(function(result) {
      if (result.success) {
        console.log('✅ Order saved to DB! ID:', result.order_id);
      } else {
        console.warn('⚠️ Order DB error:', result.error);
      }
    })
    .catch(function(err) {
      console.warn('⚠️ Could not reach DB:', err);
    });

    // Clear cart & reward
    localStorage.removeItem('coh_cart');
    localStorage.removeItem('coh_reward');

    // Show success popup
    document.getElementById('orderNum').textContent  = '#' + orderId;
    document.getElementById('ptsEarned').textContent = '⭐ You earned ' + pts + ' points! Total: ' + loyPts + ' pts';
    document.getElementById('successDetail').textContent = detailText;
    document.getElementById('successOverlay').classList.add('show');

    // Send receipt email
    if (custEmail) {
      sendEmail({
        to_email:     custEmail,
        to_name:      custName,
        order_id:     orderId,
        order_items:  itemLines,
        subtotal:     '₹' + subtotal,
        gst:          '₹' + gst,
        total:        '₹' + orderTotal,
        address:      fullAddress,
        phone:        custPhone,
        payment_mode: selectedPay.toUpperCase(),
        special_note: custNote || 'None',
        est_time:     '30–45 mins',
      });
    }
  }

  /* ══════════════════════════════════════
       EMAILJS — SEND RECEIPT
     ══════════════════════════════════════ */
  function sendEmail(params) {
    if (typeof emailjs === 'undefined') {
      console.warn('[Payment] EmailJS not loaded — fill in your keys and it will work');
      return;
    }
    if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID') {
      console.warn('[Payment] EmailJS keys not set — add your keys to payment.js lines 17-19');
      return;
    }
    emailjs.init(EMAILJS_PUBLIC_KEY);
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
      .then(function() {
        console.log('[Payment] Receipt email sent!');
        var el = document.getElementById('receiptSent');
        if (el) el.style.display = 'block';
      })
      .catch(function(err) {
        console.warn('[Payment] Email failed:', err);
      });
  }

  /* ══════════════════════════════════════
       TOAST
     ══════════════════════════════════════ */
  function showToast(msg) {
    var t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(function() { t.classList.remove('show'); }, 2800);
  }

  /* ══════════════════════════════════════
       CHECK IF QR WAS SCANNED
       If customer scanned QR and came back
       to this page, auto-show success
     ══════════════════════════════════════ */
  function checkQrReturn() {
    var params = new URLSearchParams(window.location.search);
    if (params.get('scanned') === '1') {
      var cart = getCart();
      if (Object.keys(cart).length > 0 && addressConfirmed) {
        finishOrder(cart);
      }
    }
  }

  /* ══════════════════════════════════════
       INIT
     ══════════════════════════════════════ */
  renderSummary();
  checkQrReturn();

})();