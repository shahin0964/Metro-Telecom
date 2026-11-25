class Product {
  final String id;
  String name;
  String cat;
  String brand;
  String unit;
  String barcode;
  double cost;
  double price;
  int stock;
  String warranty;
  bool hasSerial;
  String image;
  List<String> serials;

  Product({
    required this.id,
    required this.name,
    required this.cat,
    this.brand = '',
    this.unit = 'Pcs',
    this.barcode = '',
    this.cost = 0.0,
    required this.price,
    required this.stock,
    this.warranty = '',
    this.hasSerial = false,
    this.image = '',
    List<String>? serials,
  }) : serials = serials ?? [];

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['id']?.toString() ?? '',
      name: json['name']?.toString() ?? 'Unnamed Product',
      cat: json['cat']?.toString() ?? 'Mobile',
      brand: json['brand']?.toString() ?? '',
      unit: json['unit']?.toString() ?? 'Pcs',
      barcode: json['barcode']?.toString() ?? '',
      cost: (json['cost'] as num?)?.toDouble() ?? 0.0,
      price: (json['price'] as num?)?.toDouble() ?? 0.0,
      stock: (json['stock'] as num?)?.toInt() ?? 0,
      warranty: json['warranty']?.toString() ?? '',
      hasSerial: json['hasSerial'] == true,
      image: json['image']?.toString() ?? '',
      serials: (json['serials'] as List<dynamic>?)?.map((e) => e.toString()).toList() ?? [],
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'cat': cat,
    'brand': brand,
    'unit': unit,
    'barcode': barcode,
    'cost': cost,
    'price': price,
    'stock': stock,
    'warranty': warranty,
    'hasSerial': hasSerial,
    'image': image,
    'serials': serials,
  };
}
