import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;
import 'package:printing/printing.dart';
import '../models/sale.dart';

class ThermalPrinterService {
  static Future<void> printReceipt(Sale sale) async {
    final doc = pw.Document();

    doc.addPage(
      pw.Page(
        pageFormat: const PdfPageFormat(58 * PdfPageFormat.mm, double.infinity, marginAll: 2 * PdfPageFormat.mm),
        build: (pw.Context context) {
          return pw.Column(
            crossAxisAlignment: pw.CrossAxisAlignment.center,
            children: [
              pw.Text('METRO TELECOM', style: pw.TextStyle(fontSize: 14, fontWeight: pw.FontWeight.bold)),
              pw.Text('মোবাইল, গ্যাজেট ও ইলেকট্রনিক্স', style: const pw.TextStyle(fontSize: 9)),
              pw.Text('ফোন: 01700-000000', style: const pw.TextStyle(fontSize: 8)),
              pw.Divider(thickness: 0.5),
              pw.Row(
                mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
                children: [
                  pw.Text('মেমো: ${sale.id}', style: const pw.TextStyle(fontSize: 8)),
                  pw.Text(sale.timestamp.length >= 10 ? sale.timestamp.substring(0, 10) : '', style: const pw.TextStyle(fontSize: 8)),
                ],
              ),
              pw.Align(
                alignment: pw.Alignment.centerLeft,
                child: pw.Text('ক্রেতা: ${sale.customer}', style: const pw.TextStyle(fontSize: 8)),
              ),
              pw.Divider(thickness: 0.5),
              pw.Row(
                mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
                children: [
                  pw.Text('বিবরণ', style: pw.TextStyle(fontSize: 8, fontWeight: pw.FontWeight.bold)),
                  pw.Text('মোট (টাকা)', style: pw.TextStyle(fontSize: 8, fontWeight: pw.FontWeight.bold)),
                ],
              ),
              pw.Divider(thickness: 0.3),
              ...sale.items.map((it) => pw.Padding(
                    padding: const pw.EdgeInsets.symmetric(vertical: 1),
                    child: pw.Row(
                      mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
                      children: [
                        pw.Expanded(
                          child: pw.Text('${it.name} x${it.qty}', style: const pw.TextStyle(fontSize: 8)),
                        ),
                        pw.Text(it.total.toStringAsFixed(0), style: const pw.TextStyle(fontSize: 8)),
                      ],
                    ),
                  )),
              pw.Divider(thickness: 0.5),
              pw.Row(
                mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
                children: [
                  pw.Text('সর্বমোট বিল:', style: pw.TextStyle(fontSize: 9, fontWeight: pw.FontWeight.bold)),
                  pw.Text('tk ${sale.grandTotal.toStringAsFixed(0)}', style: pw.TextStyle(fontSize: 9, fontWeight: pw.FontWeight.bold)),
                ],
              ),
              pw.Row(
                mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
                children: [
                  pw.Text('পরিশোধ:', style: const pw.TextStyle(fontSize: 8)),
                  pw.Text('tk ${sale.paidAmount.toStringAsFixed(0)}', style: const pw.TextStyle(fontSize: 8)),
                ],
              ),
              if (sale.dueAmount > 0)
                pw.Row(
                  mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
                  children: [
                    pw.Text('বাকি:', style: pw.TextStyle(fontSize: 8, color: PdfColors.red)),
                    pw.Text('tk ${sale.dueAmount.toStringAsFixed(0)}', style: pw.TextStyle(fontSize: 8, color: PdfColors.red)),
                  ],
                ),
              pw.Divider(thickness: 0.5),
              pw.Text('ধন্যবাদ আবার আসবেন!', style: const pw.TextStyle(fontSize: 8)),
              pw.Text('সফটওয়্যার: Metro Telecom POS', style: const pw.TextStyle(fontSize: 6, color: PdfColors.grey700)),
            ],
          );
        },
      ),
    );

    await Printing.layoutPdf(
      onLayout: (PdfPageFormat format) async => doc.save(),
      name: 'Receipt_${sale.id}',
    );
  }
}
