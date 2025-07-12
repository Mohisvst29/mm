import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-white/90 backdrop-blur-md shadow-lg border-b border-amber-200/50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
              ☕
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800" dir="rtl">
                مقهى موال مراكش
              </h1>
              <p className="text-sm text-gray-600" dir="rtl">
                قهوة أصيلة بنكهة مغربية
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a 
              href="#menu" 
              className="text-gray-700 hover:text-amber-600 transition-colors duration-300 font-medium"
              dir="rtl"
            >
              المنيو
            </a>
            <a 
              href="#offers" 
              className="text-gray-700 hover:text-amber-600 transition-colors duration-300 font-medium"
              dir="rtl"
            >
              العروض
            </a>
            <a 
              href="#contact" 
              className="text-gray-700 hover:text-amber-600 transition-colors duration-300 font-medium"
              dir="rtl"
            >
              تواصل معنا
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-gray-700 hover:text-amber-600 transition-colors duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;