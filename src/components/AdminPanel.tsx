import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload, Flame } from 'lucide-react';
import { useSupabaseAdmin } from '../hooks/useSupabaseAdmin';
import { MenuItem, MenuSection, SpecialOffer } from '../types/menu';
import LoadingSpinner from './LoadingSpinner';

const AdminPanel: React.FC = () => {
  const {
    sections,
    items,
    offers,
    loading,
    error,
    addSection,
    updateSection,
    deleteSection,
    addItem,
    updateItem,
    deleteItem,
    addOffer,
    updateOffer,
    deleteOffer,
    fetchData
  } = useSupabaseAdmin();

  const [activeTab, setActiveTab] = useState<'sections' | 'items' | 'offers'>('sections');
  const [editingSection, setEditingSection] = useState<Partial<MenuSection> | null>(null);
  const [editingItem, setEditingItem] = useState<Partial<MenuItem> | null>(null);
  const [editingOffer, setEditingOffer] = useState<Partial<SpecialOffer> | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [imageUploadError, setImageUploadError] = useState('');

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSaveSection = async () => {
    if (!editingSection) return;
    
    try {
      if (editingSection.id) {
        await updateSection(editingSection.id, editingSection);
      } else {
        await addSection(editingSection);
      }
      setEditingSection(null);
      setImagePreview('');
    } catch (err) {
      console.error('Error saving section:', err);
    }
  };

  const handleSaveItem = async () => {
    if (!editingItem) return;
    
    try {
      if (editingItem.id) {
        await updateItem(editingItem.id, editingItem);
      } else {
        await addItem(editingItem);
      }
      setEditingItem(null);
      setImagePreview('');
    } catch (err) {
      console.error('Error saving item:', err);
    }
  };

  const handleSaveOffer = async () => {
    if (!editingOffer) return;
    
    try {
      if (editingOffer.id) {
        await updateOffer(editingOffer.id, editingOffer);
      } else {
        await addOffer(editingOffer);
      }
      setEditingOffer(null);
      setImagePreview('');
    } catch (err) {
      console.error('Error saving offer:', err);
    }
  };

  const ImageUploadSection = ({ type, currentImage }: { type: 'section' | 'item' | 'offer', currentImage?: string }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">رابط الصورة</label>
      <input
        type="url"
        value={currentImage || ''}
        onChange={(e) => {
          const value = e.target.value;
          if (type === 'section' && editingSection) {
            setEditingSection({ ...editingSection, image: value });
          } else if (type === 'item' && editingItem) {
            setEditingItem({ ...editingItem, image: value });
          } else if (type === 'offer' && editingOffer) {
            setEditingOffer({ ...editingOffer, image: value });
          }
          setImagePreview(value);
        }}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
        placeholder="https://example.com/image.jpg"
        disabled={loading}
      />
      {imagePreview && (
        <div className="mt-2">
          <img
            src={imagePreview}
            alt="معاينة"
            className="w-32 h-32 object-cover rounded-lg border"
            onError={() => setImageUploadError('رابط الصورة غير صحيح')}
            onLoad={() => setImageUploadError('')}
          />
        </div>
      )}
      {imageUploadError && (
        <p className="text-red-500 text-sm mt-1">{imageUploadError}</p>
      )}
    </div>
  );

  if (loading && !sections.length) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">خطأ في تحميل البيانات: {error}</p>
          <button
            onClick={fetchData}
            className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">لوحة التحكم</h1>
        
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setActiveTab('sections')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'sections'
                  ? 'bg-amber-500 text-white'
                  : 'text-gray-600 hover:text-amber-500'
              }`}
            >
              الأقسام
            </button>
            <button
              onClick={() => setActiveTab('items')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'items'
                  ? 'bg-amber-500 text-white'
                  : 'text-gray-600 hover:text-amber-500'
              }`}
            >
              الأصناف
            </button>
            <button
              onClick={() => setActiveTab('offers')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'offers'
                  ? 'bg-amber-500 text-white'
                  : 'text-gray-600 hover:text-amber-500'
              }`}
            >
              العروض الخاصة
            </button>
          </div>
        </div>

        {/* Sections Tab */}
        {activeTab === 'sections' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">إدارة الأقسام</h2>
              <button
                onClick={() => setEditingSection({ title: '', icon: '🍽️', image: '', orderIndex: sections.length })}
                className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                إضافة قسم جديد
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sections.map((section) => (
                <div key={section.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{section.icon}</span>
                      <h3 className="font-semibold">{section.title}</h3>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingSection(section)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteSection(section.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {section.image && (
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-32 object-cover rounded-md"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Items Tab */}
        {activeTab === 'items' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">إدارة الأصناف</h2>
              <button
                onClick={() => setEditingItem({ 
                  name: '', 
                  description: '', 
                  price: 0, 
                  calories: 0,
                  image: '', 
                  popular: false, 
                  new: false, 
                  available: true, 
                  orderIndex: items.length 
                })}
                className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                إضافة صنف جديد
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{item.name}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-amber-600">{item.price} ر.س</span>
                    {item.calories > 0 && (
                      <div className="flex items-center gap-1 text-orange-600 text-sm">
                        <Flame className="w-3 h-3" />
                        <span>{item.calories} كالوري</span>
                      </div>
                    )}
                  </div>
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-32 object-cover rounded-md"
                    />
                  )}
                  <div className="flex gap-2 mt-2">
                    {item.popular && (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">شائع</span>
                    )}
                    {item.new && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">جديد</span>
                    )}
                    {!item.available && (
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">غير متوفر</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Offers Tab */}
        {activeTab === 'offers' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">إدارة العروض الخاصة</h2>
              <button
                onClick={() => setEditingOffer({ 
                  title: '', 
                  description: '', 
                  originalPrice: 0, 
                  offerPrice: 0, 
                  calories: 0,
                  validUntil: '', 
                  image: '', 
                  active: true 
                })}
                className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                إضافة عرض جديد
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {offers.map((offer) => (
                <div key={offer.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{offer.title}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingOffer(offer)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteOffer(offer.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{offer.description}</p>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="line-through text-gray-500 text-sm">{offer.originalPrice} ر.س</span>
                      <span className="font-bold text-red-600 mr-2">{offer.offerPrice} ر.س</span>
                    </div>
                    {offer.calories > 0 && (
                      <div className="flex items-center gap-1 text-orange-600 text-sm">
                        <Flame className="w-3 h-3" />
                        <span>{offer.calories} كالوري</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-2">صالح حتى: {offer.validUntil}</p>
                  {offer.image && (
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-32 object-cover rounded-md"
                    />
                  )}
                  <div className="mt-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      offer.active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {offer.active ? 'نشط' : 'غير نشط'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Edit Section Modal */}
        {editingSection && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-xl font-bold mb-4">
                {editingSection.id ? 'تعديل القسم' : 'إضافة قسم جديد'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اسم القسم</label>
                  <input
                    type="text"
                    value={editingSection.title || ''}
                    onChange={(e) => setEditingSection({ ...editingSection, title: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    disabled={loading}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الأيقونة</label>
                  <input
                    type="text"
                    value={editingSection.icon || ''}
                    onChange={(e) => setEditingSection({ ...editingSection, icon: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    disabled={loading}
                  />
                </div>
                
                <ImageUploadSection type="section" currentImage={editingSection.image} />
              </div>
              
              <div className="flex gap-3 mt-6" dir="rtl">
                <button
                  onClick={handleSaveSection}
                  disabled={loading}
                  className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400"
                >
                  <Save className="w-4 h-4" />
                  {loading ? 'جاري الحفظ...' : 'حفظ'}
                </button>
                <button
                  onClick={() => {
                    setEditingSection(null);
                    setImagePreview('');
                    setImageUploadError('');
                  }}
                  className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  disabled={loading}
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Item Modal */}
        {editingItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold mb-4">
                {editingItem.id ? 'تعديل الصنف' : 'إضافة صنف جديد'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اسم الصنف</label>
                  <input
                    type="text"
                    value={editingItem.name || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    disabled={loading}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
                  <textarea
                    value={editingItem.description || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    rows={3}
                    disabled={loading}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">السعر (ر.س)</label>
                  <input
                    type="number"
                    value={editingItem.price || 0}
                    onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    disabled={loading}
                    min="0"
                    step="0.01"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">السعرات الحرارية</label>
                  <input
                    type="number"
                    value={editingItem.calories || 0}
                    onChange={(e) => setEditingItem({ ...editingItem, calories: Number(e.target.value) })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    disabled={loading}
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">القسم</label>
                  <select
                    value={editingItem.sectionId || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, sectionId: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    disabled={loading}
                  >
                    <option value="">اختر القسم</option>
                    {sections.map((section) => (
                      <option key={section.id} value={section.id}>
                        {section.title}
                      </option>
                    ))}
                  </select>
                </div>
                
                <ImageUploadSection type="item" currentImage={editingItem.image} />
                
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingItem.popular || false}
                      onChange={(e) => setEditingItem({ ...editingItem, popular: e.target.checked })}
                      className="mr-2"
                      disabled={loading}
                    />
                    شائع
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingItem.new || false}
                      onChange={(e) => setEditingItem({ ...editingItem, new: e.target.checked })}
                      className="mr-2"
                      disabled={loading}
                    />
                    جديد
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingItem.available !== false}
                      onChange={(e) => setEditingItem({ ...editingItem, available: e.target.checked })}
                      className="mr-2"
                      disabled={loading}
                    />
                    متوفر
                  </label>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6" dir="rtl">
                <button
                  onClick={handleSaveItem}
                  disabled={loading}
                  className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400"
                >
                  <Save className="w-4 h-4" />
                  {loading ? 'جاري الحفظ...' : 'حفظ'}
                </button>
                <button
                  onClick={() => {
                    setEditingItem(null);
                    setImagePreview('');
                    setImageUploadError('');
                  }}
                  className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  disabled={loading}
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Offer Modal */}
        {editingOffer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold mb-4">
                {editingOffer.id ? 'تعديل العرض' : 'إضافة عرض جديد'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">عنوان العرض</label>
                  <input
                    type="text"
                    value={editingOffer.title || ''}
                    onChange={(e) => setEditingOffer({ ...editingOffer, title: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    disabled={loading}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">وصف العرض</label>
                  <textarea
                    value={editingOffer.description || ''}
                    onChange={(e) => setEditingOffer({ ...editingOffer, description: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    rows={3}
                    disabled={loading}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">السعر الأصلي (ر.س)</label>
                  <input
                    type="number"
                    value={editingOffer.originalPrice || 0}
                    onChange={(e) => setEditingOffer({ ...editingOffer, originalPrice: Number(e.target.value) })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    disabled={loading}
                    min="0"
                    step="0.01"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">سعر العرض (ر.س)</label>
                  <input
                    type="number"
                    value={editingOffer.offerPrice || 0}
                    onChange={(e) => setEditingOffer({ ...editingOffer, offerPrice: Number(e.target.value) })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    disabled={loading}
                    min="0"
                    step="0.01"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">السعرات الحرارية</label>
                  <input
                    type="number"
                    value={editingOffer.calories || 0}
                    onChange={(e) => setEditingOffer({ ...editingOffer, calories: Number(e.target.value) })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    disabled={loading}
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ انتهاء العرض</label>
                  <input
                    type="date"
                    value={editingOffer.validUntil || ''}
                    onChange={(e) => setEditingOffer({ ...editingOffer, validUntil: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    disabled={loading}
                  />
                </div>
                
                <ImageUploadSection type="offer" currentImage={editingOffer.image} />
              </div>
              
              <div className="flex gap-3 mt-6" dir="rtl">
                <button
                  onClick={handleSaveOffer}
                  disabled={loading}
                  className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400"
                >
                  <Save className="w-4 h-4" />
                  {loading ? 'جاري الحفظ...' : 'حفظ'}
                </button>
                <button
                  onClick={() => {
                    setEditingOffer(null);
                    setImagePreview('');
                    setImageUploadError('');
                  }}
                  className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  disabled={loading}
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;