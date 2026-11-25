import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/category.dart';
import '../models/product.dart';
import '../models/customer.dart';
import '../models/expense.dart';
import '../models/sale.dart';

class StorageService {
  static const String keyCategories = 'metro_tel_categories';
  static const String keyProducts = 'metro_tel_products';
  static const String keyCustomers = 'metro_tel_customers';
  static const String keyExpenses = 'metro_tel_expenses';
  static const String keySales = 'metro_tel_sales';
  static const String keySyncKey = 'metro_tel_sync_key';

  Future<SharedPreferences> get _prefs => SharedPreferences.getInstance();

  Future<String> getSyncKey() async {
    final p = await _prefs;
    return p.getString(keySyncKey) ?? 'metro-telecom-main';
  }

  Future<void> saveSyncKey(String key) async {
    final p = await _prefs;
    await p.setString(keySyncKey, key);
  }

  Future<List<CategoryItem>> loadCategories() async {
    final p = await _prefs;
    final jsonStr = p.getString(keyCategories);
    if (jsonStr != null && jsonStr.isNotEmpty) {
      try {
        final List<dynamic> list = jsonDecode(jsonStr);
        return list.map((e) => CategoryItem.fromJson(e)).toList();
      } catch (_) {}
    }
    return defaultCategories;
  }

  Future<void> saveCategories(List<CategoryItem> categories) async {
    final p = await _prefs;
    final jsonStr = jsonEncode(categories.map((e) => e.toJson()).toList());
    await p.setString(keyCategories, jsonStr);
  }

  Future<List<Product>> loadProducts() async {
    final p = await _prefs;
    final jsonStr = p.getString(keyProducts);
    if (jsonStr != null && jsonStr.isNotEmpty) {
      try {
        final List<dynamic> list = jsonDecode(jsonStr);
        return list.map((e) => Product.fromJson(e)).toList();
      } catch (_) {}
    }
    return seedProducts;
  }

  Future<void> saveProducts(List<Product> products) async {
    final p = await _prefs;
    final jsonStr = jsonEncode(products.map((e) => e.toJson()).toList());
    await p.setString(keyProducts, jsonStr);
  }

  Future<List<Customer>> loadCustomers() async {
    final p = await _prefs;
    final jsonStr = p.getString(keyCustomers);
    if (jsonStr != null && jsonStr.isNotEmpty) {
      try {
        final List<dynamic> list = jsonDecode(jsonStr);
        return list.map((e) => Customer.fromJson(e)).toList();
      } catch (_) {}
    }
    return seedCustomers;
  }

  Future<void> saveCustomers(List<Customer> customers) async {
    final p = await _prefs;
    final jsonStr = jsonEncode(customers.map((e) => e.toJson()).toList());
    await p.setString(keyCustomers, jsonStr);
  }

  Future<List<Expense>> loadExpenses() async {
    final p = await _prefs;
    final jsonStr = p.getString(keyExpenses);
    if (jsonStr != null && jsonStr.isNotEmpty) {
      try {
        final List<dynamic> list = jsonDecode(jsonStr);
        return list.map((e) => Expense.fromJson(e)).toList();
      } catch (_) {}
    }
    return seedExpenses;
  }

  Future<void> saveExpenses(List<Expense> expenses) async {
    final p = await _prefs;
    final jsonStr = jsonEncode(expenses.map((e) => e.toJson()).toList());
    await p.setString(keyExpenses, jsonStr);
  }

  Future<List<Sale>> loadSales() async {
    final p = await _prefs;
    final jsonStr = p.getString(keySales);
    if (jsonStr != null && jsonStr.isNotEmpty) {
      try {
        final List<dynamic> list = jsonDecode(jsonStr);
        return list.map((e) => Sale.fromJson(e)).toList();
      } catch (_) {}
    }
    return seedSales;
  }

  Future<void> saveSales(List<Sale> sales) async {
    final p = await _prefs;
    final jsonStr = jsonEncode(sales.map((e) => e.toJson()).toList());
    await p.setString(keySales, jsonStr);
  }

