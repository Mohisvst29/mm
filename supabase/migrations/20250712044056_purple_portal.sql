/*
  # إعادة إنشاء قاعدة البيانات الكاملة لمقهى موال مراكش

  1. الجداول الجديدة
    - `menu_sections` - أقسام المنيو
    - `menu_items` - عناصر المنيو
    - `menu_item_sizes` - أحجام العناصر
    - `special_offers` - العروض الخاصة

  2. البيانات
    - جميع أقسام المنيو مع الأيقونات والصور
    - جميع عناصر المنيو مع الأسعار والأوصاف
    - أحجام الشاي والبيتزا
    - العروض الخاصة

  3. الأمان
    - تفعيل RLS على جميع الجداول
    - سياسات للقراءة العامة
    - سياسات للكتابة للمستخدمين المصرح لهم
*/

-- إنشاء extension للـ UUID إذا لم يكن موجود
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- حذف الجداول الموجودة إذا كانت موجودة
DROP TABLE IF EXISTS menu_item_sizes CASCADE;
DROP TABLE IF EXISTS menu_items CASCADE;
DROP TABLE IF EXISTS menu_sections CASCADE;
DROP TABLE IF EXISTS special_offers CASCADE;

-- إنشاء جدول أقسام المنيو
CREATE TABLE menu_sections (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  icon text NOT NULL DEFAULT '🍽️',
  image text DEFAULT '',
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- إنشاء جدول عناصر المنيو
CREATE TABLE menu_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_id uuid REFERENCES menu_sections(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text DEFAULT '',
  price numeric(10,2) NOT NULL DEFAULT 0,
  calories integer DEFAULT NULL,
  image text DEFAULT '',
  popular boolean DEFAULT false,
  new boolean DEFAULT false,
  available boolean DEFAULT true,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- إنشاء جدول أحجام عناصر المنيو
CREATE TABLE menu_item_sizes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_id uuid REFERENCES menu_items(id) ON DELETE CASCADE,
  size text NOT NULL,
  price numeric(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- إنشاء جدول العروض الخاصة
CREATE TABLE special_offers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text NOT NULL,
  original_price numeric(10,2) NOT NULL,
  offer_price numeric(10,2) NOT NULL,
  valid_until text NOT NULL,
  image text DEFAULT '',
  calories integer DEFAULT NULL,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- إنشاء الفهارس للأداء
CREATE INDEX idx_menu_sections_order ON menu_sections(order_index);
CREATE INDEX idx_menu_items_section_id ON menu_items(section_id);
CREATE INDEX idx_menu_items_order ON menu_items(order_index);
CREATE INDEX idx_menu_item_sizes_item_id ON menu_item_sizes(item_id);

-- تفعيل RLS على جميع الجداول
ALTER TABLE menu_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_item_sizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE special_offers ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان للقراءة العامة
CREATE POLICY "Public can read menu sections"
  ON menu_sections
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can read available menu items"
  ON menu_items
  FOR SELECT
  TO public
  USING (available = true);

CREATE POLICY "Public can read menu item sizes"
  ON menu_item_sizes
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can read active special offers"
  ON special_offers
  FOR SELECT
  TO public
  USING (active = true);

-- سياسات الأمان للمستخدمين المصرح لهم
CREATE POLICY "Authenticated users can manage menu sections"
  ON menu_sections
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage menu items"
  ON menu_items
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage menu item sizes"
  ON menu_item_sizes
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage special offers"
  ON special_offers
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- إدراج بيانات أقسام المنيو
INSERT INTO menu_sections (title, icon, image, order_index) VALUES
('القهوة الساخنة', '☕', 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400', 1),
('القهوة الباردة', '🧊', 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400', 2),
('الشاي', '🍵', 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400', 3),
('العصيرات الطبيعية', '🍹', 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 4),
('الموكتيلز والموهيتو', '🥤', 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 5),
('البيتزا', '🍕', 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400', 6),
('المناقيش والفطاير', '🥙', 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 7),
('الساندوتش والبرجر', '🥪', 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 8),
('الحلى', '🍰', 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400', 9),
('الشيشة', '💨', 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 10);

-- إدراج بيانات عناصر المنيو
DO $$
DECLARE
  hot_coffee_id uuid;
  cold_coffee_id uuid;
  tea_id uuid;
  juices_id uuid;
  mocktails_id uuid;
  pizza_id uuid;
  manakish_id uuid;
  sandwiches_id uuid;
  desserts_id uuid;
  shisha_id uuid;
  tea_item_1_id uuid;
  tea_item_2_id uuid;
  tea_item_3_id uuid;
  pizza_item_1_id uuid;
  pizza_item_2_id uuid;
  pizza_item_3_id uuid;
BEGIN
  -- الحصول على معرفات الأقسام
  SELECT id INTO hot_coffee_id FROM menu_sections WHERE title = 'القهوة الساخنة';
  SELECT id INTO cold_coffee_id FROM menu_sections WHERE title = 'القهوة الباردة';
  SELECT id INTO tea_id FROM menu_sections WHERE title = 'الشاي';
  SELECT id INTO juices_id FROM menu_sections WHERE title = 'العصيرات الطبيعية';
  SELECT id INTO mocktails_id FROM menu_sections WHERE title = 'الموكتيلز والموهيتو';
  SELECT id INTO pizza_id FROM menu_sections WHERE title = 'البيتزا';
  SELECT id INTO manakish_id FROM menu_sections WHERE title = 'المناقيش والفطاير';
  SELECT id INTO sandwiches_id FROM menu_sections WHERE title = 'الساندوتش والبرجر';
  SELECT id INTO desserts_id FROM menu_sections WHERE title = 'الحلى';
  SELECT id INTO shisha_id FROM menu_sections WHERE title = 'الشيشة';

  -- إدراج عناصر القهوة الساخنة
  INSERT INTO menu_items (section_id, name, description, price, calories, image, popular, new, order_index) VALUES
  (hot_coffee_id, 'قهوة عربي', 'قهوة عربية تقليدية', 10, 5, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400', false, false, 1),
  (hot_coffee_id, 'قهوة تركي', 'قهوة تركية أصيلة', 10, 8, 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=400', false, false, 2),
  (hot_coffee_id, 'اسبريسو', 'قهوة إيطالية كلاسيكية', 12, 3, 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400', false, false, 3),
  (hot_coffee_id, 'قهوة اليوم', 'قهوة مختارة خصيصاً لهذا اليوم', 12, 5, 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=400', false, false, 4),
  (hot_coffee_id, 'اسبريسو ميكاتو', 'اسبريسو مع رغوة الحليب', 13, 15, 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400', false, false, 5),
  (hot_coffee_id, 'أمريكانو', 'قهوة أمريكية كلاسيكية', 13, 5, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400', false, false, 6),
  (hot_coffee_id, 'قهوة تركي بالحليب', 'قهوة تركية مع الحليب الطازج', 13, 45, 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=400', false, false, 7),
  (hot_coffee_id, 'كورتادو', 'اسبريسو مع حليب دافئ', 14, 35, 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400', false, false, 8),
  (hot_coffee_id, 'فلات وايت', 'قهوة أسترالية بالحليب المخملي', 15, 120, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400', false, false, 9),
  (hot_coffee_id, 'لاتيه', 'قهوة بالحليب الناعم', 16, 150, 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400', true, false, 10),
  (hot_coffee_id, 'كابتشينو', 'قهوة بالحليب المرغي', 16, 80, 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400', true, false, 11),
  (hot_coffee_id, 'هوت شوكلت', 'شوكولاتة ساخنة كريمية', 16, 200, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400', false, false, 12),
  (hot_coffee_id, 'سبانيش لاتيه', 'لاتيه إسباني بالحليب المكثف', 17, 180, 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400', false, false, 13),
  (hot_coffee_id, 'موكا لاتيه', 'لاتيه بالشوكولاتة', 17, 220, 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400', false, false, 14),
  (hot_coffee_id, 'V60', 'قهوة مقطرة بطريقة V60', 19, 5, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400', false, false, 15);

  -- إدراج عناصر القهوة الباردة
  INSERT INTO menu_items (section_id, name, description, price, calories, image, order_index) VALUES
  (cold_coffee_id, 'قهوة اليوم باردة', 'قهوة اليوم مثلجة ومنعشة', 12, 5, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400', 1),
  (cold_coffee_id, 'آيس أمريكانو', 'أمريكانو مثلج منعش', 14, 5, 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400', 2),
  (cold_coffee_id, 'آيس لاتيه', 'لاتيه مثلج بالحليب البارد', 17, 160, 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400', 3),
  (cold_coffee_id, 'آيس سبانيش لاتيه', 'لاتيه إسباني مثلج', 19, 190, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400', 4),
  (cold_coffee_id, 'آيس موكا', 'موكا مثلج بالشوكولاتة', 19, 230, 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400', 5),
  (cold_coffee_id, 'آيس دريب', 'قهوة مقطرة باردة', 21, 8, 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400', 6);

  -- إدراج عناصر الشاي مع الأحجام
  INSERT INTO menu_items (section_id, name, description, price, calories, image, popular, order_index) VALUES
  (tea_id, 'شاي أخضر', 'شاي أخضر طبيعي مفيد للصحة', 8, 2, 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400', false, 1),
  (tea_id, 'شاي أتاي', 'شاي مغربي تقليدي بالنعناع والسكر', 8, 25, 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400', true, 2),
  (tea_id, 'شاي أحمر', 'شاي أحمر كلاسيكي', 8, 3, 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400', false, 3);

  -- الحصول على معرفات عناصر الشاي لإضافة الأحجام
  SELECT id INTO tea_item_1_id FROM menu_items WHERE name = 'شاي أخضر' AND section_id = tea_id;
  SELECT id INTO tea_item_2_id FROM menu_items WHERE name = 'شاي أتاي' AND section_id = tea_id;
  SELECT id INTO tea_item_3_id FROM menu_items WHERE name = 'شاي أحمر' AND section_id = tea_id;

  -- إضافة أحجام الشاي
  INSERT INTO menu_item_sizes (item_id, size, price) VALUES
  (tea_item_1_id, 'كاسة', 8),
  (tea_item_1_id, 'براد صغير', 14),
  (tea_item_1_id, 'براد وسط', 18),
  (tea_item_1_id, 'براد كبير', 25),
  (tea_item_2_id, 'كاسة', 8),
  (tea_item_2_id, 'براد صغير', 14),
  (tea_item_2_id, 'براد وسط', 18),
  (tea_item_2_id, 'براد كبير', 25),
  (tea_item_3_id, 'كاسة', 8),
  (tea_item_3_id, 'براد صغير', 14),
  (tea_item_3_id, 'براد وسط', 18),
  (tea_item_3_id, 'براد كبير', 25);

  -- إدراج عناصر العصيرات
  INSERT INTO menu_items (section_id, name, description, price, calories, image, order_index) VALUES
  (juices_id, 'عصير برتقال', 'عصير برتقال طازج 100%', 19, 110, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 1),
  (juices_id, 'عصير رمان', 'عصير رمان طبيعي غني بمضادات الأكسدة', 19, 130, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 2),
  (juices_id, 'عصير مانجو', 'عصير مانجو استوائي طازج', 19, 120, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 3),
  (juices_id, 'عصير ليمون نعناع', 'عصير ليمون منعش بالنعناع الطازج', 19, 60, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 4),
  (juices_id, 'عصير أفوكادو', 'عصير أفوكادو كريمي ومغذي', 21, 180, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 5);

  -- إدراج عناصر الموكتيلز
  INSERT INTO menu_items (section_id, name, description, price, calories, image, order_index) VALUES
  (mocktails_id, 'مشروب غازي', 'مشروب غازي منعش', 10, 140, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 1),
  (mocktails_id, 'سفن أب موهيتو', 'موهيتو منعش بالسفن أب والنعناع', 19, 120, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 2),
  (mocktails_id, 'موهيتو ريتا', 'موهيتو بنكهة الليمون والنعناع', 19, 90, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 3),
  (mocktails_id, 'كودرد موهيتو', 'موهيتو مميز بالفواكه المختلطة', 22, 110, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 4),
  (mocktails_id, 'آيس كركديه', 'كركديه مثلج منعش ومفيد', 22, 80, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 5),
  (mocktails_id, 'آيس تي', 'شاي مثلج بنكهات مختلفة', 22, 70, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 6),
  (mocktails_id, 'ريد بول موهيتو', 'موهيتو منشط بالريد بول', 23, 160, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 7),
  (mocktails_id, 'بيرة', 'بيرة خالية من الكحول', 23, 0, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 8);

  -- إدراج عناصر البيتزا مع الأحجام
  INSERT INTO menu_items (section_id, name, description, price, calories, image, popular, order_index) VALUES
  (pizza_id, 'بيتزا خضار', 'بيتزا بالخضار الطازجة والجبن', 12, 250, 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400', false, 1),
  (pizza_id, 'بيتزا دجاج', 'بيتزا بقطع الدجاج المشوي والخضار', 14, 320, 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400', true, 2),
  (pizza_id, 'بيتزا مشكل', 'بيتزا بخليط من اللحوم والخضار', 15, 350, 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400', false, 3);

  -- الحصول على معرفات عناصر البيتزا لإضافة الأحجام
  SELECT id INTO pizza_item_1_id FROM menu_items WHERE name = 'بيتزا خضار' AND section_id = pizza_id;
  SELECT id INTO pizza_item_2_id FROM menu_items WHERE name = 'بيتزا دجاج' AND section_id = pizza_id;
  SELECT id INTO pizza_item_3_id FROM menu_items WHERE name = 'بيتزا مشكل' AND section_id = pizza_id;

  -- إضافة أحجام البيتزا
  INSERT INTO menu_item_sizes (item_id, size, price) VALUES
  (pizza_item_1_id, 'صغير', 12),
  (pizza_item_1_id, 'وسط', 18),
  (pizza_item_1_id, 'كبير', 24),
  (pizza_item_2_id, 'صغير', 14),
  (pizza_item_2_id, 'وسط', 20),
  (pizza_item_2_id, 'كبير', 27),
  (pizza_item_3_id, 'صغير', 15),
  (pizza_item_3_id, 'وسط', 20),
  (pizza_item_3_id, 'كبير', 27);

  -- إدراج عناصر المناقيش
  INSERT INTO menu_items (section_id, name, description, price, calories, image, order_index) VALUES
  (manakish_id, 'مناقيش لبنه عسل', 'مناقيش باللبنة والعسل الطبيعي', 15, 280, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 1),
  (manakish_id, 'مناقيش جبن', 'مناقيش بالجبن الطازج', 15, 320, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 2),
  (manakish_id, 'مناقيش عكاوي', 'مناقيش بجبن العكاوي اللذيذ', 15, 300, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 3),
  (manakish_id, 'مناقيش لحم', 'مناقيش باللحم المفروم والبهارات', 15, 380, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 4),
  (manakish_id, 'مناقيش دجاج', 'مناقيش بقطع الدجاج المتبلة', 15, 350, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 5),
  (manakish_id, 'فطاير جبن', 'فطاير محشية بالجبن', 8, 180, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 6),
  (manakish_id, 'فطاير لبن عسل', 'فطاير باللبنة والعسل', 8, 160, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 7),
  (manakish_id, 'فطاير دجاج', 'فطاير محشية بالدجاج', 8, 200, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 8);

  -- إدراج عناصر الساندوتش
  INSERT INTO menu_items (section_id, name, description, price, calories, image, popular, order_index) VALUES
  (sandwiches_id, 'كروسان', 'كرواسان فرنسي طازج ومقرمش', 12, 230, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', false, 1),
  (sandwiches_id, 'ساندوتش ثلاث أجبان', 'ساندوتش بثلاثة أنواع من الجبن', 15, 420, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', false, 2),
  (sandwiches_id, 'ساندوتش حلومي', 'ساندوتش بجبن الحلومي المشوي', 15, 380, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', false, 3),
  (sandwiches_id, 'ساندوتش فاهيتا', 'ساندوتش فاهيتا بالدجاج والخضار', 15, 450, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', false, 4),
  (sandwiches_id, 'سندوتش تونه', 'ساندوتش تونة بالخضار الطازجة', 10, 320, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', false, 5),
  (sandwiches_id, 'سندوتش طاكوس دجاج', 'ساندوتش طاكوس بالدجاج المكسيكي', 12, 380, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', false, 6),
  (sandwiches_id, 'سندوتش مغربي', 'ساندوتش بالطعم المغربي الأصيل', 10, 350, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', false, 7),
  (sandwiches_id, 'سندوتش معقوده', 'ساندوتش معقودة تقليدي', 10, 300, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', false, 8),
  (sandwiches_id, 'برجر دجاج', 'برجر دجاج مشوي مع الخضار', 12, 520, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', true, 9),
  (sandwiches_id, 'برجر لحم', 'برجر لحم طازج مع الإضافات', 12, 580, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', true, 10);

  -- إدراج عناصر الحلى
  INSERT INTO menu_items (section_id, name, description, price, calories, image, popular, order_index) VALUES
  (desserts_id, 'كوكيز', 'كوكيز محضر طازج بالشوكولاتة', 12, 150, 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400', false, 1),
  (desserts_id, 'كيك عسل', 'كيك العسل الطبيعي الشهي', 20, 320, 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400', false, 2),
  (desserts_id, 'كيك تمر', 'كيك التمر الصحي واللذيذ', 20, 280, 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400', false, 3),
  (desserts_id, 'سان سبيستيان', 'تشيز كيك سان سبيستيان الإسباني', 22, 380, 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400', false, 4),
  (desserts_id, 'كيك نوتيلا', 'كيك النوتيلا الكريمي الشهير', 22, 420, 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400', true, 5),
  (desserts_id, 'كرانشي كيك', 'كيك مقرمش بطبقات الشوكولاتة', 22, 450, 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400', false, 6);

  -- إدراج عناصر الشيشة
  INSERT INTO menu_items (section_id, name, description, price, calories, image, popular, order_index) VALUES
  (shisha_id, 'معسل بلو بيري', 'معسل بنكهة التوت الأزرق المنعشة', 35, 0, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', false, 1),
  (shisha_id, 'معسل تفاحتين', 'معسل التفاحتين الكلاسيكي المحبوب', 35, 0, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', true, 2),
  (shisha_id, 'معسل عنب توت', 'معسل بخليط العنب والتوت', 35, 0, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', false, 3),
  (shisha_id, 'معسل عنب نعناع', 'معسل العنب مع النعناع المنعش', 35, 0, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', false, 4),
  (shisha_id, 'معسل ليمون نعناع', 'معسل الليمون والنعناع المنعش', 35, 0, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', false, 5),
  (shisha_id, 'معسل مستكة', 'معسل المستكة العربية الأصيلة', 35, 0, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', false, 6),
  (shisha_id, 'معسل ميكس', 'خليط من النكهات المختارة', 35, 0, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', false, 7),
  (shisha_id, 'معسل نعناع', 'معسل النعناع الطازج والمنعش', 35, 0, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', false, 8),
  (shisha_id, 'معسل نخلة', 'معسل النخلة الفاخر', 35, 0, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', false, 9),
  (shisha_id, 'تغيير رأس', 'تغيير رأس الشيشة بنكهة جديدة', 25, 0, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', false, 10),
  (shisha_id, 'إضافة ثلج', 'إضافة الثلج للشيشة لتجربة أكثر انتعاشاً', 5, 0, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', false, 11);

END $$;

-- إدراج العروض الخاصة
INSERT INTO special_offers (title, description, original_price, offer_price, valid_until, calories, image) VALUES
('عرض الإفطار المميز', 'قهوة + كرواسون + عصير طازج', 43, 35, '31 ديسمبر 2024', 355, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400'),
('عرض المساء الخاص', 'شاي أتاي + كيك نوتيلا + كوكيز', 54, 45, '31 ديسمبر 2024', 585, 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400'),
('عرض البيتزا العائلي', 'بيتزا كبيرة + مشروبين غازي', 44, 35, '31 ديسمبر 2024', 630, 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400');

-- إنشاء دالة لتحديث updated_at تلقائياً
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- إنشاء triggers لتحديث updated_at
CREATE TRIGGER update_menu_sections_updated_at BEFORE UPDATE ON menu_sections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at BEFORE UPDATE ON menu_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_special_offers_updated_at BEFORE UPDATE ON special_offers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- إنشاء view لعرض البيانات مع العلاقات
CREATE OR REPLACE VIEW menu_with_items AS
SELECT 
    s.id as section_id,
    s.title as section_title,
    s.icon as section_icon,
    s.image as section_image,
    s.order_index as section_order,
    i.id as item_id,
    i.name as item_name,
    i.description as item_description,
    i.price as item_price,
    i.calories as item_calories,
    i.image as item_image,
    i.popular as item_popular,
    i.new as item_new,
    i.available as item_available,
    i.order_index as item_order
FROM menu_sections s
LEFT JOIN menu_items i ON s.id = i.section_id
WHERE i.available = true OR i.available IS NULL
ORDER BY s.order_index, i.order_index;

-- منح الصلاحيات للـ view
GRANT SELECT ON menu_with_items TO public;
GRANT SELECT ON menu_with_items TO authenticated;

-- إنشاء دالة للبحث في المنيو
CREATE OR REPLACE FUNCTION search_menu(search_term text)
RETURNS TABLE (
    section_id uuid,
    section_title text,
    item_id uuid,
    item_name text,
    item_description text,
    item_price numeric,
    item_image text
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.id,
        s.title,
        i.id,
        i.name,
        i.description,
        i.price,
        i.image
    FROM menu_sections s
    JOIN menu_items i ON s.id = i.section_id
    WHERE i.available = true
    AND (
        i.name ILIKE '%' || search_term || '%' OR
        i.description ILIKE '%' || search_term || '%' OR
        s.title ILIKE '%' || search_term || '%'
    )
    ORDER BY s.order_index, i.order_index;
END;
$$ LANGUAGE plpgsql;

-- منح الصلاحيات للدالة
GRANT EXECUTE ON FUNCTION search_menu(text) TO public;
GRANT EXECUTE ON FUNCTION search_menu(text) TO authenticated;