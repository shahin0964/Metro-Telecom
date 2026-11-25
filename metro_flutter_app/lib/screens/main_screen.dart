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
                padding: const EdgeInsets.symmetric(horizontal: 10),
                children: [
                  _drawerItem('০১. ড্যাশবোর্ড', Icons.dashboard_rounded, 0),
                  _drawerItem('০২. দ্রুত বিক্রয় (POS)', Icons.point_of_sale_rounded, 1),
                  _drawerItem('০৩. স্টক ও মালামাল', Icons.inventory_2_rounded, 2),
                  _drawerItem('০৪. বার্ষিক ও মাসিক হিসাব', Icons.query_stats_rounded, 3),
                  _drawerItem('০৫. বাকির খাতা', Icons.menu_book_rounded, 4),
                  const Divider(color: Colors.white12, height: 20),
                  ListTile(
                    leading: const Icon(Icons.receipt_long_rounded, color: Color(0xFF38BDF8), size: 20),
                    title: const Text('০৬. দোকানের খরচ', style: TextStyle(color: Colors.white, fontSize: 13)),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                    onTap: () {
                      Navigator.pop(context);
                      Navigator.push(context, MaterialPageRoute(builder: (_) => const ExpensesScreen()));
                    },
                  ),
                  ListTile(
                    leading: const Icon(Icons.settings_rounded, color: Color(0xFF38BDF8), size: 20),
                    title: const Text('০৭. সেটিংস ও সিঙ্ক', style: TextStyle(color: Colors.white, fontSize: 13)),
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

  Widget _drawerItem(String title, IconData icon, int index) {
    final isSelected = _currentIndex == index;
    return ListTile(
      leading: Icon(icon, color: isSelected ? const Color(0xFF38BDF8) : Colors.white70, size: 20),
      title: Text(
        title,
        style: TextStyle(
          color: isSelected ? const Color(0xFF38BDF8) : Colors.white,
          fontSize: 13,
          fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
        ),
      ),
      selected: isSelected,
      selectedTileColor: const Color(0xFF1E293B),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      onTap: () {
        setState(() => _currentIndex = index);
        Navigator.pop(context);
      },
    );
  }
}
