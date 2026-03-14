// ════════════════════════════════════════
//   MENU DATA
// ════════════════════════════════════════
const menuData = [

  // ☕ COFFEE
  { id:1,  cat:'coffee',  img:'images/espresso.jpg',         name:'Espresso',              price:120, desc:'Bold & pure — a classic single shot of rich espresso.',             veg:true },
  { id:2,  cat:'coffee',  img:'images/cappuccino.jpg',       name:'Cappuccino',             price:150, desc:'Espresso topped with thick, creamy steamed milk foam.',              veg:true },
  { id:3,  cat:'coffee',  img:'images/latte.jpg',            name:'Latte',                  price:170, desc:'Smooth espresso with velvety steamed milk — mild & comforting.',    veg:true },
  { id:4,  cat:'coffee',  img:'images/mocha.jpg',            name:'Mocha',                  price:180, desc:'Espresso blended with rich chocolate & topped with cream.',          veg:true },
  { id:5,  cat:'coffee',  img:'images/cold-coffee.jpg',      name:'Cold Coffee',            price:160, desc:'Chilled, creamy blended coffee — perfect on a warm day.',            veg:true, hot:true },
  { id:6,  cat:'coffee',  img:'images/americano.jpg',        name:'Americano',              price:200, desc:'Double espresso with hot water for a smooth bold taste.',            veg:true },

  // 🥐 BAKED DELIGHTS
  { id:7,  cat:'baked',   img:'images/croissant.jpg',        name:'Chocolate Croissant',    price:90,  desc:'Flaky golden croissant filled with smooth dark chocolate.',          veg:true, hot:true },
  { id:8,  cat:'baked',   img:'images/butter-pastry.jpg',    name:'Butter Pastry',          price:80,  desc:'Soft, melt-in-your-mouth butter pastry baked fresh daily.',          veg:true },
  { id:9,  cat:'baked',   img:'images/cheese-puff.jpg',      name:'Cheese Puff',            price:100, desc:'Light airy puff pastry loaded with gooey melted cheese.',            veg:true },
  { id:10, cat:'baked',   img:'images/strawberry-danish.jpg',name:'Strawberry Danish',      price:110, desc:'Buttery Danish pastry topped with fresh strawberry glaze.',          veg:true, isNew:true },
  { id:11, cat:'baked',   img:'images/blueberry-muffin.jpg', name:'Blueberry Muffin',       price:95,  desc:'Moist fluffy muffin bursting with fresh blueberries.',              veg:true },
  { id:12, cat:'baked',   img:'images/apple-puff.jpg',       name:'Apple Puff',             price:105, desc:'Warm spiced apple filling in a crispy puff pastry shell.',           veg:true },

  // 🎂 CAKES
  { id:13, cat:'cakes',   img:'images/chocolate-cake.jpg',   name:'Chocolate Truffle Cake', price:220, desc:'Decadent dark chocolate layers with silky truffle ganache.',         veg:true, hot:true },
  { id:14, cat:'cakes',   img:'images/red-velvet.jpg',       name:'Red Velvet Cake',        price:250, desc:'Classic red velvet with luscious cream cheese frosting.',            veg:true },
  { id:15, cat:'cakes',   img:'images/cheesecake.jpg',       name:'Blueberry Cheesecake',   price:270, desc:'Creamy NY-style cheesecake with fresh blueberry coulis.',            veg:true },
  { id:16, cat:'cakes',   img:'images/pineapple-cake.jpg',   name:'Pineapple Cake',         price:210, desc:'Light sponge layered with sweet pineapple cream.',                  veg:true },
  { id:17, cat:'cakes',   img:'images/butterscotch-cake.jpg',name:'Butterscotch Cake',      price:230, desc:'Fluffy cake drenched in butterscotch sauce & caramel crunch.',      veg:true, isNew:true },

  // 🍕 PIZZA
  { id:18, cat:'pizza',   img:'images/corn.jpg',             name:'Cheese Corn Pizza',      price:380, desc:'Sweet corn & melted mozzarella on a golden crispy base.',           veg:true, hot:true },
  { id:19, cat:'pizza',   img:'images/margherita-pizza.jpg', name:'Margherita Pizza',       price:280, desc:'Classic tomato sauce, fresh mozzarella & fragrant basil.',          veg:true },
  { id:20, cat:'pizza',   img:'images/veg-pizza.jpg',        name:'Veg Supreme Pizza',      price:320, desc:'Loaded with capsicum, mushrooms, olives & sweet onions.',           veg:true },
  { id:21, cat:'pizza',   img:'images/cheese.jpg',           name:'Seven Cheese Pizza',     price:350, desc:'An indulgent blend of seven premium melted cheeses.',               veg:true, isNew:true },
  { id:22, cat:'pizza',   img:'images/paneer-pizza.jpg',     name:'Paneer Tikka Pizza',     price:360, desc:'Spiced paneer tikka on tandoori sauce base — desi twist!',          veg:true, hot:true },
  { id:23, cat:'pizza',   img:'images/farmhouse.jpg',        name:'Farmhouse Pizza',        price:340, desc:'Fresh veggies, herbs & creamy white sauce on thin crust.',          veg:true },

  // 🍔 BURGERS
  { id:24, cat:'burger',  img:'images/veg-burger.jpg',       name:'Classic Veg Burger',     price:180, desc:'Crispy veggie patty, lettuce, tomato & our secret sauce.',          veg:true },
  { id:25, cat:'burger',  img:'images/cheese-burger.jpg',    name:'Cheese Burger',          price:220, desc:'Double cheddar melt on a juicy patty with pickles & mustard.',      veg:true },
  { id:26, cat:'burger',  img:'images/paneer-burger.jpg',    name:'Paneer Burger',          price:250, desc:'Grilled tandoori paneer with mint chutney & onion rings.',           veg:true, hot:true },
  { id:27, cat:'burger',  img:'images/double-cheese.jpg',    name:'Double Cheese Burger',   price:280, desc:'Two patties, double cheese — double the satisfaction!',             veg:true, isNew:true },
  { id:28, cat:'burger',  img:'images/peri-peri.jpg',        name:'Peri Peri Burger',       price:270, desc:'Fiery peri peri sauce with crispy patty & fresh coleslaw.',         veg:true, hot:true },
  { id:29, cat:'burger',  img:'images/maharaja.jpg',         name:'Sp. COFH Burger',        price:300, desc:"Our signature burger — secret spice blend, chef's special!",       veg:true, isSpecial:true },

  // 🍝 PASTA
  { id:30, cat:'pasta',   img:'images/penne-arrabbiata.jpg', name:'Penne Arrabbiata',       price:220, desc:'Penne in a fiery tomato & garlic sauce with fresh basil.',          veg:true, hot:true },
  { id:31, cat:'pasta',   img:'images/pasta-alfredo.jpg',    name:'Pasta Alfredo',          price:250, desc:'Creamy white Alfredo sauce with garlic & parmesan cheese.',         veg:true },
  { id:32, cat:'pasta',   img:'images/mac-cheese.jpg',       name:'Mac & Cheese',           price:230, desc:'Classic comfort mac loaded with rich three-cheese sauce.',          veg:true, isNew:true },
  { id:33, cat:'pasta',   img:'images/pesto-pasta.jpg',      name:'Pesto Pasta',            price:240, desc:'Al dente pasta tossed in homemade basil pesto & pine nuts.',        veg:true },
  { id:34, cat:'pasta',   img:'images/paneer-pasta.jpg',     name:'Paneer Pasta',           price:260, desc:'Grilled paneer in a spiced Indian-Italian fusion sauce.',            veg:true, hot:true },
  { id:35, cat:'pasta',   img:'images/pink-sauce-pasta.jpg', name:'Pink Sauce Pasta',       price:270, desc:"A heavenly blend of tomato & cream sauce — everyone's fave!",      veg:true, isSpecial:true },

  // 🎁 SOUVENIRS
  { id:36, cat:'souvenir',img:'images/cafe-mug.png',         name:'Cafe of Heaven Mug',     price:299, desc:'Our signature ceramic mug — take the heaven home with you.',       veg:null },
  { id:37, cat:'souvenir',img:'images/coffee-tumbler.jpg',   name:'Reusable Coffee Tumbler',price:399, desc:'Eco-friendly stainless steel tumbler — stays hot or cold.',         veg:null },
  { id:38, cat:'souvenir',img:'images/keychain.png',         name:'Café Logo Keychain',     price:149, desc:'Cute enamel keychain — a little piece of heaven on your keys.',    veg:null },
];

