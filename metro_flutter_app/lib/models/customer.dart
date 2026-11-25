class Customer {
  final String id;
  String name;
  String phone;
  String address;
  double totalDue;
  double totalPaid;

  Customer({
    required this.id,
    required this.name,
    this.phone = '',
    this.address = '',
    this.totalDue = 0.0,
    this.totalPaid = 0.0,
  });

  factory Customer.fromJson(Map<String, dynamic> json) {
    return Customer(
      id: json['id']?.toString() ?? '',
      name: json['name']?.toString() ?? '',
      phone: json['phone']?.toString() ?? '',
      address: json['address']?.toString() ?? '',
      totalDue: (json['totalDue'] as num?)?.toDouble() ?? 0.0,
      totalPaid: (json['totalPaid'] as num?)?.toDouble() ?? 0.0,
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'phone': phone,
    'address': address,
    'totalDue': totalDue,
    'totalPaid': totalPaid,
  };
}
