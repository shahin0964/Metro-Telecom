import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import '../widgets/sales_trend_card.dart';
import '../widgets/kpi_card.dart';
import '../widgets/receipt_dialog.dart';

class DashboardTab extends StatelessWidget {
  final VoidCallback onNavigateToPos;
  final VoidCallback onNavigateToInventory;

  const DashboardTab({
    super.key,
    required this.onNavigateToPos,
    required this.onNavigateToInventory,
  });

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<AppProvider>();

    return SingleChildScrollView(
      padding: const EdgeInsets.only(bottom: 30),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Welcome Banner
          Container(
            margin: const EdgeInsets.all(16),
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF1E293B), Color(0xFF0F172A)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: Colors.white.withOpacity(0.08)),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'স্বাগতম, মেট্রো টেলিকম ম্যানেজমেন্ট! 👋',
                        style: TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.bold),
                      ),
                      SizedBox(height: 4),
                      Text(
                        'দোকানের আজকের সার্বিক বেচাকেনা, লাভ-ক্ষতি ও স্টকের লাইভ পরিস্থিতি',
                        style: TextStyle(color: Color(0xFF94A3B8), fontSize: 11),
                      ),
                    ],
                  ),
                ),
                ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF2563EB),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                  ),
                  onPressed: onNavigateToPos,
                  icon: const Icon(Icons.bolt_rounded, color: Colors.white, size: 16),
                  label: const Text('নতুন বিক্রি', style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold)),
                ),
              ],
            ),
          ),

          // KPI Cards Grid
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: GridView.count(
              crossAxisCount: 2,
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              crossAxisSpacing: 10,
              mainAxisSpacing: 10,
              childAspectRatio: 1.45,
              children: [
                KpiCard(
                  title: 'আজকের মোট বিক্রি',
                  value: '৳ ${provider.todaySales.toStringAsFixed(0)}',
                  subtitle: '${provider.sales.where((s) => s.timestamp.startsWith(DateTime.now().toIso8601String().substring(0, 10))).length} টি ক্যাশ মেমো',
                  icon: Icons.point_of_sale_rounded,
                  accentColor: const Color(0xFFEAB308),
                ),
                KpiCard(
                  title: 'আজকের নগদ জমা (Cash)',
                  value: '৳ ${provider.todayCash.toStringAsFixed(0)}',
                  subtitle: 'ক্যাশ ড্রয়ারে উপস্থিত টাকা',
                  icon: Icons.account_balance_wallet_rounded,
                  accentColor: const Color(0xFF10B981),
                ),
                KpiCard(
                  title: 'আজকের মোট লাভ (Profit)',
                  value: '৳ ${provider.todayProfit.toStringAsFixed(0)}',
                  subtitle: 'মাল বিক্রি ও খরচ বাদে নিট লাভ',
                  icon: Icons.trending_up_rounded,
                  accentColor: const Color(0xFFA855F7),
                ),
                KpiCard(
                  title: 'বাজারে মোট বাকি পাওনা',
                  value: '৳ ${provider.totalMarketDue.toStringAsFixed(0)}',
                  subtitle: 'কাস্টমারদের নিকট পাওনা',
                  icon: Icons.menu_book_rounded,
                  accentColor: const Color(0xFFEF4444),
                ),
              ],
            ),
          ),

          const SizedBox(height: 12),

          // 7-Day Sales Trend Custom Chart Card (Matching User Reference Image)
          const SalesTrendCard(),

          const SizedBox(height: 12),

          // Low Stock Alert Box with Top-Right Corner Button
          Container(
            margin: const EdgeInsets.symmetric(horizontal: 16),
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: const Color(0xFF0F172A),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: Colors.white.withOpacity(0.08)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Header with Button pinned to the top-right corner
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            '⚠️ সতর্কবার্তা: যে পণ্যগুলোর স্টক কম',
                            style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold),
                          ),
                          SizedBox(height: 3),
                          Text(
                            '৫টি বা তার কম মাল অবশিষ্ট থাকা পণ্যের তালিকা',
                            style: TextStyle(color: Color(0xFF94A3B8), fontSize: 11),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 8),
                    // Stock button pinned in corner
                    InkWell(
                      onTap: onNavigateToInventory,
                      borderRadius: BorderRadius.circular(20),
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                        decoration: BoxDecoration(
                          color: const Color(0xFF1E293B),
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(color: const Color(0xFF38BDF8).withOpacity(0.5)),
                        ),
                        child: const Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text('📦 স্টক ', style: TextStyle(color: Color(0xFF38BDF8), fontSize: 11, fontWeight: FontWeight.bold)),
                            Icon(Icons.arrow_forward_rounded, color: Color(0xFF38BDF8), size: 12),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),

                // Low stock items list or empty state
                if (provider.lowStockProducts.isEmpty)
                  Container(
                    padding: const EdgeInsets.all(16),
                    alignment: Alignment.center,
                    child: const Text('সব পণ্যের স্টক পর্যাপ্ত আছে ✅', style: TextStyle(color: Color(0xFF10B981), fontSize: 13)),
                  )
                else
                  ...provider.lowStockProducts.take(4).map((p) => Container(
                        margin: const EdgeInsets.symmetric(vertical: 4),
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                        decoration: BoxDecoration(
                          color: const Color(0xFF1E293B),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(p.name, style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w600)),
                                  Text(p.cat, style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 10)),
                                ],
                              ),
                            ),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                              decoration: BoxDecoration(
                                color: const Color(0xFFEF4444).withOpacity(0.18),
                                borderRadius: BorderRadius.circular(6),
                                border: Border.all(color: const Color(0xFFEF4444).withOpacity(0.4)),
                              ),
                              child: Text(
                                'স্টক: ${p.stock} ${p.unit}',
                                style: const TextStyle(color: Color(0xFFEF4444), fontSize: 11, fontWeight: FontWeight.bold),
                              ),
                            ),
                          ],
                        ),
                      )),
              ],
            ),
          ),

          const SizedBox(height: 16),

          // Recent Invoices Box
          Container(
            margin: const EdgeInsets.symmetric(horizontal: 16),
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: const Color(0xFF0F172A),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: Colors.white.withOpacity(0.08)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'সর্বশেষ বিক্রয় ও ক্যাশ মেমো তালিকা',
                  style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 10),
                ...provider.sales.take(5).map((sale) => Container(
                      margin: const EdgeInsets.symmetric(vertical: 4),
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: const Color(0xFF1E293B),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(sale.id, style: const TextStyle(color: Color(0xFF38BDF8), fontSize: 12, fontWeight: FontWeight.bold)),
                                const SizedBox(height: 2),
                                Text(sale.customer, style: const TextStyle(color: Colors.white70, fontSize: 11)),
                              ],
                            ),
                          ),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.end,
                            children: [
                              Text('৳ ${sale.grandTotal.toStringAsFixed(0)}', style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
                              const SizedBox(height: 2),
                              InkWell(
                                onTap: () {
                                  showDialog(
                                    context: context,
                                    builder: (_) => ReceiptDialog(sale: sale),
                                  );
                                },
                                child: const Text('📄 মেমো দেখুন', style: TextStyle(color: Color(0xFF38BDF8), fontSize: 10)),
                              ),
                            ],
                          ),
                        ],
                      ),
                    )),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