const catMeta = {
  coffee:   '☕ Coffee',
  baked:    '🥐 Baked Delights',
  cakes:    '🎂 Cakes',
  pizza:    '🍕 Pizza',
  burger:   '🍔 Burgers',
  pasta:    '🍝 Pasta',
  souvenir: '🎁 Souvenirs',
};

const catOrder = ['coffee', 'baked', 'cakes', 'pizza', 'burger', 'pasta', 'souvenir'];

// ════════════════════════════════════════
//   STATE
// ════════════════════════════════════════
let cart = JSON.parse(localStorage.getItem('coh_cart') || '{}');
let favs = JSON.parse(localStorage.getItem('coh_menu_favs') || '[]'); // full objects for fav page
let currentCat = 'all';
let searchQ    = '';

const saveCart  = () => localStorage.setItem('coh_cart', JSON.stringify(cart));
const saveFavs  = () => localStorage.setItem('coh_menu_favs', JSON.stringify(favs));
const cartCount = () => Object.values(cart).reduce((s, i) => s + i.qty, 0);
const cartTotal = () => Object.values(cart).reduce((s, i) => s + i.qty * i.price, 0);

// ════════════════════════════════════════
//   CART UI
// ════════════════════════════════════════
function updateCartUI() {
  const c = cartCount(), t = cartTotal();
  document.getElementById('cartCount').textContent = c;
  const fc = document.getElementById('floatCart');
  if (c > 0) {
    fc.classList.remove('hidden');
    document.getElementById('floatTotal').textContent = '₹' + t;
    document.getElementById('floatCount').textContent = c;
  } else {
    fc.classList.add('hidden');
  }
}

