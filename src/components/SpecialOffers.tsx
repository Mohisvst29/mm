import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { SpecialOffer } from '../types/menu';

interface SpecialOffersProps {
  offers: SpecialOffer[];
  onAddToCart?: (offer: SpecialOffer) => void;
  isAdmin?: boolean;
  onEditOffer?: (offer: SpecialOffer) => void;
  onDeleteOffer?: (offerId: string) => void;
}

const SpecialOffers: React.FC<SpecialOffersProps> = ({ 
  offers, 
  onAddToCart,
  isAdmin = false,
  onEditOffer,
  onDeleteOffer
}) => {
  console.log('SpecialOffers received offers:', offers.length);
  
  if (!offers || offers.length === 0) {
    return (
      <section className="mb-12">
        <div className="text-center mb-8">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-amber-200/50">
            <h2 className="text-3xl font-bold text-amber-900 mb-4" dir="rtl">العروض الخاصة</h2>
            <p className="text-gray-600" dir="rtl">لا توجد عروض خاصة متاحة حالياً</p>
          </div>
        </div>
      </section>
    );
  }

  const handleOrderOffer = (offer: SpecialOffer) => {
    if (onAddToCart) {
      // إضافة العرض للسلة
      onAddToCart(offer);
    } else {
      // إرسال مباشر للواتساب
      const tableInfo = '\nيرجى تحديد رقم الطاولة أو ذكر أنه طلب تيك أواي';
      const whatsappMessage = `طلب عرض خاص من مقهى موال مراكش:${tableInfo}\n\n${offer.title}\n${offer.description}\n\nالسعر: ${offer.offerPrice} ر.س (بدلاً من ${offer.originalPrice} ر.س)\nوفر: ${offer.originalPrice - offer.offerPrice} ر.س`;
      const whatsappUrl = `https://wa.me/966567833138?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <section className="mb-12">
      {/* عنوان القسم */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className="text-3xl">🎁</span>
        <h2 className="text-2xl font-bold" dir="rtl" style={{ color: '#c4a484' }}>العروض الخاصة</h2>
        <span className="text-3xl">🎁</span>
      </div>
      
      {/* العروض بنفس تصميم الأصناف */}
      <div className="menu-grid grid gap-4 lg:gap-6">
        {offers.map((offer) => (
          <div 
            key={offer.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden menu-item-hover"
            style={{ borderColor: '#c4a48430' }}
          >
            {/* صورة العرض */}
            <div className="relative">
              {offer.image ? (
                <img 
                  src={offer.image} 
                  alt={offer.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div 
                  className="w-full h-48 flex items-center justify-center text-white text-6xl"
                  style={{ background: 'linear-gradient(135deg, #c4a484, #b8956f)' }}
                >
                  🎁
                </div>
              )}
              
              {/* شارات العرض */}
              <div className="absolute top-2 right-2 flex gap-1">
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  عرض خاص
                </span>
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  وفر {offer.originalPrice - offer.offerPrice} ر.س
                </span>
              </div>

              {/* أزرار التحكم للأدمن */}
              {isAdmin && (
                <div className="absolute top-2 left-2 flex gap-2">
                  <button
                    onClick={() => onEditOffer && onEditOffer(offer)}
                    className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors shadow-lg"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteOffer && onDeleteOffer(offer.id)}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            
            {/* محتوى العرض */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-3" dir="rtl">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-gray-800 leading-tight">{offer.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{offer.description}</p>
                  
                  {/* السعرات الحرارية */}
                  {offer.calories && offer.calories > 0 && (
                    <p className="text-gray-500 text-xs mt-2" dir="rtl">
                      🔥 {offer.calories} كالوري
                    </p>
                  )}
                  
                  {/* تاريخ انتهاء العرض */}
                  <p className="text-xs text-gray-500 mt-2">
                    العرض ساري حتى {offer.validUntil}
                  </p>
                </div>
              </div>
              
              {/* السعر وزر الإضافة */}
              <div className="flex justify-between items-center">
                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end mb-1">
                    <span className="text-gray-400 line-through text-sm">
                      {offer.originalPrice} ر.س
                    </span>
                    <span className="text-xl font-bold" style={{ color: '#c4a484' }}>
                      {offer.offerPrice} ر.س
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleOrderOffer(offer)}
                  className="text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium flex items-center gap-2 shadow-md hover:shadow-lg"
                  style={{ 
                    background: `linear-gradient(to right, #c4a484, #b8956f)`,
                  }}
                >
                  <Plus className="w-4 h-4" />
                  <span dir="rtl">اطلب الآن</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpecialOffers;