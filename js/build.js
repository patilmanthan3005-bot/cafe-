// ════════════════════════════════
//   ALL DATA
// ════════════════════════════════

const COFFEE_ING = {
  base:{label:'☕ Coffee Base',items:[
    {id:'esp',     e:'☕', n:'Espresso Shot',    s:'Bold & intense',     p:40, c:'#3a1a05',layH:55,hot:true},
    {id:'d-esp',   e:'☕', n:'Double Espresso',  s:'Extra strong',       p:60, c:'#2a1005',layH:65,hot:true},
    {id:'cb',      e:'🌙', n:'Cold Brew',        s:'12hr steeped',       p:50, c:'#1a0802',layH:65},
    {id:'matcha',  e:'🍵', n:'Matcha Shot',      s:'Earthy & vibrant',   p:45, c:'#4a8a30',layH:55},
    {id:'decaf',   e:'🌿', n:'Decaf Espresso',   s:'All taste, no kick', p:40, c:'#5a3020',layH:55,hot:true},
  ]},
  milk:{label:'🥛 Milk',items:[
    {id:'wm',  e:'🥛', n:'Whole Milk',    s:'Creamy & classic',  p:0,  c:'#f5f0e8',layH:60},
    {id:'oat', e:'🌾', n:'Oat Milk',     s:'Velvety dairy-free', p:20, c:'#e8dcc8',layH:60},
    {id:'alm', e:'🌰', n:'Almond Milk',  s:'Light & nutty',      p:20, c:'#f0e8d8',layH:60},
    {id:'coc', e:'🥥', n:'Coconut Milk', s:'Tropical richness',  p:20, c:'#f5f5f0',layH:60},
    {id:'blk', e:'🖤', n:'No Milk',      s:'Pure black coffee',  p:0,  c:'#1a0a02',layH:0},
  ]},
  syrup:{label:'🍯 Syrups',items:[
    {id:'van', e:'🍦', n:'Vanilla Syrup',   s:'Classic sweet',     p:25, c:'#f5e8c8',layH:14},
    {id:'car', e:'🍮', n:'Caramel Syrup',   s:'Buttery golden',    p:25, c:'#c87820',layH:14},
    {id:'haz', e:'🌰', n:'Hazelnut Syrup',  s:'Nutty richness',    p:25, c:'#8a5020',layH:14},
    {id:'cho', e:'🍫', n:'Chocolate Sauce', s:'Dark indulgence',   p:25, c:'#2a1008',layH:14},
    {id:'lav', e:'💜', n:'Lavender Syrup',  s:'Floral & calming',  p:30, c:'#9070b0',layH:14},
    {id:'hon', e:'🍯', n:'Honey',           s:'Natural sweetener', p:20, c:'#f5c030',layH:10},
  ]},
  topping:{label:'✨ Toppings',items:[
    {id:'whip',  e:'🤍', n:'Whipped Cream',   s:'Fluffy cloud',      p:30, c:'#fff',   layH:0, isWhip:true},
    {id:'foam',  e:'☁️', n:'Milk Foam',       s:'Velvety top',       p:20, c:'#fffaf4',layH:0, isFoam:true},
    {id:'cdrz',  e:'🍫', n:'Choc Drizzle',    s:'Decorative swirl',  p:20, c:'#2a1008',layH:0, isTop:true},
    {id:'adrz',  e:'🍮', n:'Caramel Drizzle', s:'Golden swirl',      p:20, c:'#c87820',layH:0, isTop:true},
    {id:'cin',   e:'🟤', n:'Cinnamon Dust',   s:'Warm spice',        p:15, c:'#8a4010',layH:0, isTop:true},
    {id:'cshav', e:'🍫', n:'Choc Shavings',   s:'Dark chocolate',    p:20, c:'#3a1a05',layH:0, isTop:true},
    {id:'ice-c', e:'🧊', n:'Ice Cubes',       s:'Iced drink',        p:0,  c:'#ddf0ff',layH:22,isIce:true},
  ]},
};

const COFFEE_FOOD = [
  {id:'bcr', e:'🥐', n:'Butter Croissant',    d:'Flaky & golden baked',          p:80},
  {id:'ccr', e:'🍫', n:'Chocolate Croissant', d:'Dark chocolate filled pastry',   p:90},

  {id:'cki', e:'🍪', n:'Choco Chip Cookie',   d:'Soft centre, crispy edge',       p:70},
  {id:'cup', e:'🧁', n:'Vanilla Cupcake',     d:'Swirled cream frosting',         p:110},

  {id:'tbt', e:'🍞', n:'Butter Toast',        d:'Thick cut, golden toasted',      p:60},
  {id:'tnt', e:'🍫', n:'Nutella Toast',       d:'Hazelnut spread on toast',       p:80},
  {id:'ato', e:'🥑', n:'Avocado Toast',       d:'Smashed avo & chilli flakes',    p:120},
  {id:'cto', e:'🧀', n:'Cheese Toast',        d:'Melted cheddar on sourdough',    p:90},

];

const FRUIT_ING = {
  base:{label:'🥤 Juice / Liquid Base',items:[
    {id:'apj', e:'🍏', n:'Apple Juice',      s:'Fresh pressed',       p:30, c:'#c8e080',layH:65},
    {id:'orj', e:'🍊', n:'Orange Juice',     s:'Vitamin C burst',     p:30, c:'#f5a030',layH:65},
    {id:'wmj', e:'🍉', n:'Watermelon Juice', s:'Refreshing & sweet',  p:30, c:'#ff6080',layH:65},
    {id:'grj', e:'🍇', n:'Grape Juice',      s:'Dark & rich',         p:35, c:'#7050a8',layH:65},
    {id:'cow', e:'🥥', n:'Coconut Water',    s:'Natural hydration',   p:35, c:'#e8f0d0',layH:65},
    {id:'spk', e:'💧', n:'Sparkling Water',  s:'Fizzy base',          p:0,  c:'#c8e8f5',layH:55},
  ]},
  fruits:{label:'🍓 Fresh Fruits',items:[
    {id:'str', e:'🍓', n:'Strawberry',       s:'Sweet & tangy',       p:40, c:'#ff3a55',layH:48},
    {id:'mng', e:'🥭', n:'Mango Pulp',       s:'Tropical burst',      p:40, c:'#ffb020',layH:48},
    {id:'ban', e:'🍌', n:'Banana',           s:'Creamy thickness',    p:30, c:'#ffe040',layH:42},
    {id:'blu', e:'🫐', n:'Blueberry',        s:'Antioxidant rich',    p:50, c:'#3a48c0',layH:48},
    {id:'pin', e:'🍍', n:'Pineapple',        s:'Tropical & zesty',    p:35, c:'#ffd020',layH:48},
    {id:'kiw', e:'🥝', n:'Kiwi',            s:'Tart & vibrant',      p:45, c:'#40b030',layH:42},
    {id:'pch', e:'🍑', n:'Peach',           s:'Soft & summery',      p:40, c:'#f5a878',layH:42},
    {id:'ras', e:'🍒', n:'Raspberry',       s:'Bold berry tartness', p:50, c:'#d02848',layH:42},
    {id:'dgn', e:'🐉', n:'Dragon Fruit',    s:'Vibrant & exotic',    p:60, c:'#e050a0',layH:48},
    {id:'lyc', e:'🍈', n:'Lychee',         s:'Floral & sweet',      p:55, c:'#f8e0e0',layH:42},
  ]},
  boost:{label:'💚 Boosters',items:[
    {id:'chi', e:'🌱', n:'Chia Seeds',     s:'Omega-3 superfood',   p:30, c:'#888',   layH:0, isTop:true},
    {id:'hnf', e:'🍯', n:'Honey',          s:'Natural sweetener',   p:20, c:'#f5c030',layH:10},
    {id:'pro', e:'💪', n:'Protein Powder', s:'Vanilla flavour',     p:60, c:'#c0a878',layH:16},

  ]},
  topping:{label:'🎨 Toppings & Garnish',items:[
    {id:'icf', e:'🧊', n:'Ice Cubes',      s:'Extra cold',          p:0,  c:'#ddf0ff',layH:0, isIce:true},
    {id:'stf', e:'🎋', n:'Coloured Straw', s:'Bamboo eco straw',    p:0,  c:'',        layH:0, isStraw:true},
    {id:'ffm', e:'☁️', n:'Fruit Foam',     s:'Airy whipped top',    p:25, c:'#fff8f0', layH:0, isFoam:true},
    {id:'mnt', e:'🌿', n:'Fresh Mint',     s:'Cool & refreshing',   p:15, c:'#50c060', layH:0, isTop:true, isGarn:true},
    {id:'lim', e:'🍋', n:'Lime Slice',     s:'Citrus garnish',      p:10, c:'#c8d840', layH:0, isTop:true, isGarn:true},
    {id:'cfl', e:'🥥', n:'Coconut Flakes', s:'Toasted coconut',     p:20, c:'#f0e8d8', layH:0, isTop:true},
  ]},
};

