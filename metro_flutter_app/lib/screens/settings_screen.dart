import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import '../services/cloud_sync_service.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<AppProvider>();

    return Scaffold(
      backgroundColor: const Color(0xFF0B111E),
      appBar: AppBar(
        title: const Text('সেটিংস ও সিঙ্ক ম্যানেজমেন্ট', style: TextStyle(color: Colors.white, fontSize: 16)),
        backgroundColor: const Color(0xFF0F172A),
        iconTheme: const IconThemeData(color: Colors.white),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Shop Profile
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: const Color(0xFF131D31),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: Colors.white.withOpacity(0.06)),
            ),
            child: Row(
              children: [
                Container(
                  width: 50,
                  height: 50,
                  decoration: BoxDecoration(
                    color: const Color(0xFF2563EB),
                    borderRadius: BorderRadius.circular(14),
                  ),
                  child: const Center(
                    child: Text('MT', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 20)),
                  ),
                ),
                const SizedBox(width: 14),
                const Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Metro Telecom', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
                    SizedBox(height: 2),
                    Text('মোবাইল, গ্যাজেট ও ইলেকট্রনিক্স পিওএস', style: TextStyle(color: Color(0xFF94A3B8), fontSize: 11)),
                    Text('ভার্সন: ১.০.০ (Native Android)', style: TextStyle(color: Color(0xFF38BDF8), fontSize: 10)),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Cloud Sync Info
          Container(
            padding: const EdgeInsets.all(16),
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
                    const Text('রিয়েল-টাইম ক্লাউড সিঙ্ক', style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.bold)),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: provider.syncStatus == SyncStatus.connected
                            ? const Color(0xFF10B981).withOpacity(0.2)
                            : provider.syncStatus == SyncStatus.syncing
                                ? const Color(0xFF38BDF8).withOpacity(0.2)
                                : const Color(0xFFEF4444).withOpacity(0.2),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Row(
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
                          const SizedBox(width: 6),
                          Text(
                            provider.syncStatus == SyncStatus.connected
                                ? 'লাইভ সিঙ্ক'
                                : provider.syncStatus == SyncStatus.syncing
                                    ? 'সিঙ্ক হচ্ছে...'
                                    : 'অফলাইন মোড',
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
                  ],
                ),
                const SizedBox(height: 8),
                const Text(
                  'আপনার মোবাইল অ্যাপ, পিসি সফটওয়্যার এবং ওয়েব সফটওয়্যার একই ক্লাউড কী (metro-telecom-main) দিয়ে সংযুক্ত।',
                  style: TextStyle(color: Color(0xFF94A3B8), fontSize: 11),
                ),
                const SizedBox(height: 16),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF2563EB),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                      padding: const EdgeInsets.symmetric(vertical: 12),
                    ),
                    onPressed: () => provider.syncWithCloud(),
                    icon: const Icon(Icons.sync_rounded, color: Colors.white, size: 18),
                    label: const Text('এখনই ক্লাউড সিঙ্ক করুন', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
