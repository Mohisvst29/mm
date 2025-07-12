import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { MenuItem } from '../types/menu';

interface MenuSectionProps {
  title: string;
  items: MenuItem[];
  icon: string;
  onAddToCart: (item: MenuItem, selectedSize?: string, selectedPrice?: number) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({ title, items, icon, onAddToCart }) => {
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({});

  console.log('MenuSection received:', { title, itemsCount: items.length });

  if (!items || items.length === 0) {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="text-3xl">{icon}</span>
          <h2 className="text-2xl font-bold text-amber-800" dir="rtl">{title}</h2>
          <span className="text-3xl">{icon}</span>
        </div>
        
        <div className="text-center py-12">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-amber-200/50">
            <p className="text-gray-600 text-lg" dir="rtl">
              لا توجد عناصر متاحة في هذا القسم حالياً
            </p>
          </div>
        </div>
      </div>
    );
  }
  const handleSizeChange = (itemId: number, size: string) => {
    const id = itemId.toString();
    setSelectedSizes(prev => ({ ...prev, [id]: size }));
  };

  const handleAddToCart = (item: MenuItem) => {
    if (item.sizes && item.sizes.length > 0) {
      const id = item.id.toString();
      const selectedSize = selectedSizes[id] || item.sizes[0].size;
      const selectedPrice = item.sizes.find(s => s.size === selectedSize)?.price || item.price;
      onAddToCart(item, selectedSize, selectedPrice);
    } else {
      onAddToCart(item);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className="text-3xl">{icon}</span>
        <h2 className="text-2xl font-bold" dir="rtl" style={{ color: '#d4a574' }}>{title}</h2>
        <span className="text-3xl">{icon}</span>
      </div>
      
      <div className="menu-grid grid gap-4 lg:gap-6">
        {items.map((item) => (
          <div 
            key={item.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden menu-item-hover"
            style={{ borderColor: '#87512f30' }}
          >
            {/* صورة المنتج */}
            {item.image && (
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  {item.popular && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      الأكثر طلباً
                    </span>
                  )}
                  {item.new && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      جديد
                    </span>
                  )}
                </div>
              </div>
            )}
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-3" dir="rtl">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-gray-800 leading-tight">{item.name}</h3>
                  </div>
                  {item.description && (
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  )}
                  {item.calories && item.calories > 0 && (
                    <p className="text-gray-500 text-xs mt-1" dir="rtl">
                      🔥 {item.calories} كالوري
                    </p>
                  )}
                </div>
              </div>
              
              {/* Size Selection */}
              {item.sizes && item.sizes.length > 0 && (
                <div className="mb-3" dir="rtl">
                  <label className="block text-sm font-medium text-gray-700 mb-2">الحجم:</label>
                  <select
                    value={selectedSizes[item.id.toString()] || item.sizes[0].size}
                    onChange={(e) => handleSizeChange(item.id.toString(), e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    style={{ '--tw-ring-color': '#87512f' } as React.CSSProperties}
                  >
                    {item.sizes.map((size) => (
                      <option key={size.size} value={size.size}>
                        {size.size} - {size.price} ر.س
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <div className="text-right">
                  {/* إذا كان عرض خاص، اعرض السعر الأصلي مشطوب */}
                  {(item as any).isOffer && (item as any).originalPrice && (
                    <div className="flex items-center gap-2 justify-end mb-1">
                      <span className="text-gray-400 line-through text-sm">
                        {(item as any).originalPrice} ر.س
                      </span>
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        وفر {(item as any).originalPrice - item.price} ر.س
                      </span>
                    </div>
                  )}
                  <div className="text-xl font-bold" style={{ color: '#d4a574' }}>
                    {item.sizes && item.sizes.length > 0
                      ? `${item.sizes.find(s => s.size === (selectedSizes[item.id.toString()] || item.sizes![0].size))?.price || item.price} ر.س`
                      : `${item.price} ر.س`
                    }
                  </div>
                </div>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium flex items-center gap-2 shadow-md hover:shadow-lg"
                  style={{ 
                    background: `linear-gradient(to right, #d4a574, #c49660)`,
                    ':hover': { background: `linear-gradient(to right, #c49660, #b8864c)` }
                  }}
                >
                  <Plus className="w-4 h-4" />
                  <span dir="rtl">{(item as any).isOffer ? 'اطلب الآن' : 'أضف للسلة'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuSection;