import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types/menu';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  tableNumber: string;
  setTableNumber: (tableNumber: string) => void;
  updateQuantity: (id: string, quantity: number, selectedSize?: string) => void;
  removeFromCart: (id: string, selectedSize?: string) => void;
  getTotalPrice: () => number;
  clearCart: () => void;
}

const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  cartItems,
  tableNumber,
  setTableNumber,
  updateQuantity,
  removeFromCart,
  getTotalPrice,
  clearCart
}) => {
  if (!isOpen) return null;

  const handleOrder = () => {
    const orderText = cartItems.map(item => 
      `${item.name}${item.selectedSize ? ` (${item.selectedSize})` : ''} x${item.quantity} = ${(item.selectedPrice || item.price) * item.quantity} ر.س`
    ).join('\n');
    
    const total = getTotalPrice();
    const tableInfo = tableNumber ? `\nرقم الطاولة: ${tableNumber}` : '\nطلب تيك أواي';
    const whatsappMessage = `طلب جديد من مقهى موال مراكش:${tableInfo}\n\n${orderText}\n\nالإجمالي: ${total} ر.س`;
    const whatsappUrl = `https://wa.me/966567833138?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800" dir="rtl">سلة الطلبات</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500" dir="rtl">السلة فارغة</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cartItems.map((item, index) => (
                  <div key={`${item.id}-${item.selectedSize}-${index}`} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2" dir="rtl">
                      <div>
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        {item.selectedSize && (
                          <p className="text-sm text-gray-600">الحجم: {item.selectedSize}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedSize)}
                          className="bg-gray-200 hover:bg-gray-300 rounded-full p-1 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize)}
                          className="bg-gray-200 hover:bg-gray-300 rounded-full p-1 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-amber-600 font-bold">
                        {(item.selectedPrice || item.price) * item.quantity} ر.س
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Table Number Input */}
          <div className="border-t border-gray-200 pt-4 mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" dir="rtl">
              رقم الطاولة (اختياري)
            </label>
            <input
              type="text"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              placeholder="أدخل رقم الطاولة أو اتركه فارغاً للتيك أواي"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-center"
              dir="rtl"
            />
            <p className="text-xs text-gray-500 mt-1 text-center" dir="rtl">
              إذا تركت الحقل فارغاً، سيتم اعتبار الطلب "تيك أواي"
            </p>
          </div>

          {/* Total and Action Buttons */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center mb-4" dir="rtl">
              <span className="text-xl font-bold text-gray-800">الإجمالي:</span>
              <span className="text-2xl font-bold text-amber-600">{getTotalPrice()} ر.س</span>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={handleOrder}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300"
                dir="rtl"
              >
                {tableNumber ? `إرسال الطلب - طاولة ${tableNumber}` : 'إرسال الطلب - تيك أواي'}
              </button>
              
              <button
                onClick={clearCart}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                dir="rtl"
              >
                إفراغ السلة
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;