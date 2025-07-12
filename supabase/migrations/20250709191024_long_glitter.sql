/*
  # إصلاح هيكل قاعدة البيانات - حل جميع المشكلات

  1. إصلاح الجداول الموجودة
    - إضافة الحقول المفقودة
    - تصحيح أنواع البيانات
    - إضافة القيود والفهارس

  2. إضافة بيانات تجريبية
    - أقسام المنيو
    - عناصر المنيو
    - العروض الخاصة

  3. تحديث سياسات الأمان
    - RLS policies
    - صلاحيات المستخدمين
*/

-- إنشاء extension للـ UUID إذا لم يكن موجود
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- حذف الجداول الموجودة وإعادة إنشائها بالهيكل الصحيح
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
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- إنشاء الفهارس
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
CREATE POLICY "Anyone can read menu sections" ON menu_sections
  FOR SELECT TO public USING (true);

CREATE POLICY "Anyone can read available menu items" ON menu_items
  FOR SELECT TO public USING (available = true);

CREATE POLICY "Anyone can read menu item sizes" ON menu_item_sizes
  FOR SELECT TO public USING (true);

CREATE POLICY "Anyone can read active special offers" ON special_offers
  FOR SELECT TO public USING (active = true);

-- سياسات الأمان للمستخدمين المصرح لهم
CREATE POLICY "Authenticated users can manage menu sections" ON menu_sections
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can manage menu items" ON menu_items
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can manage menu item sizes" ON menu_item_sizes
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can manage special offers" ON special_offers
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

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
  INSERT INTO menu_items (section_id, name, description, price, image, popular, new, order_index) VALUES
  (hot_coffee_id, 'قهوة عربي', 'قهوة عربية تقليدية', 10, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400', false, false, 1),
  (hot_coffee_id, 'قهوة تركي', 'قهوة تركية أصيلة', 10, 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=400', false, false, 2),
  (hot_coffee_id, 'اسبريسو', 'قهوة إيطالية كلاسيكية', 12, 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400', false, false, 3),
  (hot_coffee_id, 'أمريكانو', 'قهوة أمريكية كلاسيكية', 13, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400', false, false, 4),
  (hot_coffee_id, 'لاتيه', 'قهوة بالحليب الناعم', 16, 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400', true, false, 5),
  (hot_coffee_id, 'كابتشينو', 'قهوة بالحليب المرغي', 16, 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400', true, false, 6);

  -- إدراج عناصر القهوة الباردة
  INSERT INTO menu_items (section_id, name, description, price, image, order_index) VALUES
  (cold_coffee_id, 'قهوة اليوم باردة', 'قهوة اليوم مثلجة', 12, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400', 1),
  (cold_coffee_id, 'آيس أمريكانو', 'أمريكانو مثلج', 14, 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400', 2),
  (cold_coffee_id, 'آيس لاتيه', 'لاتيه مثلج', 17, 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400', 3);

  -- إدراج عناصر الشاي مع الأحجام
  INSERT INTO menu_items (section_id, name, description, price, image, popular, order_index) VALUES
  (tea_id, 'شاي أخضر', 'شاي أخضر طبيعي', 8, 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400', false, 1),
  (tea_id, 'شاي أتاي', 'شاي مغربي تقليدي', 8, 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400', true, 2),
  (tea_id, 'شاي أحمر', 'شاي أحمر كلاسيكي', 8, 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400', false, 3);

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
  INSERT INTO menu_items (section_id, name, description, price, image, order_index) VALUES
  (juices_id, 'عصير برتقال', 'عصير برتقال طازج', 19, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 1),
  (juices_id, 'عصير رمان', 'عصير رمان طبيعي', 19, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 2),
  (juices_id, 'عصير مانجو', 'عصير مانجو استوائي', 19, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 3);

  -- إدراج عناصر الموكتيلز
  INSERT INTO menu_items (section_id, name, description, price, image, order_index) VALUES
  (mocktails_id, 'مشروب غازي', 'مشروب غازي منعش', 10, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 1),
  (mocktails_id, 'سفن أب موهيتو', 'موهيتو بالسفن أب', 19, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 2),
  (mocktails_id, 'موهيتو ريتا', 'موهيتو كلاسيكي', 19, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 3);

  -- إدراج عناصر البيتزا مع الأحجام
  INSERT INTO menu_items (section_id, name, description, price, image, popular, order_index) VALUES
  (pizza_id, 'بيتزا خضار', 'بيتزا بالخضار الطازجة', 12, 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400', false, 1),
  (pizza_id, 'بيتزا دجاج', 'بيتزا بالدجاج المشوي', 14, 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400', true, 2),
  (pizza_id, 'بيتزا مشكل', 'بيتزا مشكلة باللحوم', 15, 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400', false, 3);

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
  INSERT INTO menu_items (section_id, name, description, price, image, order_index) VALUES
  (manakish_id, 'مناقيش لبنه عسل', 'مناقيش باللبنة والعسل', 15, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 1),
  (manakish_id, 'مناقيش جبن', 'مناقيش بالجبن', 15, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 2),
  (manakish_id, 'فطاير جبن', 'فطاير محشية بالجبن', 8, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 3);

  -- إدراج عناصر الساندوتش
  INSERT INTO menu_items (section_id, name, description, price, image, popular, order_index) VALUES
  (sandwiches_id, 'كروسان', 'كروسان فرنسي طازج', 12, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', false, 1),
  (sandwiches_id, 'ساندوتش ثلاث أجبان', 'ساندوتش بثلاثة أنواع جبن', 15, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', false, 2),
  (sandwiches_id, 'برجر دجاج', 'برجر دجاج مشوي', 12, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', true, 3),
  (sandwiches_id, 'برجر لحم', 'برجر لحم بقري', 12, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', true, 4);

  -- إدراج عناصر الحلى
  INSERT INTO menu_items (section_id, name, description, price, image, popular, order_index) VALUES
  (desserts_id, 'كوكيز', 'كوكيز محلي الصنع', 12, 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400', false, 1),
  (desserts_id, 'كيك عسل', 'كيك بالعسل الطبيعي', 20, 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400', false, 2),
  (desserts_id, 'كيك نوتيلا', 'كيك بالنوتيلا الشهي', 22, 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400', true, 3);

  -- إدراج عناصر الشيشة
  INSERT INTO menu_items (section_id, name, description, price, image, popular, order_index) VALUES
  (shisha_id, 'معسل بلو بيري', 'معسل بنكهة التوت الأزرق', 35, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', false, 1),
  (shisha_id, 'معسل تفاحتين', 'معسل بنكهة التفاح المزدوج', 35, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', true, 2),
  (shisha_id, 'معسل نعناع', 'معسل بالنعناع المنعش', 35, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', false, 3),
  (shisha_id, 'تغيير رأس', 'تغيير رأس الشيشة', 25, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', false, 4),
  (shisha_id, 'إضافة ثلج', 'إضافة ثلج للشيشة', 5, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', false, 5);

END $$;

-- إدراج العروض الخاصة
INSERT INTO special_offers (title, description, original_price, offer_price, valid_until, image) VALUES
('عرض الإفطار المميز', 'قهوة + كرواسون + عصير طازج', 43, 35, '31 ديسمبر 2024', 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400'),
('عرض المساء الخاص', 'شاي أتاي + كيك نوتيلا + كوكيز', 54, 45, '31 ديسمبر 2024', 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400'),
('عرض البيتزا العائلي', 'بيتزا كبيرة + مشروبين غازي', 44, 35, '31 ديسمبر 2024', 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400');

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