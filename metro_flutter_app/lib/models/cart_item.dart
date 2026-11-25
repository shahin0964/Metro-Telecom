import 'product.dart';

class CartItem {
  final Product product;
  int quantity;
  String selectedSerial;

  CartItem({
    required this.product,
    this.quantity = 1,
    this.selectedSerial = '',
  });

  double get total => product.price * quantity;
  double get totalCost => product.cost * quantity;
}