const FRUIT_FOOD = [
  {id:'grb', e:'🌾', n:'Granola Bar',         d:'Oats, honey & nuts',          p:90},
  {id:'frb', e:'🍱', n:'Fresh Fruit Bowl',    d:'Seasonal mixed fruits',        p:120},

  {id:'vgw', e:'🌯', n:'Veggie Wrap',         d:'Fresh greens in whole wrap',   p:130},
];

// ════════════════════════════════
//   STATE
// ════════════════════════════════
let mode = null;
let layers = [];
let foods  = [];
let sizeName = 'M';
let sizeExtra = 0;
let faved = false;
const BASE = 80;

// ════════════════════════════════
//   MODE SELECT
// ════════════════════════════════
function selectMode(m) {
  mode = m;
  document.getElementById('modeScreen').style.display = 'none';
  const bs = document.getElementById('builderScreen');
  bs.style.display = 'flex';
  bs.style.flexDirection = 'column';

  const h = document.getElementById('bHeader');
  if (m === 'coffee') {
    h.className = 'builder-header coffee-mode';
    document.getElementById('bIcon').textContent  = '☕';
    document.getElementById('bTitle').textContent = 'Custom Coffee Builder';
    document.getElementById('bSub').textContent   = 'Craft your perfect brew, one layer at a time';
    document.getElementById('coffeeVessel').style.display = 'block';
    document.getElementById('fruitVessel').style.display  = 'none';
    buildLeftPanel(COFFEE_ING, COFFEE_FOOD, 'coffee-mode-panel');
  } else {
    h.className = 'builder-header fruit-mode';
    document.getElementById('bIcon').textContent  = '🍹';
    document.getElementById('bTitle').textContent = 'Fruit Beverage Builder';
    document.getElementById('bSub').textContent   = 'Blend your perfect refresher from fresh fruits';
    document.getElementById('coffeeVessel').style.display = 'none';
    document.getElementById('fruitVessel').style.display  = 'block';
    buildLeftPanel(FRUIT_ING, FRUIT_FOOD, 'fruit-mode-panel');
  }
  resetAll(true);
}

function goBack() {
  mode = null; layers = []; foods = [];
  document.getElementById('modeScreen').style.display = 'flex';
  document.getElementById('builderScreen').style.display = 'none';
}

// ════════════════════════════════
//   BUILD LEFT PANEL
// ════════════════════════════════
function buildLeftPanel(ings, foodList, cls) {
  const el = document.getElementById('leftPanel');
  let html = `<div class="${cls}">`;
  Object.values(ings).forEach(sec => {
    html += `<div class="lp-section"><div class="lp-sec-head">${sec.label}</div>`;
    sec.items.forEach(it => {
      html += `<div class="ing-item" onclick="addLayer('${it.id}')">
        <div class="ing-emoji">${it.e}</div>
        <div class="ing-info"><div class="ing-name">${it.n}</div><div class="ing-sub">${it.s}</div></div>
        <div class="ing-price">${it.p>0?'+₹'+it.p:'Free'}</div>
        <button class="ing-add">+</button>
      </div>`;
    });
    html += `</div>`;
  });
  const foodLabel = mode==='coffee' ? '🍞 Pair With Food' : '🥗 Healthy Snacks & Sides';
  html += `<div class="lp-section"><div class="lp-sec-head">${foodLabel}</div>`;
  foodList.forEach(f => {
    html += `<div class="food-item" id="food-${f.id}" onclick="toggleFood('${f.id}')">
      <div class="food-emoji">${f.e}</div>
      <div class="food-info"><div class="food-name">${f.n}</div><div class="food-desc">${f.d}</div></div>
      <div class="food-price">₹${f.p}</div>
    </div>`;
  });
  html += `</div></div>`;
  el.innerHTML = html;
}

// ════════════════════════════════
//   INGREDIENT LOOKUP
// ════════════════════════════════
function getIng(id) {
  const src = mode==='coffee' ? COFFEE_ING : FRUIT_ING;
  for (const sec of Object.values(src)) {
    const f = sec.items.find(i => i.id === id);
    if (f) return f;
  }
  return null;
}

