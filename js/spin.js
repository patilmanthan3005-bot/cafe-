// ════════════════════════════════
//   CAFE OF HEAVEN — SPIN & WIN JS
//   Saves reward to: coh_reward { type, value, label }
//   Cooldown key:    coh_spin_date (today's date string)
// ════════════════════════════════

// ── PRIZE SEGMENTS ──
const PRIZES = [
  { id: 'p1',  emoji: '☕',  label: 'Free Coffee',         sub: 'One free hot coffee',             color: '#c87820', type: 'free',  value: 0,  chance: 5  },
  { id: 'p2',  emoji: '💸',  label: '20% Off',             sub: 'On your entire order',            color: '#2a7a2a', type: 'pct',   value: 20, chance: 10 },
  { id: 'p3',  emoji: '🎉',  label: '10% Off',             sub: 'Discount on your cart',           color: '#8a4010', type: 'pct',   value: 10, chance: 20 },
  { id: 'p4',  emoji: '🍩',  label: 'Free Snack',          sub: 'Any snack of your choice',        color: '#6a1a4a', type: 'free',  value: 0,  chance: 8  },
  { id: 'p5',  emoji: '💰',  label: '₹50 Off',             sub: 'Flat ₹50 off your order',         color: '#1a4a7a', type: 'flat',  value: 50, chance: 15 },
  { id: 'p6',  emoji: '😔',  label: 'Better Luck!',        sub: 'Try again tomorrow',              color: '#4a4a4a', type: 'none',  value: 0,  chance: 22 },
  { id: 'p7',  emoji: '🥐',  label: 'Free Croissant',      sub: 'One buttery croissant',           color: '#7a3a10', type: 'free',  value: 0,  chance: 7  },
  { id: 'p8',  emoji: '💎',  label: '₹100 Off',            sub: 'Big flat discount!',              color: '#2a1a6a', type: 'flat',  value: 100,chance: 3  },
  { id: 'p9',  emoji: '🎁',  label: '5% Off',              sub: 'Small but sweet discount',        color: '#4a2a0a', type: 'pct',   value: 5,  chance: 20 },
  { id: 'p10', emoji: '🌟',  label: 'Mystery Reward!',     sub: 'A surprise added to your order',  color: '#6a2a00', type: 'pct',   value: 15, chance: 5  },
  { id: 'p11', emoji: '😊',  label: 'Double Points',       sub: 'Loyalty points doubled',          color: '#1a5a3a', type: 'none',  value: 0,  chance: 10 },  // cosmetic
  { id: 'p12', emoji: '☕',  label: '₹30 Off',             sub: 'Quick saving on cart',            color: '#5a2a00', type: 'flat',  value: 30, chance: 15 },
];

const NUM_SEGMENTS  = PRIZES.length;
const SEGMENT_ANGLE = (2 * Math.PI) / NUM_SEGMENTS;

let isSpinning  = false;
let currentAngle = 0;     // current rotation of wheel (radians)
let canvas, ctx;

// ════════════════════════════════
//   INIT
// ════════════════════════════════
window.addEventListener('DOMContentLoaded', () => {
  canvas = document.getElementById('wheelCanvas');
  ctx    = canvas.getContext('2d');

  drawWheel(currentAngle);
  buildPrizeList();
  checkCooldown();
  loadCurrentReward();
  updateCartCount();
});

