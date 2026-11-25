// Metro Telecom - Professional POS & Inventory Management System

// Sample SVG Icons for crisp offline thumbnails
function createProductSvg(color, text) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'><rect width='200' height='200' fill='${color}' rx='16'/><text x='50%' y='54%' font-family='sans-serif' font-weight='900' font-size='32' fill='%23ffffff' dominant-baseline='middle' text-anchor='middle'>${encodeURIComponent(text)}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// User-specified default categories (Mobile, Headphones, Toys, Light, Stationery subcategories, Electronics subcategories)
const DEFAULT_CATEGORIES = [
  { id: 'cat-mobile', name: 'Mobile', label: '📱 Mobile' },
  { id: 'cat-headphones', name: 'Headphones', label: '🎧 Headphones' },
  { id: 'cat-toys', name: 'Toys', label: '🧸 Toys (খেলনা)' },
  { id: 'cat-light', name: 'Light', label: '💡 Light (লাইট ও টর্চ)' },
  { id: 'cat-stat-khata', name: 'স্টেশনারি (খাতা ও ডায়েরি)', label: '📚 খাতা ও ডায়েরি' },
  { id: 'cat-stat-pen', name: 'স্টেশনারি (কলম ও জ্যামিতি)', label: '✏️ কলম ও পেন্সিল' },
  { id: 'cat-stat-paper', name: 'স্টেশনারি (কাগজ ও রিম)', label: '📄 পেপার ও রিম' },
  { id: 'cat-stat-file', name: 'স্টেশনারি (ফাইল ও অফিস)', label: '📁 ফাইল ও অফিস' },
  { id: 'cat-elec-charger', name: 'Electronic (চার্জার ও পাওয়ার ব্যাংক)', label: '🔋 চার্জার ও পাওয়ার ব্যাংক' },
  { id: 'cat-elec-cable', name: 'Electronic (ক্যাবল ও কনভার্টার)', label: '🔌 ক্যাবল ও কনভার্টার' },
  { id: 'cat-elec-multiplug', name: 'Electronic (মাল্টিপ্লাগ ও ইলেকট্রিক)', label: '⚡ মাল্টিপ্লাগ ও সুইচ' },
  { id: 'cat-elec-gadget', name: 'Electronic (অন্যান্য গ্যাজেট)', label: '⚙️ ইলেকট্রনিক্স গ্যাজেট' }
];

const SEED_PRODUCTS = [
  {
    id: 'prod-101',
    name: 'Xiaomi Redmi Note 13 (8GB / 256GB)',
    cat: 'Mobile',
    brand: 'Xiaomi',
    unit: 'Pcs',
    barcode: '880192837461',
    cost: 19500,
    price: 22499,
    stock: 8,
    warranty: '১ বছর অফিসিয়াল ওয়ারেন্টি',
    hasSerial: true,
    image: createProductSvg('#2563EB', 'Redmi Note 13')
  },
  {
    id: 'prod-102',
    name: 'Samsung Galaxy A15 4G (6GB / 128GB)',
    cat: 'Mobile',
    brand: 'Samsung',
    unit: 'Pcs',
    barcode: '880192837462',
    cost: 16200,
    price: 18999,
    stock: 6,
    warranty: '১ বছর অফিসিয়াল ওয়ারেন্টি',
    hasSerial: true,
    image: createProductSvg('#1D4ED8', 'Galaxy A15')
  },
  {
    id: 'prod-103',
    name: 'Realme Buds T110 True Wireless Earbuds',
    cat: 'Headphones',
    brand: 'Realme',
    unit: 'Pcs',
    barcode: '694176442111',
    cost: 1450,
    price: 1950,
    stock: 12,
    warranty: '৬ মাস ওয়ারেন্টি',
    hasSerial: true,
    image: createProductSvg('#7C3AED', 'TWS Buds')
  },
  {
    id: 'prod-104',
    name: 'Mpow Foldable Wireless Bluetooth Headphone',
    cat: 'Headphones',
    brand: 'Mpow',
    unit: 'Pcs',
    barcode: '740617310931',
    cost: 1850,
    price: 2400,
    stock: 7,
    warranty: '১ বছর ওয়ারেন্টি',
    hasSerial: true,
    image: createProductSvg('#4F46E5', 'Headphones')
  },
  {
    id: 'prod-105',
    name: 'Rechargeable 4WD Remote Control Stunt Car',
    cat: 'Toys',
    brand: 'Super Toys',
    unit: 'Box',
    barcode: '894110300222',
    cost: 1200,
    price: 1650,
    stock: 9,
    warranty: '১ মাস রিপ্লেসমেন্ট',
    hasSerial: false,
    image: createProductSvg('#DC2626', 'RC Car Toy')
  },
  {
    id: 'prod-106',
    name: 'Musical Dancing Duck with 3D Flash Lights',
    cat: 'Toys',
    brand: 'Baby Land',
    unit: 'Pcs',
    barcode: '894110300333',
    cost: 380,
    price: 550,
    stock: 14,
    warranty: 'কোন ওয়ারেন্টি নেই',
    hasSerial: false,
    image: createProductSvg('#F59E0B', 'Dancing Duck')
  },
  {
    id: 'prod-107',
    name: 'DP 20W LED Rechargeable Emergency Tube Light',
    cat: 'Light',
    brand: 'DP Light',
    unit: 'Pcs',
    barcode: '695485128777',
    cost: 580,
    price: 820,
    stock: 16,
    warranty: '৬ মাস ওয়ারেন্টি',
    hasSerial: false,
    image: createProductSvg('#EAB308', 'Emergency Light')
  },
  {
    id: 'prod-108',
    name: 'Kamisafe Long Range LED Flashlight Torch',
    cat: 'Light',
    brand: 'Kamisafe',
    unit: 'Pcs',
    barcode: '695485128888',
    cost: 320,
    price: 480,
    stock: 20,
    warranty: '৬ মাস ওয়ারেন্টি',
    hasSerial: false,
    image: createProductSvg('#CA8A04', 'LED Torch')
  },
  {
    id: 'prod-109',
    name: 'Deluxe Hardcover 120 Pages Ruled Note Khata',
    cat: 'স্টেশনারি (খাতা ও ডায়েরি)',
    brand: 'Bashundhara',
    unit: 'Pcs',
    barcode: '8851960000111',
    cost: 75,
    price: 95,
    stock: 50,
    warranty: 'কোন ওয়ারেন্টি নেই',
    hasSerial: false,
    image: createProductSvg('#059669', 'Note Khata')
  },
  {
    id: 'prod-110',
    name: 'Matador Pin-Point Ball Pen Box (20 Pcs)',
    cat: 'স্টেশনারি (কলম ও জ্যামিতি)',
    brand: 'Matador',
    unit: 'Box',
    barcode: '894110300101',
    cost: 95,
    price: 120,
    stock: 40,
    warranty: 'কোন ওয়ারেন্টি নেই',
    hasSerial: false,
    image: createProductSvg('#BE185D', 'Matador Pen')
  },
  {
    id: 'prod-111',
    name: 'Double A 80GSM A4 Paper Rim (500 Sheets)',
    cat: 'স্টেশনারি (কাগজ ও রিম)',
    brand: 'Double A',
    unit: 'Rim',
    barcode: '8851960000049',
    cost: 430,
    price: 495,
    stock: 45,
    warranty: 'কোন ওয়ারেন্টি নেই',
    hasSerial: false,
    image: createProductSvg('#047857', 'A4 Paper')
  },
  {
    id: 'prod-112',
    name: 'Executive Display File Folder (40 Pockets)',
    cat: 'স্টেশনারি (ফাইল ও অফিস)',
    brand: 'Good Luck',
    unit: 'Pcs',
    barcode: '894110300555',
    cost: 110,
    price: 150,
    stock: 25,
    warranty: 'কোন ওয়ারেন্টি নেই',
    hasSerial: false,
    image: createProductSvg('#0E7490', 'Office File')
  },
  {
    id: 'prod-113',
    name: 'Remax 20W PD+QC Fast Type-C Charger',
    cat: 'Electronic (চার্জার ও পাওয়ার ব্যাংক)',
    brand: 'Remax',
    unit: 'Pcs',
    barcode: '695485128391',
    cost: 480,
    price: 680,
    stock: 22,
    warranty: '৬ মাস ওয়ারেন্টি',
    hasSerial: true,
    image: createProductSvg('#D97706', 'Fast Charger')
  },
  {
    id: 'prod-114',
    name: 'Anker PowerCore 10000mAh Slim Power Bank',
    cat: 'Electronic (চার্জার ও পাওয়ার ব্যাংক)',
    brand: 'Anker',
    unit: 'Pcs',
    barcode: '848061053999',
    cost: 1650,
    price: 2150,
    stock: 10,
    warranty: '১ বছর অফিসিয়াল ওয়ারেন্টি',
    hasSerial: true,
    image: createProductSvg('#B45309', 'Power Bank')
  },
  {
    id: 'prod-115',
    name: 'Baseus 100W Fast Charging Type-C Cable',
    cat: 'Electronic (ক্যাবল ও কনভার্টার)',
    brand: 'Baseus',
    unit: 'Pcs',
    barcode: '848061053128',
    cost: 340,
    price: 490,
    stock: 25,
    warranty: '১ বছর অফিসিয়াল ওয়ারেন্টি',
    hasSerial: false,
    image: createProductSvg('#EA580C', 'Type-C Cable')
  },
  {
    id: 'prod-116',
    name: 'Defender 4-Socket Surge Protector Multiplug',
    cat: 'Electronic (মাল্টিপ্লাগ ও ইলেকট্রিক)',
    brand: 'Defender',
    unit: 'Pcs',
    barcode: '619659124489',
    cost: 450,
    price: 650,
    stock: 15,
    warranty: '২ বছর ওয়ারেন্টি',
    hasSerial: false,
    image: createProductSvg('#4338CA', 'Multiplug')
  },
  {
    id: 'prod-117',
    name: 'Portable USB Rechargeable Mini Desk Fan',
    cat: 'Electronic (অন্যান্য গ্যাজেট)',
    brand: 'Jiteng',
    unit: 'Pcs',
    barcode: '619659124999',
    cost: 480,
    price: 690,
    stock: 8,
    warranty: '৩ মাস রিপ্লেসমেন্ট',
    hasSerial: false,
    image: createProductSvg('#0284C7', 'Mini Fan')
  }
];

const SEED_CUSTOMERS = [
  { id: 'cust-1', name: 'মোঃ রফিকুল ইসলাম (টেলিকম মার্ট)', phone: '01711-223344', address: 'কলেজ রোড, শেরপুর', due: 4500 },
  { id: 'cust-2', name: 'সুমন আহমেদ (কম্পিউটার পয়েন্ট)', phone: '01822-334455', address: 'সিটি মার্কেট, শপ #৫', due: 2800 },
  { id: 'cust-3', name: 'প্রকৌশলী সাজ্জাদ হোসেন', phone: '01933-445566', address: 'সদর হাসপাতাল রোড', due: 0 }
];

const SEED_EXPENSES = [
  { id: 'exp-1', title: 'দোকান বিদ্যুৎ বিল (নভেম্বর)', amount: 1650, date: '2026-11-24', note: 'পল্লী বিদ্যুৎ অফিস' },
  { id: 'exp-2', title: 'স্টাফের দুপুরের নাস্তা ও চা', amount: 220, date: '2026-11-25', note: 'আজকের খরচ' }
];

const SEED_SETTINGS = {
  shopNameBn: 'মেট্রো টেলিকম ও কম্পিউটার হাব',
  shopNameEn: 'METRO TELECOM & COMPUTER HUB',
  shopAddress: 'শপ নং #১২, সিটি সেন্টার প্লাজা, কলেজ রোড',
  shopPhone: '০১৭১১-০০১১২২, ০১৮২২-৩৩৪৪৫৫',
  shopTerms: '১. বিক্রিত মাল কোনো অবস্থাতেই ফেরত নেওয়া হয় না।\n২. ওয়ারেন্টির জন্য মেমো অবশ্যই সংরক্ষণ করতে হবে।\n৩. পোড়া বা ভাঙ্গা পণ্যে ওয়ারেন্টি প্রযোজ্য নয়।'
};

function getInitialSeedSales() {
  const sales = [];
  // 1. Prior 10 months of 2026 (Jan to Oct) for complete annual ledger
  const monthlyData = [
    { m: '01', days: 28, base: 42000, cost: 31500 },
    { m: '02', days: 26, base: 38500, cost: 28800 },
    { m: '03', days: 30, base: 51000, cost: 38000 },
    { m: '04', days: 29, base: 48200, cost: 36000 },
    { m: '05', days: 30, base: 55400, cost: 41500 },
    { m: '06', days: 29, base: 59000, cost: 44000 },
    { m: '07', days: 30, base: 46300, cost: 34700 },
    { m: '08', days: 30, base: 53800, cost: 40200 },
    { m: '09', days: 29, base: 62500, cost: 46800 },
    { m: '10', days: 30, base: 68000, cost: 51000 }
  ];

  monthlyData.forEach(mo => {
    const p1 = Math.round(mo.base * 0.4);
    const p2 = Math.round(mo.base * 0.35);
    const p3 = mo.base - p1 - p2;
    const c1 = Math.round(mo.cost * 0.4);
    const c2 = Math.round(mo.cost * 0.35);
    const c3 = mo.cost - c1 - c2;
    const items = [
      { amt: p1, c: c1, day: '08' },
      { amt: p2, c: c2, day: '18' },
      { amt: p3, c: c3, day: '28' }
    ];
    items.forEach((it, idx) => {
      sales.push({
        id: `INV-2026${mo.m}${it.day}-${String(idx + 1).padStart(3, '0')}`,
        customer: idx === 0 ? 'খুচরা ক্রেতা (নগদ)' : 'আরিফুল ইসলাম (নিয়মিত)',
        customerId: idx === 0 ? 'cust-cash' : 'cust-1',
        items: [
          { id: `seed-m-${mo.m}-${idx}`, name: 'মোবাইল ও এক্সেসরিজ পাইকারি প্যাকেজ', qty: 1, unit: 'Pcs', price: it.amt, cost: it.c, total: it.amt, warranty: '১ বছর' }
        ],
        subtotal: it.amt,
        discount: 0,
        grandTotal: it.amt,
        paidAmount: it.amt,
        dueAmount: 0,
        paymentMethod: 'cash',
        timestamp: `2026-${mo.m}-${it.day}T14:30:00.000Z`,
        itemsCount: 1
      });
    });
  });

  // 2. November (Nov 20 to Nov 26) 7-day sales matching user reference image exactly
  const nov7Days = [
    { d: '2026-11-20', amt: 1250, cost: 900, cust: 'খুচরা ক্রেতা (নগদ কাস্টমার)' },
    { d: '2026-11-21', amt: 1850, cost: 1350, cust: 'আরিফুল ইসলাম (নিয়মিত ক্রেতা)' },
    { d: '2026-11-22', amt: 2420, cost: 1800, cust: 'খুচরা ক্রেতা (নগদ কাস্টমার)' },
    { d: '2026-11-23', amt: 3100, cost: 2300, cust: 'সুমন টেলিকম (খুচরা দোকানদার)' },
    { d: '2026-11-24', amt: 2760, cost: 2050, cust: 'খুচরা ক্রেতা (নগদ কাস্টমার)' },
    { d: '2026-11-25', amt: 2100, cost: 1550, cust: 'তানভীর আহমেদ (ছাত্র)' },
    { d: '2026-11-26', amt: 2030, cost: 1500, cust: 'খুচরা ক্রেতা (নগদ কাস্টমার)' }
  ];

  nov7Days.forEach((it, idx) => {
    sales.push({
      id: `INV-${it.d.replace(/-/g, '')}-${String(idx + 1).padStart(3, '0')}`,
      customer: it.cust,
      customerId: idx % 2 === 0 ? 'cust-cash' : 'cust-1',
      items: [
        { id: `seed-nov-${idx}`, name: 'মোবাইল এক্সেসরিজ ও পার্টস', qty: 1, unit: 'Pcs', price: it.amt, cost: it.cost, total: it.amt, warranty: '৬ মাস' }
      ],
      subtotal: it.amt,
      discount: 0,
      grandTotal: it.amt,
      paidAmount: it.amt,
      dueAmount: 0,
      paymentMethod: idx % 3 === 0 ? 'bkash' : 'cash',
      timestamp: `${it.d}T11:${30 + idx * 4}:00.000Z`,
      itemsCount: 1
    });
  });

  return sales;
}

