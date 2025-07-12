import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import VideoBackground from './components/VideoBackground';
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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { sections, items, offers, loading, error } = useSupabaseMenu();
  const { cartItems, addToCart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

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

  const handleLogin = (success: boolean) => {
    setIsAuthenticated(success);
    setIsLoginOpen(false);
    if (success) {
      setIsAdminOpen(true);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">خطأ في تحميل البيانات</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  // Filter items based on selected category
  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.section_id === selectedCategory);

  // Group filtered items by section
  const groupedItems = filteredItems.reduce((acc, item) => {
    const sectionId = item.section_id;
    if (!acc[sectionId]) {
      acc[sectionId] = [];
    }
    acc[sectionId].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <VideoBackground />
      
      <Header 
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onAdminClick={handleAdminAccess}
      />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center text-center text-white px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              مقهى موال مراكش
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              تجربة قهوة استثنائية في قلب مراكش
            </p>
            <button 
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              استكشف المنيو
            </button>
          </div>
        </section>

        {/* Special Offers */}
        {offers && offers.length > 0 && (
          <SpecialOffers offers={offers} onAddToCart={addToCart} />
        )}

        {/* Menu Section */}
        <section id="menu" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
              منيو مقهى موال مراكش
            </h2>
            
            <CategoryButtons 
              categories={sections}
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
            />

            <div className="mt-12 space-y-16">
              {selectedCategory === 'all' ? (
                // Show all sections
                sections.map(section => {
                  const sectionItems = items.filter(item => item.section_id === section.id);
                  if (sectionItems.length === 0) return null;
                  
                  return (
                    <MenuSection
                      key={section.id}
                      section={section}
                      items={sectionItems}
                      onAddToCart={addToCart}
                    />
                  );
                })
              ) : (
                // Show selected category only
                Object.entries(groupedItems).map(([sectionId, sectionItems]) => {
                  const section = sections.find(s => s.id === sectionId);
                  if (!section || sectionItems.length === 0) return null;
                  
                  return (
                    <MenuSection
                      key={section.id}
                      section={section}
                      items={sectionItems}
                      onAddToCart={addToCart}
                    />
                  );
                })
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        totalPrice={getTotalPrice()}
      />

      {/* Admin Panel */}
      {isAdminOpen && (
        <AdminPanel onClose={() => setIsAdminOpen(false)} />
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}

export default App;