// ════════════════════════════════
//   DRAW WHEEL
// ════════════════════════════════
function drawWheel(rotation) {
  const W = canvas.width;
  const H = canvas.height;
  const cx = W / 2, cy = H / 2;
  const R  = W / 2 - 4;

  ctx.clearRect(0, 0, W, H);

  PRIZES.forEach((prize, i) => {
    const start = rotation + i * SEGMENT_ANGLE;
    const end   = start + SEGMENT_ANGLE;

    // Segment fill
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, R, start, end);
    ctx.closePath();
    ctx.fillStyle = prize.color;
    ctx.fill();

    // Segment border
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, R, start, end);
    ctx.closePath();
    ctx.strokeStyle = 'rgba(255,255,255,0.18)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Text
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(start + SEGMENT_ANGLE / 2);

    // Emoji
    ctx.font = `${W * 0.06}px serif`;
    ctx.textAlign = 'right';
    ctx.fillText(prize.emoji, R - 14, 6);

    // Label
    ctx.font = `bold ${W * 0.035}px Lato, sans-serif`;
    ctx.fillStyle = '#fff';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur  = 4;
    ctx.textAlign   = 'right';
    // Truncate if too long
    const label = prize.label.length > 12 ? prize.label.slice(0, 11) + '…' : prize.label;
    ctx.fillText(label, R - W * 0.15, 6);
    ctx.shadowBlur = 0;

    ctx.restore();
  });

  // Center circle
  ctx.beginPath();
  ctx.arc(cx, cy, W * 0.1, 0, 2 * Math.PI);
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.1);
  grad.addColorStop(0, '#f5d080');
  grad.addColorStop(1, '#C8962E');
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 3;
  ctx.stroke();
}

// ════════════════════════════════
//   WEIGHTED RANDOM PRIZE
// ════════════════════════════════
function pickPrize() {
  const total  = PRIZES.reduce((s, p) => s + p.chance, 0);
  let rand     = Math.random() * total;
  for (let i = 0; i < PRIZES.length; i++) {
    rand -= PRIZES[i].chance;
    if (rand <= 0) return i;
  }
  return PRIZES.length - 1;
}

// ════════════════════════════════
//   SPIN
// ════════════════════════════════
function spinWheel() {
  if (isSpinning) return;
  if (!hasSpinsLeft()) { showToast('⏰ No spins left today! Come back tomorrow for 2 more.'); return; }

  isSpinning = true;
  document.getElementById('spinBtn').disabled = true;

  const winIndex    = pickPrize();
  // Target angle: we want winIndex's segment to be at the top (pointer = top of wheel = -π/2)
  // Segment centre = winIndex * SEGMENT_ANGLE + SEGMENT_ANGLE/2
  // We want that to be at -π/2 (top) after rotation
  const targetSegmentAngle = winIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
  const targetRotation     = -Math.PI / 2 - targetSegmentAngle;

  // Add extra full spins (5–8 full rotations) for drama
  const extraSpins  = (5 + Math.floor(Math.random() * 4)) * 2 * Math.PI;
  const finalAngle  = targetRotation + extraSpins;

  const duration   = 5000 + Math.random() * 1500;
  const startTime  = performance.now();
  const startAngle = currentAngle;

  function easeOut(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function animate(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = easeOut(progress);

    currentAngle = startAngle + (finalAngle - startAngle) * eased;
    drawWheel(currentAngle);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      currentAngle = finalAngle;
      isSpinning   = false;
      onSpinEnd(PRIZES[winIndex]);
    }
  }

  requestAnimationFrame(animate);
}

function onSpinEnd(prize) {
  // Record spin
  recordSpin();

  // Save reward (non-cosmetic prizes only)
  if (prize.type !== 'none') {
    const reward = { type: prize.type, value: prize.value, label: prize.label, emoji: prize.emoji };
    localStorage.setItem('coh_reward', JSON.stringify(reward));
  }

  // Show win modal
  document.getElementById('winIcon').textContent  = prize.emoji;
  document.getElementById('winPrize').textContent = prize.label + (prize.sub ? ' — ' + prize.sub : '');
  document.getElementById('winModal').classList.add('show');

  checkCooldown();
  loadCurrentReward();
}

// ════════════════════════════════
//   COOLDOWN
// ════════════════════════════════
const MAX_SPINS = 2;