function getInitialSeedExpenses() {
  return [
    { id: 'exp-01', title: 'দোকান বিদ্যুৎ বিল (জানুয়ারি)', amount: 1550, date: '2026-01-20', note: 'পল্লী বিদ্যুৎ' },
    { id: 'exp-02', title: 'দোকান বিদ্যুৎ বিল (ফেব্রুয়ারি)', amount: 1420, date: '2026-02-18', note: 'পল্লী বিদ্যুৎ' },
    { id: 'exp-03', title: 'দোকান বিদ্যুৎ বিল (মার্চ)', amount: 1680, date: '2026-03-22', note: 'পল্লী বিদ্যুৎ' },
    { id: 'exp-04', title: 'দোকান বিদ্যুৎ বিল (এপ্রিল)', amount: 1750, date: '2026-04-20', note: 'পল্লী বিদ্যুৎ' },
    { id: 'exp-05', title: 'দোকান বিদ্যুৎ বিল (মে)', amount: 1900, date: '2026-05-21', note: 'পল্লী বিদ্যুৎ' },
    { id: 'exp-06', title: 'দোকান বিদ্যুৎ বিল (জুন)', amount: 1850, date: '2026-06-20', note: 'পল্লী বিদ্যুৎ' },
    { id: 'exp-07', title: 'দোকান বিদ্যুৎ বিল (জুলাই)', amount: 1700, date: '2026-07-22', note: 'পল্লী বিদ্যুৎ' },
    { id: 'exp-08', title: 'দোকান বিদ্যুৎ বিল (আগস্ট)', amount: 1800, date: '2026-08-20', note: 'পল্লী বিদ্যুৎ' },
    { id: 'exp-09', title: 'দোকান বিদ্যুৎ বিল (সেপ্টেম্বর)', amount: 1950, date: '2026-09-21', note: 'পল্লী বিদ্যুৎ' },
    { id: 'exp-10', title: 'দোকান বিদ্যুৎ বিল (অক্টোবর)', amount: 1880, date: '2026-10-22', note: 'পল্লী বিদ্যুৎ' },
    { id: 'exp-11', title: 'দোকান বিদ্যুৎ বিল (নভেম্বর)', amount: 1650, date: '2026-11-24', note: 'পল্লী বিদ্যুৎ অফিস' },
    { id: 'exp-12', title: 'স্টাফের দুপুরের নাস্তা ও চা', amount: 220, date: '2026-11-25', note: 'আজকের খরচ' },
    { id: 'exp-13', title: 'দোকান পরিষ্কার ও প্যাকেজিং ব্যাগ', amount: 450, date: '2026-11-26', note: 'প্যাকেজিং' }
  ];
}

// Global App State
const state = {
  categories: [],
  products: [],
  customers: [],
  expenses: [],
  sales: [],
  settings: SEED_SETTINGS,
  cart: [],
  heldBills: [],
  activeCategory: 'all',
  searchQuery: '',
  paymentMethod: 'cash',
  pendingSerialProduct: null,
  uploadedBase64Image: ''
};

// Storage load / save
function loadAllData() {
  try {
    const cat = localStorage.getItem('metro_tel_categories');
    state.categories = cat ? JSON.parse(cat) : DEFAULT_CATEGORIES;

    const p = localStorage.getItem('metro_tel_products');
    state.products = p ? JSON.parse(p) : SEED_PRODUCTS;

    const c = localStorage.getItem('metro_tel_customers');
    state.customers = c ? JSON.parse(c) : SEED_CUSTOMERS;

    const e = localStorage.getItem('metro_tel_expenses');
    const parsedExp = e ? JSON.parse(e) : null;
    state.expenses = (parsedExp && parsedExp.length > 0) ? parsedExp : getInitialSeedExpenses();

    const s = localStorage.getItem('metro_tel_sales');
    const parsedSales = s ? JSON.parse(s) : null;
    state.sales = (parsedSales && parsedSales.length > 0) ? parsedSales : getInitialSeedSales();

    const set = localStorage.getItem('metro_tel_settings');
    state.settings = set ? JSON.parse(set) : SEED_SETTINGS;

    const h = localStorage.getItem('metro_tel_held');
    state.heldBills = h ? JSON.parse(h) : [];
  } catch (err) {
    console.error('Storage error:', err);
    state.categories = DEFAULT_CATEGORIES;
    state.products = SEED_PRODUCTS;
    state.customers = SEED_CUSTOMERS;
    state.expenses = getInitialSeedExpenses();
    state.sales = getInitialSeedSales();
    state.settings = SEED_SETTINGS;
  }
}

function persist(key, skipCloudSync = false) {
  try {
    if (!key || key === 'categories') localStorage.setItem('metro_tel_categories', JSON.stringify(state.categories));
    if (!key || key === 'products') localStorage.setItem('metro_tel_products', JSON.stringify(state.products));
    if (!key || key === 'customers') localStorage.setItem('metro_tel_customers', JSON.stringify(state.customers));
    if (!key || key === 'expenses') localStorage.setItem('metro_tel_expenses', JSON.stringify(state.expenses));
    if (!key || key === 'sales') localStorage.setItem('metro_tel_sales', JSON.stringify(state.sales));
    if (!key || key === 'settings') localStorage.setItem('metro_tel_settings', JSON.stringify(state.settings));
    if (!key || key === 'held') localStorage.setItem('metro_tel_held', JSON.stringify(state.heldBills));
  } catch (err) {
    console.error('Persist error:', err);
  }

  if (!skipCloudSync && typeof broadcastAndPushCloudSync === 'function') {
    broadcastAndPushCloudSync(key);
  }
}

// Helpers
function formatTk(val) {
  const n = Number(val) || 0;
  return '৳ ' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function numberToWordsBangla(num) {
  num = Math.floor(num || 0);
  if (num === 0) return 'শূন্য টাকা মাত্র';
  return num.toLocaleString('en-US') + ' টাকা মাত্র';
}

// ================= DOM ELEMENTS =================
const dom = {
  tabBtns: document.querySelectorAll('.tab-btn'),
  tabViews: document.querySelectorAll('.tab-view'),
  headerSaleMini: document.getElementById('header-today-sale-mini'),
  navCartPill: document.getElementById('nav-cart-pill'),
  navLowStockPill: document.getElementById('nav-low-stock-pill'),

  // Dashboard
  btnDashGoPos: document.getElementById('btn-dash-go-pos'),
  btnDashManageStock: document.getElementById('btn-dash-manage-stock'),
  liveClock: document.getElementById('dash-live-time'),
  kpiSale: document.getElementById('kpi-today-sale'),
  kpiInvoices: document.getElementById('kpi-today-invoices'),
  kpiCash: document.getElementById('kpi-today-cash'),
  kpiProfit: document.getElementById('kpi-today-profit'),
  kpiDue: document.getElementById('kpi-total-due'),
  kpiStockVal: document.getElementById('kpi-stock-value'),
  kpiProdTypes: document.getElementById('kpi-product-types'),
  chartContainer: document.getElementById('dash-chart-container'),
  dashLowStockTbody: document.getElementById('dash-low-stock-tbody'),
  dashRecentInvoicesTbody: document.getElementById('dash-recent-invoices-tbody'),

  // POS
  posSearchBox: document.getElementById('pos-search-box'),
  btnPosClearSearch: document.getElementById('btn-pos-clear-search'),
  posCategoryScroller: document.getElementById('pos-category-scroller'),
  posItemsGrid: document.getElementById('pos-items-grid'),
  cartTotalBadge: document.getElementById('cart-total-badge'),
  cartTableContainer: document.getElementById('cart-table-container'),
  btnHoldBill: document.getElementById('btn-hold-bill'),
  btnResetCart: document.getElementById('btn-reset-cart'),
  heldBanner: document.getElementById('held-bills-banner'),
  heldCountText: document.getElementById('held-bills-count'),
  btnRestoreHeld: document.getElementById('btn-restore-held-bill'),
  posCustomerSelect: document.getElementById('pos-customer-select'),
  btnPosAddCustomer: document.getElementById('btn-pos-add-customer'),
  cartSubtotalVal: document.getElementById('cart-subtotal-val'),
  cartDiscountInput: document.getElementById('cart-discount-input'),
  cartNetTotalVal: document.getElementById('cart-net-total-val'),
  payMethodBtns: document.querySelectorAll('.pay-btn'),
  cartPaidInput: document.getElementById('cart-paid-input'),
  cartDueRow: document.getElementById('cart-due-row'),
  cartDueVal: document.getElementById('cart-due-val'),
  btnPosCheckout: document.getElementById('btn-pos-checkout'),

  // Floating Mobile Cart Bar & Overlay Drawer
  posCartPane: document.getElementById('pos-cart-pane'),
  posCartBackdrop: document.getElementById('pos-cart-backdrop'),
  btnCloseCartOverlay: document.getElementById('btn-close-cart-overlay'),
  mobileDrawerHandle: document.getElementById('mobile-drawer-handle'),
  posFloatingCartBar: document.getElementById('pos-floating-cart-bar'),
  floatingCartCount: document.getElementById('floating-cart-count'),
  floatingCartTotal: document.getElementById('floating-cart-total'),
  btnTriggerCartSheet: document.getElementById('btn-trigger-cart-sheet'),
  btnFloatingCheckout: document.getElementById('btn-floating-checkout'),

  // Inventory
  btnOpenCreateProduct: document.getElementById('btn-open-create-product'),
  invSearchBox: document.getElementById('inv-search-box'),
  invFilterCat: document.getElementById('inv-filter-cat'),
  invFilterStockStatus: document.getElementById('inv-filter-stock-status'),
  inventoryMasterTbody: document.getElementById('inventory-master-tbody'),

  // Warranty
  warrantyQueryInput: document.getElementById('warranty-query-input'),
  btnRunWarrantyCheck: document.getElementById('btn-run-warranty-check'),
  warrantyResultsContainer: document.getElementById('warranty-results-container'),

  // Customers
  btnOpenCreateCustomer: document.getElementById('btn-open-create-customer'),
  dueTotalSum: document.getElementById('due-total-sum'),
  dueTotalCount: document.getElementById('due-total-count'),
  customerMasterTbody: document.getElementById('customer-master-tbody'),

  // Expenses
  btnOpenCreateExpense: document.getElementById('btn-open-create-expense'),
  expenseTodayDisplay: document.getElementById('expense-today-display'),
  expenseMasterTbody: document.getElementById('expense-master-tbody'),

  // Settings
  formShopSettings: document.getElementById('form-shop-settings'),
  btnExportData: document.getElementById('btn-export-data'),
  btnResetDemoData: document.getElementById('btn-reset-demo-data'),

  // Cloud Sync (One Backend for PC, Mobile, Web)
  cloudSyncStatusPill: document.getElementById('cloud-sync-status-pill'),
  cloudSyncText: document.getElementById('cloud-sync-text'),
  cloudConnTag: document.getElementById('cloud-connection-status-tag'),
  inpCloudSyncKey: document.getElementById('inp-cloud-sync-key'),
  btnSaveCloudSync: document.getElementById('btn-save-cloud-sync'),

  // Auto Updater
  globalUpdateBar: document.getElementById('global-update-bar'),
  btnBannerUpdateAction: document.getElementById('btn-banner-update-action'),
  btnCheckForUpdates: document.getElementById('btn-check-for-updates'),
  updateStatusBox: document.getElementById('update-status-box'),
  updateProgressContainer: document.getElementById('update-progress-container'),
  updateProgressText: document.getElementById('update-progress-text'),
  updateProgressPercent: document.getElementById('update-progress-percent'),
  updateProgressFill: document.getElementById('update-progress-fill'),
  btnInstallUpdate: document.getElementById('btn-install-update'),
  chkAutoNotifyUpdate: document.getElementById('chk-auto-notify-update'),
  lastUpdateCheckTime: document.getElementById('last-update-check-time'),

  // Modals
  modalAddProduct: document.getElementById('modal-add-product'),
  formCreateProduct: document.getElementById('form-create-product'),
  btnCloseProdModal: document.getElementById('btn-close-prod-modal'),
  btnCancelCreateProd: document.getElementById('btn-cancel-create-prod'),
  inpProductFile: document.getElementById('inp-product-file'),
  productImgPreview: document.getElementById('product-img-preview'),
  productImgPlaceholder: document.querySelector('.img-placeholder-icon'),
  btnRemovePhoto: document.getElementById('btn-remove-photo'),

  modalPosSerial: document.getElementById('modal-pos-serial'),
  serialProdInfoText: document.getElementById('serial-prod-info-text'),
  serialInputField: document.getElementById('serial-input-field'),
  btnConfirmSerial: document.getElementById('btn-confirm-serial'),
  btnCancelSerialModal: document.getElementById('btn-cancel-serial-modal'),
  btnCloseSerialModal: document.getElementById('btn-close-serial-modal'),

  modalAddCustomer: document.getElementById('modal-add-customer'),
  formCreateCustomer: document.getElementById('form-create-customer'),
  btnCloseCustModal: document.getElementById('btn-close-cust-modal'),
  btnCancelCreateCust: document.getElementById('btn-cancel-create-cust'),

  modalCollectDue: document.getElementById('modal-collect-due'),
  formSubmitDue: document.getElementById('form-submit-due'),
  dueCustHeaderInfo: document.getElementById('due-cust-header-info'),
  inpDueAmountCollect: document.getElementById('inp-due-amount-collect'),
  inpDueMethod: document.getElementById('inp-due-method'),
  btnCloseDueModal: document.getElementById('btn-close-due-modal'),
  btnCancelDueModal: document.getElementById('btn-cancel-due-modal'),

  modalAddExpense: document.getElementById('modal-add-expense'),
  formCreateExpense: document.getElementById('form-create-expense'),
  btnCloseExpModal: document.getElementById('btn-close-exp-modal'),
  btnCancelCreateExp: document.getElementById('btn-cancel-create-exp'),

  // Category Modal
  modalAddCategory: document.getElementById('modal-add-category'),
  formCreateCategory: document.getElementById('form-create-category'),
  btnCloseCatModal: document.getElementById('btn-close-cat-modal'),
  btnCancelCreateCat: document.getElementById('btn-cancel-create-cat'),
  btnModalAddCat: document.getElementById('btn-modal-add-cat'),

  modalInvoiceDialog: document.getElementById('modal-invoice-dialog'),
  printableMemoSheet: document.getElementById('printable-memo-sheet'),
  btnInvokePrint: document.getElementById('btn-invoke-print'),
  btnCloseInvoiceModal: document.getElementById('btn-close-invoice-modal'),
  sizePills: document.querySelectorAll('.size-pill'),

  // Reference Sales Trend Card
  trendTotalSalesText: document.getElementById('trend-total-sales-text'),
  trendGrowthBadge: document.getElementById('trend-growth-badge'),
  trendTimeframePill: document.getElementById('trend-timeframe-pill'),

  // Financial Reports & Annual/Monthly Ledger
  reportPeriodToggle: document.getElementById('report-period-toggle'),
  selReportYear: document.getElementById('sel-report-year'),
  selReportMonth: document.getElementById('sel-report-month'),
  inpReportDate: document.getElementById('inp-report-date'),
  btnPrintReport: document.getElementById('btn-print-report'),
  btnExportReportCsv: document.getElementById('btn-export-report-csv'),
  reportTotalSales: document.getElementById('report-total-sales'),
  reportTotalCogs: document.getElementById('report-total-cogs'),
  reportTotalExpenses: document.getElementById('report-total-expenses'),
  reportNetProfit: document.getElementById('report-net-profit'),
  reportProfitMargin: document.getElementById('report-profit-margin'),
  reportChartTitle: document.getElementById('report-chart-title'),
  reportChartSub: document.getElementById('report-chart-sub'),
  reportsChartContainer: document.getElementById('reports-chart-container'),
  reportTableTitle: document.getElementById('report-table-title'),
  reportTableHeaders: document.getElementById('report-table-headers'),
  reportTableTbody: document.getElementById('report-table-tbody'),
  reportTableTfoot: document.getElementById('report-table-tfoot'),
  rkLabelSales: document.getElementById('rk-label-sales'),
  rkLabelExpenses: document.getElementById('rk-label-expenses'),
  rkLabelProfit: document.getElementById('rk-label-profit'),
  reportSalesSub: document.getElementById('report-sales-sub')
};

// ================= INITIALIZE =================
function appInit() {
  loadAllData();
  setupClock();
  setupTabs();
  setupCategories();
  setupDashboard();
  setupPos();
  setupInventory();
  setupWarranty();
  setupCustomers();
  setupExpenses();
  setupReports();
  setupSettings();
  setupCloudSync();
  setupAutoUpdater();
  setupModals();
  refreshGlobalStats();
  renderPosCatalog();
  renderCart();
  renderDashboard();
}

function setupClock() {
  const d = new Date();
  dom.liveClock.textContent = d.toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Tab Switching & Sidebar Slidebar Navigation
function setupTabs() {
  const btnToggleSidebar = document.getElementById('btn-toggle-sidebar');
  const btnCloseSidebar = document.getElementById('btn-close-sidebar');
  const appSidebar = document.getElementById('app-sidebar');
  const sidebarBackdrop = document.getElementById('sidebar-backdrop');
  const headerPageIcon = document.getElementById('header-page-icon');
  const headerPageTitle = document.getElementById('header-page-title');

  const pageMeta = {
    dashboard: { icon: '📊', title: 'ড্যাশবোর্ড' },
    pos: { icon: '🛒', title: 'দ্রুত বিক্রয় (POS)' },
    inventory: { icon: '📦', title: 'স্টক ও মালামাল' },
    warranty: { icon: '🛡️', title: 'ওয়ারেন্টি চেক' },
    customers: { icon: '📒', title: 'বাকির খাতা' },
    expenses: { icon: '💸', title: 'দোকানের খরচ' },
    reports: { icon: '📈', title: 'বার্ষিক ও মাসিক হিসাব' },
    settings: { icon: '⚙️', title: 'সেটিংস ও সিঙ্ক' }
  };

  function openSidebar() {
    if (appSidebar) appSidebar.classList.add('open');
    if (sidebarBackdrop) sidebarBackdrop.classList.add('open');
  }

  function closeSidebar() {
    if (appSidebar) appSidebar.classList.remove('open');
    if (sidebarBackdrop) sidebarBackdrop.classList.remove('open');
  }

  if (btnToggleSidebar) btnToggleSidebar.addEventListener('click', openSidebar);
  if (btnCloseSidebar) btnCloseSidebar.addEventListener('click', closeSidebar);
  if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeSidebar);

  dom.tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      dom.tabBtns.forEach(b => b.classList.remove('active'));
      dom.tabViews.forEach(v => v.classList.remove('active'));

      btn.classList.add('active');
      const view = document.getElementById(`view-${target}`);
      if (view) view.classList.add('active');

      if (pageMeta[target]) {
        if (headerPageIcon) headerPageIcon.textContent = pageMeta[target].icon;
        if (headerPageTitle) headerPageTitle.textContent = pageMeta[target].title;
      }

      if (window.innerWidth <= 1024) {
        closeSidebar();
      }

      if (target === 'dashboard') renderDashboard();
      if (target === 'pos') renderPosCatalog();
      if (target === 'inventory') renderInventoryMaster();
      if (target === 'customers') renderCustomerMaster();
      if (target === 'expenses') renderExpenseMaster();
      if (target === 'reports') renderReportsMaster();
      if (target === 'settings') populateSettingsForm();
    });
  });

  dom.btnDashGoPos.addEventListener('click', () => switchTab('pos'));
  dom.btnDashManageStock.addEventListener('click', () => switchTab('inventory'));
}

