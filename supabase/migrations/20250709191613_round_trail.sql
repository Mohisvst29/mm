/*
  # Fix RLS policies for authenticated users

  1. Security Updates
    - Update RLS policies for menu_sections table to allow full CRUD for authenticated users
    - Update RLS policies for menu_items table to allow full CRUD for authenticated users  
    - Update RLS policies for menu_item_sizes table to allow full CRUD for authenticated users
    - Update RLS policies for special_offers table to allow full CRUD for authenticated users
    - Ensure public users can only read active/available content
    - Ensure authenticated users have full management capabilities

  2. Policy Changes
    - Remove overly restrictive policies
    - Add comprehensive policies for authenticated users
    - Maintain read-only access for public users
*/

-- Drop existing policies to recreate them properly
DROP POLICY IF EXISTS "Anyone can read menu sections" ON menu_sections;
DROP POLICY IF EXISTS "Authenticated users can manage menu sections" ON menu_sections;

DROP POLICY IF EXISTS "Anyone can read available menu items" ON menu_items;
DROP POLICY IF EXISTS "Authenticated users can manage menu items" ON menu_items;

DROP POLICY IF EXISTS "Anyone can read menu item sizes" ON menu_item_sizes;
DROP POLICY IF EXISTS "Authenticated users can manage menu item sizes" ON menu_item_sizes;

DROP POLICY IF EXISTS "Anyone can read active special offers" ON special_offers;
DROP POLICY IF EXISTS "Authenticated users can manage special offers" ON special_offers;

-- Menu Sections Policies
CREATE POLICY "Public can read menu sections"
  ON menu_sections
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert menu sections"
  ON menu_sections
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update menu sections"
  ON menu_sections
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete menu sections"
  ON menu_sections
  FOR DELETE
  TO authenticated
  USING (true);

-- Menu Items Policies
CREATE POLICY "Public can read available menu items"
  ON menu_items
  FOR SELECT
  TO public
  USING (available = true);

CREATE POLICY "Authenticated users can read all menu items"
  ON menu_items
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert menu items"
  ON menu_items
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update menu items"
  ON menu_items
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete menu items"
  ON menu_items
  FOR DELETE
  TO authenticated
  USING (true);

-- Menu Item Sizes Policies
CREATE POLICY "Public can read menu item sizes"
  ON menu_item_sizes
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert menu item sizes"
  ON menu_item_sizes
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update menu item sizes"
  ON menu_item_sizes
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete menu item sizes"
  ON menu_item_sizes
  FOR DELETE
  TO authenticated
  USING (true);

-- Special Offers Policies
CREATE POLICY "Public can read active special offers"
  ON special_offers
  FOR SELECT
  TO public
  USING (active = true);

CREATE POLICY "Authenticated users can read all special offers"
  ON special_offers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert special offers"
  ON special_offers
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update special offers"
  ON special_offers
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete special offers"
  ON special_offers
  FOR DELETE
  TO authenticated
  USING (true);