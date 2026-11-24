// Metro Telecom - Professional POS & Inventory Management System

// Sample SVG Icons for crisp offline thumbnails
function createProductSvg(color, text) {
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="${encodeURIComponent(color)}" rx="16"/><text x="50%" y="54%" font-family="sans-serif" font-weight="900" font-size="36" fill="%23ffffff" dominant-baseline="middle" text-anchor="middle">${encodeURIComponent(text)}</text></svg>`;
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
    state.expenses = e ? JSON.parse(e) : SEED_EXPENSES;

    const s = localStorage.getItem('metro_tel_sales');
    state.sales = s ? JSON.parse(s) : [];

    const set = localStorage.getItem('metro_tel_settings');
    state.settings = set ? JSON.parse(set) : SEED_SETTINGS;

    const h = localStorage.getItem('metro_tel_held');
    state.heldBills = h ? JSON.parse(h) : [];
  } catch (err) {
    console.error('Storage error:', err);
    state.categories = DEFAULT_CATEGORIES;
    state.products = SEED_PRODUCTS;
    state.customers = SEED_CUSTOMERS;
    state.expenses = SEED_EXPENSES;
    state.sales = [];
    state.settings = SEED_SETTINGS;
  }
}

function persist(key) {
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
  sizePills: document.querySelectorAll('.size-pill')
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
  setupSettings();
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

// Tab Switching
function setupTabs() {
  dom.tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      dom.tabBtns.forEach(b => b.classList.remove('active'));
      dom.tabViews.forEach(v => v.classList.remove('active'));

      btn.classList.add('active');
      const view = document.getElementById(`view-${target}`);
      if (view) view.classList.add('active');

      if (target === 'dashboard') renderDashboard();
      if (target === 'pos') renderPosCatalog();
      if (target === 'inventory') renderInventoryMaster();
      if (target === 'customers') renderCustomerMaster();
      if (target === 'expenses') renderExpenseMaster();
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

  // 7-day Sales Bar Chart
  const days = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি'];
  const now = new Date();
  const past7Days = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = days[d.getDay()];

    let daySales = 0;
    state.sales.forEach(s => {
      if (s.timestamp && s.timestamp.startsWith(dateStr)) {
        daySales += s.grandTotal;
      }
    });

    past7Days.push({ date: dateStr, name: dayName, sales: daySales });
  }

  const maxSale = Math.max(...past7Days.map(d => d.sales), 5000);
  dom.chartContainer.innerHTML = '';

  past7Days.forEach(d => {
    const heightPercent = Math.min(100, Math.max(10, Math.round((d.sales / maxSale) * 100)));
    const col = document.createElement('div');
    col.className = 'chart-bar-col';
    col.innerHTML = `
      <span class="chart-val-label">${d.sales > 0 ? '৳' + Math.round(d.sales / 1000) + 'k' : '০'}</span>
      <div class="chart-bar-track">
        <div class="chart-bar-fill" style="height: ${heightPercent}%;"></div>
      </div>
      <span class="chart-day-label">${d.name}</span>
    `;
    dom.chartContainer.appendChild(col);
  });

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
    state.sales.slice(0, 10).forEach(s => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${s.invoiceNo}</strong></td>
        <td>${s.formattedDate}</td>
        <td>${s.customer.name}</td>
        <td><span class="item-cat-label">${s.paymentMethod}</span></td>
        <td class="text-right"><strong>${formatTk(s.grandTotal)}</strong></td>
        <td class="text-right text-green">${formatTk(s.paid)}</td>
        <td class="text-right ${s.due > 0 ? 'text-danger' : ''}">${formatTk(s.due)}</td>
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
};

window.removeCartPosItem = function(idx) {
  state.cart.splice(idx, 1);
  recalculateCart();
  renderCart();
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
  document.getElementById('out-memo-no').textContent = sale.invoiceNo;
  document.getElementById('out-memo-date').textContent = sale.formattedDate;
  document.getElementById('out-memo-cust-name').textContent = sale.customer.name;
  document.getElementById('out-memo-cust-phone').textContent = sale.customer.phone;
  document.getElementById('out-memo-cust-address').textContent = sale.customer.address;

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
        <div><strong>ইনভয়েস নং:</strong> <br>${m.sale.invoiceNo}</div>
        <div><strong>বিক্রয় তারিখ:</strong> <br>${m.sale.formattedDate}</div>
        <div><strong>ওয়ারেন্টি মেয়াদ:</strong> <br>${m.item.warranty}</div>
        <div><strong>মেয়াদ শেষ হওয়ার তারিখ:</strong> <br>${days > 0 ? expiryDate.toLocaleDateString('bn-BD', { year:'numeric', month:'long', day:'numeric' }) : 'প্রযোজ্য নয়'}</div>
        <div><strong>কাস্টমারের নাম:</strong> <br>${m.sale.customer.name} (${m.sale.customer.phone})</div>
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

// ================= 7. SETTINGS =================
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