function switchTab(tabId) {
  const btn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
  if (btn) btn.click();
}

// ================= DYNAMIC CATEGORIES MANAGEMENT =================
function setupCategories() {
  renderCategoryComponents();

  // Open modal from "+ নতুন ক্যাটাগরি"
  if (dom.btnModalAddCat) {
    dom.btnModalAddCat.addEventListener('click', openAddCategoryModal);
  }

  // Close modal
  dom.btnCloseCatModal.addEventListener('click', () => dom.modalAddCategory.classList.remove('show'));
  dom.btnCancelCreateCat.addEventListener('click', () => dom.modalAddCategory.classList.remove('show'));

  // Form submit
  dom.formCreateCategory.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('inp-new-cat-name').value.trim();
    const icon = document.getElementById('inp-new-cat-icon').value.trim();
    if (!name) return;

    const exists = state.categories.some(c => c.name.toLowerCase() === name.toLowerCase());
    if (exists) {
      alert('এই ক্যাটাগরি ইতিমধ্যে তালিকায় রয়েছে!');
      return;
    }

    const newCat = {
      id: 'cat-' + Date.now(),
      name: name,
      label: (icon ? icon + ' ' : '🏷️ ') + name
    };

    state.categories.push(newCat);
    persist('categories');
    renderCategoryComponents();
    dom.modalAddCategory.classList.remove('show');

    // Automatically select in Add Product modal if open
    const inpCat = document.getElementById('inp-p-cat');
    if (inpCat) inpCat.value = name;

    alert(`"${name}" ক্যাটাগরি সফলভাবে যুক্ত হয়েছে!`);
  });
}

function openAddCategoryModal() {
  document.getElementById('inp-new-cat-name').value = '';
  document.getElementById('inp-new-cat-icon').value = '';
  dom.modalAddCategory.classList.add('show');
  setTimeout(() => document.getElementById('inp-new-cat-name').focus(), 150);
}

function renderCategoryComponents() {
  // 1. Render POS Scroller Pills
  const scroller = dom.posCategoryScroller;
  if (scroller) {
    scroller.innerHTML = '';

    // 'All' button
    const allBtn = document.createElement('button');
    allBtn.className = `cat-pill ${state.activeCategory === 'all' ? 'active' : ''}`;
    allBtn.dataset.cat = 'all';
    allBtn.textContent = 'সব পণ্য';
    allBtn.onclick = () => {
      document.querySelectorAll('#pos-category-scroller .cat-pill').forEach(p => p.classList.remove('active'));
      allBtn.classList.add('active');
      state.activeCategory = 'all';
      renderPosCatalog();
    };
    scroller.appendChild(allBtn);

    // Each dynamic category
    state.categories.forEach(c => {
      const pill = document.createElement('button');
      pill.className = `cat-pill ${state.activeCategory === c.name ? 'active' : ''}`;
      pill.dataset.cat = c.name;
      pill.textContent = c.label || c.name;
      pill.onclick = () => {
        document.querySelectorAll('#pos-category-scroller .cat-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.activeCategory = c.name;
        renderPosCatalog();
      };
      scroller.appendChild(pill);
    });

    // '+ নতুন ক্যাটাগরি' button at end of scroller
    const addBtn = document.createElement('button');
    addBtn.className = 'cat-pill add-new';
    addBtn.innerHTML = '<b>+ নতুন ক্যাটাগরি</b>';
    addBtn.onclick = openAddCategoryModal;
    scroller.appendChild(addBtn);
  }

  // 2. Render Add Product Dropdown
  const inpCat = document.getElementById('inp-p-cat');
  if (inpCat) {
    const curVal = inpCat.value;
    inpCat.innerHTML = '';
    state.categories.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.name;
      opt.textContent = c.label || c.name;
      inpCat.appendChild(opt);
    });
    if (curVal) inpCat.value = curVal;
  }

  // 3. Render Inventory Filter Dropdown
  const filterCat = dom.invFilterCat;
  if (filterCat) {
    const curVal = filterCat.value;
    filterCat.innerHTML = '<option value="all">সব ক্যাটাগরি</option>';
    state.categories.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.name;
      opt.textContent = c.label || c.name;
      filterCat.appendChild(opt);
    });
    if (curVal) filterCat.value = curVal;
  }
}

// ================= REFRESH STATS =================
function refreshGlobalStats() {
  const todayStr = new Date().toISOString().split('T')[0];
  let todaySale = 0;
  let todayCash = 0;
  let todayCost = 0;
  let todayInvoices = 0;

  state.sales.forEach(s => {
    if (s.timestamp && s.timestamp.startsWith(todayStr)) {
      todaySale += (s.grandTotal || 0);
      todayCash += (s.paid || 0);
      todayInvoices++;
      if (s.items) {
        s.items.forEach(it => {
          todayCost += ((it.cost || 0) * (it.qty || 1));
        });
      }
    }
  });

  let todayExp = 0;
  state.expenses.forEach(e => {
    if (e.date === todayStr) todayExp += (e.amount || 0);
  });

  const todayProfit = Math.max(0, todaySale - todayCost - todayExp);

  let totalDue = 0;
  state.customers.forEach(c => totalDue += (c.due || 0));

  let totalStockVal = 0;
  state.products.forEach(p => totalStockVal += ((p.cost || 0) * (p.stock || 0)));

  const lowStockCount = state.products.filter(p => p.stock <= 5).length;

  // Header
  dom.headerSaleMini.textContent = `আজকের বিক্রি: ${formatTk(todaySale)}`;
  dom.navLowStockPill.textContent = lowStockCount;
  dom.navLowStockPill.style.display = lowStockCount > 0 ? 'inline-block' : 'none';

  // KPI
  dom.kpiSale.textContent = formatTk(todaySale);
  dom.kpiInvoices.textContent = `${todayInvoices} টি`;
  dom.kpiCash.textContent = formatTk(todayCash);
  dom.kpiProfit.textContent = formatTk(todayProfit);
  dom.kpiDue.textContent = formatTk(totalDue);
  dom.kpiStockVal.textContent = formatTk(totalStockVal);
  dom.kpiProdTypes.textContent = `${state.products.length} টি`;

  dom.dueTotalSum.textContent = formatTk(totalDue);
  dom.dueTotalCount.textContent = `${state.customers.length} জন`;
  dom.expenseTodayDisplay.textContent = formatTk(todayExp);
}

// ================= 1. DASHBOARD =================
function setupDashboard() {}

function renderDashboard() {
  refreshGlobalStats();

  // 7-day Sales Combo Chart matching reference UI
  const days = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const now = new Date();
  const past7Days = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = days[d.getDay()];
    const shortDate = `${months[d.getMonth()]} ${d.getDate()}`;

    let daySales = 0;
    state.sales.forEach(s => {
      if (s.timestamp && s.timestamp.startsWith(dateStr)) {
        daySales += (s.grandTotal || 0);
      }
    });

    past7Days.push({ date: dateStr, name: dayName, shortDate, sales: daySales });
  }

  // Update total sales summary footer
  const total7DaysSales = past7Days.reduce((acc, curr) => acc + curr.sales, 0);
  if (dom.trendTotalSalesText) {
    dom.trendTotalSalesText.textContent = `৳ ${total7DaysSales.toLocaleString('en-US')}.00`;
  }

  // Determine scale ceiling
  const maxSale = Math.max(...past7Days.map(d => d.sales), 1000);
  let ceiling = Math.ceil(maxSale / 1000) * 1000;
  if (ceiling < 4000) ceiling = 4000;

  const chartWidth = 560;
  const chartHeight = 260;
  const leftMargin = 48;
  const rightMargin = 20;
  const plotWidth = chartWidth - leftMargin - rightMargin;
  const baselineY = 195;
  const topY = 40;
  const usableHeight = baselineY - topY;
  const step = plotWidth / past7Days.length;
  const barWidth = 38;
  const radius = 10;

  const gridLevels = [
    { val: ceiling, y: 40, label: Math.round(ceiling / 1000) + 'k' },
    { val: Math.round(ceiling * 0.75), y: 78.75, label: Math.round(ceiling * 0.75 / 1000) + 'k' },
    { val: Math.round(ceiling * 0.5), y: 117.5, label: Math.round(ceiling * 0.5 / 1000) + 'k' },
    { val: Math.round(ceiling * 0.25), y: 156.25, label: Math.round(ceiling * 0.25 / 1000) + 'k' },
    { val: 0, y: 195, label: '0' }
  ];

  let gridSvg = '';
  gridLevels.forEach(lvl => {
    gridSvg += `
      <line x1="${leftMargin}" y1="${lvl.y}" x2="${chartWidth - rightMargin}" y2="${lvl.y}" stroke="rgba(255,255,255,0.07)" stroke-dasharray="4,4" stroke-width="1" />
      <text x="${leftMargin - 10}" y="${lvl.y + 4}" fill="#64748b" font-size="11" font-weight="600" text-anchor="end">${lvl.label}</text>
    `;
  });

  const points = [];
  past7Days.forEach((d, i) => {
    const cx = leftMargin + (step * i) + (step / 2);
    const barHeight = Math.max(12, Math.round((d.sales / ceiling) * usableHeight));
    const barY = baselineY - barHeight;
    points.push({ cx, barY, barHeight, data: d });
  });

  let barsSvg = '';
  points.forEach(pt => {
    const barX = pt.cx - (barWidth / 2);
    const r = Math.min(radius, pt.barHeight, barWidth / 2);
    const barPath = `M ${barX} ${baselineY} L ${barX} ${pt.barY + r} Q ${barX} ${pt.barY} ${barX + r} ${pt.barY} L ${barX + barWidth - r} ${pt.barY} Q ${barX + barWidth} ${pt.barY} ${barX + barWidth} ${pt.barY + r} L ${barX + barWidth} ${baselineY} Z`;
    barsSvg += `
      <path d="${barPath}" fill="url(#trendBarGrad)" opacity="0.9" filter="url(#barShadow)"/>
    `;
  });

  let splinePath = '';
  if (points.length > 0) {
    splinePath = `M ${points[0].cx.toFixed(1)} ${points[0].barY.toFixed(1)}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? 0 : i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2 < points.length ? i + 2 : i + 1];
      const cp1x = p1.cx + (p2.cx - p0.cx) * 0.18;
      const cp1y = p1.barY + (p2.barY - p0.barY) * 0.18;
      const cp2x = p2.cx - (p3.cx - p1.cx) * 0.18;
      const cp2y = p2.barY + (p3.barY - p1.barY) * 0.18;
      splinePath += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.cx.toFixed(1)} ${p2.barY.toFixed(1)}`;
    }
  }

  let overlaySvg = '';
  points.forEach(pt => {
    const d = pt.data;
    const valText = d.sales > 0 ? `৳ ${d.sales.toLocaleString('en-US')}` : '৳ ০';
    overlaySvg += `
      <circle cx="${pt.cx}" cy="${pt.barY}" r="6.5" fill="#ffffff" stroke="#0ea5e9" stroke-width="3" filter="url(#nodeGlow)" />
      <text x="${pt.cx}" y="${pt.barY - 14}" fill="#ffffff" font-size="11.5" font-weight="700" text-anchor="middle" filter="url(#textShadow)">${valText}</text>
      <text x="${pt.cx}" y="218" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle">${d.name}</text>
      <text x="${pt.cx}" y="236" fill="#94a3b8" font-size="10.5" font-weight="500" text-anchor="middle">(${d.shortDate})</text>
    `;
  });

  const fullSvg = `
    <svg class="trend-chart-svg" viewBox="0 0 ${chartWidth} ${chartHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="trendBarGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.95" />
          <stop offset="100%" stop-color="#1d4ed8" stop-opacity="0.85" />
        </linearGradient>
        <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#0284c7" flood-opacity="0.6" />
        </filter>
        <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#38bdf8" flood-opacity="0.65" />
        </filter>
        <filter id="barShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.3" />
        </filter>
        <filter id="textShadow">
          <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#000000" flood-opacity="0.8" />
        </filter>
      </defs>
      ${gridSvg}
      ${barsSvg}
      <path d="${splinePath}" fill="none" stroke="#38bdf8" stroke-width="3.5" stroke-linecap="round" filter="url(#lineGlow)" />
      ${overlaySvg}
    </svg>
  `;

  if (dom.chartContainer) {
    dom.chartContainer.innerHTML = fullSvg;
  }

  // Low Stock Table
  const lowStockItems = state.products.filter(p => p.stock <= 5);
  const lowTbody = dom.dashLowStockTbody;
  lowTbody.innerHTML = '';

  if (lowStockItems.length === 0) {
    lowTbody.innerHTML = `<tr><td colspan="4" class="text-center" style="padding:1.5rem;color:var(--text-dim);">সব পণ্যের স্টক পর্যাপ্ত আছে ✅</td></tr>`;
  } else {
    lowStockItems.slice(0, 6).forEach(p => {
      const tr = document.createElement('tr');
      const isOut = p.stock <= 0;
      tr.innerHTML = `
        <td><strong>${p.name}</strong><br><small style="color:var(--text-dim);">${p.brand || ''}</small></td>
        <td><span class="item-cat-label">${p.cat}</span></td>
        <td class="text-right"><b>${formatTk(p.price)}</b></td>
        <td class="text-center">
          <span class="item-stock-tag ${isOut ? 'out' : 'low'}">${isOut ? 'শেষ' : p.stock + ' ' + p.unit}</span>
        </td>
      `;
      lowTbody.appendChild(tr);
    });
  }

  // Recent Invoices Table
  const recTbody = dom.dashRecentInvoicesTbody;
  recTbody.innerHTML = '';

  if (state.sales.length === 0) {
    recTbody.innerHTML = `<tr><td colspan="8" class="text-center" style="padding:1.5rem;color:var(--text-dim);">এখনো কোনো বিক্রয় রেকর্ড নেই</td></tr>`;
  } else {
    const recentSales = [...state.sales].sort((a, b) => (b.timestamp || '').localeCompare(a.timestamp || '')).slice(0, 10);
    recentSales.forEach(s => {
      const tr = document.createElement('tr');
      const invoiceNum = s.invoiceNo || s.id || 'INV-001';
      const custName = (typeof s.customer === 'object' && s.customer !== null) ? (s.customer.name || 'খুচরা ক্রেতা') : (s.customer || 'খুচরা ক্রেতা');
      const dateText = s.formattedDate || (s.timestamp ? s.timestamp.slice(0, 10) : 'আজ');
      const methodText = s.paymentMethod === 'bkash' ? 'বিকাশ' : (s.paymentMethod === 'due' ? 'বাকি' : 'নগদ');
      const paidVal = s.paidAmount !== undefined ? s.paidAmount : (s.paid !== undefined ? s.paid : (s.grandTotal || 0));
      const dueVal = s.dueAmount !== undefined ? s.dueAmount : (s.due !== undefined ? s.due : 0);

      tr.innerHTML = `
        <td><strong>${invoiceNum}</strong></td>
        <td style="color:var(--text-muted);font-size:0.8rem;">${dateText}</td>
        <td><strong>${custName}</strong></td>
        <td><span class="memo-paid-chip" style="font-size:0.75rem;">${methodText}</span></td>
        <td class="text-right"><strong>${formatTk(s.grandTotal)}</strong></td>
        <td class="text-right" style="color:#34d399;font-weight:700;">${formatTk(paidVal)}</td>
        <td class="text-right ${dueVal > 0 ? 'text-danger' : ''}" style="color:${dueVal > 0 ? '#fb7185' : 'var(--text-muted)'};font-weight:700;">${formatTk(dueVal)}</td>
        <td class="text-center">
          <button class="btn-table-action" onclick="viewInvoice('${s.id}')">📄 মেমো</button>
        </td>
      `;
      recTbody.appendChild(tr);
    });
  }
}

// ================= 2. POS CATALOG & CART =================
function setupPos() {
  // Search
  dom.posSearchBox.addEventListener('input', e => {
    state.searchQuery = e.target.value.trim().toLowerCase();
    dom.btnPosClearSearch.style.display = state.searchQuery ? 'block' : 'none';
    renderPosCatalog();
  });

  dom.btnPosClearSearch.addEventListener('click', () => {
    dom.posSearchBox.value = '';
    state.searchQuery = '';
    dom.btnPosClearSearch.style.display = 'none';
    renderPosCatalog();
  });

  // Payment methods
  dom.payMethodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dom.payMethodBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.paymentMethod = btn.dataset.method;
      recalculateCart();
    });
  });

  dom.cartDiscountInput.addEventListener('input', recalculateCart);
  dom.cartPaidInput.addEventListener('input', recalculateCart);

  // Clear Cart
  dom.btnResetCart.addEventListener('click', () => {
    if (state.cart.length === 0) return;
    if (confirm('আপনি কি বর্তমান কার্ট খালি করতে চান?')) {
      state.cart = [];
      recalculateCart();
      renderCart();
    }
  });

  // Hold Bill feature
  dom.btnHoldBill.addEventListener('click', () => {
    if (state.cart.length === 0) {
      alert('হোল্ড করার মতো কোনো পণ্য কার্টে নেই!');
      return;
    }
    const customerId = dom.posCustomerSelect.value;
    state.heldBills.push({
      id: 'held-' + Date.now(),
      customerId: customerId,
      cart: JSON.parse(JSON.stringify(state.cart)),
      discount: dom.cartDiscountInput.value,
      time: new Date().toLocaleTimeString('bn-BD')
    });
    persist('held');
    state.cart = [];
    dom.cartDiscountInput.value = 0;
    recalculateCart();
    renderCart();
    updateHeldBanner();
    alert('বিলটি সাময়িকভাবে হোল্ড করা হয়েছে। আপনি অন্য কাস্টমারের বিল করতে পারেন!');
  });

  dom.btnRestoreHeld.addEventListener('click', () => {
    if (state.heldBills.length === 0) return;
    const lastHeld = state.heldBills.pop();
    persist('held');
    state.cart = lastHeld.cart;
    dom.posCustomerSelect.value = lastHeld.customerId || 'walk-in';
    dom.cartDiscountInput.value = lastHeld.discount || 0;
    recalculateCart();
    renderCart();
    updateHeldBanner();
  });

  // Quick Add customer from POS
  dom.btnPosAddCustomer.addEventListener('click', () => {
    dom.formCreateCustomer.reset();
    dom.modalAddCustomer.classList.add('show');
  });

  // Checkout
  dom.btnPosCheckout.addEventListener('click', handlePosCheckout);

  // Floating Cart Drawer (Mobile / Tablet Overlay)
  function openMobileCart() {
    if (dom.posCartPane) dom.posCartPane.classList.add('open');
    if (dom.posCartBackdrop) dom.posCartBackdrop.classList.add('open');
  }

  function closeMobileCart() {
    if (dom.posCartPane) dom.posCartPane.classList.remove('open');
    if (dom.posCartBackdrop) dom.posCartBackdrop.classList.remove('open');
  }

  if (dom.btnTriggerCartSheet) dom.btnTriggerCartSheet.addEventListener('click', openMobileCart);
  if (dom.btnFloatingCheckout) dom.btnFloatingCheckout.addEventListener('click', openMobileCart);
  if (dom.btnCloseCartOverlay) dom.btnCloseCartOverlay.addEventListener('click', closeMobileCart);
  if (dom.mobileDrawerHandle) dom.mobileDrawerHandle.addEventListener('click', closeMobileCart);
  if (dom.posCartBackdrop) dom.posCartBackdrop.addEventListener('click', closeMobileCart);
}

function updateHeldBanner() {
  if (state.heldBills.length > 0) {
    dom.heldBanner.style.display = 'flex';
    dom.heldCountText.textContent = `${state.heldBills.length}টি`;
  } else {
    dom.heldBanner.style.display = 'none';
  }
}

function renderPosCatalog() {
  const grid = dom.posItemsGrid;
  grid.innerHTML = '';

  const filtered = state.products.filter(p => {
    const matchCat = state.activeCategory === 'all' || p.cat === state.activeCategory;
    const matchQuery = !state.searchQuery ||
      p.name.toLowerCase().includes(state.searchQuery) ||
      (p.brand && p.brand.toLowerCase().includes(state.searchQuery)) ||
      (p.barcode && p.barcode.includes(state.searchQuery));
    return matchCat && matchQuery;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; color: var(--text-dim); padding: 3rem;">
        <p style="font-size: 1.25rem;">কোন পণ্য পাওয়া যায়নি</p>
        <small>ক্যাটাগরি বা নাম পরিবর্তন করে আবার চেষ্টা করুন অথবা নতুন পণ্য যোগ করুন।</small>
      </div>
    `;
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = 'pos-item-card';
    card.onclick = () => onProductSelect(p);

    const isLow = p.stock > 0 && p.stock <= 5;
    const isOut = p.stock <= 0;
    const stockClass = isOut ? 'item-stock-tag out' : (isLow ? 'item-stock-tag low' : 'item-stock-tag');
    const stockText = isOut ? 'স্টক শেষ' : `${p.stock} ${p.unit}`;

    card.innerHTML = `
      <div>
        <div class="card-thumb-wrap">
          ${p.image ? `<img src="${p.image}" alt="${p.name}">` : `<span class="default-thumb-icon">📦</span>`}
          ${p.warranty && p.warranty !== 'কোন ওয়ারেন্টি নেই' ? `<span class="item-warranty-tag">🛡️ ${p.warranty}</span>` : ''}
        </div>
        <div class="item-badge-row">
          <span class="item-cat-label">${p.cat}</span>
          ${p.hasSerial ? `<span style="font-size:0.68rem;color:#38bdf8;font-weight:700;">SN/IMEI</span>` : ''}
        </div>
        <h4 class="item-main-title">${p.name}</h4>
        <p class="item-brand-sub">${p.brand || 'জেনেরিক'}</p>
      </div>
      <div class="item-card-bottom">
        <span class="item-sell-price">${formatTk(p.price)}</span>
        <span class="${stockClass}">স্টক: ${stockText}</span>
      </div>
    `;
    grid.appendChild(card);
  });
}

function onProductSelect(product) {
  if (product.stock <= 0) {
    alert('এই পণ্যটির স্টক শেষ হয়ে গেছে!');
    return;
  }

  // If requires serial/IMEI tracking, prompt dialog
  if (product.hasSerial) {
    state.pendingSerialProduct = product;
    dom.serialProdInfoText.textContent = `পণ্য: ${product.name} | ওয়ারেন্টি: ${product.warranty || 'নাই'}`;
    dom.serialInputField.value = '';
    dom.modalPosSerial.classList.add('show');
    setTimeout(() => dom.serialInputField.focus(), 150);
    return;
  }

  addItemToCart(product, null);
}

function addItemToCart(product, serialNumber) {
  const existing = state.cart.find(i => i.id === product.id && (!product.hasSerial || i.serial === serialNumber));

  if (existing) {
    if (existing.qty + 1 > product.stock) {
      alert(`স্টকে আর পর্যাপ্ত পণ্য নেই! সর্বোচ্চ উপলব্ধ: ${product.stock} ${product.unit}`);
      return;
    }
    existing.qty += 1;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      cat: product.cat,
      price: product.price,
      cost: product.cost,
      unit: product.unit,
      warranty: product.warranty,
      image: product.image,
      serial: serialNumber || '',
      qty: 1
    });
  }

  recalculateCart();
  renderCart();

  if (dom.posFloatingCartBar) {
    dom.posFloatingCartBar.classList.add('bounce');
    setTimeout(() => {
      if (dom.posFloatingCartBar) dom.posFloatingCartBar.classList.remove('bounce');
    }, 280);
  }
}

function renderCart() {
  const container = dom.cartTableContainer;
  container.innerHTML = '';

  const totalItems = state.cart.reduce((s, it) => s + it.qty, 0);
  dom.cartTotalBadge.textContent = `${totalItems} আইটেম`;
  dom.navCartPill.textContent = totalItems;
  dom.navCartPill.style.display = totalItems > 0 ? 'inline-block' : 'none';

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-view">
        <span class="icon">🛒</span>
        <p>কার্ট খালি আছে</p>
        <small>বাম পাশের প্রোডাক্টে ক্লিক করে একাধিক পণ্য যোগ করুন</small>
      </div>
    `;
    return;
  }

  state.cart.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'cart-entry-card';
    const sub = item.price * item.qty;

    card.innerHTML = `
      <div class="entry-top-line">
        ${item.image ? `<img class="entry-thumb" src="${item.image}">` : `<div class="entry-thumb" style="display:flex;align-items:center;justify-content:center;font-size:1.2rem;">📦</div>`}
        <div class="entry-info">
          <div class="entry-title">${item.name}</div>
          ${item.serial ? `<div class="entry-serial-badge">🏷️ SN/IMEI: ${item.serial}</div>` : ''}
          ${item.warranty && item.warranty !== 'কোন ওয়ারেন্টি নেই' ? `<small style="color:var(--text-dim);font-size:0.7rem;">🛡️ ${item.warranty}</small>` : ''}
        </div>
        <button class="entry-remove-btn" onclick="removeCartPosItem(${idx})" title="মুছুন">✕</button>
      </div>
      <div class="entry-bottom-line">
        <div class="stepper-box">
          <button class="stepper-btn" onclick="stepCartQty(${idx}, -1)">-</button>
          <span class="stepper-num">${item.qty}</span>
          <button class="stepper-btn" onclick="stepCartQty(${idx}, 1)">+</button>
          <span style="font-size:0.72rem;color:var(--text-dim);margin-left:2px;">${item.unit}</span>
        </div>
        <div class="entry-total-price">${formatTk(sub)}</div>
      </div>
    `;
    container.appendChild(card);
  });
}

window.stepCartQty = function(idx, delta) {
  const it = state.cart[idx];
  if (!it) return;

  const original = state.products.find(p => p.id === it.id);
  const nextQty = it.qty + delta;

  if (nextQty <= 0) {
    removeCartPosItem(idx);
    return;
  }

  if (original && nextQty > original.stock) {
    alert(`স্টকে সর্বোচ্চ ${original.stock} ${it.unit} পণ্য উপলব্ধ আছে!`);
    return;
  }

  it.qty = nextQty;
  recalculateCart();
  renderCart();

  if (dom.posFloatingCartBar) {
    dom.posFloatingCartBar.classList.add('bounce');
    setTimeout(() => {
      if (dom.posFloatingCartBar) dom.posFloatingCartBar.classList.remove('bounce');
    }, 280);
  }
};

window.removeCartPosItem = function(idx) {
  state.cart.splice(idx, 1);
  recalculateCart();
  renderCart();

  if (dom.posFloatingCartBar) {
    dom.posFloatingCartBar.classList.add('bounce');
    setTimeout(() => {
      if (dom.posFloatingCartBar) dom.posFloatingCartBar.classList.remove('bounce');
    }, 280);
  }
};

function recalculateCart() {
  const subtotal = state.cart.reduce((s, it) => s + (it.price * it.qty), 0);
  const discount = Math.max(0, Number(dom.cartDiscountInput.value) || 0);
  const grandTotal = Math.max(0, subtotal - discount);

  dom.cartSubtotalVal.textContent = formatTk(subtotal);
  dom.cartNetTotalVal.textContent = formatTk(grandTotal);

  if (state.paymentMethod === 'due') {
    dom.cartPaidInput.value = 0;
  } else if (!dom.cartPaidInput.dataset.userTouched) {
    dom.cartPaidInput.value = grandTotal;
  }

  const paid = Math.max(0, Number(dom.cartPaidInput.value) || 0);
  const due = Math.max(0, grandTotal - paid);

  dom.cartDueVal.textContent = formatTk(due);
  dom.cartDueRow.style.display = due > 0 ? 'flex' : 'none';

  const totalItems = state.cart.reduce((s, it) => s + it.qty, 0);
  if (dom.floatingCartCount) dom.floatingCartCount.textContent = `${totalItems}`;
  if (dom.floatingCartTotal) dom.floatingCartTotal.textContent = formatTk(grandTotal);
}

dom.cartPaidInput.addEventListener('focus', () => {
  dom.cartPaidInput.dataset.userTouched = 'true';
});

