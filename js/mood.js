// ════════════════════════════════
//   MOOD DATA
// ════════════════════════════════
const MOODS = {
  sleepy: {
    label: '😴 Sleepy',
    chipBg: '#4a3580', chipColor: '#e0d0ff',
    leftBg: 'linear-gradient(160deg, #2d2054, #4a3580)',
    glowColor: 'rgba(120, 80, 220, 0.4)',
    drink: {
      emoji: '☕',
      name: 'Triple Shot Espresso',
      desc: 'A powerful triple espresso designed to cut through the deepest morning fog. Rich, bold, and mercilessly caffeinated — exactly what you need to pull yourself back from the edge of sleep.',
      price: 180,
      tags: ['High Caffeine', 'Bold', 'Quick Wake-Up', 'Espresso'],
      note: '☕ Pro tip: Drink slowly to avoid the jitters — power up, not crash!',
    },
    also: [
      { emoji: '🍵', name: 'Double Matcha Shot', price: 160 },
      { emoji: '🧋', name: 'Iced Americano', price: 150 },
      { emoji: '🌙', name: 'Cold Brew Noir', price: 170 },
    ]
  },

  studying: {
    label: '📚 Studying',
    chipBg: '#1b3a5c', chipColor: '#90c0f0',
    leftBg: 'linear-gradient(160deg, #0d1b2a, #1b3a5c)',
    glowColor: 'rgba(50, 120, 200, 0.4)',
    drink: {
      emoji: '🍵',
      name: 'Matcha Mind Latte',
      desc: 'The scholar\'s choice. Matcha\'s L-theanine delivers calm, sustained focus without the caffeine crash. Creamy oat milk base balances the earthy green tea perfectly for hours of deep work.',
      price: 200,
      tags: ['Focus Boost', 'L-Theanine', 'Calm Energy', 'Matcha'],
      note: '📚 Pairs perfectly with a croissant and 3 hours of uninterrupted focus.',
    },
    also: [
      { emoji: '☕', name: 'Café Latte', price: 160 },
      { emoji: '🧋', name: 'Oat Milk Cappuccino', price: 180 },
      { emoji: '🌿', name: 'Green Tea Latte', price: 170 },
    ]
  },

  working: {
    label: '💻 Working',
    chipBg: '#4a2e00', chipColor: '#f5c880',
    leftBg: 'linear-gradient(160deg, #2a1800, #5a3c00)',
    glowColor: 'rgba(200, 130, 20, 0.5)',
    drink: {
      emoji: '☕',
      name: 'Caramel Power Latte',
      desc: 'Your productive day\'s best companion. A double espresso base with silky whole milk and golden caramel syrup — balanced, energizing, and indulgent enough to make that deadline feel worth it.',
      price: 210,
      tags: ['Double Shot', 'Caramel', 'Sustained Energy', 'Latte'],
      note: '💻 Deadline fuel — ready in under 3 minutes, lasts you 4 hours.',
    },
    also: [
      { emoji: '🍫', name: 'Mocha Cloud', price: 220 },
      { emoji: '🌙', name: 'Cold Brew + Oat', price: 190 },
      { emoji: '☕', name: 'Flat White', price: 170 },
    ]
  },

  relaxed: {
    label: '🧘 Relaxed',
    chipBg: '#1a4a2e', chipColor: '#90f0b0',
    leftBg: 'linear-gradient(160deg, #0a2818, #1a4a2e)',
    glowColor: 'rgba(40, 180, 80, 0.4)',
    drink: {
      emoji: '🍃',
      name: 'Honey Oat Lavender Latte',
      desc: 'Purely tranquil. Silky oat milk with a lavender syrup swirl and a drizzle of natural honey — warm, floral, and profoundly calming. Like a gentle exhale in a cup.',
      price: 230,
      tags: ['Lavender', 'Honey', 'Caffeine-Free Option', 'Floral'],
      note: '🧘 Best enjoyed slowly, in a quiet corner, with no notifications.',
    },
    also: [
      { emoji: '🍵', name: 'Chamomile Tea Latte', price: 160 },
      { emoji: '🌿', name: 'Mint Green Cooler', price: 150 },
      { emoji: '🥥', name: 'Coconut Cold Brew', price: 190 },
    ]
  },

  chill: {
    label: '😎 Chill',
    chipBg: '#0a3040', chipColor: '#80d8f0',
    leftBg: 'linear-gradient(160deg, #081828, #1a4050)',
    glowColor: 'rgba(30, 150, 200, 0.4)',
    drink: {
      emoji: '🧋',
      name: 'Iced Cold Brew Float',
      desc: 'Super smooth 12-hour cold brewed coffee poured over hand-chipped ice, topped with a cloud of whipped cream. Effortlessly cool — just like you.',
      price: 220,
      tags: ['Cold Brew', 'Iced', 'Whipped Cream', 'Smooth'],
      note: '😎 No rush, no rules. Sip it slow, take your time.',
    },
    also: [
      { emoji: '🍹', name: 'Mango Refresher', price: 180 },
      { emoji: '🍋', name: 'Lemon Sparkling Cooler', price: 160 },
      { emoji: '🫐', name: 'Blueberry Lemonade', price: 190 },
    ]
  },

  romantic: {
    label: '❤️ Romantic',
    chipBg: '#5a1030', chipColor: '#ffb0c0',
    leftBg: 'linear-gradient(160deg, #2a0818, #5a1030)',
    glowColor: 'rgba(220, 50, 80, 0.4)',
    drink: {
      emoji: '🍫',
      name: 'Dark Chocolate Rose Latte',
      desc: 'Indulgent and intimate. Rich dark chocolate sauce swirled through velvety whole milk espresso, dusted with rose-scented cacao — a drink meant to be shared, or savoured alone while daydreaming.',
      price: 260,
      tags: ['Dark Chocolate', 'Rose Dust', 'Indulgent', 'Special'],
      note: '❤️ Perfect for two. Order a pair and surprise someone special.',
    },
    also: [
      { emoji: '🍓', name: 'Strawberry Velvet Latte', price: 240 },
      { emoji: '🌹', name: 'Rose Cardamom Chai', price: 220 },
      { emoji: '🍒', name: 'Cherry Mocha', price: 250 },
    ]
  },

  happy: {
    label: '😊 Happy',
    chipBg: '#5a3c00', chipColor: '#ffe080',
    leftBg: 'linear-gradient(160deg, #3a2800, #5a3c00)',
    glowColor: 'rgba(220, 160, 20, 0.5)',
    drink: {
      emoji: '🌈',
      name: 'Tropical Mango Smoothie',
      desc: 'Sunshine in a glass. Ripe mango pulp blended with fresh pineapple, a squeeze of lime, and coconut water — vibrant, tropical, and impossible not to smile while drinking.',
      price: 240,
      tags: ['Mango', 'Tropical', 'Vitamin C', 'Fresh Blend'],
      note: '😊 Happiness is contagious — share this one with a friend!',
    },
    also: [
      { emoji: '🍓', name: 'Strawberry Refresher', price: 190 },
      { emoji: '🍊', name: 'Orange Sunrise Juice', price: 160 },
      { emoji: '🍍', name: 'Pineapple Cooler', price: 180 },
    ]
  },

  stressed: {
    label: '😵 Stressed',
    chipBg: '#3a2200', chipColor: '#f0c090',
    leftBg: 'linear-gradient(160deg, #201800, #3a2800)',
    glowColor: 'rgba(180, 120, 30, 0.4)',
    drink: {
      emoji: '🥛',
      name: 'Warm Vanilla Oat Hug',
      desc: 'When the world is too much, this is your reset. Steamed oat milk infused with vanilla, a touch of cinnamon, and honey — no caffeine, no drama, just warmth. Breathe.',
      price: 190,
      tags: ['No Caffeine', 'Vanilla', 'Comfort Drink', 'Warm'],
      note: '😵 It\'s going to be okay. One sip at a time.',
    },
    also: [
      { emoji: '🍵', name: 'Chamomile Honey Tea', price: 140 },
      { emoji: '🌿', name: 'Lavender Steamer', price: 170 },
      { emoji: '🍫', name: 'Hot Chocolate', price: 180 },
    ]
  },

  creative: {
    label: '🎨 Creative',
    chipBg: '#380a50', chipColor: '#e0a0ff',
    leftBg: 'linear-gradient(160deg, #1a0828, #380a50)',
    glowColor: 'rgba(160, 60, 220, 0.4)',
    drink: {
      emoji: '🐉',
      name: 'Dragon Fruit Bliss Bowl',
      desc: 'A canvas in a cup. Vivid dragon fruit blended with lychee, a hint of coconut, and topped with chia seeds and toasted coconut flakes. Exotic, unexpected, and wildly inspiring.',
      price: 280,
      tags: ['Dragon Fruit', 'Exotic', 'Antioxidant', 'Instagram-worthy'],
      note: '🎨 Because ordinary just isn\'t your style.',
    },
    also: [
      { emoji: '🫐', name: 'Blueberry Matcha Layer', price: 250 },
      { emoji: '💜', name: 'Lavender Lemonade', price: 200 },
      { emoji: '🌸', name: 'Butterfly Pea Cooler', price: 220 },
    ]
  },

  luxury: {
    label: '✨ Luxury Vibes',
    chipBg: '#3a2800', chipColor: '#f5d060',
    leftBg: 'linear-gradient(160deg, #1a1000, #4a3800)',
    glowColor: 'rgba(200, 160, 20, 0.6)',
    drink: {
      emoji: '👑',
      name: 'Gold Caramel Signature',
      desc: 'The crown jewel of our menu. A velvety double ristretto beneath layers of hand-steamed milk, crowned with whipped cream, edible gold caramel drizzle, and premium dark chocolate shavings. Pure indulgence.',
      price: 380,
      tags: ['Double Ristretto', 'Gold Drizzle', 'Signature', 'Premium'],
      note: '✨ You deserve nothing less than extraordinary today.',
    },
    also: [
      { emoji: '🍫', name: 'Belgian Truffle Mocha', price: 320 },
      { emoji: '🌹', name: 'Saffron Rose Cappuccino', price: 350 },
      { emoji: '🥇', name: 'Reserve Single Origin', price: 290 },
    ]
  },
};

