import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';

class DueLedgerTab extends StatelessWidget {
  const DueLedgerTab({super.key});

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<AppProvider>();
    final dueCustomers = provider.customers.where((c) => c.totalDue > 0).toList();

    return Scaffold(
      backgroundColor: Colors.transparent,
      body: Column(
        children: [
          // Total Due Header
          Container(
            margin: const EdgeInsets.all(16),
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF1E293B), Color(0xFF0F172A)],
              ),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: Colors.white.withOpacity(0.08)),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('বাজারে মোট বাকি পাওনা', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 12)),
                    SizedBox(height: 2),
                    Text('কাস্টমার খাতা অডিট', style: TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.bold)),
                  ],
                ),
                Text(
                  '৳ ${provider.totalMarketDue.toStringAsFixed(0)}',
                  style: const TextStyle(color: Color(0xFFEF4444), fontSize: 20, fontWeight: FontWeight.bold),
                ),
              ],
            ),
          ),

          // Customers with Due
          Expanded(
            child: dueCustomers.isEmpty
                ? const Center(
                    child: Text('বাজারে কোন বকেয়া বা বাকি পাওনা নেই! 🎉', style: TextStyle(color: Color(0xFF10B981))),
                  )
                : ListView.builder(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    itemCount: dueCustomers.length,
                    itemBuilder: (context, idx) {
                      final c = dueCustomers[idx];
                      return Container(
                        margin: const EdgeInsets.symmetric(vertical: 4),
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: const Color(0xFF131D31),
                          borderRadius: BorderRadius.circular(14),
                          border: Border.all(color: Colors.white.withOpacity(0.06)),
                        ),
                        child: Row(
                          children: [
                            Container(
                              width: 40,
                              height: 40,
                              decoration: BoxDecoration(
                                color: const Color(0xFFEF4444).withOpacity(0.15),
                                shape: BoxShape.circle,
                              ),
                              child: const Icon(Icons.person_rounded, color: Color(0xFFEF4444), size: 22),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(c.name, style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
                                  const SizedBox(height: 2),
                                  Text('${c.phone} • ${c.address}', style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 11)),
                                ],
                              ),
                            ),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.end,
                              children: [
                                Text(
                                  'বাকি: ৳ ${c.totalDue.toStringAsFixed(0)}',
                                  style: const TextStyle(color: Color(0xFFEF4444), fontSize: 13, fontWeight: FontWeight.bold),
                                ),
                                const SizedBox(height: 4),
                                ElevatedButton(
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: const Color(0xFF10B981),
                                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                    minimumSize: const Size(60, 26),
                                  ),
                                  onPressed: () => _showCollectionDialog(context, provider, c.id, c.name, c.totalDue),
                                  child: const Text('আদায়', style: TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold)),
                                ),
                              ],
                            ),
                          ],
                        ),
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }

  void _showCollectionDialog(BuildContext context, AppProvider provider, String id, String name, double currentDue) {
    final amtCtrl = TextEditingController(text: currentDue.toStringAsFixed(0));
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        backgroundColor: const Color(0xFF0F172A),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: Text('$name - বকেয়া আদায়', style: const TextStyle(color: Colors.white, fontSize: 15)),
        content: TextField(
          controller: amtCtrl,
          keyboardType: TextInputType.number,
          style: const TextStyle(color: Colors.white, fontSize: 14),
          decoration: const InputDecoration(
            labelText: 'আদায়কৃত টাকা (৳)',
            labelStyle: TextStyle(color: Colors.white60),
          ),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('বাতিল', style: TextStyle(color: Colors.white60))),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF10B981)),
            onPressed: () {
              final amt = double.tryParse(amtCtrl.text) ?? 0.0;
              if (amt > 0) {
                provider.collectCustomerDue(id, amt);
                Navigator.pop(context);
              }
            },
            child: const Text('জমা করুন', style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
    );
  }
}