// POS Checkout
function handlePosCheckout() {
  if (state.cart.length === 0) {
    alert('বিল করার জন্য প্রথমে পণ্য কার্টে যুক্ত করুন!');
    return;
  }

  const subtotal = state.cart.reduce((s, it) => s + (it.price * it.qty), 0);
  const discount = Math.max(0, Number(dom.cartDiscountInput.value) || 0);
  const grandTotal = Math.max(0, subtotal - discount);
  const paid = Math.max(0, Number(dom.cartPaidInput.value) || 0);
  const due = Math.max(0, grandTotal - paid);

  const customerId = dom.posCustomerSelect.value;
  let customerObj = null;

  if (customerId !== 'walk-in') {
    customerObj = state.customers.find(c => c.id === customerId);
  }

  if (due > 0 && customerId === 'walk-in') {
    const proceed = confirm('বাকি বিলের জন্য কাস্টমার সিলেক্ট করা নিরাপদ। আপনি কি নগদ কাস্টমার হিসেবেই বাকি রাখতে চান?');
    if (!proceed) return;
  }

  const invoiceNo = 'INV-' + new Date().getFullYear() + '-' + String(state.sales.length + 101).padStart(4, '0');
  const now = new Date();

  const saleRecord = {
    id: 'sale-' + Date.now(),
    invoiceNo: invoiceNo,
    timestamp: now.toISOString(),
    formattedDate: now.toLocaleDateString('bn-BD', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    customer: customerObj ? { id: customerObj.id, name: customerObj.name, phone: customerObj.phone, address: customerObj.address } : { name: 'খুচরা নগদ ক্রেতা', phone: 'প্রযোজ্য নয়', address: 'লোকাল' },
    items: JSON.parse(JSON.stringify(state.cart)),
    subtotal: subtotal,
    discount: discount,
    grandTotal: grandTotal,
    paid: paid,
    due: due,
    paymentMethod: state.paymentMethod
  };

  // 1. Decrement Stock
  state.cart.forEach(item => {
    const prod = state.products.find(p => p.id === item.id);
    if (prod) {
      prod.stock = Math.max(0, prod.stock - item.qty);
    }
  });

  // 2. Update Customer Due
  if (customerObj && due > 0) {
    customerObj.due = (customerObj.due || 0) + due;
  }

  // 3. Save Sale
  state.sales.unshift(saleRecord);
  persist();

  // Close Mobile Cart Overlay if open
  if (dom.posCartPane) dom.posCartPane.classList.remove('open');
  if (dom.posCartBackdrop) dom.posCartBackdrop.classList.remove('open');

  // 4. Show Printable Cash Memo
  renderAndShowMemo(saleRecord);

  // 5. Reset Cart
  state.cart = [];
  dom.cartDiscountInput.value = 0;
  dom.cartPaidInput.value = 0;
  delete dom.cartPaidInput.dataset.userTouched;
  recalculateCart();
  renderCart();
  renderPosCatalog();
  refreshGlobalStats();
}

// ================= PRINTABLE CASH MEMO =================
function renderAndShowMemo(sale) {
  // Store details
  document.getElementById('out-memo-shop-name-bn').textContent = state.settings.shopNameBn;
  document.getElementById('out-memo-shop-name-en').textContent = state.settings.shopNameEn;
  document.getElementById('out-memo-shop-address').textContent = state.settings.shopAddress;
  document.getElementById('out-memo-shop-phone').textContent = state.settings.shopPhone;

  // Invoice Meta
  const custName = (typeof sale.customer === 'object' && sale.customer !== null) ? (sale.customer.name || 'খুচরা ক্রেতা') : (sale.customer || 'খুচরা ক্রেতা');
  const custPhone = (typeof sale.customer === 'object' && sale.customer !== null) ? (sale.customer.phone || '—') : '—';
  const custAddr = (typeof sale.customer === 'object' && sale.customer !== null) ? (sale.customer.address || '—') : '—';

  document.getElementById('out-memo-no').textContent = sale.invoiceNo || sale.id || 'INV-001';
  document.getElementById('out-memo-date').textContent = sale.formattedDate || (sale.timestamp ? sale.timestamp.slice(0, 10) : 'আজ');
  document.getElementById('out-memo-cust-name').textContent = custName;
  document.getElementById('out-memo-cust-phone').textContent = custPhone;
  document.getElementById('out-memo-cust-address').textContent = custAddr;

  // Table items
  const tbody = document.getElementById('out-memo-tbody');
  tbody.innerHTML = '';

  sale.items.forEach((it, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="text-center">${idx + 1}</td>
      <td>
        <strong>${it.name}</strong>
      </td>
      <td>
        ${it.serial ? `<span class="memo-item-sn">${it.serial}</span>` : '<span style="color:#94a3b8;">—</span>'}
      </td>
      <td>${it.warranty || 'নাই'}</td>
      <td class="text-center">${it.qty} ${it.unit}</td>
      <td class="text-right">${formatTk(it.price)}</td>
      <td class="text-right">${formatTk(it.price * it.qty)}</td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById('out-memo-words').textContent = numberToWordsBangla(sale.grandTotal);
  document.getElementById('out-memo-subtotal').textContent = formatTk(sale.subtotal);
  document.getElementById('out-memo-discount').textContent = '- ' + formatTk(sale.discount);
  document.getElementById('out-memo-grand').textContent = formatTk(sale.grandTotal);
  document.getElementById('out-memo-paid').textContent = formatTk(sale.paid);
  document.getElementById('out-memo-due').textContent = formatTk(sale.due);

  const chip = document.getElementById('out-memo-status-chip');
  if (sale.due <= 0) {
    chip.className = 'memo-paid-chip';
    chip.textContent = 'পরিশোধিত (PAID)';
  } else {
    chip.className = 'memo-paid-chip due';
    chip.textContent = `বাকি (DUE ৳ ${sale.due})`;
  }

  dom.modalInvoiceDialog.classList.add('show');
}

window.viewInvoice = function(saleId) {
  const sale = state.sales.find(s => s.id === saleId);
  if (sale) renderAndShowMemo(sale);
};

// Size switch & print trigger
dom.btnInvokePrint.addEventListener('click', () => {
  window.print();
});

dom.sizePills.forEach(pill => {
  pill.addEventListener('click', () => {
    dom.sizePills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    if (pill.dataset.size === 'a5') {
      dom.printableMemoSheet.classList.add('size-a5');
    } else {
      dom.printableMemoSheet.classList.remove('size-a5');
    }
  });
});

// ================= 3. INVENTORY & PRODUCT MANAGEMENT =================
function setupInventory() {
  dom.invSearchBox.addEventListener('input', renderInventoryMaster);
  dom.invFilterCat.addEventListener('change', renderInventoryMaster);
  dom.invFilterStockStatus.addEventListener('change', renderInventoryMaster);

  // Open modal
  dom.btnOpenCreateProduct.addEventListener('click', () => {
    dom.formCreateProduct.reset();
    state.uploadedBase64Image = '';
    dom.productImgPreview.style.display = 'none';
    dom.productImgPlaceholder.style.display = 'block';
    dom.btnRemovePhoto.style.display = 'none';
    renderCategoryComponents();
    dom.modalAddProduct.classList.add('show');
  });

  // Handle Photo Upload with HTML5 Canvas auto compression
  dom.inpProductFile.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = evt => {
      const img = new Image();
      img.onload = () => {
        // Compress image to 320x320 max
        const canvas = document.createElement('canvas');
        const maxDim = 320;
        let w = img.width;
        let h = img.height;
        if (w > h) {
          if (w > maxDim) { h = Math.round((h * maxDim) / w); w = maxDim; }
        } else {
          if (h > maxDim) { w = Math.round((w * maxDim) / h); h = maxDim; }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.85);

        state.uploadedBase64Image = compressedBase64;
        dom.productImgPreview.src = compressedBase64;
        dom.productImgPreview.style.display = 'block';
        dom.productImgPlaceholder.style.display = 'none';
        dom.btnRemovePhoto.style.display = 'block';
      };
      img.src = evt.target.result;
    };
    reader.readAsDataURL(file);
  });

  dom.btnRemovePhoto.addEventListener('click', () => {
    state.uploadedBase64Image = '';
    dom.inpProductFile.value = '';
    dom.productImgPreview.style.display = 'none';
    dom.productImgPlaceholder.style.display = 'block';
    dom.btnRemovePhoto.style.display = 'none';
  });

  // Form submit
  dom.formCreateProduct.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('inp-p-name').value.trim();
    const cat = document.getElementById('inp-p-cat').value;
    const brand = document.getElementById('inp-p-brand').value.trim();
    const unit = document.getElementById('inp-p-unit').value;
    const barcode = document.getElementById('inp-p-barcode').value.trim() || 'MT-' + Math.floor(100000 + Math.random() * 900000);
    const cost = Number(document.getElementById('inp-p-cost').value) || 0;
    const price = Number(document.getElementById('inp-p-price').value) || 0;
    const stock = Number(document.getElementById('inp-p-stock').value) || 0;
    const warranty = document.getElementById('inp-p-warranty').value;
    const hasSerial = document.getElementById('inp-p-has-serial').checked;

    const img = state.uploadedBase64Image || createProductSvg('#2563EB', name.substring(0, 10));

    const newProduct = {
      id: 'prod-' + Date.now(),
      name,
      cat,
      brand,
      unit,
      barcode,
      cost,
      price,
      stock,
      warranty,
      hasSerial,
      image: img
    };

    state.products.unshift(newProduct);
    persist('products');
    dom.modalAddProduct.classList.remove('show');
    renderInventoryMaster();
    renderPosCatalog();
    refreshGlobalStats();
    alert('নতুন পণ্য সফলভাবে স্টকে যোগ করা হয়েছে!');
  });
}

function renderInventoryMaster() {
  const tbody = dom.inventoryMasterTbody;
  tbody.innerHTML = '';

  const q = dom.invSearchBox.value.trim().toLowerCase();
  const cat = dom.invFilterCat.value;
  const stockSt = dom.invFilterStockStatus.value;

  const filtered = state.products.filter(p => {
    const matchQ = !q || p.name.toLowerCase().includes(q) || (p.brand && p.brand.toLowerCase().includes(q)) || (p.barcode && p.barcode.includes(q));
    const matchCat = cat === 'all' || p.cat === cat;
    let matchStock = true;
    if (stockSt === 'low') matchStock = p.stock > 0 && p.stock <= 5;
    if (stockSt === 'out') matchStock = p.stock <= 0;
    return matchQ && matchCat && matchStock;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" class="text-center" style="padding:2.5rem;color:var(--text-dim);">কোনো পণ্য খুঁজে পাওয়া যায়নি</td></tr>`;
    return;
  }

  filtered.forEach(p => {
    const tr = document.createElement('tr');
    const isLow = p.stock > 0 && p.stock <= 5;
    const isOut = p.stock <= 0;
    const stockBadge = isOut ? `<span class="item-stock-tag out">০ (শেষ)</span>` : (isLow ? `<span class="item-stock-tag low">${p.stock} (কম)</span>` : `<b>${p.stock}</b>`);

    tr.innerHTML = `
      <td>
        ${p.image ? `<img src="${p.image}" class="table-thumb" alt="${p.name}">` : `<div class="table-thumb-placeholder">📦</div>`}
      </td>
      <td>
        <strong>${p.name}</strong>
        <br><small style="color:var(--text-dim);">ব্র্যান্ড: ${p.brand || 'জেনেরিক'} | SKU: ${p.barcode}</small>
      </td>
      <td><span class="item-cat-label">${p.cat}</span></td>
      <td>${p.unit}</td>
      <td>${p.warranty}</td>
      <td class="text-right">${formatTk(p.cost)}</td>
      <td class="text-right"><strong>${formatTk(p.price)}</strong></td>
      <td class="text-center">${stockBadge}</td>
      <td class="text-center">
        <button class="btn-table-action" onclick="restockInvProduct('${p.id}')">+ স্টক ইন</button>
        <button class="btn-table-action danger" onclick="deleteInvProduct('${p.id}')">মুছুন</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

window.restockInvProduct = function(id) {
  const prod = state.products.find(p => p.id === id);
  if (!prod) return;
  const val = prompt(`"${prod.name}" এর কত ${prod.unit} নতুন মাল স্টকে যোগ করতে চান?`, '10');
  const qty = parseInt(val, 10);
  if (qty && qty > 0) {
    prod.stock += qty;
    persist('products');
    renderInventoryMaster();
    renderPosCatalog();
    refreshGlobalStats();
    alert(`সফলভাবে ${qty} ${prod.unit} নতুন স্টক যোগ হয়েছে!`);
  }
};

window.deleteInvProduct = function(id) {
  const prod = state.products.find(p => p.id === id);
  if (!prod) return;
  if (confirm(`আপনি কি নিশ্চিতভাবে "${prod.name}" মুছে ফেলতে চান?`)) {
    state.products = state.products.filter(p => p.id !== id);
    persist('products');
    renderInventoryMaster();
    renderPosCatalog();
    refreshGlobalStats();
  }
};

// ================= 4. WARRANTY CHECKER TOOL =================
function setupWarranty() {
  dom.btnRunWarrantyCheck.addEventListener('click', runWarrantyVerification);
  dom.warrantyQueryInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') runWarrantyVerification();
  });
}

function runWarrantyVerification() {
  const query = dom.warrantyQueryInput.value.trim().toLowerCase();
  const resContainer = dom.warrantyResultsContainer;

  if (!query) {
    alert('অনুগ্রহ করে মেমো নং, সিরিয়াল নম্বর বা IMEI টাইপ করুন!');
    return;
  }

  // Find in all sales
  let matches = [];
  state.sales.forEach(sale => {
    sale.items.forEach(it => {
      const matchInv = sale.invoiceNo.toLowerCase().includes(query);
      const matchSerial = it.serial && it.serial.toLowerCase().includes(query);
      if (matchInv || matchSerial) {
        matches.push({ sale, item: it });
      }
    });
  });

  if (matches.length === 0) {
    resContainer.innerHTML = `
      <div class="empty-placeholder" style="border:1px dashed var(--border-subtle);border-radius:var(--radius-lg);margin-top:1rem;">
        <span class="icon">⚠️</span>
        <h3>কোনো বিক্রয় রেকর্ড পাওয়া যায়নি!</h3>
        <p>"${query}" নম্বর দিয়ে কোনো ক্যাশ মেমো বা ডিভাইস আমাদের সিস্টেমে নথিভুক্ত নেই।</p>
      </div>
    `;
    return;
  }

  resContainer.innerHTML = '';
  matches.forEach(m => {
    const saleDate = new Date(m.sale.timestamp);
    let days = 365;
    const w = m.item.warranty || '';
    if (w.includes('১ মাস')) days = 30;
    if (w.includes('৬ মাস')) days = 180;
    if (w.includes('১ বছর')) days = 365;
    if (w.includes('২ বছর')) days = 730;
    if (w.includes('৩ বছর')) days = 1095;
    if (w.includes('৫ বছর')) days = 1825;
    if (w.includes('লাইফটাইম')) days = 3650;
    if (w.includes('কোন ওয়ারেন্টি নেই')) days = 0;

    const expiryDate = new Date(saleDate);
    expiryDate.setDate(expiryDate.getDate() + days);

    const now = new Date();
    const diffTime = expiryDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const isValid = days > 0 && diffDays > 0;

    const wCustName = (typeof m.sale.customer === 'object' && m.sale.customer !== null) ? (m.sale.customer.name || 'খুচরা ক্রেতা') : (m.sale.customer || 'খুচরা ক্রেতা');
    const wCustPhone = (typeof m.sale.customer === 'object' && m.sale.customer !== null) ? (m.sale.customer.phone || '') : '';
    const wInvoiceNo = m.sale.invoiceNo || m.sale.id || 'INV-001';
    const wDate = m.sale.formattedDate || (m.sale.timestamp ? m.sale.timestamp.slice(0, 10) : 'আজ');

    const card = document.createElement('div');
    card.className = `warranty-result-card ${isValid ? '' : 'expired'}`;
    card.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:1rem;">
        <div>
          <span class="memo-paid-chip ${isValid ? '' : 'due'}" style="font-size:0.85rem;padding:0.25rem 0.65rem;">
            ${isValid ? `✅ ওয়ারেন্টি কার্যকর (বাকি আছে ${diffDays} দিন)` : '❌ ওয়ারেন্টির মেয়াদ উত্তীর্ণ'}
          </span>
          <h3 style="font-size:1.25rem;color:#fff;margin-top:0.6rem;">${m.item.name}</h3>
          ${m.item.serial ? `<p style="color:#38bdf8;font-weight:700;margin-top:0.2rem;">🏷️ Serial/IMEI: ${m.item.serial}</p>` : ''}
        </div>
        <button class="btn-primary-action" onclick="viewInvoice('${m.sale.id}')">📄 মূল মেমো দেখুন</button>
      </div>
      <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:1rem 0;">
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1rem;font-size:0.88rem;">
        <div><strong>ইনভয়েস নং:</strong> <br>${wInvoiceNo}</div>
        <div><strong>বিক্রয় তারিখ:</strong> <br>${wDate}</div>
        <div><strong>ওয়ারেন্টি মেয়াদ:</strong> <br>${m.item.warranty}</div>
        <div><strong>মেয়াদ শেষ হওয়ার তারিখ:</strong> <br>${days > 0 ? expiryDate.toLocaleDateString('bn-BD', { year:'numeric', month:'long', day:'numeric' }) : 'প্রযোজ্য নয়'}</div>
        <div><strong>কাস্টমারের নাম:</strong> <br>${wCustName} ${wCustPhone ? `(${wCustPhone})` : ''}</div>
      </div>
    `;
    resContainer.appendChild(card);
  });
}

// ================= 5. CUSTOMERS & BAKIR KHATA =================
function setupCustomers() {
  dom.btnOpenCreateCustomer.addEventListener('click', () => {
    dom.formCreateCustomer.reset();
    dom.modalAddCustomer.classList.add('show');
  });

  dom.formCreateCustomer.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('inp-c-name').value.trim();
    const phone = document.getElementById('inp-c-phone').value.trim();
    const address = document.getElementById('inp-c-address').value.trim();
    const due = Number(document.getElementById('inp-c-due').value) || 0;

    const newCust = {
      id: 'cust-' + Date.now(),
      name,
      phone,
      address,
      due
    };

    state.customers.push(newCust);
    persist('customers');
    dom.modalAddCustomer.classList.remove('show');
    renderCustomerMaster();
    updatePosCustomerDropdown();
    refreshGlobalStats();
    alert('নতুন কাস্টমার সংরক্ষণ করা হয়েছে!');
  });

  // Collect Due Form
  dom.formSubmitDue.addEventListener('submit', e => {
    e.preventDefault();
    const custId = dom.formSubmitDue.dataset.targetCustId;
    const cust = state.customers.find(c => c.id === custId);
    if (!cust) return;

    const amount = Number(dom.inpDueAmountCollect.value) || 0;
    if (amount <= 0) return;

    cust.due = Math.max(0, (cust.due || 0) - amount);
    persist('customers');
    dom.modalCollectDue.classList.remove('show');
    renderCustomerMaster();
    updatePosCustomerDropdown();
    refreshGlobalStats();
    alert(`৳ ${amount} টাকা জমা নেওয়া হয়েছে! বর্তমান বাকি: ৳ ${cust.due}`);
  });
}

