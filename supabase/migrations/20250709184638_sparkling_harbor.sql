/*
  # إدراج بيانات المنيو الكاملة

  1. New Data
    - إدراج جميع أقسام المنيو
    - إدراج جميع عناصر المنيو مع الصور والأوصاف
    - إدراج أحجام المنتجات (الشاي والبيتزا)
    - إدراج العروض الخاصة

  2. Security
    - جميع الجداول محمية بـ RLS
    - البيانات متاحة للقراءة للجميع
    - التعديل متاح للمستخدمين المصرح لهم فقط
*/

-- حذف البيانات الموجودة لتجنب التضارب
DELETE FROM menu_item_sizes;
DELETE FROM menu_items;
DELETE FROM menu_sections;
DELETE FROM special_offers;

-- إدراج أقسام المنيو
INSERT INTO menu_sections (title, icon, order_index) VALUES
  ('القهوة الساخنة', '☕', 1),
  ('القهوة الباردة', '🧊', 2),
  ('الشاي', '🍵', 3),
  ('العصيرات الطبيعية', '🍹', 4),
  ('الموكتيلز والموهيتو', '🥤', 5),
  ('البيتزا', '🍕', 6),
  ('المناقيش والفطاير', '🥙', 7),
  ('الساندوتش والبرجر', '🥪', 8),
  ('الحلى', '🍰', 9),
  ('الشيشة', '💨', 10);

-- إدراج عناصر القهوة الساخنة
DO $$
DECLARE
    section_uuid uuid;
