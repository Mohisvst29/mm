export interface MenuItem {
  id: string | number;
  section_id?: string;
  name: string;
  description?: string;
  price: number;
  calories?: number;
  image?: string;
  sizes?: { size: string; price: number }[];
  popular?: boolean;
  new?: boolean;
  available?: boolean;
  order_index?: number;
  created_at?: string;
  updated_at?: string;
}

export interface MenuSection {
  id: string | number;
  title: string;
  icon: string;
  image?: string;
  items: MenuItem[];
  order_index?: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
  selectedSize?: string;
  selectedPrice?: number;
}

export interface SpecialOffer {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  offerPrice: number;
  validUntil: string;
  image?: string;
  active?: boolean;
  calories?: number;
  created_at?: string;
  updated_at?: string;
}