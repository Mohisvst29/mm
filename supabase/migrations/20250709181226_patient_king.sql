/*
  # إنشاء جداول المنيو

  1. الجداول الجديدة
    - `menu_sections` - أقسام المنيو (القهوة الساخنة، الباردة، إلخ)
      - `id` (uuid, primary key)
      - `title` (text) - عنوان القسم
      - `icon` (text) - أيقونة القسم
      - `image` (text) - صورة القسم (اختيارية)
      - `order_index` (integer) - ترتيب القسم
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `menu_items` - عناصر المنيو
      - `id` (uuid, primary key)
      - `section_id` (uuid, foreign key)
      - `name` (text) - اسم الصنف
      - `description` (text) - وصف الصنف
      - `price` (decimal) - السعر الأساسي
      - `image` (text) - صورة الصنف
      - `popular` (boolean) - الأكثر طلباً
      - `new` (boolean) - جديد
      - `available` (boolean) - متوفر
      - `order_index` (integer) - ترتيب الصنف
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `menu_item_sizes` - أحجام الأصناف
      - `id` (uuid, primary key)
      - `item_id` (uuid, foreign key)
      - `size` (text) - الحجم
      - `price` (decimal) - سعر الحجم
      - `created_at` (timestamp)
    
    - `special_offers` - العروض الخاصة
      - `id` (uuid, primary key)
      - `title` (text) - عنوان العرض
      - `description` (text) - وصف العرض
      - `original_price` (decimal) - السعر الأصلي
      - `offer_price` (decimal) - سعر العرض
      - `valid_until` (text) - صالح حتى
      - `image` (text) - صورة العرض
      - `active` (boolean) - نشط
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. الأمان
    - تفعيل RLS على جميع الجداول
    - سياسات للقراءة العامة
    - سياسات للكتابة للمستخدمين المصرح لهم
*/

-- إنشاء جدول أقسام المنيو
CREATE TABLE IF NOT EXISTS menu_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  icon text NOT NULL DEFAULT '🍽️',
  image text,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- إنشاء جدول عناصر المنيو
CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id uuid REFERENCES menu_sections(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text DEFAULT '',
  price decimal(10,2) NOT NULL DEFAULT 0,
  image text DEFAULT '',
  popular boolean DEFAULT false,
  new boolean DEFAULT false,
  available boolean DEFAULT true,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- إنشاء جدول أحجام الأصناف
CREATE TABLE IF NOT EXISTS menu_item_sizes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id uuid REFERENCES menu_items(id) ON DELETE CASCADE,
  size text NOT NULL,
  price decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- إنشاء جدول العروض الخاصة
CREATE TABLE IF NOT EXISTS special_offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  original_price decimal(10,2) NOT NULL,
  offer_price decimal(10,2) NOT NULL,
  valid_until text NOT NULL,
  image text DEFAULT '',
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- تفعيل RLS
ALTER TABLE menu_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_item_sizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE special_offers ENABLE ROW LEVEL SECURITY;

-- سياسات القراءة العامة
CREATE POLICY "Anyone can read menu sections"
  ON menu_sections
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can read menu items"
  ON menu_items
  FOR SELECT
  TO public
  USING (available = true);

CREATE POLICY "Anyone can read menu item sizes"
  ON menu_item_sizes
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can read active special offers"
  ON special_offers
  FOR SELECT
  TO public
  USING (active = true);

-- سياسات الكتابة للمستخدمين المصرح لهم
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

-- إنشاء فهارس للأداء
CREATE INDEX IF NOT EXISTS idx_menu_items_section_id ON menu_items(section_id);
CREATE INDEX IF NOT EXISTS idx_menu_item_sizes_item_id ON menu_item_sizes(item_id);
CREATE INDEX IF NOT EXISTS idx_menu_sections_order ON menu_sections(order_index);
CREATE INDEX IF NOT EXISTS idx_menu_items_order ON menu_items(order_index);