class SaleItem {
  final String id;
  final String name;
  int qty;
  final String unit;
  final double price;
  final double cost;
  final double total;
  final String warranty;
  final String serial;

  SaleItem({
    required this.id,
    required this.name,
    required this.qty,
    this.unit = 'Pcs',
    required this.price,
    this.cost = 0.0,
    required this.total,
    this.warranty = '',
    this.serial = '',
  });

  factory SaleItem.fromJson(Map<String, dynamic> json) {
    return SaleItem(
      id: json['id']?.toString() ?? '',
      name: json['name']?.toString() ?? '',
      qty: (json['qty'] as num?)?.toInt() ?? 1,
      unit: json['unit']?.toString() ?? 'Pcs',
      price: (json['price'] as num?)?.toDouble() ?? 0.0,
      cost: (json['cost'] as num?)?.toDouble() ?? 0.0,
      total: (json['total'] as num?)?.toDouble() ?? 0.0,
      warranty: json['warranty']?.toString() ?? '',
      serial: json['serial']?.toString() ?? '',
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'qty': qty,
    'unit': unit,
    'price': price,
    'cost': cost,
    'total': total,
    'warranty': warranty,
    'serial': serial,
  };
}

class Sale {
  final String id;
  final String customer;
  final String customerId;
  final List<SaleItem> items;
  final double subtotal;
  final double discount;
  final double grandTotal;
  final double paidAmount;
  final double dueAmount;
  final String paymentMethod;
  final String timestamp;
  final int itemsCount;

  Sale({
    required this.id,
    required this.customer,
    required this.customerId,
    required this.items,
    required this.subtotal,
    this.discount = 0.0,
    required this.grandTotal,
    required this.paidAmount,
    this.dueAmount = 0.0,
    this.paymentMethod = 'cash',
    required this.timestamp,
    required this.itemsCount,
  });

  factory Sale.fromJson(Map<String, dynamic> json) {
    var rawItems = json['items'] as List<dynamic>? ?? [];
    List<SaleItem> parsedItems = rawItems.map((e) => SaleItem.fromJson(e as Map<String, dynamic>)).toList();
    
    return Sale(
      id: json['id']?.toString() ?? '',
      customer: json['customer']?.toString() ?? 'খুচরা ক্রেতা',
      customerId: json['customerId']?.toString() ?? 'cust-cash',
      items: parsedItems,
      subtotal: (json['subtotal'] as num?)?.toDouble() ?? 0.0,
      discount: (json['discount'] as num?)?.toDouble() ?? 0.0,
      grandTotal: (json['grandTotal'] as num?)?.toDouble() ?? 0.0,
      paidAmount: (json['paidAmount'] as num?)?.toDouble() ?? 0.0,
      dueAmount: (json['dueAmount'] as num?)?.toDouble() ?? 0.0,
      paymentMethod: json['paymentMethod']?.toString() ?? 'cash',
      timestamp: json['timestamp']?.toString() ?? DateTime.now().toIso8601String(),
      itemsCount: (json['itemsCount'] as num?)?.toInt() ?? parsedItems.length,
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'customer': customer,
    'customerId': customerId,
    'items': items.map((e) => e.toJson()).toList(),
    'subtotal': subtotal,
    'discount': discount,
    'grandTotal': grandTotal,
    'paidAmount': paidAmount,
    'dueAmount': dueAmount,
    'paymentMethod': paymentMethod,
    'timestamp': timestamp,
    'itemsCount': itemsCount,
  };
}
