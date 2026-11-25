import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/category.dart';
import '../models/product.dart';
import '../models/customer.dart';
import '../models/expense.dart';
import '../models/sale.dart';

enum SyncStatus { connected, syncing, offline }

class CloudSyncService {
  final String syncKey;
  static const String firestoreRestBase =
      'https://firestore.googleapis.com/v1/projects/metro-telecom-pos/databases/(default)/documents/metro_shops';

  CloudSyncService({this.syncKey = 'metro-telecom-main'});

  Future<bool> pushData({
    required List<CategoryItem> categories,
    required List<Product> products,
    required List<Customer> customers,
    required List<Expense> expenses,
    required List<Sale> sales,
  }) async {
    try {
      final url = Uri.parse('$firestoreRestBase/$syncKey');
      final payload = {
        'fields': {
          'timestamp': {'integerValue': DateTime.now().millisecondsSinceEpoch.toString()},
          'clientId': {'stringValue': 'flutter-android-app'},
          'dataJson': {
            'stringValue': jsonEncode({
              'categories': categories.map((e) => e.toJson()).toList(),
              'products': products.map((e) => e.toJson()).toList(),
              'customers': customers.map((e) => e.toJson()).toList(),
              'expenses': expenses.map((e) => e.toJson()).toList(),
              'sales': sales.map((e) => e.toJson()).toList(),
            })
          }
        }
      };

      final response = await http.patch(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(payload),
      ).timeout(const Duration(seconds: 8));

      return response.statusCode == 200 || response.statusCode == 201;
    } catch (_) {
      return false;
    }
  }

  Future<Map<String, dynamic>?> pullData() async {
    try {
      final url = Uri.parse('$firestoreRestBase/$syncKey');
      final response = await http.get(url).timeout(const Duration(seconds: 8));
      if (response.statusCode == 200) {
        final Map<String, dynamic> doc = jsonDecode(response.body);
        final fields = doc['fields'] as Map<String, dynamic>?;
        if (fields != null && fields.containsKey('dataJson')) {
          final dataJsonStr = fields['dataJson']?['stringValue'];
          if (dataJsonStr != null) {
            return jsonDecode(dataJsonStr) as Map<String, dynamic>;
          }
        }
      }
    } catch (_) {}
    return null;
  }
}