// ════════════════════════════════
//   STATE
// ════════════════════════════════
let currentMood = null;
let isFaved = false;

// ════════════════════════════════
//   SELECT MOOD
// ════════════════════════════════
function selectMood(mood) {
  currentMood = mood;
  isFaved = checkIfFaved(mood);

  const data = MOODS[mood];

  // ── Background ──
  document.getElementById('moodBg').className = 'mood-bg ' + mood;
  document.body.classList.add('mood-active');

  // ── Active button ──
  document.querySelectorAll('.mood-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.mood === mood);
  });

  // ── Hero text ──
  document.querySelector('.mood-hero h1').innerHTML =
    `Feeling <em>${data.label.replace(/[^ ]+ /, '')}</em> today`;

  // ── Result card content ──
  const d = data.drink;

  // Chip
  const chip = document.getElementById('moodChip');
  chip.textContent = data.label;
  chip.style.background = data.chipBg;
  chip.style.color = data.chipColor;

  // Left bg
  document.querySelector('.result-left').style.background = data.leftBg;
  document.getElementById('drinkImgInner').textContent = d.emoji;
  document.getElementById('drinkGlow').style.background = data.glowColor;

  // Info
  document.getElementById('resultName').textContent = d.name;
  document.getElementById('resultDesc').textContent = d.desc;
  document.getElementById('resultPrice').textContent = '₹' + d.price;
  document.getElementById('resultNote').textContent = d.note;

  // Tags
  document.getElementById('resultTags').innerHTML = d.tags
    .map(t => `<span class="rtag">${t}</span>`).join('');

  // Fav button
  const fb = document.getElementById('favBtn');
  fb.className = 'fav-btn' + (isFaved ? ' faved' : '');
  fb.textContent = isFaved ? '♥' : '♡';

  // Cart button reset
  const cb = document.getElementById('cartAddBtn');
  cb.textContent = '🛒 Add to Cart';
  cb.style.background = '';

  // ── Also try ──
  const alsoGrid = document.getElementById('alsoGrid');
  alsoGrid.innerHTML = data.also.map(a => `
    <div class="also-card" onclick="addAlsoToCart('${a.name}', ${a.price}, '${a.emoji}')">
      <div class="also-emoji">${a.emoji}</div>
      <div class="also-info">
        <div class="also-name">${a.name}</div>
        <div class="also-price">₹${a.price}</div>
      </div>
    </div>
  `).join('');

  // ── Show sections ──
  document.getElementById('resultSection').classList.add('show');
  document.getElementById('alsoSection').classList.add('show');

  // Scroll to result
  setTimeout(() => {
    document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

// ════════════════════════════════
//   FAV TOGGLE
// ════════════════════════════════
function toggleFav() {
  if (!currentMood) return;
  isFaved = !isFaved;

  const fb = document.getElementById('favBtn');
  fb.className = 'fav-btn' + (isFaved ? ' faved' : '');
  fb.textContent = isFaved ? '♥' : '♡';

  const data = MOODS[currentMood];
  const d = data.drink;

  const favs = JSON.parse(localStorage.getItem('coh_favs') || '[]');
  const existing = favs.findIndex(f => f.id === 'mood-' + currentMood);

  if (isFaved) {
    if (existing === -1) {
      favs.push({
        id: 'mood-' + currentMood,
        name: d.name,
        emoji: d.emoji,
        price: d.price,
        mood: currentMood,
        tags: d.tags,
      });
    }
    showToast('❤️ ' + d.name + ' saved to Favourites!');
  } else {
    if (existing !== -1) favs.splice(existing, 1);
    showToast('🤍 Removed from Favourites');
  }

  localStorage.setItem('coh_favs', JSON.stringify(favs));
}

function checkIfFaved(mood) {
  const favs = JSON.parse(localStorage.getItem('coh_favs') || '[]');
  return favs.some(f => f.id === 'mood-' + mood);
}

// ════════════════════════════════
//   ADD TO CART
// ════════════════════════════════
function addToCartMood() {
  if (!currentMood) return;
  const data = MOODS[currentMood];
  const d = data.drink;

  const cart = JSON.parse(localStorage.getItem('coh_cart') || '{}');
  const key  = 'mood-' + currentMood + '-' + Date.now();
  cart[key]  = { name: d.emoji + ' ' + d.name, price: d.price, qty: 1, img: '' };
  localStorage.setItem('coh_cart', JSON.stringify(cart));

  updateCartCount();

  const btn = document.getElementById('cartAddBtn');
  btn.textContent = '✅ Added!';
  btn.style.background = '#4caf50';
  setTimeout(() => { btn.textContent = '🛒 Add to Cart'; btn.style.background = ''; }, 1800);

  showToast('🛒 ' + d.name + ' added to cart!');
}

function addAlsoToCart(name, price, emoji) {
  const cart = JSON.parse(localStorage.getItem('coh_cart') || '{}');
  const key  = 'also-' + Date.now();
  cart[key]  = { name: emoji + ' ' + name, price, qty: 1, img: '' };
  localStorage.setItem('coh_cart', JSON.stringify(cart));
  updateCartCount();
  showToast('🛒 ' + name + ' added to cart!');
}

// ════════════════════════════════
//   CART COUNT
// ════════════════════════════════
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('coh_cart') || '{}');
  const el = document.getElementById('cartCount');
  if (el) el.textContent = Object.values(cart).reduce((s, i) => s + i.qty, 0);
}

// ════════════════════════════════
//   TOAST
// ════════════════════════════════
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2400);
}

// ── Init ──
updateCartCount();
