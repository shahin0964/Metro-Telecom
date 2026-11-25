import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../models/category.dart';
import '../models/product.dart';
import '../models/customer.dart';
import '../models/expense.dart';
import '../models/sale.dart';
import '../models/cart_item.dart';
import '../services/storage_service.dart';
import '../services/cloud_sync_service.dart';

class AppProvider with ChangeNotifier {
  final StorageService _storageService = StorageService();
  late CloudSyncService _cloudSyncService;

  List<CategoryItem> _categories = [];
  List<Product> _products = [];
  List<Customer> _customers = [];
  List<Expense> _expenses = [];
  List<Sale> _sales = [];

  final List<CartItem> _cart = [];
  String _selectedCategory = 'all';
  String _searchQuery = '';
  SyncStatus _syncStatus = SyncStatus.connected;
  bool _isLoading = true;

  // Getters
  bool get isLoading => _isLoading;
  SyncStatus get syncStatus => _syncStatus;
  List<CategoryItem> get categories => _categories;
  List<Product> get products => _products;
  List<Customer> get customers => _customers;
  List<Expense> get expenses => _expenses;
  List<Sale> get sales => _sales;
  List<CartItem> get cart => _cart;
  String get selectedCategory => _selectedCategory;
  String get searchQuery => _searchQuery;

  int get cartCount => _cart.fold(0, (sum, it) => sum + it.quantity);
  double get cartSubtotal => _cart.fold(0.0, (sum, it) => sum + it.total);
  double get cartTotalCost => _cart.fold(0.0, (sum, it) => sum + it.totalCost);

