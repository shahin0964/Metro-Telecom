import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import '../services/cloud_sync_service.dart';
import 'dashboard_tab.dart';
import 'pos_tab.dart';
import 'inventory_tab.dart';
import 'reports_tab.dart';
import 'due_ledger_tab.dart';
import 'expenses_screen.dart';
import 'settings_screen.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<AppProvider>();

    final List<Widget> tabs = [
      DashboardTab(
        onNavigateToPos: () => setState(() => _currentIndex = 1),
        onNavigateToInventory: () => setState(() => _currentIndex = 2),
      ),
      const PosTab(),
      const InventoryTab(),
      const ReportsTab(),
      const DueLedgerTab(),
    ];

    return Scaffold(
      backgroundColor: const Color(0xFF0B111E),
      appBar: AppBar(
        backgroundColor: const Color(0xFF0F172A),
        elevation: 0,
        scrolledUnderElevation: 2,
        leading: Builder(
          builder: (context) => IconButton(
            icon: const Icon(Icons.menu_rounded, color: Colors.white),
            onPressed: () => Scaffold.of(context).openDrawer(),
          ),
        ),
        title: Row(
          children: [
            Container(
              width: 32,
              height: 32,
              decoration: BoxDecoration(
                color: const Color(0xFF2563EB),
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Center(
                child: Text('MT', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w900, fontSize: 13)),
              ),
            ),
            const SizedBox(width: 8),
            const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Row(
                  children: [
                    Text(
                      'Metro Telecom',
                      style: TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.bold),
                    ),
                    SizedBox(width: 6),
                    // PRO POS BADGE
                    DecoratedBox(
                      decoration: BoxDecoration(
                        color: Color(0xFF10B981),
                        borderRadius: BorderRadius.all(Radius.circular(4)),
                      ),
                      child: Padding(
                        padding: EdgeInsets.symmetric(horizontal: 4, vertical: 1),
                        child: Text(
                          'PRO POS',
                          style: TextStyle(color: Colors.black, fontSize: 8, fontWeight: FontWeight.w900),
                        ),
                      ),
                    ),
                  ],
                ),
                Text(
                  'মেট্রো টেলিকম ও কম্পিউটার',
                  style: TextStyle(color: Color(0xFF94A3B8), fontSize: 10),
                ),
              ],
            ),
          ],
        ),
        actions: [
          // Live Cloud Sync Status Pill
          GestureDetector(
            onTap: () => provider.syncWithCloud(),
            child: Container(
              margin: const EdgeInsets.symmetric(vertical: 12, horizontal: 8),
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: provider.syncStatus == SyncStatus.connected
                    ? const Color(0xFF10B981).withOpacity(0.15)
                    : provider.syncStatus == SyncStatus.syncing
                        ? const Color(0xFF38BDF8).withOpacity(0.15)
                        : const Color(0xFFEF4444).withOpacity(0.15),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(
                  color: provider.syncStatus == SyncStatus.connected
                      ? const Color(0xFF10B981).withOpacity(0.3)
                      : provider.syncStatus == SyncStatus.syncing
                          ? const Color(0xFF38BDF8).withOpacity(0.3)
                          : const Color(0xFFEF4444).withOpacity(0.3),
                ),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Container(
                    width: 6,
                    height: 6,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: provider.syncStatus == SyncStatus.connected
                          ? const Color(0xFF10B981)
                          : provider.syncStatus == SyncStatus.syncing
                              ? const Color(0xFF38BDF8)
                              : const Color(0xFFEF4444),
                    ),
                  ),
                  const SizedBox(width: 5),
                  Text(
                    provider.syncStatus == SyncStatus.connected
                        ? 'লাইভ'
                        : provider.syncStatus == SyncStatus.syncing
                            ? 'সিঙ্ক...'
                            : 'অফলাইন',
                    style: TextStyle(
                      color: provider.syncStatus == SyncStatus.connected
                          ? const Color(0xFF10B981)
                          : provider.syncStatus == SyncStatus.syncing
                              ? const Color(0xFF38BDF8)
                              : const Color(0xFFEF4444),
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),

      // Side Drawer
      drawer: Drawer(
        backgroundColor: const Color(0xFF0C1322),
        child: Column(
          children: [
            Container(
              padding: const EdgeInsets.only(top: 50, left: 20, right: 20, bottom: 20),
              color: const Color(0xFF131D31),
              child: Row(
                children: [
                  Container(
                    width: 44,
                    height: 44,
                    decoration: BoxDecoration(
                      color: const Color(0xFF2563EB),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: const Center(
                      child: Text('MT', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 18)),
                    ),
                  ),
                  const SizedBox(width: 12),
                  const Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Text('Metro Telecom', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
                          SizedBox(width: 6),
                          DecoratedBox(
                            decoration: BoxDecoration(
                              color: Color(0xFF10B981),
                              borderRadius: BorderRadius.all(Radius.circular(4)),
                            ),
                            child: Padding(
                              padding: EdgeInsets.symmetric(horizontal: 4, vertical: 1),
                              child: Text(
                                'PRO POS',
                                style: TextStyle(color: Colors.black, fontSize: 8, fontWeight: FontWeight.w900),
                              ),
                            ),
                          ),
                        ],
                      ),
                      Text('মেট্রো টেলিকম ও কম্পিউটার', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 11)),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 10),
            Expanded(
              child: ListView(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                children: [
                  ListTile(
                    leading: const Icon(Icons.receipt_long_rounded, color: Color(0xFF38BDF8), size: 20),
                    title: const Text('দোকানের খরচ তালিকা', style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.w600)),
                    subtitle: const Text('বিদ্যুৎ, নাস্তা ও দৈনন্দিন খরচ', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 10)),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                    onTap: () {
                      Navigator.pop(context);
                      Navigator.push(context, MaterialPageRoute(builder: (_) => const ExpensesScreen()));
                    },
                  ),
                  const SizedBox(height: 6),
                  ListTile(
                    leading: const Icon(Icons.verified_user_rounded, color: Color(0xFF10B981), size: 20),
                    title: const Text('ডিজিটাল ওয়ারেন্টি ও সিরিয়াল', style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.w600)),
                    subtitle: const Text('IMEI ও সিরিয়াল দিয়ে ওয়ারেন্টি যাচাই', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 10)),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                    onTap: () {
                      Navigator.pop(context);
                      _showWarrantyDialog(context, provider);
                    },
                  ),
                  const SizedBox(height: 6),
                  ListTile(
                    leading: const Icon(Icons.sync_rounded, color: Color(0xFFA855F7), size: 20),
                    title: const Text('এখনই ক্লাউড সিঙ্ক করুন', style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.w600)),
                    subtitle: const Text('পিসি ও ওয়েব সফটওয়্যারের সাথে ডাটা মিলান', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 10)),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                    onTap: () {
                      Navigator.pop(context);
                      provider.syncWithCloud();
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('ক্লাউড সিঙ্ক সম্পন্ন হয়েছে ✅'),
                          backgroundColor: Color(0xFF10B981),
                          duration: Duration(seconds: 2),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 6),
                  ListTile(
                    leading: const Icon(Icons.settings_rounded, color: Color(0xFF38BDF8), size: 20),
                    title: const Text('সেটিংস ও ক্লাউড কনফিগ', style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.w600)),
                    subtitle: const Text('দোকানের নাম, ব্যাকআপ ও সিঙ্ক কী', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 10)),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                    onTap: () {
                      Navigator.pop(context);
                      Navigator.push(context, MaterialPageRoute(builder: (_) => const SettingsScreen()));
                    },
                  ),
                ],
              ),
            ),

            // Sidebar Clean Footer
            Container(
              padding: const EdgeInsets.all(16),
              decoration: const BoxDecoration(
                border: Border(top: BorderSide(color: Colors.white12)),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('Version 1.0.0', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 12)),
                  Container(
                    width: 8,
                    height: 8,
                    decoration: const BoxDecoration(
                      shape: BoxShape.circle,
                      color: Color(0xFF10B981),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),

      // Tab Body
      body: provider.isLoading
          ? const Center(child: CircularProgressIndicator(color: Color(0xFF38BDF8)))
          : IndexedStack(
              index: _currentIndex,
              children: tabs,
            ),

      // Material 3 Bottom Navigation Bar
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: (idx) => setState(() => _currentIndex = idx),
        backgroundColor: const Color(0xFF0F172A),
        indicatorColor: const Color(0xFF2563EB),
        elevation: 10,
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.dashboard_outlined, color: Colors.white70),
            selectedIcon: Icon(Icons.dashboard_rounded, color: Colors.white),
            label: 'ড্যাশবোর্ড',
          ),
          NavigationDestination(
            icon: Icon(Icons.point_of_sale_outlined, color: Colors.white70),
            selectedIcon: Icon(Icons.point_of_sale_rounded, color: Colors.white),
            label: 'পিওএস',
          ),
          NavigationDestination(
            icon: Icon(Icons.inventory_2_outlined, color: Colors.white70),
            selectedIcon: Icon(Icons.inventory_2_rounded, color: Colors.white),
            label: 'স্টক',
          ),
          NavigationDestination(
            icon: Icon(Icons.query_stats_outlined, color: Colors.white70),
            selectedIcon: Icon(Icons.query_stats_rounded, color: Colors.white),
            label: 'হিসাব খাতা',
          ),
          NavigationDestination(
            icon: Icon(Icons.menu_book_outlined, color: Colors.white70),
            selectedIcon: Icon(Icons.menu_book_rounded, color: Colors.white),
            label: 'বাকি খাতা',
          ),
        ],
      ),
    );
  }

  void _showWarrantyDialog(BuildContext context, AppProvider provider) {
    final searchCtrl = TextEditingController();
    showDialog(
      context: context,
      builder: (ctx) {
        String resultText = '';
        Color resultColor = Colors.white70;

        return StatefulBuilder(
          builder: (context, setState) => AlertDialog(
            backgroundColor: const Color(0xFF0F172A),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            title: const Row(
              children: [
                Icon(Icons.verified_user_rounded, color: Color(0xFF10B981), size: 22),
                SizedBox(width: 8),
                Text('ওয়ারেন্টি ও সিরিয়াল যাচাই', style: TextStyle(color: Colors.white, fontSize: 16)),
              ],
            ),
            content: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                TextField(
                  controller: searchCtrl,
                  style: const TextStyle(color: Colors.white, fontSize: 13),
                  decoration: const InputDecoration(
                    labelText: 'বারকোড বা IMEI / সিরিয়াল লিখুন',
                    labelStyle: TextStyle(color: Colors.white60, fontSize: 12),
                  ),
                ),
                const SizedBox(height: 12),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF2563EB)),
                  onPressed: () {
                    final query = searchCtrl.text.trim();
                    if (query.isEmpty) return;
                    final match = provider.products.where((p) =>
                        p.barcode == query ||
                        p.serials.contains(query) ||
                        p.name.toLowerCase().contains(query.toLowerCase())).firstOrNull;
                    setState(() {
                      if (match != null) {
                        resultText = 'পণ্য: ${match.name}\nওয়ারেন্টি: ${match.warranty.isEmpty ? "কোন ওয়ারেন্টি নেই" : match.warranty}\nস্টক: ${match.stock} ${match.unit}';
                        resultColor = const Color(0xFF10B981);
                      } else {
                        resultText = 'এই সিরিয়াল বা বারকোডের কোনো পণ্য পাওয়া যায়নি!';
                        resultColor = const Color(0xFFEF4444);
                      }
                    });
                  },
                  child: const Text('যাচাই করুন', style: TextStyle(color: Colors.white)),
                ),
                if (resultText.isNotEmpty) ...[
                  const SizedBox(height: 12),
                  Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: const Color(0xFF1E293B),
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: resultColor.withOpacity(0.4)),
                    ),
                    child: Text(resultText, style: TextStyle(color: resultColor, fontSize: 12)),
                  ),
                ],
              ],
            ),
            actions: [
              TextButton(onPressed: () => Navigator.pop(ctx), child: const Text('বন্ধ করুন', style: TextStyle(color: Colors.white60))),
            ],
          ),
        );
      },
    );
  }
}
