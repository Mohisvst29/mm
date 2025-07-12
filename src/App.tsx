import React, { useState } from 'react';
import Header from './components/Header';
import VideoBackground from './components/VideoBackground';
import CategoryButtons from './components/CategoryButtons';
import MenuSection from './components/MenuSection';
import SpecialOffers from './components/SpecialOffers';
import Cart from './components/Cart';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import LoginModal from './components/LoginModal';
import LoadingSpinner from './components/LoadingSpinner';
import { useSupabaseMenu } from './hooks/useSupabaseMenu';
import { useCart } from './hooks/useCart';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showCart, setShowCart] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { sections, items, offers, loading, error } = useSupabaseMenu();
  const { cartItems, addToCart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleAdminAccess = () => {
    if (isAuthenticated) {
      setShowAdmin(true);
    } else {
      setShowLogin(true);
    }
  };

  const handleLogin = (success: boolean) => {
    setShowLogin(false);
    if (success) {
      setIsAuthenticated(true);
      setShowAdmin(true);
    }
  };

  const filteredSections = selectedCategory === 'all' 
    ? sections 
    : sections.filter(section => section.id === selectedCategory);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">خطأ في تحميل البيانات</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (showAdmin) {
    return <AdminPanel onClose={() => setShowAdmin(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        cartItemsCount={getTotalItems()} 
        onCartClick={() => setShowCart(true)}
        onAdminClick={handleAdminAccess}
      />
      
      <VideoBackground />
      
      <main className="relative z-10">
        <SpecialOffers offers={offers} onAddToCart={addToCart} />
        
        <CategoryButtons 
          categories={sections}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
        
        <div className="container mx-auto px-4 py-8">
          {filteredSections.map((section) => {
            const sectionItems = items.filter(item => item.section_id === section.id);
            return (
              <MenuSection
                key={section.id}
                section={section}
                items={sectionItems}
                onAddToCart={addToCart}
              />
            );
          })}
        </div>
      </main>

      <Footer />

      {showCart && (
        <Cart
          items={cartItems}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          totalPrice={getTotalPrice()}
        />
      )}

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}

export default App;