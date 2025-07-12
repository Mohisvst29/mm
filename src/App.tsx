import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CategoryButtons from './components/CategoryButtons';
import MenuSection from './components/MenuSection';
import SpecialOffers from './components/SpecialOffers';
import Cart from './components/Cart';
import AdminPanel from './components/AdminPanel';
import LoginModal from './components/LoginModal';
import LoadingSpinner from './components/LoadingSpinner';
import { useSupabaseMenu } from './hooks/useSupabaseMenu';
import { useCart } from './hooks/useCart';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { menuSections, specialOffers, loading, error } = useSupabaseMenu();
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    tableNumber,
    setTableNumber,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart
  } = useCart();

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleAdminAccess = () => {
    if (isAuthenticated) {
      setIsAdminOpen(true);
    } else {
      setIsLoginOpen(true);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setIsLoginOpen(false);
    setIsAdminOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <LoadingSpinner message="جاري تحميل المنيو..." />
      </div>
    );
  }

  if (error && (!menuSections || menuSections.length === 0)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-amber-200/50">
          <h2 className="text-2xl font-bold text-red-600 mb-4" dir="rtl">خطأ في تحميل البيانات</h2>
          <p className="text-gray-600" dir="rtl">{error}</p>
        </div>
      </div>
    );
  }

  // Filter sections based on selected category
  const filteredSections = selectedCategory === 'all' 
    ? menuSections 
    : menuSections.filter(section => section.id === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative">
      {/* Background Video */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=dQw4w9WgXcQ"
          className="w-full h-full object-cover"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 pt-8">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center text-center text-white px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl font-bold mb-6 gradient-text" dir="rtl">
              مقهى موال مراكش
            </h1>
            <p className="text-2xl mb-8 opacity-90" dir="rtl">
              تجربة قهوة أصيلة بنكهة مغربية في قلب المدينة المنورة
            </p>
            <button 
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              dir="rtl"
            >
              استكشف المنيو
            </button>
          </div>
        </section>

        {/* Special Offers */}
        {specialOffers && specialOffers.length > 0 && (
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <SpecialOffers offers={specialOffers} onAddToCart={addToCart} />
            </div>
          </section>
        )}

        {/* Menu Section */}
        <section id="menu" className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-amber-200/50 inline-block">
                <h2 className="text-4xl font-bold mb-4" dir="rtl" style={{ color: '#d4a574' }}>
                  منيو مقهى موال مراكش
                </h2>
                <p className="text-lg text-gray-600" dir="rtl">
                  اختر من تشكيلة واسعة من المشروبات والأطعمة الشهية
                </p>
              </div>
            </div>
            
            {/* Category Buttons */}
            <div className="mb-12">
              <CategoryButtons 
                sections={[{ id: 'all', title: 'جميع الأقسام', icon: '🍽️', items: [] }, ...menuSections]}
                activeSection={selectedCategory}
                onSectionChange={handleCategorySelect}
              />
            </div>

            {/* Menu Items */}
            <div className="space-y-12">
              {filteredSections.map(section => (
                <MenuSection
                  key={section.id}
                  title={section.title}
                  items={section.items}
                  icon={section.icon}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Cart Button */}
      {getTotalItems() > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-4 right-4 z-30 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">🛒</span>
            <span className="font-bold">{getTotalItems()}</span>
          </div>
        </button>
      )}

      {/* Admin Button */}
      <button
        onClick={handleAdminAccess}
        className="fixed top-4 left-4 z-30 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300"
        title="لوحة التحكم"
      >
        ⚙️
      </button>

      {/* Cart */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        tableNumber={tableNumber}
        setTableNumber={setTableNumber}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        getTotalPrice={getTotalPrice}
        clearCart={clearCart}
      />

      {/* Admin Panel */}
      {isAdminOpen && (
        <AdminPanel onClose={() => setIsAdminOpen(false)} />
      )}

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}

export default App;