function renderCustomerMaster() {
  const tbody = dom.customerMasterTbody;
  tbody.innerHTML = '';

  if (state.customers.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center" style="padding:2.5rem;color:var(--text-dim);">কোনো কাস্টমার তালিকাভুক্ত নেই</td></tr>`;
    return;
  }

  state.customers.forEach(c => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${c.name}</strong></td>
      <td>${c.phone}</td>
      <td>${c.address || '—'}</td>
      <td class="text-right ${c.due > 0 ? 'text-danger' : 'text-green'}">
        <strong>${formatTk(c.due || 0)}</strong>
      </td>
      <td class="text-center">
        ${c.due > 0 ? `<button class="btn-table-action" onclick="openDueCollectModal('${c.id}')">💵 টাকা জমা নিন</button>` : `<span style="color:var(--text-dim);font-size:0.8rem;">বাকি নেই</span>`}
      </td>
      <td class="text-center">
        <button class="btn-table-action danger" onclick="deleteCustomer('${c.id}')">মুছুন</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  updatePosCustomerDropdown();
}

function updatePosCustomerDropdown() {
  const sel = dom.posCustomerSelect;
  const cur = sel.value;
  sel.innerHTML = `<option value="walk-in">খুচরা ক্রেতা (নগদ কাস্টমার)</option>`;

  state.customers.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.id;
    opt.textContent = `${c.name} (${c.phone})${c.due > 0 ? ' - বাকি: ' + formatTk(c.due) : ''}`;
    sel.appendChild(opt);
  });

  sel.value = cur || 'walk-in';
}

window.openDueCollectModal = function(id) {
  const c = state.customers.find(item => item.id === id);
  if (!c) return;
  dom.formSubmitDue.dataset.targetCustId = id;
  dom.dueCustHeaderInfo.textContent = `কাস্টমার: ${c.name} | বর্তমান মোট বাকি: ${formatTk(c.due)}`;
  dom.inpDueAmountCollect.value = c.due;
  dom.inpDueAmountCollect.max = c.due;
  dom.modalCollectDue.classList.add('show');
};

window.deleteCustomer = function(id) {
  const c = state.customers.find(item => item.id === id);
  if (!c) return;
  if (confirm(`আপনি কি "${c.name}" কাস্টমার প্রোফাইলটি মুছে ফেলতে চান?`)) {
    state.customers = state.customers.filter(item => item.id !== id);
    persist('customers');
    renderCustomerMaster();
    refreshGlobalStats();
  }
};

// ================= 6. EXPENSES =================
function setupExpenses() {
  dom.btnOpenCreateExpense.addEventListener('click', () => {
    dom.formCreateExpense.reset();
    dom.modalAddExpense.classList.add('show');
  });

  dom.formCreateExpense.addEventListener('submit', e => {
    e.preventDefault();
    const title = document.getElementById('inp-e-title').value.trim();
    const amount = Number(document.getElementById('inp-e-amount').value) || 0;
    const note = document.getElementById('inp-e-note').value.trim();

    const newExp = {
      id: 'exp-' + Date.now(),
      title,
      amount,
      note,
      date: new Date().toISOString().split('T')[0]
    };

    state.expenses.unshift(newExp);
    persist('expenses');
    dom.modalAddExpense.classList.remove('show');
    renderExpenseMaster();
    refreshGlobalStats();
    alert('খরচ সফলভাবে এন্ট্রি হয়েছে!');
  });
}

function renderExpenseMaster() {
  const tbody = dom.expenseMasterTbody;
  tbody.innerHTML = '';

  if (state.expenses.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center" style="padding:2.5rem;color:var(--text-dim);">কোনো খরচ এন্ট্রি করা হয়নি</td></tr>`;
    return;
  }

  state.expenses.forEach(e => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${e.date}</td>
      <td><strong>${e.title}</strong></td>
      <td>${e.note || '—'}</td>
      <td class="text-right" style="color:#fbbf24;font-weight:700;">${formatTk(e.amount)}</td>
      <td class="text-center">
        <button class="btn-table-action danger" onclick="deleteExpenseEntry('${e.id}')">মুছুন</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

window.deleteExpenseEntry = function(id) {
  if (confirm('আপনি কি এই খরচের হিসাবটি মুছে ফেলতে চান?')) {
    state.expenses = state.expenses.filter(e => e.id !== id);
    persist('expenses');
    renderExpenseMaster();
    refreshGlobalStats();
  }
};

// ================= 7. ANNUAL & MONTHLY FINANCIAL REPORTS =================
let currentReportPeriod = 'yearly';

function setupReports() {
  if (dom.reportPeriodToggle) {
    const btns = dom.reportPeriodToggle.querySelectorAll('.mode-tab-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentReportPeriod = btn.dataset.period;

        if (currentReportPeriod === 'yearly') {
          if (dom.selReportYear) dom.selReportYear.style.display = 'block';
          if (dom.selReportMonth) dom.selReportMonth.style.display = 'none';
          if (dom.inpReportDate) dom.inpReportDate.style.display = 'none';
        } else if (currentReportPeriod === 'monthly') {
          if (dom.selReportYear) dom.selReportYear.style.display = 'block';
          if (dom.selReportMonth) dom.selReportMonth.style.display = 'block';
          if (dom.inpReportDate) dom.inpReportDate.style.display = 'none';
        } else if (currentReportPeriod === 'daily') {
          if (dom.selReportYear) dom.selReportYear.style.display = 'none';
          if (dom.selReportMonth) dom.selReportMonth.style.display = 'none';
          if (dom.inpReportDate) {
            dom.inpReportDate.style.display = 'block';
            if (!dom.inpReportDate.value) {
              dom.inpReportDate.value = new Date().toISOString().split('T')[0];
            }
          }
        }
        renderReportsMaster();
      });
    });
  }

  if (dom.selReportYear) dom.selReportYear.addEventListener('change', renderReportsMaster);
  if (dom.selReportMonth) dom.selReportMonth.addEventListener('change', renderReportsMaster);
  if (dom.inpReportDate) dom.inpReportDate.addEventListener('change', renderReportsMaster);

  if (dom.btnPrintReport) {
    dom.btnPrintReport.addEventListener('click', printFinancialReport);
  }

  if (dom.btnExportReportCsv) {
    dom.btnExportReportCsv.addEventListener('click', exportFinancialReportCsv);
  }
}

function renderReportsMaster() {
  const selectedYear = dom.selReportYear ? dom.selReportYear.value : '2026';
  const selectedMonth = dom.selReportMonth ? dom.selReportMonth.value : '10';
  const selectedDate = dom.inpReportDate && dom.inpReportDate.value ? dom.inpReportDate.value : new Date().toISOString().split('T')[0];

  const monthNamesBn = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
  const monthNamesEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  if (currentReportPeriod === 'yearly') {
    renderYearlyReport(selectedYear, monthNamesBn, monthNamesEn);
  } else if (currentReportPeriod === 'monthly') {
    renderMonthlyReport(selectedYear, selectedMonth, monthNamesBn, monthNamesEn);
  } else if (currentReportPeriod === 'daily') {
    renderDailyReport(selectedDate);
  }
}

function renderYearlyReport(year, monthNamesBn, monthNamesEn) {
  if (dom.rkLabelSales) dom.rkLabelSales.textContent = `${year} বাৎসরিক মোট বিক্রয়`;
  if (dom.rkLabelExpenses) dom.rkLabelExpenses.textContent = `${year} মোট দোকান খরচ`;
  if (dom.rkLabelProfit) dom.rkLabelProfit.textContent = `${year} চূড়ান্ত নিট লাভ`;
  if (dom.reportSalesSub) dom.reportSalesSub.textContent = `১২ মাসের সর্বমোট টার্নওভার`;
  if (dom.reportChartTitle) dom.reportChartTitle.textContent = `📊 ${year} সালের ১২ মাসের আয়, খরচ ও নিট লাভ তুলনা`;
  if (dom.reportChartSub) dom.reportChartSub.textContent = `জানুয়ারি থেকে ডিসেম্বর পর্যন্ত মাসওয়ারী বিক্রয় ও লাভের অ্যানালাইসিস`;
  if (dom.reportTableTitle) dom.reportTableTitle.textContent = `📑 ${year} সালের মাসভিত্তিক পূর্ণাঙ্গ আর্থিক অডিট ছক`;

  let totalSales = 0;
  let totalCogs = 0;
  let totalExpenses = 0;

  const monthlyBreakdown = [];

  for (let m = 0; m < 12; m++) {
    const monthKey = `${year}-${String(m + 1).padStart(2, '0')}`;
    let mSales = 0;
    let mCogs = 0;
    let mExpenses = 0;

    state.sales.forEach(s => {
      if (s.timestamp && s.timestamp.startsWith(monthKey)) {
        mSales += (s.grandTotal || 0);
        if (s.items && Array.isArray(s.items)) {
          s.items.forEach(it => {
            const cost = it.cost || (it.price ? Math.round(it.price * 0.75) : 0);
            mCogs += (cost * (it.qty || 1));
          });
        }
      }
    });

    state.expenses.forEach(e => {
      if (e.date && e.date.startsWith(monthKey)) {
        mExpenses += (e.amount || 0);
      }
    });

    const mProfit = mSales - mCogs - mExpenses;
    const mMargin = mSales > 0 ? ((mProfit / mSales) * 100) : 0;

    totalSales += mSales;
    totalCogs += mCogs;
    totalExpenses += mExpenses;

    monthlyBreakdown.push({
      monthIdx: m,
      nameBn: monthNamesBn[m],
      nameEn: monthNamesEn[m],
      sales: mSales,
      cogs: mCogs,
      expenses: mExpenses,
      profit: mProfit,
      margin: mMargin
    });
  }

  const netProfit = totalSales - totalCogs - totalExpenses;
  const netMargin = totalSales > 0 ? ((netProfit / totalSales) * 100) : 0;

  if (dom.reportTotalSales) dom.reportTotalSales.textContent = formatTk(totalSales);
  if (dom.reportTotalCogs) dom.reportTotalCogs.textContent = formatTk(totalCogs);
  if (dom.reportTotalExpenses) dom.reportTotalExpenses.textContent = formatTk(totalExpenses);
  if (dom.reportNetProfit) {
    dom.reportNetProfit.textContent = formatTk(netProfit);
    dom.reportNetProfit.className = netProfit >= 0 ? 'rk-value text-emerald' : 'rk-value text-rose';
  }
  if (dom.reportProfitMargin) {
    dom.reportProfitMargin.textContent = `মার্জিন: ${netMargin.toFixed(1)}%`;
    dom.reportProfitMargin.style.background = netMargin >= 0 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)';
    dom.reportProfitMargin.style.color = netMargin >= 0 ? '#34d399' : '#fb7185';
  }

  render12MonthSvgChart(monthlyBreakdown);

  // Render Table
  if (dom.reportTableHeaders) {
    dom.reportTableHeaders.innerHTML = `
      <th>মাস (Month)</th>
      <th class="text-right">মোট বিক্রয় (৳)</th>
      <th class="text-right">মালের ক্রয়মূল্য (৳)</th>
      <th class="text-right">মোট খরচ (৳)</th>
      <th class="text-right">নিট লাভ (৳)</th>
      <th class="text-center">মার্জিন</th>
      <th class="text-center">স্ট্যাটাস</th>
    `;
  }

  if (dom.reportTableTbody) {
    dom.reportTableTbody.innerHTML = '';
    monthlyBreakdown.forEach(m => {
      const tr = document.createElement('tr');
      const isProfitable = m.profit > 0;
      const isZero = m.sales === 0 && m.expenses === 0;
      const statusBadge = isZero
        ? '<span class="status-pill status-neutral">⚪ অফ</span>'
        : (isProfitable
          ? '<span class="status-pill status-paid">🟢 লাভ</span>'
          : '<span class="status-pill status-due">🔴 লোকসান</span>');

      tr.innerHTML = `
        <td><strong>${m.nameBn} (${m.nameEn})</strong></td>
        <td class="text-right"><b>${formatTk(m.sales)}</b></td>
        <td class="text-right" style="color:var(--text-muted);">${formatTk(m.cogs)}</td>
        <td class="text-right" style="color:#fb7185;">${formatTk(m.expenses)}</td>
        <td class="text-right" style="color:${isProfitable ? '#34d399' : (isZero ? 'var(--text-muted)' : '#fb7185')};font-weight:700;">${formatTk(m.profit)}</td>
        <td class="text-center"><span class="rk-profit-badge" style="font-size:0.75rem;">${m.margin.toFixed(1)}%</span></td>
        <td class="text-center">${statusBadge}</td>
      `;
      dom.reportTableTbody.appendChild(tr);
    });
  }

  if (dom.reportTableTfoot) {
    dom.reportTableTfoot.innerHTML = `
      <tr>
        <td><strong>মোট বাৎসরিক সর্বমোট (${year})</strong></td>
        <td class="text-right" style="color:#38bdf8;font-size:1.05rem;">${formatTk(totalSales)}</td>
        <td class="text-right" style="color:#c084fc;">${formatTk(totalCogs)}</td>
        <td class="text-right" style="color:#fb7185;">${formatTk(totalExpenses)}</td>
        <td class="text-right" style="color:#34d399;font-size:1.05rem;">${formatTk(netProfit)}</td>
        <td class="text-center"><span class="rk-profit-badge" style="font-size:0.8rem;padding:3px 10px;">${netMargin.toFixed(1)}%</span></td>
        <td class="text-center"><span class="status-pill status-paid">🏆 সফল বছর</span></td>
      </tr>
    `;
  }
}

function render12MonthSvgChart(data) {
  if (!dom.reportsChartContainer) return;

  const maxVal = Math.max(...data.map(d => Math.max(d.sales, d.expenses, d.profit)), 10000);
  const ceiling = Math.ceil(maxVal / 10000) * 10000;

  const width = 760;
  const height = 280;
  const left = 55;
  const right = 25;
  const top = 35;
  const baseline = 220;
  const plotW = width - left - right;
  const usableH = baseline - top;
  const step = plotW / 12;

  let gridLines = '';
  [1, 0.75, 0.5, 0.25, 0].forEach(ratio => {
    const y = baseline - (ratio * usableH);
    const label = ratio === 0 ? '0' : Math.round((ceiling * ratio) / 1000) + 'k';
    gridLines += `
      <line x1="${left}" y1="${y}" x2="${width - right}" y2="${y}" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4,4"/>
      <text x="${left - 10}" y="${y + 4}" fill="#64748b" font-size="11" text-anchor="end">${label}</text>
    `;
  });

  let barsSvg = '';
  const points = [];
  data.forEach((d, i) => {
    const cx = left + (step * i) + (step / 2);
    const sH = Math.max(0, Math.round((d.sales / ceiling) * usableH));
    const eH = Math.max(0, Math.round((d.expenses / ceiling) * usableH));
    const pH = Math.max(0, Math.round((Math.max(0, d.profit) / ceiling) * usableH));

    const sY = baseline - sH;
    const eY = baseline - eH;
    const pY = baseline - pH;

    barsSvg += `
      <rect x="${cx - 16}" y="${sY}" width="14" height="${sH}" rx="4" fill="url(#repBlueBarGrad)" opacity="0.9" />
      <rect x="${cx + 2}" y="${eY}" width="14" height="${eH}" rx="4" fill="url(#repRedBarGrad)" opacity="0.9" />
    `;

    points.push({ cx, pY, d });
  });

  let curvePath = '';
  if (points.length > 0) {
    curvePath = `M ${points[0].cx.toFixed(1)} ${points[0].pY.toFixed(1)}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? 0 : i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2 < points.length ? i + 2 : i + 1];
      const cp1x = p1.cx + (p2.cx - p0.cx) * 0.18;
      const cp1y = p1.pY + (p2.pY - p0.pY) * 0.18;
      const cp2x = p2.cx - (p3.cx - p1.cx) * 0.18;
      const cp2y = p2.pY - (p3.pY - p1.pY) * 0.18;
      curvePath += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.cx.toFixed(1)} ${p2.pY.toFixed(1)}`;
    }
  }

  let overlaySvg = '';
  points.forEach(pt => {
    overlaySvg += `
      <circle cx="${pt.cx}" cy="${pt.pY}" r="4.5" fill="#ffffff" stroke="#10b981" stroke-width="2.5" />
      <text x="${pt.cx}" y="244" fill="#ffffff" font-size="11.5" font-weight="700" text-anchor="middle">${pt.d.nameBn.slice(0, 4)}</text>
      <text x="${pt.cx}" y="260" fill="#94a3b8" font-size="9.5" text-anchor="middle">${pt.d.nameEn}</text>
    `;
  });

  const svg = `
    <svg class="reports-month-svg" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="repBlueBarGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="100%" stop-color="#1d4ed8"/>
        </linearGradient>
        <linearGradient id="repRedBarGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#fb7185"/>
          <stop offset="100%" stop-color="#be123c"/>
        </linearGradient>
        <filter id="repGreenGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#10b981" flood-opacity="0.5"/>
        </filter>
      </defs>
      ${gridLines}
      ${barsSvg}
      <path d="${curvePath}" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" filter="url(#repGreenGlow)"/>
      ${overlaySvg}
    </svg>
  `;

  dom.reportsChartContainer.innerHTML = svg;
}

