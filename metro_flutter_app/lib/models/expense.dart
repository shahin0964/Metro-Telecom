class Expense {
  final String id;
  String title;
  double amount;
  String date;
  String note;
  String category;

  Expense({
    required this.id,
    required this.title,
    required this.amount,
    required this.date,
    this.note = '',
    this.category = 'দোকান পরিচালনা',
  });

  factory Expense.fromJson(Map<String, dynamic> json) {
    return Expense(
      id: json['id']?.toString() ?? '',
      title: json['title']?.toString() ?? '',
      amount: (json['amount'] as num?)?.toDouble() ?? 0.0,
      date: json['date']?.toString() ?? DateTime.now().toIso8601String().substring(0, 10),
      note: json['note']?.toString() ?? '',
      category: json['category']?.toString() ?? 'দোকান পরিচালনা',
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'title': title,
    'amount': amount,
    'date': date,
    'note': note,
    'category': category,
  };
}