BEGIN
    SELECT id INTO section_uuid FROM menu_sections WHERE title = 'القهوة الساخنة';
    
    INSERT INTO menu_items (section_id, name, price, description, popular, image, order_index) VALUES
      (section_uuid, 'قهوة عربي', 10, '', false, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400', 1),
      (section_uuid, 'قهوة تركي', 10, '', false, 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=400', 2),
      (section_uuid, 'اسبريسو', 12, 'قهوة إيطالية كلاسيكية', false, 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400', 3),
      (section_uuid, 'قهوة اليوم', 12, '', false, 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=400', 4),
      (section_uuid, 'اسبريسو ميكاتو', 13, '', false, 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400', 5),
      (section_uuid, 'أمريكانو', 13, 'قهوة أمريكية كلاسيكية', false, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400', 6),
      (section_uuid, 'قهوة تركي بالحليب', 13, '', false, 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=400', 7),
      (section_uuid, 'كورتادو', 14, '', false, 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400', 8),
      (section_uuid, 'فلات وايت', 15, '', false, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400', 9),
      (section_uuid, 'لاتيه', 16, 'قهوة بالحليب الناعم', true, 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400', 10),
      (section_uuid, 'كابتشينو', 16, 'قهوة بالحليب المرغي', true, 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400', 11),
      (section_uuid, 'هوت شوكلت', 16, '', false, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400', 12),
      (section_uuid, 'سبانيش لاتيه', 17, '', false, 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400', 13),
      (section_uuid, 'موكا لاتيه', 17, '', false, 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400', 14),
      (section_uuid, 'V60', 19, '', false, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400', 15);
END $$;

-- إدراج عناصر القهوة الباردة
DO $$
DECLARE
    section_uuid uuid;
BEGIN
    SELECT id INTO section_uuid FROM menu_sections WHERE title = 'القهوة الباردة';
    
    INSERT INTO menu_items (section_id, name, price, description, popular, image, order_index) VALUES
      (section_uuid, 'قهوة اليوم باردة', 12, '', false, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400', 1),
      (section_uuid, 'آيس أمريكانو', 14, '', false, 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400', 2),
      (section_uuid, 'آيس لاتيه', 17, '', false, 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400', 3),
      (section_uuid, 'آيس سبانيش لاتيه', 19, '', false, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400', 4),
      (section_uuid, 'آيس موكا', 19, '', false, 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400', 5),
      (section_uuid, 'آيس دريب', 21, '', false, 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400', 6);
END $$;

-- إدراج عناصر الشاي
DO $$
DECLARE
    section_uuid uuid;
    tea_item_id uuid;
BEGIN
    SELECT id INTO section_uuid FROM menu_sections WHERE title = 'الشاي';
    
    INSERT INTO menu_items (section_id, name, price, description, popular, image, order_index) VALUES
      (section_uuid, 'شاي أخضر', 8, '', false, 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400', 1),
      (section_uuid, 'شاي أتاي', 8, '', true, 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400', 2),
      (section_uuid, 'شاي أحمر', 8, '', false, 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400', 3);

    -- إضافة أحجام الشاي
    -- شاي أخضر
    SELECT id INTO tea_item_id FROM menu_items WHERE name = 'شاي أخضر' AND section_id = section_uuid;
    INSERT INTO menu_item_sizes (item_id, size, price) VALUES
        (tea_item_id, 'كاسة', 8),
        (tea_item_id, 'براد صغير', 14),
        (tea_item_id, 'براد وسط', 18),
        (tea_item_id, 'براد كبير', 25);
    
    -- شاي أتاي
    SELECT id INTO tea_item_id FROM menu_items WHERE name = 'شاي أتاي' AND section_id = section_uuid;
    INSERT INTO menu_item_sizes (item_id, size, price) VALUES
        (tea_item_id, 'كاسة', 8),
        (tea_item_id, 'براد صغير', 14),
        (tea_item_id, 'براد وسط', 18),
        (tea_item_id, 'براد كبير', 25);
    
    -- شاي أحمر
    SELECT id INTO tea_item_id FROM menu_items WHERE name = 'شاي أحمر' AND section_id = section_uuid;
    INSERT INTO menu_item_sizes (item_id, size, price) VALUES
        (tea_item_id, 'كاسة', 8),
        (tea_item_id, 'براد صغير', 14),
        (tea_item_id, 'براد وسط', 18),
        (tea_item_id, 'براد كبير', 25);
END $$;

-- إدراج عناصر العصيرات
DO $$
DECLARE
    section_uuid uuid;
BEGIN
    SELECT id INTO section_uuid FROM menu_sections WHERE title = 'العصيرات الطبيعية';
    
    INSERT INTO menu_items (section_id, name, price, description, popular, image, order_index) VALUES
      (section_uuid, 'عصير برتقال', 19, '', false, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 1),
      (section_uuid, 'عصير رمان', 19, '', false, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 2),
      (section_uuid, 'عصير مانجو', 19, '', false, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 3),
      (section_uuid, 'عصير ليمون نعناع', 19, '', false, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 4),
      (section_uuid, 'عصير أفوكادو', 21, '', false, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 5);
END $$;

-- إدراج عناصر الموكتيلز
DO $$
DECLARE
    section_uuid uuid;
BEGIN
    SELECT id INTO section_uuid FROM menu_sections WHERE title = 'الموكتيلز والموهيتو';
    
    INSERT INTO menu_items (section_id, name, price, description, popular, image, order_index) VALUES
      (section_uuid, 'مشروب غازي', 10, '', false, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 1),
      (section_uuid, 'سفن أب موهيتو', 19, '', false, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 2),
      (section_uuid, 'موهيتو ريتا', 19, '', false, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 3),
      (section_uuid, 'كودرد موهيتو', 22, '', false, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 4),
      (section_uuid, 'آيس كركديه', 22, '', false, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 5),
      (section_uuid, 'آيس تي', 22, '', false, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 6),
      (section_uuid, 'ريد بول موهيتو', 23, '', false, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 7),
      (section_uuid, 'بيرة', 23, '', false, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 8);
END $$;

-- إدراج عناصر البيتزا
DO $$
DECLARE
    section_uuid uuid;
    pizza_item_id uuid;
BEGIN
    SELECT id INTO section_uuid FROM menu_sections WHERE title = 'البيتزا';
    
    INSERT INTO menu_items (section_id, name, price, description, popular, image, order_index) VALUES
      (section_uuid, 'بيتزا خضار', 12, '', false, 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400', 1),
      (section_uuid, 'بيتزا دجاج', 14, '', true, 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400', 2),
      (section_uuid, 'بيتزا مشكل', 15, '', false, 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400', 3);

    -- إضافة أحجام البيتزا
    -- بيتزا خضار
    SELECT id INTO pizza_item_id FROM menu_items WHERE name = 'بيتزا خضار' AND section_id = section_uuid;
    INSERT INTO menu_item_sizes (item_id, size, price) VALUES
        (pizza_item_id, 'صغير', 12),
        (pizza_item_id, 'وسط', 18),
        (pizza_item_id, 'كبير', 24);
    
    -- بيتزا دجاج
    SELECT id INTO pizza_item_id FROM menu_items WHERE name = 'بيتزا دجاج' AND section_id = section_uuid;
    INSERT INTO menu_item_sizes (item_id, size, price) VALUES
        (pizza_item_id, 'صغير', 14),
        (pizza_item_id, 'وسط', 20),
        (pizza_item_id, 'كبير', 27);
    
    -- بيتزا مشكل
    SELECT id INTO pizza_item_id FROM menu_items WHERE name = 'بيتزا مشكل' AND section_id = section_uuid;
    INSERT INTO menu_item_sizes (item_id, size, price) VALUES
        (pizza_item_id, 'صغير', 15),
        (pizza_item_id, 'وسط', 20),
        (pizza_item_id, 'كبير', 27);
END $$;

-- إدراج عناصر المناقيش
DO $$
DECLARE
    section_uuid uuid;
BEGIN
    SELECT id INTO section_uuid FROM menu_sections WHERE title = 'المناقيش والفطاير';
    
    INSERT INTO menu_items (section_id, name, price, description, popular, image, order_index) VALUES
      (section_uuid, 'مناقيش لبنه عسل', 15, '', false, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 1),
      (section_uuid, 'مناقيش جبن', 15, '', false, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 2),
      (section_uuid, 'مناقيش عكاوي', 15, '', false, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 3),
      (section_uuid, 'مناقيش لحم', 15, '', false, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 4),
      (section_uuid, 'مناقيش دجاج', 15, '', false, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 5),
      (section_uuid, 'فطاير جبن', 8, '', false, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 6),
      (section_uuid, 'فطاير لبن عسل', 8, '', false, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 7),
      (section_uuid, 'فطاير دجاج', 8, '', false, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 8);
END $$;

-- إدراج عناصر الساندوتش
DO $$
DECLARE
    section_uuid uuid;
BEGIN
    SELECT id INTO section_uuid FROM menu_sections WHERE title = 'الساندوتش والبرجر';
    
    INSERT INTO menu_items (section_id, name, price, description, popular, image, order_index) VALUES
      (section_uuid, 'كروسان', 12, '', false, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 1),
      (section_uuid, 'ساندوتش ثلاث أجبان', 15, '', false, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 2),
      (section_uuid, 'ساندوتش حلومي', 15, '', false, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 3),
      (section_uuid, 'ساندوتش فاهيتا', 15, '', false, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 4),
      (section_uuid, 'سندوتش تونه', 10, '', false, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 5),
      (section_uuid, 'سندوتش طاكوس دجاج', 12, '', false, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 6),
      (section_uuid, 'سندوتش مغربي', 10, '', false, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 7),
      (section_uuid, 'سندوتش معقوده', 10, '', false, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 8),
      (section_uuid, 'برجر دجاج', 12, '', true, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 9),
      (section_uuid, 'برجر لحم', 12, '', true, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 10);
END $$;

-- إدراج عناصر الحلى
DO $$
DECLARE
    section_uuid uuid;
BEGIN
    SELECT id INTO section_uuid FROM menu_sections WHERE title = 'الحلى';
    
    INSERT INTO menu_items (section_id, name, price, description, popular, image, order_index) VALUES
      (section_uuid, 'كوكيز', 12, '', false, 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400', 1),
      (section_uuid, 'كيك عسل', 20, '', false, 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400', 2),
      (section_uuid, 'كيك تمر', 20, '', false, 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400', 3),
      (section_uuid, 'سان سبيستيان', 22, '', false, 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400', 4),
      (section_uuid, 'كيك نوتيلا', 22, '', true, 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400', 5),
      (section_uuid, 'كرانشي كيك', 22, '', false, 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400', 6);
END $$;

-- إدراج عناصر الشيشة
DO $$
DECLARE
    section_uuid uuid;
BEGIN
    SELECT id INTO section_uuid FROM menu_sections WHERE title = 'الشيشة';
    
    INSERT INTO menu_items (section_id, name, price, description, popular, image, order_index) VALUES
      (section_uuid, 'معسل بلو بيري', 35, '', false, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 1),
      (section_uuid, 'معسل تفاحتين', 35, '', true, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 2),
      (section_uuid, 'معسل عنب توت', 35, '', false, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 3),
      (section_uuid, 'معسل عنب نعناع', 35, '', false, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 4),
      (section_uuid, 'معسل ليمون نعناع', 35, '', false, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 5),
      (section_uuid, 'معسل مستكة', 35, '', false, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 6),
      (section_uuid, 'معسل ميكس', 35, '', false, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 7),
      (section_uuid, 'معسل نعناع', 35, '', false, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 8),
      (section_uuid, 'معسل نخلة', 35, '', false, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 9),
      (section_uuid, 'تغيير رأس', 25, '', false, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 10),
      (section_uuid, 'إضافة ثلج', 5, '', false, 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400', 11);
END $$;

-- إدراج العروض الخاصة
INSERT INTO special_offers (title, description, original_price, offer_price, valid_until, active) VALUES
  ('عرض الإفطار المميز', 'قهوة + كرواسون + عصير طازج', 43, 35, '31 ديسمبر 2024', true),
  ('عرض المساء الخاص', 'شاي أتاي + كيك نوتيلا + كوكيز', 54, 45, '31 ديسمبر 2024', true),
  ('عرض البيتزا العائلي', 'بيتزا كبيرة + مشروبين غازي', 44, 35, '31 ديسمبر 2024', true);