// ════════════════════════════════
//   ADD LAYER
// ════════════════════════════════
function addLayer(id) {
  if (layers.length >= 14) { showToast('Maximum 14 ingredients!'); return; }
  const ing = getIng(id);
  if (!ing) return;
  layers.push({id, ing});
  renderCup(); renderBadges(); renderRight();
  showToast(ing.e + ' ' + ing.n + ' added!');
}

function removeLayer(i) {
  layers.splice(i, 1);
  renderCup(); renderBadges(); renderRight();
}

// ════════════════════════════════
//   FOOD TOGGLE
// ════════════════════════════════
function getFood(id) {
  return (mode==='coffee' ? COFFEE_FOOD : FRUIT_FOOD).find(f => f.id === id);
}

function toggleFood(id) {
  const el  = document.getElementById('food-' + id);
  const idx = foods.indexOf(id);
  if (idx > -1) { foods.splice(idx,1); el.classList.remove('picked'); showToast('❌ ' + getFood(id)?.n + ' removed'); }
  else          { foods.push(id);      el.classList.add('picked');    showToast('✅ ' + getFood(id)?.n + ' added!'); }
  renderRight();
}

// ════════════════════════════════
//   RENDER CUP
// ════════════════════════════════
function renderCup() {
  if (mode === 'coffee') renderCoffeeCup();
  else renderFruitGlass();
  updateLabel();
}

function renderCoffeeCup() {
  const layEl   = document.getElementById('coffeeLayers');
  const crema   = document.getElementById('cCrema');
  const foam    = document.getElementById('cFoam');
  const whip    = document.getElementById('cWhip');
  const garnish = document.getElementById('cGarnish');
  const steams  = document.querySelectorAll('.steam-p');

  const drinkL  = layers.filter(l => l.ing.layH > 0 && !l.ing.isWhip && !l.ing.isFoam && !l.ing.isTop && !l.ing.isIce);
  const hasWhip = layers.some(l => l.ing.isWhip);
  const hasFoam = layers.some(l => l.ing.isFoam);
  const hasIce  = layers.some(l => l.ing.isIce);
  const hotBase = layers.some(l => ['esp','d-esp','decaf'].includes(l.id));
  const tops    = layers.filter(l => l.ing.isTop);

  const tot = drinkL.reduce((s,l) => s + l.ing.layH, 0);
  const maxH = 200; const sc = tot > maxH ? maxH/tot : 1;
  layEl.innerHTML = drinkL.map(l => `<div class="d-layer" style="height:${Math.round(l.ing.layH*sc)}px;background:${l.ing.c};"></div>`).join('');

  crema.style.display = (hotBase && !hasWhip && !hasFoam) ? 'block' : 'none';
  foam.style.display  = (hasFoam && !hasWhip) ? 'block' : 'none';
  whip.style.display  = hasWhip ? 'block' : 'none';
  steams.forEach(s => s.style.display = (hotBase && !hasIce) ? 'block' : 'none');
  garnish.innerHTML = tops.map(l => `<span style="font-size:1.1rem;animation:bPop .3s ease">${l.ing.e}</span>`).join('');
}

function renderFruitGlass() {
  const layEl  = document.getElementById('fruitLayers');
  const iceBox = document.getElementById('iceBox');
  const straw  = document.getElementById('fStraw');
  const foam   = document.getElementById('fFoam');
  const garn   = document.getElementById('fGarnish');

  const drinkL  = layers.filter(l => l.ing.layH > 0 && !l.ing.isIce && !l.ing.isStraw && !l.ing.isFoam && !l.ing.isTop);
  const hasIce  = layers.some(l => l.ing.isIce);
  const hasSt   = layers.some(l => l.ing.isStraw);
  const hasFoam = layers.some(l => l.ing.isFoam);
  const garns   = layers.filter(l => l.ing.isTop);

  const tot = drinkL.reduce((s,l) => s + l.ing.layH, 0);
  const maxH = 250; const sc = tot > maxH ? maxH/tot : 1;
  layEl.innerHTML = drinkL.map(l => `<div class="d-layer" style="height:${Math.round(l.ing.layH*sc)}px;background:${l.ing.c};"></div>`).join('');

  iceBox.innerHTML = hasIce ? `
    <div class="ice-c" style="width:26px;height:18px;bottom:18%;left:12%;transform:rotate(-10deg)"></div>
    <div class="ice-c" style="width:20px;height:15px;bottom:32%;right:14%;transform:rotate(15deg)"></div>
    <div class="ice-c" style="width:22px;height:16px;bottom:50%;left:28%;transform:rotate(-4deg)"></div>` : '';

  straw.style.display = hasSt   ? 'block' : 'none';
  foam.style.display  = hasFoam ? 'block' : 'none';
  garn.innerHTML = garns.map(l => `<span style="font-size:1.1rem;animation:bPop .3s ease">${l.ing.e}</span>`).join('');
}

// ════════════════════════════════
//   BADGES
// ════════════════════════════════
function renderBadges() {
  const el = document.getElementById('badgeRow');
  el.innerHTML = layers.map((l,i) => `<div class="lbadge">
    <div class="lbdot" style="background:${l.ing.c||'#C8962E'}"></div>
    <span class="lbname">${l.ing.e} ${l.ing.n}</span>
    <button class="lbrm" onclick="removeLayer(${i})">✕</button>
  </div>`).join('');
}

// ════════════════════════════════
//   AUTO NAME
// ════════════════════════════════
function autoName() {
  if (!layers.length) return 'Your Custom Drink';
  if (mode === 'coffee') {
    const h  = id => layers.some(l => l.id === id);
    const hh = ids => ids.some(id => layers.some(l => l.id === id));
    const hasIce   = layers.some(l => l.ing.isIce);
    const hasMilk  = hh(['wm','oat','alm','coc']);
    const hasWhip  = layers.some(l => l.ing.isWhip);
    if (h('matcha') && hasMilk) return 'Matcha Latte 🍵';
    if (h('cb') && hasIce)      return 'Iced Cold Brew 🌙';
    if (h('cb'))                return 'Cold Brew Noir 🌙';
    if (h('esp') && hasMilk && hasWhip && h('cho')) return 'Mocha Cloud 🍫';
    if (h('esp') && hasMilk && h('car'))  return 'Caramel Latte 🍮';
    if (h('esp') && hasMilk && hasWhip)   return 'Cloud Latte ☕';
    if (h('esp') && hasMilk)              return 'Café Latte ☕';
    if (h('d-esp') && hasMilk)            return 'Double Latte ☕';
    if (hh(['esp','d-esp']) && hasIce)    return 'Iced Espresso ☕';
    if (hh(['esp','d-esp']))              return 'Custom Espresso ☕';
    return 'Custom Brew ☕';
  } else {
    const fruitIds = ['str','mng','ban','blu','pin','kiw','pch','ras','dgn','lyc'];
    const fruits = layers.filter(l => fruitIds.includes(l.id));
    const hasPro = layers.some(l => l.id === 'pro');
    if (fruits.length >= 4) return 'Rainbow Smoothie 🌈';
    if (fruits.length === 3) return 'Tropical Fusion 🍹';
    if (fruits.length === 2) return fruits.map(l=>l.ing.n).join(' & ') + ' Blend 🍹';
    if (fruits.length === 1 && hasPro) return fruits[0].ing.n + ' Protein Shake 💪';
    if (fruits.length === 1) return 'Fresh ' + fruits[0].ing.n + ' Juice 🥤';
    return 'Custom Beverage 🍹';
  }
}

// ════════════════════════════════
//   LABEL
// ════════════════════════════════
function updateLabel() {
  const t = getTotalPrice();
  document.getElementById('drinkName').textContent  = autoName();
  document.getElementById('drinkPrice').textContent = (layers.length || foods.length)
    ? `₹${t} · ${sizeName} · ${layers.length} ingredient${layers.length!==1?'s':''}`
    : `₹${BASE} base · Add ingredients above`;
}

// ════════════════════════════════
//   PRICE
// ════════════════════════════════
function getTotalPrice() {
  const ing  = layers.reduce((s,l) => s + l.ing.p, 0);
  const food = foods.reduce((s,id) => { const f=getFood(id); return s+(f?f.p:0); }, 0);
  return BASE + ing + food + sizeExtra;
}

// ════════════════════════════════
//   RIGHT SUMMARY
// ════════════════════════════════
function renderRight() {
  updateLabel();
  const el = document.getElementById('rightPanel');
  if (!layers.length && !foods.length) {
    el.innerHTML = `<div class="empty-msg"><div class="ei">${mode==='coffee'?'☕':'🍹'}</div><p>Start adding ingredients<br>to see your recipe here!</p></div>`;
    return;
  }
  let html = '';
  if (layers.length) {
    html += `<div class="rp-sec"><div class="rp-sec-lbl">Drink Ingredients</div>`;
    layers.forEach(l => html += `<div class="rp-row"><span class="rn">${l.ing.e} ${l.ing.n}</span><span class="rp">${l.ing.p>0?'+₹'+l.ing.p:'Free'}</span></div>`);
    html += `</div>`;
  }
  if (foods.length) {
    html += `<div class="rp-sec"><div class="rp-sec-lbl">Food Add-ons</div>`;
    foods.forEach(id => { const f=getFood(id); if(f) html+=`<div class="rp-row"><span class="rn">${f.e} ${f.n}</span><span class="rp">+₹${f.p}</span></div>`; });
    html += `</div>`;
  }
  const t = getTotalPrice();
  html += `<div class="rp-total"><span>Total</span><span>₹${t}</span></div>`;
  const cals = Math.round(layers.reduce((s,l)=>s+l.ing.p*0.9,BASE*0.4) + foods.reduce((s,id)=>{const f=getFood(id);return s+(f?f.p*0.65:0);},0));
  html += `<div class="nutrition"><h4>Estimated Nutrition</h4>
    <div class="nut-row"><span>Calories</span><span>~${cals} kcal</span></div>
    <div class="nut-bar"><div class="nut-fill" style="width:${Math.min(cals/8,100)}%;background:var(--gold);"></div></div>
    <div class="nut-row"><span>Sugar</span><span>~${Math.round(cals*0.11)}g</span></div>
    <div class="nut-bar"><div class="nut-fill" style="width:${Math.min(cals*0.11*2,100)}%;background:#f5a030;"></div></div>
  </div>`;
  el.innerHTML = html;
}

// ════════════════════════════════
//   SIZE
// ════════════════════════════════
function setSize(s, btn) {
  sizeName = s; sizeExtra = s==='S'?-20:s==='L'?30:0;
  document.querySelectorAll('.sz-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderRight();
}

// ════════════════════════════════
//   ADD TO CART
// ════════════════════════════════
function addToCart() {
  if (!layers.length) { showToast('Add at least one ingredient!'); return; }
  const cart = JSON.parse(localStorage.getItem('coh_cart')||'{}');
  const key  = 'custom-' + Date.now();
  cart[key]  = { name:autoName(), price:getTotalPrice(), qty:1, img:'', custom:true };
  foods.forEach(id => {
    const f = getFood(id);
    if (f) cart['food-'+id+'-'+Date.now()] = { name:f.e+' '+f.n, price:f.p, qty:1, img:'', custom:true };
  });
  localStorage.setItem('coh_cart', JSON.stringify(cart));
  updateCartCount();
  const btn = document.querySelector('.btn-cart');
  btn.textContent='✅ Added!'; btn.style.background='#4caf50';
  setTimeout(()=>{ btn.textContent='🛒 Add to Cart'; btn.style.background=''; }, 1600);
  showToast('🛒 ' + autoName() + ' added to cart!');
}

// ════════════════════════════════
//   SAVE TO FAVS
// ════════════════════════════════
function saveToFavs() {
  if (!layers.length) { showToast('Add some ingredients first!'); return; }
  const fb = document.getElementById('favBtn');
  faved = !faved;
  if (faved) {
    const favs = JSON.parse(localStorage.getItem('coh_custom_favs')||'[]');
    favs.push({ name:autoName(), mode, layers:layers.map(l=>l.id), foods:[...foods], price:getTotalPrice(), size:sizeName });
    localStorage.setItem('coh_custom_favs', JSON.stringify(favs));
    fb.classList.add('faved'); fb.textContent='❤️ Saved!';
    showToast('❤️ ' + autoName() + ' saved to Favourites!');
  } else {
    fb.classList.remove('faved'); fb.textContent='❤️ Save to Favs';
    showToast('🤍 Removed from Favourites');
  }
}

// ════════════════════════════════
//   RESET
// ════════════════════════════════
function resetAll(silent) {
  layers=[]; foods=[]; faved=false;
  document.querySelectorAll('.food-item').forEach(el=>el.classList.remove('picked'));
  const fb = document.getElementById('favBtn');
  if (fb) { fb.classList.remove('faved'); fb.textContent='❤️ Save to Favs'; }
  renderCup(); renderBadges(); renderRight();
  if (!silent) showToast('🔄 Drink reset!');
}

// ════════════════════════════════
//   CART COUNT
// ════════════════════════════════
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('coh_cart')||'{}');
  document.getElementById('cartCount').textContent = Object.values(cart).reduce((s,i)=>s+i.qty,0);
}

// ════════════════════════════════
//   TOAST
// ════════════════════════════════
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 2400);
}

updateCartCount();
