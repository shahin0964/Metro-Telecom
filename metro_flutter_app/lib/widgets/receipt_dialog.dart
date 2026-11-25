import 'package:flutter/material.dart';
import '../models/sale.dart';
import '../services/thermal_printer_service.dart';

class ReceiptDialog extends StatelessWidget {
  final Sale sale;

  const ReceiptDialog({super.key, required this.sale});

  @override
  Widget build(BuildContext context) {
    return Dialog(
      backgroundColor: const Color(0xFF0F172A),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
        side: BorderSide(color: const Color(0xFF38BDF8).withOpacity(0.3)),
      ),
      child: Container(
        padding: const EdgeInsets.all(20),
        constraints: const BoxConstraints(maxWidth: 400),
        child: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              // Header
              Container(
                width: 50,
                height: 50,
                decoration: BoxDecoration(
                  color: const Color(0xFF10B981).withOpacity(0.15),
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.check_circle_rounded, color: Color(0xFF10B981), size: 32),
              ),
              const SizedBox(height: 12),
              const Text(
                'METRO TELECOM',
                style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold, letterSpacing: 0.5),
              ),
              const Text(
                'ডিজিটাল ক্যাশ মেমো',
                style: TextStyle(color: Color(0xFF38BDF8), fontSize: 12),
              ),
              const Divider(color: Colors.white12, height: 24),

              // Details
              _buildRow('মেমো নং:', sale.id),
              _buildRow('তারিখ:', sale.timestamp.length >= 10 ? sale.timestamp.substring(0, 10) : ''),
              _buildRow('ক্রেতার নাম:', sale.customer),
              _buildRow('পেমেন্ট মাধ্যম:', sale.paymentMethod.toUpperCase()),
              const Divider(color: Colors.white12, height: 20),

              // Items
              ...sale.items.map((it) => Padding(
                    padding: const EdgeInsets.symmetric(vertical: 4),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Expanded(
                          child: Text(
                            '${it.name} (x${it.qty})',
                            style: const TextStyle(color: Colors.white70, fontSize: 12),
                          ),
                        ),
                        Text(
                          '৳ ${it.total.toStringAsFixed(0)}',
                          style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                  )),

              const Divider(color: Colors.white12, height: 24),

              // Totals
              _buildRow('মোট বিল:', '৳ ${sale.grandTotal.toStringAsFixed(0)}', isBold: true),
              _buildRow('পরিশোধ:', '৳ ${sale.paidAmount.toStringAsFixed(0)}', color: const Color(0xFF10B981)),
              if (sale.dueAmount > 0)
                _buildRow('বাকি:', '৳ ${sale.dueAmount.toStringAsFixed(0)}', color: const Color(0xFFEF4444), isBold: true),

              const SizedBox(height: 24),

              // Actions
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton(
                      style: OutlinedButton.styleFrom(
                        side: const BorderSide(color: Colors.white24),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        padding: const EdgeInsets.symmetric(vertical: 12),
                      ),
                      onPressed: () => Navigator.pop(context),
                      child: const Text('বন্ধ করুন', style: TextStyle(color: Colors.white70)),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF2563EB),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        padding: const EdgeInsets.symmetric(vertical: 12),
                      ),
                      onPressed: () {
                        ThermalPrinterService.printReceipt(sale);
                      },
                      icon: const Icon(Icons.print_rounded, color: Colors.white, size: 18),
                      label: const Text('প্রিন্ট মেমো', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildRow(String label, String value, {bool isBold = false, Color? color}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 3),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: TextStyle(color: Colors.white.withOpacity(0.6), fontSize: 12)),
          Text(
            value,
            style: TextStyle(
              color: color ?? Colors.white,
              fontSize: 12,
              fontWeight: isBold ? FontWeight.bold : FontWeight.normal,
            ),
          ),
        ],
      ),
    );
  }
}
