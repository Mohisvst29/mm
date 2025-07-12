import React from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/90 backdrop-blur-md py-8 px-4 relative z-20 shadow-lg">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6">
          <img 
            src="/mar.png" 
            alt="موال مراكش" 
            className="h-40 mx-auto mb-4 drop-shadow-lg"
          />
          <h1 className="text-4xl font-bold mb-2" dir="rtl" style={{ color: '#87512f' }}>
            مقهى موال مراكش
          </h1>
          <p className="text-lg" dir="rtl" style={{ color: '#b8956f' }}>
            تجربة قهوة أصيلة بنكهة مغربية
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm" style={{ color: '#b8956f' }}>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span dir="rtl">المدينة المنورة - حي النبلاء</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span dir="rtl">مفتوح 24 ساعة</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>+966567833138</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;