  // Initial Seed Data
  static final List<CategoryItem> defaultCategories = [
    CategoryItem(id: 'cat-mobile', name: 'Mobile', label: '📱 Mobile'),
    CategoryItem(id: 'cat-headphones', name: 'Headphones', label: '🎧 Headphones'),
    CategoryItem(id: 'cat-toys', name: 'Toys', label: '🧸 Toys (খেলনা)'),
    CategoryItem(id: 'cat-light', name: 'Light', label: '💡 Light (লাইট ও টর্চ)'),
    CategoryItem(id: 'cat-stat-khata', name: 'স্টেশনারি (খাতা ও ডায়েরি)', label: '📚 খাতা ও ডায়েরি'),
    CategoryItem(id: 'cat-stat-pen', name: 'স্টেশনারি (কলম ও জ্যামিতি)', label: '✏️ কলম ও পেন্সিল'),
    CategoryItem(id: 'cat-stat-paper', name: 'স্টেশনারি (কাগজ ও রিম)', label: '📄 পেপার ও রিম'),
    CategoryItem(id: 'cat-stat-file', name: 'স্টেশনারি (ফাইল ও অফিস)', label: '📁 ফাইল ও অফিস'),
    CategoryItem(id: 'cat-elec-charger', name: 'Electronic (চার্জার ও পাওয়ার ব্যাংক)', label: '🔋 চার্জার ও পাওয়ার ব্যাংক'),
    CategoryItem(id: 'cat-elec-cable', name: 'Electronic (ক্যাবল ও কনভার্টার)', label: '🔌 ক্যাবল ও কনভার্টার'),
    CategoryItem(id: 'cat-elec-multiplug', name: 'Electronic (মাল্টিপ্লাগ ও ইলেকট্রিক)', label: '⚡ মাল্টিপ্লাগ ও সুইচ'),
    CategoryItem(id: 'cat-elec-gadget', name: 'Electronic (অন্যান্য গ্যাজেট)', label: '⚙️ ইলেকট্রনিক্স গ্যাজেট'),
  ];

  static final List<Product> seedProducts = [
    Product(
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
    ),
    Product(
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
    ),
    Product(
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
    ),
    Product(
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
    ),
    Product(
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
    ),
    Product(
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
    ),
    Product(
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
    ),
    Product(
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
    ),
    Product(
      id: 'prod-109',
      name: 'Deluxe Hardcover 120 Pages Ruled Note Khata',
      cat: 'স্টেশনারি (খাতা ও ডায়েরি)',
      brand: 'Bashundhara',
      unit: 'Pcs',
      barcode: '8851960000111',
      cost: 75,
      price: 95,
      stock: 50,
    ),
    Product(
      id: 'prod-110',
      name: 'Matador Hi-School Ballpoint Pen Box (20 Pcs)',
      cat: 'স্টেশনারি (কলম ও জ্যামিতি)',
      brand: 'Matador',
      unit: 'Box',
      barcode: '8851960000222',
      cost: 160,
      price: 200,
      stock: 35,
    ),
    Product(
      id: 'prod-111',
      name: 'Remax 65W GaN Super Fast Charger Adapter',
      cat: 'Electronic (চার্জার ও পাওয়ার ব্যাংক)',
      brand: 'Remax',
      unit: 'Pcs',
      barcode: '697198765001',
      cost: 1600,
      price: 2200,
      stock: 3, // Low stock alert!
      warranty: '১ বছর রিপ্লেসমেন্ট',
      hasSerial: true,
    ),
    Product(
      id: 'prod-112',
      name: 'Baseus 100W 5A Type-C Braided Fast Cable',
      cat: 'Electronic (ক্যাবল ও কনভার্টার)',
      brand: 'Baseus',
      unit: 'Pcs',
      barcode: '697198765002',
      cost: 380,
      price: 550,
      stock: 2, // Low stock alert!
      warranty: '৬ মাস রিপ্লেসমেন্ট',
    )
  ];

  static final List<Customer> seedCustomers = [
    Customer(id: 'cust-1', name: 'আরিফুল ইসলাম', phone: '01712-345678', address: 'মিরপুর-১০, ঢাকা', totalDue: 3500, totalPaid: 18000),
    Customer(id: 'cust-2', name: 'সুমন টেলিকম', phone: '01911-987654', address: 'উত্তরা সেক্টর ৭', totalDue: 3800, totalPaid: 45000),
    Customer(id: 'cust-cash', name: 'খুচরা ক্রেতা (নগদ)', phone: '01700-000000', address: 'দোকান কাউন্টার', totalDue: 0, totalPaid: 65000),
  ];