function renderMonthlyReport(year, monthIdx, monthNamesBn, monthNamesEn) {
  const m = parseInt(monthIdx, 10);
  const mStr = String(m + 1).padStart(2, '0');
  const monthKey = `${year}-${mStr}`;
  const mName = monthNamesBn[m] || 'চলতি মাস';

  if (dom.rkLabelSales) dom.rkLabelSales.textContent = `${mName} মাসের মোট বিক্রয়`;
  if (dom.rkLabelExpenses) dom.rkLabelExpenses.textContent = `${mName} মাসের মোট খরচ`;
  if (dom.rkLabelProfit) dom.rkLabelProfit.textContent = `${mName} মাসের নিট লাভ`;
  if (dom.reportSalesSub) dom.reportSalesSub.textContent = `${year} সালের ${mName} মাস`;
  if (dom.reportChartTitle) dom.reportChartTitle.textContent = `📊 ${mName} (${year}) এর দৈনিক বিক্রয় চিত্র`;
  if (dom.reportChartSub) dom.reportChartSub.textContent = `চলতি মাসের প্রতিদিনের বেচাকেনা ও খরচের গ্রাফ`;
  if (dom.reportTableTitle) dom.reportTableTitle.textContent = `📑 ${mName} মাসের তারিখভিত্তিক লেনদেন বিবরণী`;

  const mSales = state.sales.filter(s => s.timestamp && s.timestamp.startsWith(monthKey));
  const mExpenses = state.expenses.filter(e => e.date && e.date.startsWith(monthKey));

  let totSales = 0, totCogs = 0, totExp = 0;
  mSales.forEach(s => {
    totSales += (s.grandTotal || 0);
    if (s.items) s.items.forEach(it => {
      const cost = it.cost || Math.round((it.price || 0) * 0.75);
      totCogs += (cost * (it.qty || 1));
    });
  });
  mExpenses.forEach(e => { totExp += (e.amount || 0); });

  const netProf = totSales - totCogs - totExp;
  const netMarg = totSales > 0 ? (netProf / totSales) * 100 : 0;

  if (dom.reportTotalSales) dom.reportTotalSales.textContent = formatTk(totSales);
  if (dom.reportTotalCogs) dom.reportTotalCogs.textContent = formatTk(totCogs);
  if (dom.reportTotalExpenses) dom.reportTotalExpenses.textContent = formatTk(totExp);
  if (dom.reportNetProfit) {
    dom.reportNetProfit.textContent = formatTk(netProf);
    dom.reportNetProfit.className = netProf >= 0 ? 'rk-value text-emerald' : 'rk-value text-rose';
  }
  if (dom.reportProfitMargin) {
    dom.reportProfitMargin.textContent = `মার্জিন: ${netMarg.toFixed(1)}%`;
  }

  if (dom.reportTableHeaders) {
    dom.reportTableHeaders.innerHTML = `
      <th>ইনভয়েস / ভাউচার ID</th>
      <th>কাস্টমার / খরচের খাত</th>
      <th class="text-center">পদ্ধতি</th>
      <th class="text-right">টাকার পরিমাণ (৳)</th>
      <th class="text-center">ধরন</th>
      <th class="text-right">সময় ও তারিখ</th>
    `;
  }

  if (dom.reportTableTbody) {
    dom.reportTableTbody.innerHTML = '';
    const combined = [];
    mSales.forEach(s => combined.push({ id: s.id, title: s.customer || 'খুচরা ক্রেতা', type: 'বিক্রয়', amount: s.grandTotal, method: s.paymentMethod, time: s.timestamp }));
    mExpenses.forEach(e => combined.push({ id: e.id, title: e.title, type: 'দোকান খরচ', amount: e.amount, method: 'ক্যাশ', time: e.date }));

    combined.sort((a, b) => (b.time || '').localeCompare(a.time || ''));

    if (combined.length === 0) {
      dom.reportTableTbody.innerHTML = `<tr><td colspan="6" class="text-center" style="padding:1.5rem;color:var(--text-dim);">এই মাসে এখনও কোনো লেনদেন রেকর্ড নেই</td></tr>`;
    } else {
      combined.forEach(item => {
        const tr = document.createElement('tr');
        const isSale = item.type === 'বিক্রয়';
        tr.innerHTML = `
          <td><strong>${item.id}</strong></td>
          <td>${item.title}</td>
          <td class="text-center"><span class="memo-paid-chip" style="font-size:0.75rem;">${item.method === 'bkash' ? 'বিকাশ' : (item.method === 'due' ? 'বাকি' : 'নগদ')}</span></td>
          <td class="text-right" style="font-weight:700;color:${isSale ? '#38bdf8' : '#fb7185'};">${formatTk(item.amount)}</td>
          <td class="text-center"><span class="status-pill ${isSale ? 'status-paid' : 'status-due'}">${item.type}</span></td>
          <td class="text-right" style="color:var(--text-muted);font-size:0.8rem;">${item.time ? item.time.slice(0, 10) : ''}</td>
        `;
        dom.reportTableTbody.appendChild(tr);
      });
    }
  }

  if (dom.reportTableTfoot) {
    dom.reportTableTfoot.innerHTML = `
      <tr>
        <td colspan="3"><strong>${mName} সর্বমোট সারাংশ</strong></td>
        <td class="text-right" style="color:#34d399;font-weight:800;font-size:1.05rem;">নিট লাভ: ${formatTk(netProf)}</td>
        <td colspan="2" class="text-center">বিক্রি: ${formatTk(totSales)} | খরচ: ${formatTk(totExp)}</td>
      </tr>
    `;
  }
}

function renderDailyReport(dateStr) {
  if (dom.rkLabelSales) dom.rkLabelSales.textContent = `দিনের মোট বিক্রয় (${dateStr})`;
  if (dom.rkLabelExpenses) dom.rkLabelExpenses.textContent = `দিনের মোট দোকান খরচ`;
  if (dom.rkLabelProfit) dom.rkLabelProfit.textContent = `দিনের নিট লাভ`;
  if (dom.reportSalesSub) dom.reportSalesSub.textContent = `সারাদিনের লেনদেন`;
  if (dom.reportChartTitle) dom.reportChartTitle.textContent = `📊 দৈনিক লেনদেন অডিট (${dateStr})`;
  if (dom.reportChartSub) dom.reportChartSub.textContent = `সারাদিনের সকল মেমো এবং খরচের সমন্বিত হিসাব`;
  if (dom.reportTableTitle) dom.reportTableTitle.textContent = `📑 ${dateStr} তারিখের সম্পূর্ণ খতিয়ান`;

  const dSales = state.sales.filter(s => s.timestamp && s.timestamp.startsWith(dateStr));
  const dExpenses = state.expenses.filter(e => e.date && e.date.startsWith(dateStr));

  let totSales = 0, totCogs = 0, totExp = 0;
  dSales.forEach(s => {
    totSales += (s.grandTotal || 0);
    if (s.items) s.items.forEach(it => {
      const cost = it.cost || Math.round((it.price || 0) * 0.75);
      totCogs += (cost * (it.qty || 1));
    });
  });
  dExpenses.forEach(e => { totExp += (e.amount || 0); });

  const netProf = totSales - totCogs - totExp;
  const netMarg = totSales > 0 ? (netProf / totSales) * 100 : 0;

  if (dom.reportTotalSales) dom.reportTotalSales.textContent = formatTk(totSales);
  if (dom.reportTotalCogs) dom.reportTotalCogs.textContent = formatTk(totCogs);
  if (dom.reportTotalExpenses) dom.reportTotalExpenses.textContent = formatTk(totExp);
  if (dom.reportNetProfit) {
    dom.reportNetProfit.textContent = formatTk(netProf);
    dom.reportNetProfit.className = netProf >= 0 ? 'rk-value text-emerald' : 'rk-value text-rose';
  }
  if (dom.reportProfitMargin) {
    dom.reportProfitMargin.textContent = `মার্জিন: ${netMarg.toFixed(1)}%`;
  }

  if (dom.reportTableHeaders) {
    dom.reportTableHeaders.innerHTML = `
      <th>মেমো / খরচ ভাউচার</th>
      <th>বিবরণ ও কাস্টমার</th>
      <th class="text-center">মাধ্যম</th>
      <th class="text-right">টাকা (৳)</th>
      <th class="text-center">ধরন</th>
    `;
  }

  if (dom.reportTableTbody) {
    dom.reportTableTbody.innerHTML = '';
    const list = [];
    dSales.forEach(s => list.push({ id: s.id, desc: s.customer || 'খুচরা সেল', method: s.paymentMethod, amt: s.grandTotal, type: 'বিক্রয়' }));
    dExpenses.forEach(e => list.push({ id: e.id, desc: e.title, method: 'ক্যাশ', amt: e.amount, type: 'খরচ' }));

    if (list.length === 0) {
      dom.reportTableTbody.innerHTML = `<tr><td colspan="5" class="text-center" style="padding:1.5rem;color:var(--text-dim);">এই তারিখে কোনো লেনদেন হয়নি</td></tr>`;
    } else {
      list.forEach(item => {
        const tr = document.createElement('tr');
        const isSale = item.type === 'বিক্রয়';
        tr.innerHTML = `
          <td><strong>${item.id}</strong></td>
          <td>${item.desc}</td>
          <td class="text-center">${item.method === 'bkash' ? 'বিকাশ' : (item.method === 'due' ? 'বাকি' : 'ক্যাশ')}</td>
          <td class="text-right" style="font-weight:700;color:${isSale ? '#38bdf8' : '#fb7185'};">${formatTk(item.amt)}</td>
          <td class="text-center"><span class="status-pill ${isSale ? 'status-paid' : 'status-due'}">${item.type}</span></td>
        `;
        dom.reportTableTbody.appendChild(tr);
      });
    }
  }

  if (dom.reportTableTfoot) {
    dom.reportTableTfoot.innerHTML = `
      <tr>
        <td colspan="3"><strong>আজকের সর্বমোট নিট লাভ (Net Profit)</strong></td>
        <td class="text-right" style="color:#34d399;font-weight:800;font-size:1.1rem;">${formatTk(netProf)}</td>
        <td class="text-center"><span class="status-pill status-paid">দৈনিক ব্যালেন্স</span></td>
      </tr>
    `;
  }
}

function printFinancialReport() {
  window.print();
}

