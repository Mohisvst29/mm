import { createClient } from '@supabase/supabase-js';

// التحقق من وجود متغيرات البيئة
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// إنشاء عميل Supabase مع معالجة الأخطاء
let supabase: any = null;

try {
  if (supabaseUrl && supabaseAnonKey && 
      supabaseUrl !== 'your_supabase_url_here' && 
      supabaseAnonKey !== 'your_supabase_anon_key_here') {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('✅ Supabase client created successfully');
  } else {
    console.warn('⚠️ Supabase environment variables not configured properly');
    console.log('Using fallback mode');
  }
} catch (error) {
  console.warn('❌ Failed to create Supabase client:', error);
}

// إنشاء كائن وهمي للتعامل مع الأخطاء إذا لم يكن Supabase متاحاً
if (!supabase) {
  supabase = {
    from: (table: string) => ({
      select: (columns?: string) => Promise.resolve({ 
        data: [], 
        error: new Error(`Supabase not configured - attempted to select from ${table}`) 
      }),
      insert: (data: any) => Promise.resolve({ 
        data: [], 
        error: new Error(`Supabase not configured - attempted to insert into ${table}`) 
      }),
      update: (data: any) => Promise.resolve({ 
        data: [], 
        error: new Error(`Supabase not configured - attempted to update ${table}`) 
      }),
      delete: () => Promise.resolve({ 
        data: [], 
        error: new Error(`Supabase not configured - attempted to delete from ${table}`) 
      }),
      eq: function(column: string, value: any) { return this; },
      order: function(column: string, options?: any) { return this; },
      limit: function(count: number) { return this; },
      single: function() { return this; }
    })
  };
}

export { supabase };

// Types for database tables
export interface MenuSection {
  id: string | number;
  title: string;
  icon: string;
  image?: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface MenuItem {
  id: string | number;
  section_id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  popular: boolean;
  new: boolean;
  available: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
  sizes?: MenuItemSize[];
}

export interface MenuItemSize {
  id: string;
  item_id: string;
  size: string;
  price: number;
  created_at: string;
}

export interface SpecialOffer {
  id: string;
  title: string;
  description: string;
  original_price: number;
  offer_price: number;
  valid_until: string;
  image?: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}