  static final List<Expense> seedExpenses = [
    Expense(id: 'exp-01', title: 'দোকান বিদ্যুৎ বিল', amount: 1650, date: '2026-11-24', note: 'পল্লী বিদ্যুৎ অফিস'),
    Expense(id: 'exp-02', title: 'স্টাফের দুপুরের নাস্তা ও চা', amount: 220, date: '2026-11-25', note: 'আজকের খরচ'),
    Expense(id: 'exp-03', title: 'দোকান পরিষ্কার ও ব্যাগ', amount: 450, date: '2026-11-26', note: 'প্যাকেজিং'),
  ];

  static final List<Sale> seedSales = [
    Sale(
      id: 'INV-20261120-001',
      customer: 'খুচরা ক্রেতা (নগদ)',
      customerId: 'cust-cash',
      items: [
        SaleItem(id: 'it-1', name: 'মোবাইল এক্সেসরিজ ও পার্টস', qty: 1, unit: 'Pcs', price: 1250, cost: 900, total: 1250, warranty: '৬ মাস')
      ],
      subtotal: 1250,
      grandTotal: 1250,
      paidAmount: 1250,
      dueAmount: 0,
      timestamp: '2026-11-20T14:30:00.000Z',
      itemsCount: 1,
    ),
    Sale(
      id: 'INV-20261121-001',
      customer: 'আরিফুল ইসলাম',
      customerId: 'cust-1',
      items: [
        SaleItem(id: 'it-2', name: 'Realme Buds T110', qty: 1, unit: 'Pcs', price: 1850, cost: 1350, total: 1850, warranty: '৬ মাস')
      ],
      subtotal: 1850,
      grandTotal: 1850,
      paidAmount: 1850,
      dueAmount: 0,
      timestamp: '2026-11-21T15:20:00.000Z',
      itemsCount: 1,
    ),
    Sale(
      id: 'INV-20261122-001',
      customer: 'খুচরা ক্রেতা (নগদ)',
      customerId: 'cust-cash',
      items: [
        SaleItem(id: 'it-3', name: 'Mpow Bluetooth Headphone', qty: 1, unit: 'Pcs', price: 2420, cost: 1800, total: 2420, warranty: '১ বছর')
      ],
      subtotal: 2420,
      grandTotal: 2420,
      paidAmount: 2420,
      dueAmount: 0,
      timestamp: '2026-11-22T12:00:00.000Z',
      itemsCount: 1,
    ),
    Sale(
      id: 'INV-20261123-001',
      customer: 'সুমন টেলিকম',
      customerId: 'cust-2',
      items: [
        SaleItem(id: 'it-4', name: 'DP 20W LED Tube & Torch', qty: 3, unit: 'Pcs', price: 1033.33, cost: 766.66, total: 3100, warranty: '৬ মাস')
      ],
      subtotal: 3100,
      grandTotal: 3100,
      paidAmount: 3100,
      dueAmount: 0,
      timestamp: '2026-11-23T16:15:00.000Z',
      itemsCount: 3,
    ),
    Sale(
      id: 'INV-20261124-001',
      customer: 'খুচরা ক্রেতা (নগদ)',
      customerId: 'cust-cash',
      items: [
        SaleItem(id: 'it-5', name: 'Baseus Cable & Charger', qty: 2, unit: 'Pcs', price: 1380, cost: 1025, total: 2760, warranty: '৬ মাস')
      ],
      subtotal: 2760,
      grandTotal: 2760,
      paidAmount: 2760,
      dueAmount: 0,
      timestamp: '2026-11-24T17:40:00.000Z',
      itemsCount: 2,
    ),
    Sale(
      id: 'INV-20261125-001',
      customer: 'তানভীর আহমেদ',
      customerId: 'cust-cash',
      items: [
        SaleItem(id: 'it-6', name: 'Remax GaN Charger', qty: 1, unit: 'Pcs', price: 2100, cost: 1550, total: 2100, warranty: '১ বছর')
      ],
      subtotal: 2100,
      grandTotal: 2100,
      paidAmount: 2100,
      dueAmount: 0,
      timestamp: '2026-11-25T11:30:00.000Z',
      itemsCount: 1,
    ),
    Sale(
      id: 'INV-20261126-001',
      customer: 'খুচরা ক্রেতা (নগদ)',
      customerId: 'cust-cash',
      items: [
        SaleItem(id: 'it-7', name: 'খাতা, কলম ও এক্সেসরিজ', qty: 4, unit: 'Pcs', price: 475, cost: 375, total: 1900, warranty: '')
      ],
      subtotal: 1900,
      grandTotal: 1900,
      paidAmount: 1900,
      dueAmount: 0,
      timestamp: '2026-11-26T18:10:00.000Z',
      itemsCount: 4,
    ),
  ];
}