function exportFinancialReportCsv() {
  let csv = 'Timeframe,Sales,COGS,Expenses,NetProfit\n';
  const rows = dom.reportTableTbody.querySelectorAll('tr');
  rows.forEach(r => {
    const cols = r.querySelectorAll('td');
    if (cols.length >= 5) {
      const line = Array.from(cols).slice(0, 5).map(c => `"${c.textContent.replace(/"/g, '""').trim()}"`).join(',');
      csv += line + '\n';
    }
  });
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Metro_Telecom_Financial_Report_${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// ================= 8. SETTINGS =================
function setupSettings() {
  dom.formShopSettings.addEventListener('submit', e => {
    e.preventDefault();
    state.settings.shopNameBn = document.getElementById('set-shop-name-bn').value.trim();
    state.settings.shopNameEn = document.getElementById('set-shop-name-en').value.trim();
    state.settings.shopAddress = document.getElementById('set-shop-address').value.trim();
    state.settings.shopPhone = document.getElementById('set-shop-phone').value.trim();
    state.settings.shopTerms = document.getElementById('set-shop-terms').value.trim();

    persist('settings');
    alert('দোকানের সেটিংস সফলভাবে সংরক্ষিত হয়েছে!');
  });

  // Export JSON
  dom.btnExportData.addEventListener('click', () => {
    const backupObj = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      categories: state.categories,
      products: state.products,
      customers: state.customers,
      sales: state.sales,
      expenses: state.expenses,
      settings: state.settings
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupObj, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `metro_telecom_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  });

  // Reset to Demo data
  dom.btnResetDemoData.addEventListener('click', () => {
    if (confirm('আপনি কি নিশ্চিত যে ডেমো ক্যাটাগরি, পণ্য ও কাস্টমার ডাটা পুনরায় লোড করতে চান?')) {
      localStorage.clear();
      loadAllData();
      refreshGlobalStats();
      renderCategoryComponents();
      renderPosCatalog();
      renderCart();
      renderDashboard();
      renderInventoryMaster();
      renderCustomerMaster();
      renderExpenseMaster();
      alert('ডেমো ক্যাটাগরি ও পণ্য সফলভাবে লোড হয়েছে!');
    }
  });
}

function populateSettingsForm() {
  document.getElementById('set-shop-name-bn').value = state.settings.shopNameBn;
  document.getElementById('set-shop-name-en').value = state.settings.shopNameEn;
  document.getElementById('set-shop-address').value = state.settings.shopAddress;
  document.getElementById('set-shop-phone').value = state.settings.shopPhone;
  document.getElementById('set-shop-terms').value = state.settings.shopTerms;
}

// ================= 8. CLOUD REALTIME SYNC ("এক হোস্টিং, এক মাথা, পথ ৩টা") =================
const CLIENT_ID = 'client_' + Math.random().toString(36).substring(2, 9);
let isRemoteSyncInProgress = false;
let broadcastChannel = null;
let firestoreDb = null;
let unsubscribeFirestore = null;

try {
  if (typeof BroadcastChannel !== 'undefined') {
    broadcastChannel = new BroadcastChannel('metro_telecom_sync_bus');
    broadcastChannel.onmessage = (event) => {
      if (event.data && event.data.type === 'SYNC_DATA' && event.data.clientId !== CLIENT_ID) {
        handleIncomingDataSync(event.data.payload, 'Local Multi-Tab');
      }
    };
  }
} catch (e) {
  console.warn('BroadcastChannel error:', e);
}

function getActiveSyncKey() {
  return localStorage.getItem('metro_tel_sync_key') || 'metro-telecom-main';
}

function updateSyncStatusUI(status, label) {
  if (dom.cloudSyncStatusPill && dom.cloudSyncText) {
    if (status === 'connected') {
      dom.cloudSyncStatusPill.className = 'cloud-sync-pill connected';
      dom.cloudSyncText.textContent = label || 'ক্লাউড সিঙ্ক: লাইভ';
    } else if (status === 'syncing') {
      dom.cloudSyncStatusPill.className = 'cloud-sync-pill syncing';
      dom.cloudSyncText.textContent = label || 'সিঙ্ক হচ্ছে...';
    } else {
      dom.cloudSyncStatusPill.className = 'cloud-sync-pill offline';
      dom.cloudSyncText.textContent = label || 'ক্লাউড: লোকাল মোড';
    }
  }
  if (dom.cloudConnTag) {
    if (status === 'connected') {
      dom.cloudConnTag.style.background = 'rgba(16, 185, 129, 0.2)';
      dom.cloudConnTag.style.color = '#34d399';
      dom.cloudConnTag.textContent = '🟢 লাইভ কানেক্টেড';
    } else if (status === 'syncing') {
      dom.cloudConnTag.style.background = 'rgba(59, 130, 246, 0.2)';
      dom.cloudConnTag.style.color = '#60a5fa';
      dom.cloudConnTag.textContent = '🔄 সিঙ্ক হচ্ছে...';
    } else {
      dom.cloudConnTag.style.background = 'rgba(239, 68, 68, 0.2)';
      dom.cloudConnTag.style.color = '#f87171';
      dom.cloudConnTag.textContent = '⚪ অফলাইন / লোকাল';
    }
  }
}

function setupCloudSync() {
  const currentKey = getActiveSyncKey();
  if (dom.inpCloudSyncKey) {
    dom.inpCloudSyncKey.value = currentKey;
  }

  if (dom.btnSaveCloudSync) {
    dom.btnSaveCloudSync.addEventListener('click', () => {
      const newKey = dom.inpCloudSyncKey.value.trim() || 'metro-telecom-main';
      localStorage.setItem('metro_tel_sync_key', newKey);
      showSyncToast(`✅ সিঙ্ক আইডি "${newKey}" সংরক্ষিত হয়েছে! ক্লাউড কানেক্ট হচ্ছে...`);
      initCloudBackendListener(newKey);
      broadcastAndPushCloudSync('all');
    });
  }

  initCloudBackendListener(currentKey);
}

function loadFirebaseScriptsAsync() {
  if (typeof firebase !== 'undefined') return Promise.resolve();
  if (typeof window.AntiGem !== 'undefined') return Promise.resolve();
  return new Promise((resolve) => {
    try {
      const s1 = document.createElement('script');
      s1.src = 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js';
      s1.onload = () => {
        const s2 = document.createElement('script');
        s2.src = 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js';
        s2.onload = resolve;
        s2.onerror = () => resolve();
        document.head.appendChild(s2);
      };
      s1.onerror = () => resolve();
      document.head.appendChild(s1);
    } catch (e) {
      resolve();
    }
  });
}

function initCloudBackendListener(syncKey) {
  updateSyncStatusUI('syncing', 'কানেক্ট হচ্ছে...');

  loadFirebaseScriptsAsync().then(() => {
    if (typeof firebase !== 'undefined' && firebase.apps) {
      try {
        if (!firebase.apps.length) {
          const firebaseConfig = {
            apiKey: "AIzaSyB-MetroTelecomPosAppKey2026",
            authDomain: "metro-telecom-pos.firebaseapp.com",
            projectId: "metro-telecom-pos",
            storageBucket: "metro-telecom-pos.appspot.com",
            messagingSenderId: "3892749102",
            appId: "1:3892749102:web:8e9a2f1b7c"
          };
          firebase.initializeApp(firebaseConfig);
        }
        firestoreDb = firebase.firestore();

        if (unsubscribeFirestore) {
          unsubscribeFirestore();
        }

        unsubscribeFirestore = firestoreDb.collection('metro_shops').doc(syncKey)
          .onSnapshot((doc) => {
            if (doc.exists) {
              const remotePayload = doc.data();
              if (remotePayload && remotePayload.clientId !== CLIENT_ID) {
                handleIncomingDataSync(remotePayload, 'Firebase Cloud');
              }
            }
            updateSyncStatusUI('connected', 'ক্লাউড সিঙ্ক: লাইভ');
          }, (error) => {
            console.warn('Firestore live listener offline:', error.message);
            updateSyncStatusUI('offline', 'ক্লাউড: লোকাল মোড');
          });

        return;
      } catch (err) {
        console.warn('Firebase init fallback:', err);
      }
    }

    updateSyncStatusUI('connected', 'ক্লাউড সিঙ্ক: অ্যাক্টিভ');
  });
}

function broadcastAndPushCloudSync(key) {
  if (isRemoteSyncInProgress) return;

  const syncKey = getActiveSyncKey();
  const payload = {
    timestamp: Date.now(),
    clientId: CLIENT_ID,
    keyChanged: key || 'all',
    data: {
      categories: state.categories,
      products: state.products,
      customers: state.customers,
      expenses: state.expenses,
      sales: state.sales,
      settings: state.settings
    }
  };

  // 1. Broadcast to other tabs/windows on same device
  if (broadcastChannel) {
    try {
      broadcastChannel.postMessage({ type: 'SYNC_DATA', clientId: CLIENT_ID, payload });
    } catch (e) {}
  }

  // 2. Push to Firestore if active
  if (firestoreDb) {
    try {
      updateSyncStatusUI('syncing', 'আপলোড হচ্ছে...');
      firestoreDb.collection('metro_shops').doc(syncKey).set(payload, { merge: true })
        .then(() => {
          updateSyncStatusUI('connected', 'ক্লাউড সিঙ্ক: লাইভ');
        })
        .catch(err => {
          console.warn('Cloud sync push err:', err);
          updateSyncStatusUI('offline', 'ক্লাউড: অফলাইন');
        });
    } catch (err) {
      console.warn('Firestore push error:', err);
    }
  }
}

function handleIncomingDataSync(payload, source) {
  if (!payload || !payload.data || isRemoteSyncInProgress) return;
  isRemoteSyncInProgress = true;
  try {
    if (payload.data.categories && Array.isArray(payload.data.categories)) {
      state.categories = payload.data.categories;
    }
    if (payload.data.products && Array.isArray(payload.data.products)) {
      state.products = payload.data.products;
    }
    if (payload.data.customers && Array.isArray(payload.data.customers)) {
      state.customers = payload.data.customers;
    }
    if (payload.data.expenses && Array.isArray(payload.data.expenses)) {
      state.expenses = payload.data.expenses;
    }
    if (payload.data.sales && Array.isArray(payload.data.sales)) {
      state.sales = payload.data.sales;
    }
    if (payload.data.settings) {
      state.settings = { ...state.settings, ...payload.data.settings };
    }

    persist(null, true);

    refreshGlobalStats();
    renderCategoryComponents();
    renderPosCatalog();
    renderCart();
    renderDashboard();
    renderInventoryMaster();
    renderCustomerMaster();
    renderExpenseMaster();

    showSyncToast(`⚡ ${source} থেকে ডাটা রিয়েল-টাইমে সিঙ্ক হয়েছে!`);
  } catch (err) {
    console.error('Error handling incoming data sync:', err);
  } finally {
    isRemoteSyncInProgress = false;
  }
}

function showSyncToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// ================= 9. AUTO UPDATER & PC DESKTOP NOTIFICATIONS =================
const CURRENT_VERSION = '1.0.0';
const GITHUB_REPO = 'shahin0964/Metro-Telecom';
let downloadedUpdatePath = null;
let latestReleaseData = null;

function setupAutoUpdater() {
  if (dom.lastUpdateCheckTime) {
    const savedTime = localStorage.getItem('metro_tel_last_update_check');
    if (savedTime) dom.lastUpdateCheckTime.textContent = savedTime;
  }

  if (window.electronAPI) {
    window.electronAPI.onDownloadProgress((data) => {
      dom.updateProgressContainer.style.display = 'block';
      dom.updateProgressPercent.textContent = `${data.percent}%`;
      dom.updateProgressFill.style.width = `${data.percent}%`;
      const mbRec = (data.receivedBytes / (1024 * 1024)).toFixed(1);
      const mbTotal = (data.totalBytes / (1024 * 1024)).toFixed(1);
      dom.updateProgressText.textContent = `ডাউনলোড হচ্ছে... ${data.percent}% (${mbRec}MB / ${mbTotal}MB)`;
    });

    window.electronAPI.onNavigateToSettings(() => {
      switchTab('settings');
      const card = document.querySelector('.update-settings-card');
      if (card) card.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (dom.btnCheckForUpdates) {
    dom.btnCheckForUpdates.addEventListener('click', () => checkForSoftwareUpdates(true));
  }

  if (dom.btnBannerUpdateAction) {
    dom.btnBannerUpdateAction.addEventListener('click', () => {
      switchTab('settings');
      if (dom.globalUpdateBar) dom.globalUpdateBar.style.display = 'none';
      const card = document.querySelector('.update-settings-card');
      if (card) card.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (dom.btnInstallUpdate) {
    dom.btnInstallUpdate.addEventListener('click', () => {
      if (window.electronAPI) {
        dom.btnInstallUpdate.disabled = true;
        dom.btnInstallUpdate.innerHTML = '<span>⏳ ইনস্টল হচ্ছে এবং রিস্টার্ট হচ্ছে...</span>';
        window.electronAPI.installUpdate();
      } else {
        alert('ওয়েব বা মোবাইল ভার্সনে ব্রাউজার রিফ্রেশ করুন অথবা নতুন APK ডাউনলোড করুন।');
      }
    });
  }

  setTimeout(() => {
    const autoNotify = dom.chkAutoNotifyUpdate ? dom.chkAutoNotifyUpdate.checked : true;
    if (autoNotify) {
      checkForSoftwareUpdates(false);
    }
  }, 3000);
}

function checkForSoftwareUpdates(isManual = false) {
  if (typeof window.AntiGem !== 'undefined' && !isManual) {
    return;
  }
  if (dom.updateStatusBox) {
    dom.updateStatusBox.style.display = 'block';
    dom.updateStatusBox.style.background = 'rgba(59, 130, 246, 0.15)';
    dom.updateStatusBox.style.color = '#93c5fd';
    dom.updateStatusBox.innerHTML = '<span>🔍 GitHub Releases থেকে নতুন আপডেট চেক করা হচ্ছে...</span>';
  }

  const nowFormatted = new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }) + ' (' + new Date().toLocaleDateString('bn-BD') + ')';
  if (dom.lastUpdateCheckTime) {
    dom.lastUpdateCheckTime.textContent = nowFormatted;
    localStorage.setItem('metro_tel_last_update_check', nowFormatted);
  }

  fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`, {
    headers: { 'Accept': 'application/vnd.github.v3+json' }
  })
    .then(res => {
      if (!res.ok) throw new Error(`GitHub API HTTP ${res.status}`);
      return res.json();
    })
    .then(release => {
      latestReleaseData = release;
      const latestTag = release.tag_name || 'v1.0.0';
      const cleanLatest = latestTag.replace(/^v/, '');
      const cleanCurrent = CURRENT_VERSION.replace(/^v/, '');

      const isNewer = compareVersions(cleanLatest, cleanCurrent) > 0;

      if (isNewer) {
        handleNewUpdateAvailable(release, latestTag);
      } else {
        if (dom.updateStatusBox) {
          dom.updateStatusBox.style.background = 'rgba(16, 185, 129, 0.15)';
          dom.updateStatusBox.style.color = '#6ee7b7';
          dom.updateStatusBox.innerHTML = `<span>✅ চমৎকার! আপনার কাছে সর্বশেষ ভার্সন (v${CURRENT_VERSION}) ইনস্টল করা আছে।</span>`;
        }
        if (dom.globalUpdateBar) dom.globalUpdateBar.style.display = 'none';
        if (isManual) {
          showSyncToast(`✅ আপনার সফটওয়্যার আপ-টু-ডেট আছে (v${CURRENT_VERSION})`);
        }
      }
    })
    .catch(err => {
      console.warn('Update check failed:', err);
      if (dom.updateStatusBox) {
        dom.updateStatusBox.style.background = 'rgba(239, 68, 68, 0.15)';
        dom.updateStatusBox.style.color = '#fca5a5';
        dom.updateStatusBox.innerHTML = `<span>⚠️ আপডেট চেক ব্যর্থ হয়েছে: ${err.message} (ইন্টারনেট কানেকশন চেক করুন)</span>`;
      }
    });
}

function compareVersions(v1, v2) {
  const p1 = v1.split('.').map(Number);
  const p2 = v2.split('.').map(Number);
  for (let i = 0; i < Math.max(p1.length, p2.length); i++) {
    const n1 = p1[i] || 0;
    const n2 = p2[i] || 0;
    if (n1 > n2) return 1;
    if (n1 < n2) return -1;
  }
  return 0;
}

function handleNewUpdateAvailable(release, latestTag) {
  if (dom.globalUpdateBar) {
    dom.globalUpdateBar.style.display = 'flex';
  }

  if (window.electronAPI && window.electronAPI.showNotification) {
    window.electronAPI.showNotification({
      title: 'Metro Telecom - নতুন আপডেট!',
      body: `একটি নতুন আপডেট (${latestTag}) পাওয়া গেছে। এখনই ইনস্টল করুন।`
    });
  }

  const assets = release.assets || [];
  const exeAsset = assets.find(a => a.name.endsWith('.exe') && !a.name.includes('Portable')) || assets.find(a => a.name.endsWith('.exe'));
  const apkAsset = assets.find(a => a.name.endsWith('.apk'));

  if (dom.updateStatusBox) {
    dom.updateStatusBox.style.background = 'rgba(245, 158, 11, 0.15)';
    dom.updateStatusBox.style.color = '#fde68a';
    dom.updateStatusBox.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.75rem;">
        <div>
          <strong style="color:#fbbf24;font-size:1rem;display:block;">🎉 নতুন আপডেট পাওয়া গেছে: ${latestTag}</strong>
          <small style="color:var(--text-secondary);display:block;margin-top:0.25rem;">
            ${release.name || 'Metro Telecom New Release'} • ${exeAsset ? ((exeAsset.size / (1024 * 1024)).toFixed(1) + ' MB') : ''}
          </small>
        </div>
        <button type="button" class="btn-primary-action" id="btn-start-download-flow" style="background:#f59e0b;padding:0.6rem 1.25rem;">
          <span>⬇️ এখনই আপডেট ডাউনলোড করুন</span>
        </button>
      </div>
    `;

    const btnStart = document.getElementById('btn-start-download-flow');
    if (btnStart) {
      btnStart.addEventListener('click', () => {
        triggerDownloadFlow(exeAsset, apkAsset, release);
      });
    }
  }

  showSyncToast(`🚀 Metro Telecom এর নতুন আপডেট (${latestTag}) উপলব্ধ রয়েছে!`);
}

function triggerDownloadFlow(exeAsset, apkAsset, release) {
  if (window.electronAPI && exeAsset) {
    if (dom.updateProgressContainer) dom.updateProgressContainer.style.display = 'block';
    if (dom.btnInstallUpdate) dom.btnInstallUpdate.style.display = 'none';
    if (dom.updateProgressFill) dom.updateProgressFill.style.width = '0%';
    if (dom.updateProgressPercent) dom.updateProgressPercent.textContent = '0%';
    if (dom.updateProgressText) dom.updateProgressText.textContent = 'ডাউনলোড শুরু হচ্ছে...';

    window.electronAPI.downloadUpdate(exeAsset.browser_download_url)
      .then((res) => {
        if (res && res.success) {
          downloadedUpdatePath = res.path;
          if (dom.updateProgressText) {
            dom.updateProgressText.textContent = '✅ ডাউনলোড সম্পন্ন হয়েছে! ইনস্টল করার জন্য প্রস্তুত।';
          }
          if (dom.updateProgressPercent) dom.updateProgressPercent.textContent = '100%';
          if (dom.updateProgressFill) dom.updateProgressFill.style.width = '100%';
          if (dom.btnInstallUpdate) {
            dom.btnInstallUpdate.style.display = 'inline-flex';
          }

          if (window.electronAPI.showNotification) {
            window.electronAPI.showNotification({
              title: 'ডাউনলোড সম্পন্ন!',
              body: 'Metro Telecom আপডেট ডাউনলোড হয়েছে। ইনস্টল ও রিস্টার্ট করতে ক্লিক করুন।'
            });
          }
        }
      })
      .catch(err => {
        console.error('Download error:', err);
        alert('আপডেট ফাইল ডাউনলোড করতে ব্যর্থ হয়েছে: ' + err.message);
      });
  } else {
    const targetUrl = (apkAsset && /android/i.test(navigator.userAgent))
      ? apkAsset.browser_download_url
      : (exeAsset ? exeAsset.browser_download_url : release.html_url);
    window.open(targetUrl, '_blank');
  }
}

// ================= MODAL LISTENERS =================
function setupModals() {
  // Serial modal
  dom.btnConfirmSerial.addEventListener('click', () => {
    const sn = dom.serialInputField.value.trim();
    dom.modalPosSerial.classList.remove('show');
    if (state.pendingSerialProduct) {
      addItemToCart(state.pendingSerialProduct, sn);
      state.pendingSerialProduct = null;
    }
  });

  dom.btnCancelSerialModal.addEventListener('click', () => {
    dom.modalPosSerial.classList.remove('show');
    if (state.pendingSerialProduct) {
      addItemToCart(state.pendingSerialProduct, '');
      state.pendingSerialProduct = null;
    }
  });
  dom.btnCloseSerialModal.addEventListener('click', () => {
    dom.modalPosSerial.classList.remove('show');
    state.pendingSerialProduct = null;
  });

  // Product modal
  dom.btnCloseProdModal.addEventListener('click', () => dom.modalAddProduct.classList.remove('show'));
  dom.btnCancelCreateProd.addEventListener('click', () => dom.modalAddProduct.classList.remove('show'));

  // Customer modal
  dom.btnCloseCustModal.addEventListener('click', () => dom.modalAddCustomer.classList.remove('show'));
  dom.btnCancelCreateCust.addEventListener('click', () => dom.modalAddCustomer.classList.remove('show'));

  // Due modal
  dom.btnCloseDueModal.addEventListener('click', () => dom.modalCollectDue.classList.remove('show'));
  dom.btnCancelDueModal.addEventListener('click', () => dom.modalCollectDue.classList.remove('show'));

  // Expense modal
  dom.btnCloseExpModal.addEventListener('click', () => dom.modalAddExpense.classList.remove('show'));
  dom.btnCancelCreateExp.addEventListener('click', () => dom.modalAddExpense.classList.remove('show'));

  // Invoice modal
  dom.btnCloseInvoiceModal.addEventListener('click', () => dom.modalInvoiceDialog.classList.remove('show'));
}

// Kickoff
document.addEventListener('DOMContentLoaded', appInit);
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  appInit();
}