// ════════════════════════════════════════
//   ADD / QTY CONTROLS
// ════════════════════════════════════════
function renderCardAction(id) {
  const wrap = document.getElementById('ca-' + id);
  if (!wrap) return;
  const qty = cart[id]?.qty || 0;
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

function addItem(id) {
  const item = menuData.find(i => i.id === id);
  if (!item) return;
  if (!cart[id]) cart[id] = { name: item.name, price: item.price, img: item.img, qty: 0 };
  cart[id].qty++;
  saveCart(); updateCartUI(); renderCardAction(id);
  showToast('🛒 ' + item.name + ' added to cart!');
}

function changeQty(id, delta) {
  if (!cart[id]) return;
  cart[id].qty += delta;
  if (cart[id].qty <= 0) delete cart[id];
  saveCart(); updateCartUI(); renderCardAction(id);
}

// ════════════════════════════════════════
//   HEART / FAVOURITES
// ════════════════════════════════════════
function toggleFav(id) {
  const alreadySaved = favs.some(f => f.id === id);
  if (alreadySaved) {
    favs = favs.filter(f => f.id !== id);
  } else {
    const item = menuData.find(i => i.id === id);
    if (item) favs.push({ id: item.id, name: item.name, price: item.price, img: item.img, desc: item.desc, cat: item.cat, tags: [item.cat] });
  }
  saveFavs();
  const btn = document.getElementById('fav-' + id);
  if (btn) {
    btn.classList.toggle('faved', favs.some(f => f.id === id));
    btn.style.animation = 'none';
    btn.offsetHeight; // reflow
    btn.style.animation = '';
  }
  showToast(favs.some(f => f.id === id) ? '❤️ Saved to Favourites!' : '🤍 Removed from Favourites');
}

// ════════════════════════════════════════
//   BUILD CARD HTML
// ════════════════════════════════════════
function buildCard(item) {
  const isFaved = favs.some(f => f.id === item.id);
  let badges = '';
  if (item.veg === true)   badges += `<span class="badge badge-veg">🟢 Veg</span>`;
  if (item.veg === false)  badges += `<span class="badge badge-nonveg">🔴 Non-Veg</span>`;
  if (item.isSpecial)      badges += `<span class="badge badge-special">⭐ Special</span>`;
  if (item.isNew)          badges += `<span class="badge badge-new">✨ New</span>`;
  if (item.hot)            badges += `<span class="badge badge-hot">🔥 Popular</span>`;

  const heartBtn = item.veg !== null
    ? `<button class="fav-btn ${isFaved ? 'faved' : ''}" id="fav-${item.id}" onclick="toggleFav(${item.id})" title="Save to Favourites">❤️</button>`
    : '';

  return `
    <div class="menu-card">
      <div class="card-img-wrap">
        <img src="${item.img}" alt="${item.name}" loading="lazy"
             onerror="this.parentElement.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;font-size:3rem;\\'>🍽️</div>'">
      </div>
      <div class="card-body">
        <div class="card-badges">${badges}</div>
        <div class="card-name">${item.name}</div>
        <div class="card-desc">${item.desc}</div>
        <div class="card-footer">
          <div class="card-price">₹${item.price}</div>
          <div class="card-actions">
            ${heartBtn}
            <div id="ca-${item.id}"></div>
          </div>
        </div>
      </div>
    </div>`;
}

// ════════════════════════════════════════
//   RENDER MENU
// ════════════════════════════════════════
function renderMenu() {
  const body = document.getElementById('menuBody');
  const cats = currentCat === 'all' ? catOrder : [currentCat];
  let html = '';
  let anyVisible = false;

  cats.forEach(cat => {
    let items = menuData.filter(i => i.cat === cat);
    if (searchQ) {
      items = items.filter(i =>
        i.name.toLowerCase().includes(searchQ) ||
        i.desc.toLowerCase().includes(searchQ)
      );
    }
    if (!items.length) return;
    anyVisible = true;
    html += `
      <div class="section-wrap" id="sec-${cat}">
        <div class="section-title">${catMeta[cat]}</div>
        <div class="menu-grid">${items.map(buildCard).join('')}</div>
      </div>`;
  });

  if (!anyVisible) {
    html = `<div class="no-results">
      <div class="nr-icon">😔</div>
      <p>No items found for "<b>${searchQ}</b>"<br><small>Try searching: coffee, pizza, burger, cake...</small></p>
    </div>`;
  }

  body.innerHTML = html;
  menuData.forEach(item => renderCardAction(item.id));
}

// ════════════════════════════════════════
//   FILTER & SEARCH
// ════════════════════════════════════════
function filterCat(cat, btn) {
  currentCat = cat;
  searchQ = '';
  document.getElementById('searchInput').value = '';
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderMenu();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function doSearch() {
  searchQ = document.getElementById('searchInput').value.toLowerCase().trim();
  if (searchQ) {
    currentCat = 'all';
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.cat-btn')[0].classList.add('active');
  }
  renderMenu();
}

// ════════════════════════════════════════
//   TOAST
// ════════════════════════════════════════
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2400);
}

// ════════════════════════════════════════
//   INIT
// ════════════════════════════════════════
renderMenu();
updateCartUI();