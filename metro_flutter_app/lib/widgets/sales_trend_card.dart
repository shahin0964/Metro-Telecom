import 'package:flutter/material.dart';

class SalesTrendCard extends StatelessWidget {
  const SalesTrendCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF0F172A),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: const Color(0xFF38BDF8).withOpacity(0.3), width: 1.5),
        boxShadow: [
          BoxShadow(
            color: const Color(0xFF0284C7).withOpacity(0.12),
            blurRadius: 24,
            offset: const Offset(0, 8),
          ),
        ],
        gradient: const RadialGradient(
          center: Alignment(0.8, -0.8),
          radius: 1.2,
          colors: [
            Color(0xFF1E293B),
            Color(0xFF0C1322),
          ],
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Header
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: 44,
                height: 44,
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF38BDF8), Color(0xFF2563EB)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(12),
                  boxShadow: [
                    BoxShadow(
                      color: const Color(0xFF38BDF8).withOpacity(0.35),
                      blurRadius: 10,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: const Icon(Icons.insights_rounded, color: Colors.white, size: 26),
              ),
              const SizedBox(width: 12),
              const Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'গত ৭ দিনের বিক্রয় চিত্র (Sales Trend)',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 15,
                        fontWeight: FontWeight.bold,
                        letterSpacing: 0.2,
                      ),
                    ),
                    SizedBox(height: 3),
                    Text(
                      'দৈনিক বেচাকেনার গ্রাফিক্যাল পরিসংখ্যান',
                      style: TextStyle(
                        color: Color(0xFF94A3B8),
                        fontSize: 11,
                      ),
                    ),
                  ],
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                decoration: BoxDecoration(
                  color: const Color(0xFF1E293B),
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: Colors.white.withOpacity(0.12)),
                ),
                child: const Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(Icons.calendar_today_rounded, color: Color(0xFF38BDF8), size: 13),
                    SizedBox(width: 5),
                    Text(
                      '৭ দিন ⌵',
                      style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w600),
                    ),
                  ],
                ),
              ),
            ],
          ),

          const SizedBox(height: 20),

          // Chart Custom Canvas
          SizedBox(
            height: 210,
            child: CustomPaint(
              painter: _SalesTrendPainter(),
            ),
          ),

          const SizedBox(height: 16),

          // Bottom summary pill
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
            decoration: BoxDecoration(
              color: const Color(0xFF131D31),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: Colors.white.withOpacity(0.08)),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(6),
                      decoration: BoxDecoration(
                        color: const Color(0xFF8B5CF6).withOpacity(0.2),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: const Icon(Icons.bar_chart_rounded, color: Color(0xFFA78BFA), size: 18),
                    ),
                    const SizedBox(width: 10),
                    Text.rich(
                      TextSpan(
                        children: [
                          const TextSpan(
                            text: 'সর্বমোট বিক্রয়: ',
                            style: TextStyle(color: Color(0xFFCBD5E1), fontSize: 13),
                          ),
                          const TextSpan(
                            text: '৳ ১৫,৫১০.০০',
                            style: TextStyle(color: Color(0xFF38BDF8), fontSize: 14, fontWeight: FontWeight.bold),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                  decoration: BoxDecoration(
                    color: const Color(0xFF10B981).withOpacity(0.15),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: const Color(0xFF10B981).withOpacity(0.3)),
                  ),
                  child: const Row(
                    children: [
                      Icon(Icons.north_east_rounded, color: Color(0xFF34D399), size: 14),
                      SizedBox(width: 4),
                      Text(
                        '+১২%',
                        style: TextStyle(color: Color(0xFF34D399), fontSize: 12, fontWeight: FontWeight.bold),
                      ),
                    ],
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

class _SalesTrendPainter extends CustomPainter {
  final List<double> values = [1250, 1850, 2420, 3100, 2760, 2100, 1900];
  final List<String> days = ['বৃহঃ', 'শুক্র', 'শনি', 'রবি', 'সোম', 'মঙ্গল', 'বুধ'];
  final List<String> dates = ['(Nov 20)', '(Nov 21)', '(Nov 22)', '(Nov 23)', '(Nov 24)', '(Nov 25)', '(Nov 26)'];
  final double maxValue = 4000.0;

  @override
  void paint(Canvas canvas, Size size) {
    const leftMargin = 30.0;
    const bottomMargin = 35.0;
    const topMargin = 22.0;

    final chartWidth = size.width - leftMargin;
    final chartHeight = size.height - bottomMargin - topMargin;

    // Draw Grid Lines & Y-labels (4k, 3k, 2k, 1k, 0)
    final gridPaint = Paint()
      ..color = Colors.white.withOpacity(0.08)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.0;

    final ySteps = [4000, 3000, 2000, 1000, 0];
    final yLabels = ['4k', '3k', '2k', '1k', '0'];

    for (int i = 0; i < ySteps.length; i++) {
      final y = topMargin + (chartHeight * (1.0 - (ySteps[i] / maxValue)));
      
      // Draw dashed horizontal line
      _drawDashedLine(canvas, Offset(leftMargin, y), Offset(size.width, y), gridPaint);

      // Y-axis text
      final textSpan = TextSpan(
        text: yLabels[i],
        style: TextStyle(color: Colors.white.withOpacity(0.4), fontSize: 10),
      );
      final textPainter = TextPainter(
        text: textSpan,
        textDirection: TextDirection.ltr,
      )..layout();
      textPainter.paint(canvas, Offset(leftMargin - textPainter.width - 6, y - textPainter.height / 2));
    }

    final columnWidth = chartWidth / values.length;
    final barWidth = columnWidth * 0.48;

    List<Offset> points = [];

    // Draw Bars
    for (int i = 0; i < values.length; i++) {
      final x = leftMargin + (i * columnWidth) + (columnWidth / 2);
      final barHeight = (values[i] / maxValue) * chartHeight;
      final yTop = topMargin + chartHeight - barHeight;
      final yBottom = topMargin + chartHeight;

      points.add(Offset(x, yTop));

      // Bar rect with rounded top
      final rect = Rect.fromLTRB(x - barWidth / 2, yTop, x + barWidth / 2, yBottom);
      final rrect = RRect.fromRectAndCorners(
        rect,
        topLeft: const Radius.circular(8),
        topRight: const Radius.circular(8),
      );

      final barGradient = LinearGradient(
        colors: [
          const Color(0xFF38BDF8),
          const Color(0xFF2563EB).withOpacity(0.7),
        ],
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
      );

      final barPaint = Paint()
        ..shader = barGradient.createShader(rect)
        ..style = PaintingStyle.fill;

      canvas.drawRRect(rrect, barPaint);

      // X-axis Day Text
      final daySpan = TextSpan(
        text: days[i],
        style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
      );
      final dayPainter = TextPainter(text: daySpan, textDirection: TextDirection.ltr)..layout();
      dayPainter.paint(canvas, Offset(x - dayPainter.width / 2, yBottom + 4));

      // X-axis Date Text
      final dateSpan = TextSpan(
        text: dates[i],
        style: TextStyle(color: Colors.white.withOpacity(0.45), fontSize: 8),
      );
      final datePainter = TextPainter(text: dateSpan, textDirection: TextDirection.ltr)..layout();
      datePainter.paint(canvas, Offset(x - datePainter.width / 2, yBottom + 18));
    }

    // Draw Smooth Spline Curve Connecting Points
    if (points.isNotEmpty) {
      final path = Path();
      path.moveTo(points[0].dx, points[0].dy);

      for (int i = 0; i < points.length - 1; i++) {
        final p0 = points[i];
        final p1 = points[i + 1];
        final controlX = (p0.dx + p1.dx) / 2;
        path.cubicTo(controlX, p0.dy, controlX, p1.dy, p1.dx, p1.dy);
      }

      // Line shadow / glow
      final glowPaint = Paint()
        ..color = const Color(0xFF38BDF8).withOpacity(0.4)
        ..style = PaintingStyle.stroke
        ..strokeWidth = 6.0
        ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 6);
      canvas.drawPath(path, glowPaint);

      // Main line
      final linePaint = Paint()
        ..color = const Color(0xFF38BDF8)
        ..style = PaintingStyle.stroke
        ..strokeWidth = 2.5;
      canvas.drawPath(path, linePaint);

      // Draw Nodes and Value Badges
      for (int i = 0; i < points.length; i++) {
        final pt = points[i];

        // Outer glow circle
        final outerPaint = Paint()
          ..color = const Color(0xFF0284C7).withOpacity(0.6)
          ..style = PaintingStyle.fill;
        canvas.drawCircle(pt, 6, outerPaint);

        // Inner white dot
        final innerPaint = Paint()
          ..color = Colors.white
          ..style = PaintingStyle.fill;
        canvas.drawCircle(pt, 3.5, innerPaint);

        // Price label above node: ৳ 3,100
        final priceStr = '৳ ${values[i].toInt().toString().replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (m) => '${m[1]},')}';
        final valSpan = TextSpan(
          text: priceStr,
          style: const TextStyle(
            color: Colors.white,
            fontSize: 9,
            fontWeight: FontWeight.bold,
          ),
        );
        final valPainter = TextPainter(text: valSpan, textDirection: TextDirection.ltr)..layout();
        valPainter.paint(canvas, Offset(pt.dx - valPainter.width / 2, pt.dy - valPainter.height - 4));
      }
    }
  }

  void _drawDashedLine(Canvas canvas, Offset p1, Offset p2, Paint paint) {
    const dashWidth = 4.0;
    const dashSpace = 4.0;
    double currentX = p1.dx;
    while (currentX < p2.dx) {
      canvas.drawLine(
        Offset(currentX, p1.dy),
        Offset((currentX + dashWidth).clamp(p1.dx, p2.dx), p1.dy),
        paint,
      );
      currentX += dashWidth + dashSpace;
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
