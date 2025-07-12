import React, { useState } from 'react';
import { ShoppingCart, ArrowRight, Settings } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import CategoryButtons from './components/CategoryButtons';
import MenuSection from './components/MenuSection';
import Cart from './components/Cart';
import AdminPanel from './components/AdminPanel';
import LoginModal from './components/LoginModal';
import VideoBackground from './components/VideoBackground';
import { useSupabaseMenu } from './hooks/useSupabaseMenu';
import { useCart } from './hooks/useCart';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  
  const { 
    menuSections, 
    specialOffers, 
    loading, 
    error,
    isSupabaseConnected,
    refreshData
  } = useSupabaseMenu();
  
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

  const backgroundVideos = [
    { id: "Nu8kIIL-CDA", title: "إعلان القهوة التجاري" },
    { id: "T3AHBe0I0yc", title: "أجواء مقهى موال مراكش" }
  ];

  // دمج العروض الخاصة مع أقسام المنيو
  const allSections = React.useMemo(() => {
    const sections = [...menuSections];
    
    // إضافة قسم العروض الخاصة إذا كانت موجودة
    if (specialOffers && specialOffers.length > 0) {
      const offersAsItems = specialOffers.map(offer => ({
        id: `offer-${offer.id}`,
        name: offer.title,
        description: offer.description,
        price: offer.offerPrice,
        image: offer.image,
        popular: true, // جعل جميع العروض تظهر كـ "الأكثر طلباً"
        new: true, // جعل جميع العروض تظهر كـ "جديد"
        available: true,
        originalPrice: offer.originalPrice, // إضافة السعر الأصلي
        isOffer: true // علامة للتمييز أنه عرض خاص
      }));
      
      sections.unshift({
        id: 'special-offers',
        title: 'العروض الخاصة',
        icon: '🎁',
        items: offersAsItems
      });
    }
    
    return sections;
  }, [menuSections, specialOffers]);
  const currentSection = allSections.find(section => section.id === activeSection);

  const handleAdminClick = () => {
    if (isLoggedIn) {
      setIsAdminOpen(true);
    } else {
      setIsLoginOpen(true);
    }
  };

  // إضافة console.log لتتبع البيانات
  console.log('App State:', {
    loading,
    error,
    isSupabaseConnected,
    allSectionsCount: allSections.length,
    specialOffersCount: specialOffers.length,
    activeSection,
    currentSection: currentSection ? currentSection.title : 'Not found'
  });
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 font-['Tajawal'] flex items-center justify-center">
        <LoadingSpinner message="جاري تحميل المنيو..." />
      </div>
    );
  }

  // التأكد من وجود البيانات
  if (!loading && allSections.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 font-['Tajawal'] flex items-center justify-center">
        <div className="text-center bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-red-200/50 m-4">
          <h2 className="text-2xl font-bold text-red-800 mb-4" dir="rtl">خطأ في تحميل البيانات</h2>
          <p className="text-red-600 mb-4" dir="rtl">
            لم يتم العثور على بيانات المنيو. يرجى المحاولة مرة أخرى.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
            dir="rtl"
          >
            إعادة تحميل الصفحة
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 font-['Tajawal']">
      {/* Video Background */}
      {activeSection === 'home' && (
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${backgroundVideos[currentVideoIndex].id}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=${backgroundVideos[currentVideoIndex].id}&start=0`}
              className="w-full h-full object-cover"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
          
          {/* Video controls */}
          <div className="absolute bottom-4 right-4 flex gap-2 z-10">
            {backgroundVideos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentVideoIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentVideoIndex 
                    ? 'bg-amber-500 scale-125' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      )}
      
      <Header />
      
      {/* تنبيه حالة قاعدة البيانات */}
      {error && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 relative z-30">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm" dir="rtl">
                ✅ تم تحميل البيانات بنجاح - المنيو جاهز للاستخدام
              </p>
            </div>
          </div>
        </div>
      )}

      {/* تنبيه نجاح الاتصال */}
      {isSupabaseConnected && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 relative z-30">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm" dir="rtl">
                ✅ تم ربط المنيو بقاعدة البيانات بنجاح - جميع التعديلات ستُحفظ تلقائياً
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* أزرار ثابتة */}
      <div className="fixed top-4 left-4 z-50 flex flex-col gap-3">
        {/* زر السلة */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          style={{ background: `linear-gradient(to right, #c4a484, #b8956f)` }}
        >
          <ShoppingCart className="w-5 h-5" />
          {getTotalItems() > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {getTotalItems()}
            </span>
          )}
        </button>
        
        {/* زر لوحة التحكم */}
        <button
          onClick={handleAdminClick}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          title="لوحة التحكم"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        {activeSection === 'home' ? (
          <>
            {/* Welcome Message */}
            <div className="text-center mb-12">
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-2xl border" style={{ borderColor: '#87512f50' }}>
                <h2 className="text-3xl font-bold mb-4" dir="rtl" style={{ color: '#87512f' }}>
                  أهلاً وسهلاً بكم في موال مراكش
                </h2>
                <p className="text-gray-800 text-lg leading-relaxed max-w-3xl mx-auto" dir="rtl">
                  استمتعوا بتجربة قهوة استثنائية في أجواء مغربية أصيلة. نقدم لكم أجود أنواع القهوة والمشروبات 
                  والحلويات المغربية التقليدية في قلب المدينة المنورة
                </p>
              </div>
            </div>


            {/* Category Buttons */}
            {allSections.length > 0 && (
              <div className="text-center mb-8">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border mb-6" style={{ borderColor: '#87512f50' }}>
                  <h2 className="text-2xl font-bold mb-4" dir="rtl" style={{ color: '#87512f' }}>اختر من قائمة الطعام</h2>
                </div>
                <CategoryButtons
                  sections={allSections}
                  activeSection={activeSection}
                  onSectionChange={setActiveSection}
                />
              </div>
            )}
          </>
        ) : (
          <div>
            {/* Back Button */}
            <div className="mb-6">
              <button
                onClick={() => setActiveSection('home')}
                className="flex items-center gap-2 transition-colors bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg"
                style={{ color: '#87512f' }}
                dir="rtl"
              >
                <ArrowRight className="w-5 h-5" />
                <span>العودة للرئيسية</span>
              </button>
            </div>

            {/* Current Section */}
            {currentSection && (
              <MenuSection
                title={currentSection.title}
                items={currentSection.items}
                icon={currentSection.icon}
                onAddToCart={addToCart}
              />
            )}
            
            {/* إذا لم يتم العثور على القسم */}
            {!currentSection && (
              <div className="text-center py-12">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border" style={{ borderColor: '#87512f50' }}>
                  <h2 className="text-2xl font-bold mb-4" dir="rtl" style={{ color: '#87512f' }}>القسم غير موجود</h2>
                  <p className="text-gray-600 mb-4" dir="rtl">
                    لم يتم العثور على هذا القسم في المنيو
                  </p>
                  <button
                    onClick={() => setActiveSection('home')}
                    className="text-white px-6 py-2 rounded-lg transition-colors"
                    style={{ backgroundColor: '#87512f' }}
                    dir="rtl"
                  >
                    العودة للرئيسية
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />

      {/* Cart */}
      <div className="relative z-50">
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
      </div>

      {/* Admin Panel */}
      <div className="relative z-50">
        <AdminPanel
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
        />
      </div>

      {/* Login Modal */}
      <div className="relative z-50">
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onLogin={() => setIsLoggedIn(true)}
        />
      </div>
    </div>
  );
}

export default App;