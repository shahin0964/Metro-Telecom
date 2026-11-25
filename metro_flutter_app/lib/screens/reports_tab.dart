import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';

class ReportsTab extends StatefulWidget {
  const ReportsTab({super.key});

  @override
  State<ReportsTab> createState() => _ReportsTabState();
}

class _ReportsTabState extends State<ReportsTab> {
  String _selectedFilter = 'year'; // 'all', 'year', 'month', 'today'

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<AppProvider>();

    // Filter sales and expenses based on period
    final now = DateTime.now();
    final yearStr = now.year.toString();
    final monthStr = '$yearStr-${now.month.toString().padLeft(2, '0')}';
    final dayStr = '$monthStr-${now.day.toString().padLeft(2, '0')}';

    final filteredSales = provider.sales.where((s) {
      if (_selectedFilter == 'year') return s.timestamp.startsWith(yearStr);
      if (_selectedFilter == 'month') return s.timestamp.startsWith(monthStr);
      if (_selectedFilter == 'today') return s.timestamp.startsWith(dayStr);
      return true;
    }).toList();

    final filteredExpenses = provider.expenses.where((e) {
      if (_selectedFilter == 'year') return e.date.startsWith(yearStr);
      if (_selectedFilter == 'month') return e.date.startsWith(monthStr);
      if (_selectedFilter == 'today') return e.date.startsWith(dayStr);
      return true;
    }).toList();

    double totalTurnover = filteredSales.fold(0.0, (sum, s) => sum + s.grandTotal);
    double totalCogs = 0.0;
    for (var s in filteredSales) {
      for (var it in s.items) {
        totalCogs += (it.cost * it.qty);
      }
    }
    double totalExpenses = filteredExpenses.fold(0.0, (sum, e) => sum + e.amount);
    double grossProfit = totalTurnover - totalCogs;
    double netProfit = grossProfit - totalExpenses;
    double marginPercent = totalTurnover > 0 ? (netProfit / totalTurnover) * 100 : 0.0;

    return SingleChildScrollView(
      padding: const EdgeInsets.only(bottom: 30),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Period Filter Header
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
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Row(
                  children: [
                    Icon(Icons.query_stats_rounded, color: Color(0xFF38BDF8), size: 22),
                    SizedBox(width: 8),
                    Text(
                      'বার্ষিক ও মাসিক হিসাব খাতা',
                      style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                const Text(
                  'দৈনিক, মাসিক ও বাৎসরিক টার্নওভার, খরচ এবং নিট লাভের হিসাব',
                  style: TextStyle(color: Color(0xFF94A3B8), fontSize: 11),
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    _filterChip('year', 'বাৎসরিক (২০২৬)'),
                    const SizedBox(width: 8),
                    _filterChip('month', 'মাসিক (চলতি মাস)'),
                    const SizedBox(width: 8),
                    _filterChip('today', 'দৈনিক (আজকের)'),
                    const SizedBox(width: 8),
                    _filterChip('all', 'সব সময়'),
                  ],
                ),
              ],
            ),
          ),

          // 4 Financial Ledger KPI Cards
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: GridView.count(
              crossAxisCount: 2,
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              crossAxisSpacing: 10,
              mainAxisSpacing: 10,
              childAspectRatio: 1.4,
              children: [
                _buildKpiCard(
                  'মোট বিক্রয় (Turnover)',
                  '৳ ${totalTurnover.toStringAsFixed(0)}',
                  'মোট ${filteredSales.length} টি বিক্রয় মেমো',
                  Icons.payments_rounded,
                  const Color(0xFF38BDF8),
                ),
                _buildKpiCard(
                  'বিক্রিত পণ্যের ক্রয়মূল্য (COGS)',
                  '৳ ${totalCogs.toStringAsFixed(0)}',
                  'আসল মালের চালান মূল্য',
                  Icons.inventory_rounded,
                  const Color(0xFFEAB308),
                ),
                _buildKpiCard(
                  'মোট পরিচালনা খরচ (Expenses)',
                  '৳ ${totalExpenses.toStringAsFixed(0)}',
                  'বিদ্যুৎ, নাস্তা ও অন্যান্য খরচ',
                  Icons.receipt_long_rounded,
                  const Color(0xFFEF4444),
                ),
                _buildKpiCard(
                  'নিট লাভ (Net Profit)',
                  '৳ ${netProfit.toStringAsFixed(0)}',
                  'প্রফিট মার্জিন: ${marginPercent.toStringAsFixed(1)}%',
                  Icons.monetization_on_rounded,
                  const Color(0xFF10B981),
                ),
              ],
            ),
          ),

          const SizedBox(height: 16),

          // Ledger Breakdown List
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
                  'হিসাব বিশ্লেষণ ও অডিট রিপোর্ট',
                  style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 12),
                _buildAuditRow('মোট বিক্রয় মূল্য (টাকা):', '৳ ${totalTurnover.toStringAsFixed(0)}', const Color(0xFF38BDF8)),
                _buildAuditRow('(-) পণ্যের আসল ক্রয়মূল্য:', '- ৳ ${totalCogs.toStringAsFixed(0)}', const Color(0xFFEAB308)),
                _buildAuditRow('মোট গ্রস প্রফিট (Gross Profit):', '৳ ${grossProfit.toStringAsFixed(0)}', Colors.white, isBold: true),
                _buildAuditRow('(-) দোকান পরিচালনা খরচ:', '- ৳ ${totalExpenses.toStringAsFixed(0)}', const Color(0xFFEF4444)),
                const Divider(color: Colors.white24, height: 20),
                _buildAuditRow('চূড়ান্ত আসল নিট লাভ (Net Cash Profit):', '৳ ${netProfit.toStringAsFixed(0)}', const Color(0xFF10B981), isBold: true, isLarge: true),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _filterChip(String filter, String label) {
    final isSelected = _selectedFilter == filter;
    return GestureDetector(
      onTap: () => setState(() => _selectedFilter = filter),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
        decoration: BoxDecoration(
          color: isSelected ? const Color(0xFF2563EB) : const Color(0xFF131D31),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: isSelected ? const Color(0xFF38BDF8) : Colors.white12),
        ),
        child: Text(
          label,
          style: TextStyle(
            color: isSelected ? Colors.white : Colors.white70,
            fontSize: 10,
            fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
          ),
        ),
      ),
    );
  }

  Widget _buildKpiCard(String title, String value, String subtitle, IconData icon, Color color) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: const Color(0xFF131D31),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white.withOpacity(0.06)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Icon(icon, color: color, size: 20),
              Text(title, style: TextStyle(color: Colors.white.withOpacity(0.6), fontSize: 10)),
            ],
          ),
          const Spacer(),
          Text(value, style: TextStyle(color: color, fontSize: 16, fontWeight: FontWeight.bold)),
          const SizedBox(height: 2),
          Text(subtitle, style: TextStyle(color: Colors.white.withOpacity(0.4), fontSize: 9)),
        ],
      ),
    );
  }

  Widget _buildAuditRow(String title, String value, Color valColor, {bool isBold = false, bool isLarge = false}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            title,
            style: TextStyle(
              color: Colors.white70,
              fontSize: isLarge ? 13 : 12,
              fontWeight: isBold ? FontWeight.bold : FontWeight.normal,
            ),
          ),
          Text(
            value,
            style: TextStyle(
              color: valColor,
              fontSize: isLarge ? 15 : 12,
              fontWeight: isBold ? FontWeight.bold : FontWeight.normal,
            ),
          ),
        ],
      ),
    );
  }
}