function todayStr() {
  return new Date().toISOString().split('T')[0];
}
function getSpinsToday() {
  try {
    const data = JSON.parse(localStorage.getItem('coh_spin_data') || '{}');
    return data.date === todayStr() ? (data.count || 0) : 0;
  } catch(e) { return 0; }
}
// Admin can grant bonus spins via coh_spin_bonus { email: count }
// spin.js reads the logged-in customer email from coh_account session
function getLoggedInEmail() {
  try {
    const acc = JSON.parse(sessionStorage.getItem('coh_account') || localStorage.getItem('coh_account_session') || '{}');
    return (acc.email || '').toLowerCase();
  } catch(e) { return ''; }
}
function getAdminBonusSpins() {
  try {
    const email = getLoggedInEmail();
    if (!email) return 0;
    const bonus = JSON.parse(localStorage.getItem('coh_spin_bonus') || '{}');
    return bonus[email] || 0;
  } catch(e) { return 0; }
}
function consumeAdminBonusSpin() {
  const email = getLoggedInEmail();
  if (!email) return;
  const bonus = JSON.parse(localStorage.getItem('coh_spin_bonus') || '{}');
  if (bonus[email] > 0) {
    bonus[email]--;
    if (bonus[email] <= 0) delete bonus[email];
    localStorage.setItem('coh_spin_bonus', JSON.stringify(bonus));
  }
}
function totalSpinsAllowed() {
  return MAX_SPINS + getAdminBonusSpins();
}
function recordSpin() {
  const used = getSpinsToday();
  if (used < MAX_SPINS) {
    // Use regular daily spin
    localStorage.setItem('coh_spin_data', JSON.stringify({ date: todayStr(), count: used + 1 }));
  } else {
    // Use admin bonus spin
    consumeAdminBonusSpin();
  }
}
function hasSpinsLeft() {
  return getSpinsToday() < totalSpinsAllowed();
}
function checkCooldown() {
  const used      = getSpinsToday();
  const allowed   = totalSpinsAllowed();
  const spinsLeft = allowed - used;
  const btn    = document.getElementById('spinBtn');
  const notice = document.getElementById('siNotice');
  const inner  = document.querySelector('.wsb-inner');
  const bonus  = getAdminBonusSpins();

  btn.disabled = spinsLeft <= 0;

  if (inner) {
    inner.textContent = spinsLeft > 0 ? 'SPIN! (' + spinsLeft + ')' : 'DONE';
  }
  if (spinsLeft <= 0) {
    notice.style.display = 'flex';
    notice.querySelector('.sin-title').textContent = 'No spins left today!';
    notice.querySelector('.sin-sub').textContent   = 'You have used all spins. Come back tomorrow — or ask the cafe for a bonus spin!';
  } else if (bonus > 0) {
    notice.style.display = 'flex';
    notice.querySelector('.sin-title').textContent = '🎁 Admin Bonus Active!';
    notice.querySelector('.sin-sub').textContent   = 'The cafe has gifted you ' + bonus + ' extra spin' + (bonus > 1 ? 's' : '') + '!';
  } else {
    notice.style.display = 'none';
  }
}

// ════════════════════════════════
//   CURRENT REWARD
// ════════════════════════════════
function loadCurrentReward() {
  try {
    const r = JSON.parse(localStorage.getItem('coh_reward') || 'null');
    const el = document.getElementById('siCurrentReward');
    if (r) {
      el.style.display = 'block';
      document.getElementById('scrName').textContent = r.emoji + ' ' + r.label;
    } else {
      el.style.display = 'none';
    }
  } catch(e) {}
}

// ════════════════════════════════
//   PRIZE LIST
// ════════════════════════════════
function buildPrizeList() {
  const el = document.getElementById('siPrizes');
  el.innerHTML = PRIZES.filter(p => p.type !== 'none').slice(0, 8).map(p => `
    <div class="prize-row">
      <div class="pr-emoji">${p.emoji}</div>
      <div class="pr-info">
        <div class="pr-name">${p.label}</div>
        <div class="pr-sub">${p.sub}</div>
      </div>
      <div class="pr-chance">${p.chance}%</div>
    </div>
  `).join('');
}

// ════════════════════════════════
//   WIN MODAL
// ════════════════════════════════
function closeWinModal() {
  document.getElementById('winModal').classList.remove('show');
}
function goToCart() {
  window.location.href = 'cart.html';
}
document.getElementById('winModal').addEventListener('click', function(e) {
  if (e.target === this) closeWinModal();
});

// ════════════════════════════════
//   CART COUNT
// ════════════════════════════════
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('coh_cart') || '{}');
  const el   = document.getElementById('cartCount');
  if (el) el.textContent = Object.values(cart).reduce((s, i) => s + (i.qty || 1), 0);
}

// ════════════════════════════════
//   TOAST
// ════════════════════════════════
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2400);
}