  List<Product> get filteredProducts {
    return _products.where((p) {
      final matchesCat = _selectedCategory == 'all' || p.cat.toLowerCase() == _selectedCategory.toLowerCase();
      final matchesSearch = _searchQuery.isEmpty ||
          p.name.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          p.barcode.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().contains(_searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    }).toList();
  }

  List<Product> get lowStockProducts {
    return _products.where((p) => p.stock <= 5).toList();
  }

  // Dashboard Metrics
  double get todaySales {
    final today = DateFormat('yyyy-MM-dd').format(DateTime.now());
    return _sales
        .where((s) => s.timestamp.startsWith(today))
        .fold(0.0, (sum, s) => sum + s.grandTotal);
  }

  double get todayCash {
    final today = DateFormat('yyyy-MM-dd').format(DateTime.now());
    return _sales
        .where((s) => s.timestamp.startsWith(today))
        .fold(0.0, (sum, s) => sum + s.paidAmount);
  }

  double get todayProfit {
    final today = DateFormat('yyyy-MM-dd').format(DateTime.now());
    final todaySalesList = _sales.where((s) => s.timestamp.startsWith(today)).toList();
    double turnover = todaySalesList.fold(0.0, (sum, s) => sum + s.grandTotal);
    double cost = 0.0;
    for (var s in todaySalesList) {
      for (var it in s.items) {
        cost += (it.cost * it.qty);
      }
    }
    double todayExpenses = _expenses
        .where((e) => e.date.startsWith(today))
        .fold(0.0, (sum, e) => sum + e.amount);
    return (turnover - cost) - todayExpenses;
  }

  double get totalMarketDue {
    return _customers.fold(0.0, (sum, c) => sum + c.totalDue);
  }

  double get totalStockValue {
    return _products.fold(0.0, (sum, p) => sum + (p.price * p.stock));
  }

  AppProvider() {
    init();
  }

  Future<void> init() async {
    _isLoading = true;
    notifyListeners();

    final syncKey = await _storageService.getSyncKey();
    _cloudSyncService = CloudSyncService(syncKey: syncKey);

    _categories = await _storageService.loadCategories();
    _products = await _storageService.loadProducts();
    _customers = await _storageService.loadCustomers();
    _expenses = await _storageService.loadExpenses();
    _sales = await _storageService.loadSales();

    _isLoading = false;
    notifyListeners();

    // Trigger cloud sync in background
    syncWithCloud();
  }

  void setSelectedCategory(String cat) {
    _selectedCategory = cat;
    notifyListeners();
  }

  void setSearchQuery(String query) {
    _searchQuery = query;
    notifyListeners();
  }

  // Cart operations
  void addToCart(Product product) {
    final idx = _cart.indexWhere((it) => it.product.id == product.id);
    if (idx != -1) {
      if (_cart[idx].quantity < product.stock) {
        _cart[idx].quantity++;
      }
    } else {
      if (product.stock > 0) {
        _cart.add(CartItem(product: product, quantity: 1));
      }
    }
    notifyListeners();
  }

  void incrementCartItem(String productId) {
    final idx = _cart.indexWhere((it) => it.product.id == productId);
    if (idx != -1) {
      if (_cart[idx].quantity < _cart[idx].product.stock) {
        _cart[idx].quantity++;
        notifyListeners();
      }
    }
  }

  void decrementCartItem(String productId) {
    final idx = _cart.indexWhere((it) => it.product.id == productId);
    if (idx != -1) {
      if (_cart[idx].quantity > 1) {
        _cart[idx].quantity--;
      } else {
        _cart.removeAt(idx);
      }
      notifyListeners();
    }
  }

  void removeFromCart(String productId) {
    _cart.removeWhere((it) => it.product.id == productId);
    notifyListeners();
  }

  void clearCart() {
    _cart.clear();
    notifyListeners();
  }

  Future<Sale?> checkout({
    required String customerName,
    required String customerPhone,
    required double discount,
    required double paidAmount,
    required String paymentMethod,
  }) async {
    if (_cart.isEmpty) return null;

    final grandTotal = (cartSubtotal - discount).clamp(0.0, double.infinity);
    final due = (grandTotal - paidAmount).clamp(0.0, double.infinity);

    // Update stocks
    for (var it in _cart) {
      final pIdx = _products.indexWhere((p) => p.id == it.product.id);
      if (pIdx != -1) {
        _products[pIdx].stock = (_products[pIdx].stock - it.quantity).clamp(0, 999999);
      }
    }

    // Customer record
    String customerId = 'cust-cash';
    if (customerName != 'খুচরা ক্রেতা (নগদ)' && customerName.isNotEmpty) {
      final cIdx = _customers.indexWhere((c) => c.name.toLowerCase() == customerName.toLowerCase() || (customerPhone.isNotEmpty && c.phone == customerPhone));
      if (cIdx != -1) {
        customerId = _customers[cIdx].id;
        _customers[cIdx].totalPaid += paidAmount;
        _customers[cIdx].totalDue += due;
      } else {
        customerId = 'cust-${DateTime.now().millisecondsSinceEpoch}';
        _customers.insert(0, Customer(
          id: customerId,
          name: customerName,
          phone: customerPhone,
          totalPaid: paidAmount,
          totalDue: due,
        ));
      }
    }

    // Sale record
    final saleId = 'INV-${DateFormat('yyyyMMdd').format(DateTime.now())}-${(_sales.length + 1).toString().padLeft(3, '0')}';
    final saleItems = _cart.map((it) => SaleItem(
      id: it.product.id,
      name: it.product.name,
      qty: it.quantity,
      unit: it.product.unit,
      price: it.product.price,
      cost: it.product.cost,
      total: it.total,
      warranty: it.product.warranty,
    )).toList();

    final sale = Sale(
      id: saleId,
      customer: customerName.isEmpty ? 'খুচরা ক্রেতা (নগদ)' : customerName,
      customerId: customerId,
      items: saleItems,
      subtotal: cartSubtotal,
      discount: discount,
      grandTotal: grandTotal,
      paidAmount: paidAmount,
      dueAmount: due,
      paymentMethod: paymentMethod,
      timestamp: DateTime.now().toIso8601String(),
      itemsCount: cartCount,
    );

    _sales.insert(0, sale);
    clearCart();

    // Persist
    await _storageService.saveProducts(_products);
    await _storageService.saveCustomers(_customers);
    await _storageService.saveSales(_sales);
    notifyListeners();

    // Sync
    syncWithCloud();

    return sale;
  }

  Future<void> addProduct(Product p) async {
    _products.insert(0, p);
    await _storageService.saveProducts(_products);
    notifyListeners();
    syncWithCloud();
  }

  Future<void> updateProduct(Product p) async {
    final idx = _products.indexWhere((it) => it.id == p.id);
    if (idx != -1) {
      _products[idx] = p;
      await _storageService.saveProducts(_products);
      notifyListeners();
      syncWithCloud();
    }
  }

  Future<void> deleteProduct(String id) async {
    _products.removeWhere((it) => it.id == id);
    await _storageService.saveProducts(_products);
    notifyListeners();
    syncWithCloud();
  }

  Future<void> addExpense(Expense e) async {
    _expenses.insert(0, e);
    await _storageService.saveExpenses(_expenses);
    notifyListeners();
    syncWithCloud();
  }

  Future<void> collectCustomerDue(String customerId, double amount) async {
    final idx = _customers.indexWhere((c) => c.id == customerId);
    if (idx != -1) {
      _customers[idx].totalDue = (_customers[idx].totalDue - amount).clamp(0.0, double.infinity);
      _customers[idx].totalPaid += amount;
      await _storageService.saveCustomers(_customers);
      notifyListeners();
      syncWithCloud();
    }
  }

  Future<void> syncWithCloud() async {
    _syncStatus = SyncStatus.syncing;
    notifyListeners();

    try {
      final remoteData = await _cloudSyncService.pullData();
      if (remoteData != null) {
        if (remoteData['products'] != null) {
          _products = (remoteData['products'] as List).map((e) => Product.fromJson(e)).toList();
        }
        if (remoteData['sales'] != null) {
          _sales = (remoteData['sales'] as List).map((e) => Sale.fromJson(e)).toList();
        }
        if (remoteData['expenses'] != null) {
          _expenses = (remoteData['expenses'] as List).map((e) => Expense.fromJson(e)).toList();
        }
        if (remoteData['customers'] != null) {
          _customers = (remoteData['customers'] as List).map((e) => Customer.fromJson(e)).toList();
        }
        await _storageService.saveProducts(_products);
        await _storageService.saveSales(_sales);
        await _storageService.saveExpenses(_expenses);
        await _storageService.saveCustomers(_customers);
      }

      await _cloudSyncService.pushData(
        categories: _categories,
        products: _products,
        customers: _customers,
        expenses: _expenses,
        sales: _sales,
      );

      _syncStatus = SyncStatus.connected;
    } catch (_) {
      _syncStatus = SyncStatus.offline;
    }

    notifyListeners();
  }
}
