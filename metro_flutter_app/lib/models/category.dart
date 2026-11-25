class CategoryItem {
  final String id;
  final String name;
  final String label;

  CategoryItem({
    required this.id,
    required this.name,
    required this.label,
  });

  factory CategoryItem.fromJson(Map<String, dynamic> json) {
    return CategoryItem(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      label: json['label'] ?? json['name'] ?? '',
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    'label': label,
  };
}
