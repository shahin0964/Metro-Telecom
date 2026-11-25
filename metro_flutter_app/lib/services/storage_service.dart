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

  Future<void> checkAndPurgeDemoData() async {
    final p = await _prefs;
    final isCleaned = p.getBool('metro_tel_cleaned_v1') ?? false;
    if (!isCleaned) {
      await p.remove(keyProducts);
      await p.remove(keyCustomers);
      await p.remove(keyExpenses);
      await p.remove(keySales);
      await p.setBool('metro_tel_cleaned_v1', true);
    }
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
    return [];
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
    return [];
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
    return [];
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
    return [];
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

  static final List<Product> seedProducts = [];
  static final List<Customer> seedCustomers = [];
  static final List<Expense> seedExpenses = [];
  static final List<Sale> seedSales = [];
}
