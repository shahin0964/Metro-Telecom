import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import '../models/product.dart';
import '../widgets/cart_bottom_sheet.dart';

class PosTab extends StatelessWidget {
  const PosTab({super.key});

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<AppProvider>();

    return Stack(
      children: [
        Column(
          children: [
            // Search and Barcode Bar
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: TextField(
                style: const TextStyle(color: Colors.white, fontSize: 13),
                onChanged: (val) => provider.setSearchQuery(val),
                decoration: InputDecoration(
                  hintText: 'পণ্য, ব্র্যান্ড বা বারকোড খুঁজুন...',
                  hintStyle: const TextStyle(color: Colors.white38, fontSize: 13),
                  prefixIcon: const Icon(Icons.search_rounded, color: Color(0xFF38BDF8), size: 20),
                  filled: true,
                  fillColor: const Color(0xFF131D31),
                  contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(14),
                    borderSide: BorderSide(color: Colors.white.withOpacity(0.08)),
                  ),
                  enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(14),
                    borderSide: BorderSide(color: Colors.white.withOpacity(0.08)),
                  ),
                ),
              ),
            ),

            // Horizontal Categories list
            SizedBox(
              height: 40,
              child: ListView(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16),
                children: [
                  _catChip(context, 'all', '✨ সব পণ্য', provider.selectedCategory == 'all'),
                  ...provider.categories.map((c) => _catChip(
                        context,
                        c.name,
                        c.label,
                        provider.selectedCategory.toLowerCase() == c.name.toLowerCase(),
                      )),
                ],
              ),
            ),

            const SizedBox(height: 8),

            // Product Grid
            Expanded(
              child: provider.filteredProducts.isEmpty
                  ? const Center(
                      child: Text('কোন পণ্য পাওয়া যায়নি', style: TextStyle(color: Colors.white54)),
                    )
                  : GridView.builder(
                      padding: const EdgeInsets.only(left: 16, right: 16, top: 4, bottom: 85),
                      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 2,
                        crossAxisSpacing: 12,
                        mainAxisSpacing: 12,
                        childAspectRatio: 0.78,
                      ),
                      itemCount: provider.filteredProducts.length,
                      itemBuilder: (context, idx) {
                        final product = provider.filteredProducts[idx];
                        return _buildProductCard(context, product, provider);
                      },
                    ),
            ),
          ],
        ),

        // Floating Bottom-Left Compact Pill Cart Bar
        if (provider.cartCount > 0)
          Positioned(
            left: 16,
            bottom: 16,
            child: GestureDetector(
              onTap: () {
                showModalBottomSheet(
                  context: context,
                  isScrollControlled: true,
                  backgroundColor: Colors.transparent,
                  builder: (_) => const CartBottomSheet(),
                );
              },
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 7),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF1E293B), Color(0xFF0F172A)],
                  ),
                  borderRadius: BorderRadius.circular(999),
                  border: Border.all(color: const Color(0xFF38BDF8), width: 1.5),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.55),
                      blurRadius: 12,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Container(
                      padding: const EdgeInsets.all(5),
                      decoration: const BoxDecoration(
                        color: Color(0xFF2563EB),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.shopping_cart_rounded, color: Colors.white, size: 15),
                    ),
                    const SizedBox(width: 8),
                    Text(
                      '${provider.cartCount}',
                      style: const TextStyle(
                        color: Color(0xFF10B981),
                        fontSize: 13,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(width: 6),
                    Text(
                      '৳ ${provider.cartSubtotal.toStringAsFixed(0)}',
                      style: const TextStyle(
                        color: Color(0xFF38BDF8),
                        fontSize: 13,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                    const SizedBox(width: 8),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: const Color(0xFF2563EB),
                        borderRadius: BorderRadius.circular(999),
                      ),
                      child: const Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text(
                            'মেমো ➔',
                            style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
      ],
    );
  }

  Widget _catChip(BuildContext context, String catId, String label, bool isSelected) {
    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: GestureDetector(
        onTap: () {
          context.read<AppProvider>().setSelectedCategory(catId);
        },
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
          decoration: BoxDecoration(
            color: isSelected ? const Color(0xFF2563EB) : const Color(0xFF131D31),
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: isSelected ? const Color(0xFF38BDF8) : Colors.white12),
          ),
          child: Center(
            child: Text(
              label,
              style: TextStyle(
                color: isSelected ? Colors.white : Colors.white70,
                fontSize: 11,
                fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildProductCard(BuildContext context, Product p, AppProvider provider) {
    final bool isLowStock = p.stock <= 5;
    final bool isOutOfStock = p.stock <= 0;

    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF131D31),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white.withOpacity(0.06)),
      ),
      padding: const EdgeInsets.all(10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Top Tag: Stock status
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                decoration: BoxDecoration(
                  color: isOutOfStock
                      ? const Color(0xFFEF4444).withOpacity(0.2)
                      : isLowStock
                          ? const Color(0xFFF59E0B).withOpacity(0.2)
                          : const Color(0xFF10B981).withOpacity(0.2),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(
                  isOutOfStock ? 'স্টক শেষ' : 'স্টক: ${p.stock} ${p.unit}',
                  style: TextStyle(
                    color: isOutOfStock
                        ? const Color(0xFFEF4444)
                        : isLowStock
                            ? const Color(0xFFF59E0B)
                            : const Color(0xFF10B981),
                    fontSize: 9,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              if (p.hasSerial)
                const Icon(Icons.qr_code_2_rounded, size: 16, color: Color(0xFF38BDF8)),
            ],
          ),
          const SizedBox(height: 8),

          // Product Icon / Graphic
          Container(
            height: 60,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [const Color(0xFF1E293B), const Color(0xFF0F172A)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Center(
              child: Icon(
                _getCategoryIcon(p.cat),
                color: const Color(0xFF38BDF8),
                size: 30,
              ),
            ),
          ),
          const SizedBox(height: 8),

          // Title
          Text(
            p.name,
            style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
          ),
          const Spacer(),

          // Price & Add Button
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                '৳ ${p.price.toStringAsFixed(0)}',
                style: const TextStyle(color: Color(0xFF38BDF8), fontSize: 14, fontWeight: FontWeight.bold),
              ),
              IconButton(
                style: IconButton.styleFrom(
                  backgroundColor: isOutOfStock ? Colors.white12 : const Color(0xFF2563EB),
                  padding: const EdgeInsets.all(6),
                  minimumSize: const Size(32, 32),
                ),
                onPressed: isOutOfStock ? null : () => provider.addToCart(p),
                icon: const Icon(Icons.add_shopping_cart_rounded, color: Colors.white, size: 16),
              ),
            ],
          ),
        ],
      ),
    );
  }

  IconData _getCategoryIcon(String cat) {
    final lower = cat.toLowerCase();
    if (lower.contains('mobile')) return Icons.smartphone_rounded;
    if (lower.contains('headphone')) return Icons.headphones_rounded;
    if (lower.contains('toy')) return Icons.smart_toy_rounded;
    if (lower.contains('light')) return Icons.lightbulb_rounded;
    if (lower.contains('stationery') || lower.contains('স্টেশনারি')) return Icons.menu_book_rounded;
    return Icons.devices_rounded;
  }
}
