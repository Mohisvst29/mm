import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { MenuSection, MenuItem, SpecialOffer } from '../types/menu';
import { X, Plus, Edit2, Trash2, Save, Filter } from 'lucide-react';

interface AdminPanelProps {
  onClose: () => void;
}

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'sections' | 'items' | 'offers'>('sections');
  const [sections, setSections] = useState<MenuSection[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [offers, setOffers] = useState<SpecialOffer[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingSection, setEditingSection] = useState<Partial<MenuSection> | null>(null);
  const [editingItem, setEditingItem] = useState<Partial<MenuItem> | null>(null);
  const [editingOffer, setEditingOffer] = useState<Partial<SpecialOffer> | null>(null);
  const [selectedSectionFilter, setSelectedSectionFilter] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [sectionsRes, itemsRes, offersRes] = await Promise.all([
        supabase.from('menu_sections').select('*').order('order_index'),
        supabase.from('menu_items').select('*').order('order_index'),
        supabase.from('special_offers').select('*').order('created_at', { ascending: false })
      ]);

      if (sectionsRes.data) setSections(sectionsRes.data);
      if (itemsRes.data) setItems(itemsRes.data);
      if (offersRes.data) setOffers(offersRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const handleSaveSection = async () => {
    if (!editingSection?.title) return;

    try {
      if (editingSection.id) {
        const { error } = await supabase
          .from('menu_sections')
          .update(editingSection)
          .eq('id', editingSection.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('menu_sections')
          .insert([{ ...editingSection, order_index: sections.length }]);
        if (error) throw error;
      }
      
      setEditingSection(null);
      fetchData();
    } catch (error) {
      console.error('Error saving section:', error);
    }
  };

  const handleSaveItem = async () => {
    if (!editingItem?.name || !editingItem?.section_id) return;

    try {
      if (editingItem.id) {
        const { error } = await supabase
          .from('menu_items')
          .update(editingItem)
          .eq('id', editingItem.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('menu_items')
          .insert([{ ...editingItem, order_index: items.length }]);
        if (error) throw error;
      }
      
      setEditingItem(null);
      fetchData();
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const handleSaveOffer = async () => {
    if (!editingOffer?.title || !editingOffer?.description) return;

    try {
      if (editingOffer.id) {
        const { error } = await supabase
          .from('special_offers')
          .update(editingOffer)
          .eq('id', editingOffer.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('special_offers')
          .insert([editingOffer]);
        if (error) throw error;
      }
      
      setEditingOffer(null);
      fetchData();
    } catch (error) {
      console.error('Error saving offer:', error);
    }
  };

  const handleDeleteSection = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا القسم؟')) return;
    
    try {
      const { error } = await supabase
        .from('menu_sections')
        .delete()
        .eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error('Error deleting section:', error);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الصنف؟')) return;
    
    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleDeleteOffer = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا العرض؟')) return;
    
    try {
      const { error } = await supabase
        .from('special_offers')
        .delete()
        .eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error('Error deleting offer:', error);
    }
  };

  const getSectionName = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    return section ? `${section.icon} ${section.title}` : 'غير محدد';
  };

  const filteredItems = selectedSectionFilter 
    ? items.filter(item => item.section_id === selectedSectionFilter)
    : items;

  const getItemCount = () => filteredItems.length;

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-center">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6 shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">لوحة التحكم</h1>
          <button
            onClick={onClose}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex space-x-8 px-6">
          <button
            onClick={() => setActiveTab('sections')}
            className={`py-4 px-2 border-b-2 font-medium text-sm ${
              activeTab === 'sections'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            الأقسام ({sections.length})
          </button>
          <button
            onClick={() => setActiveTab('items')}
            className={`py-4 px-2 border-b-2 font-medium text-sm ${
              activeTab === 'items'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            الأصناف ({getItemCount()})
          </button>
          <button
            onClick={() => setActiveTab('offers')}
            className={`py-4 px-2 border-b-2 font-medium text-sm ${
              activeTab === 'offers'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            العروض الخاصة ({offers.length})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Sections Tab */}
        {activeTab === 'sections' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">إدارة الأقسام</h2>
              <button
                onClick={() => setEditingSection({ title: '', icon: '🍽️', image: '', order_index: sections.length })}
                className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                إضافة قسم جديد
              </button>
            </div>

            <div className="grid gap-4">
              {sections.map((section) => (
                <div key={section.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{section.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-800">{section.title}</h3>
                        <p className="text-sm text-gray-500">ترتيب: {section.order_index}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingSection(section)}
                        className="text-blue-600 hover:text-blue-800 p-2"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteSection(section.id)}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Items Tab */}
        {activeTab === 'items' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">إدارة الأصناف</h2>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select
                    value={selectedSectionFilter}
                    onChange={(e) => setSelectedSectionFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="">جميع الأقسام</option>
                    {sections.map((section) => (
                      <option key={section.id} value={section.id}>
                        {section.icon} {section.title}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => setEditingItem({ 
                    name: '', 
                    description: '', 
                    price: 0, 
                    section_id: '', 
                    popular: false, 
                    new: false, 
                    available: true,
                    order_index: items.length 
                  })}
                  className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  إضافة صنف جديد
                </button>
              </div>
            </div>

            <div className="grid gap-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {getSectionName(item.section_id)}
                        </span>
                        {item.popular && (
                          <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">شائع</span>
                        )}
                        {item.new && (
                          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">جديد</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>السعر: {item.price} درهم</span>
                        {item.calories && <span>السعرات: {item.calories}</span>}
                        <span>ترتيب: {item.order_index}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="text-blue-600 hover:text-blue-800 p-2"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Offers Tab */}
        {activeTab === 'offers' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">إدارة العروض الخاصة</h2>
              <button
                onClick={() => setEditingOffer({ 
                  title: '', 
                  description: '', 
                  original_price: 0, 
                  offer_price: 0, 
                  valid_until: '', 
                  active: true 
                })}
                className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                إضافة عرض جديد
              </button>
            </div>

            <div className="grid gap-4">
              {offers.map((offer) => (
                <div key={offer.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-800">{offer.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${
                          offer.active 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {offer.active ? 'نشط' : 'غير نشط'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{offer.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>السعر الأصلي: {offer.original_price} درهم</span>
                        <span className="text-red-600 font-semibold">سعر العرض: {offer.offer_price} درهم</span>
                        <span>صالح حتى: {offer.valid_until}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingOffer(offer)}
                        className="text-blue-600 hover:text-blue-800 p-2"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteOffer(offer.id)}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Edit Section Modal */}
      {editingSection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">
              {editingSection.id ? 'تعديل القسم' : 'إضافة قسم جديد'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">اسم القسم</label>
                <input
                  type="text"
                  value={editingSection.title || ''}
                  onChange={(e) => setEditingSection({ ...editingSection, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="أدخل اسم القسم"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الأيقونة</label>
                <input
                  type="text"
                  value={editingSection.icon || ''}
                  onChange={(e) => setEditingSection({ ...editingSection, icon: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="🍽️"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">رابط الصورة</label>
                <input
                  type="url"
                  value={editingSection.image || ''}
                  onChange={(e) => setEditingSection({ ...editingSection, image: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ترتيب العرض</label>
                <input
                  type="number"
                  value={editingSection.order_index || 0}
                  onChange={(e) => setEditingSection({ ...editingSection, order_index: parseInt(e.target.value) })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSaveSection}
                className="flex-1 bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                حفظ
              </button>
              <button
                onClick={() => setEditingSection(null)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
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
            <h3 className="text-lg font-semibold mb-4">
              {editingItem.id ? 'تعديل الصنف' : 'إضافة صنف جديد'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">القسم *</label>
                <select
                  value={editingItem.section_id || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, section_id: e.target.value })}
                  className={`w-full border rounded-lg px-3 py-2 ${
                    !editingItem.section_id ? 'border-red-300' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">اختر القسم</option>
                  {sections.map((section) => (
                    <option key={section.id} value={section.id}>
                      {section.icon} {section.title}
                    </option>
                  ))}
                </select>
                {!editingItem.section_id && (
                  <p className="text-red-500 text-sm mt-1">يجب اختيار القسم</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">اسم الصنف *</label>
                <input
                  type="text"
                  value={editingItem.name || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="أدخل اسم الصنف"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الوصف</label>
                <textarea
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="أدخل وصف الصنف"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">السعر (درهم)</label>
                <input
                  type="number"
                  step="0.01"
                  value={editingItem.price || 0}
                  onChange={(e) => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">السعرات الحرارية</label>
                <input
                  type="number"
                  value={editingItem.calories || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, calories: e.target.value ? parseInt(e.target.value) : null })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">رابط الصورة</label>
                <input
                  type="url"
                  value={editingItem.image || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editingItem.popular || false}
                    onChange={(e) => setEditingItem({ ...editingItem, popular: e.target.checked })}
                    className="mr-2"
                  />
                  صنف شائع
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editingItem.new || false}
                    onChange={(e) => setEditingItem({ ...editingItem, new: e.target.checked })}
                    className="mr-2"
                  />
                  صنف جديد
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editingItem.available !== false}
                    onChange={(e) => setEditingItem({ ...editingItem, available: e.target.checked })}
                    className="mr-2"
                  />
                  متوفر
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSaveItem}
                disabled={!editingItem.name || !editingItem.section_id}
                className="flex-1 bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                حفظ
              </button>
              <button
                onClick={() => setEditingItem(null)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
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
            <h3 className="text-lg font-semibold mb-4">
              {editingOffer.id ? 'تعديل العرض' : 'إضافة عرض جديد'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">عنوان العرض</label>
                <input
                  type="text"
                  value={editingOffer.title || ''}
                  onChange={(e) => setEditingOffer({ ...editingOffer, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="أدخل عنوان العرض"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">وصف العرض</label>
                <textarea
                  value={editingOffer.description || ''}
                  onChange={(e) => setEditingOffer({ ...editingOffer, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="أدخل وصف العرض"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">السعر الأصلي (درهم)</label>
                <input
                  type="number"
                  step="0.01"
                  value={editingOffer.original_price || 0}
                  onChange={(e) => setEditingOffer({ ...editingOffer, original_price: parseFloat(e.target.value) })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">سعر العرض (درهم)</label>
                <input
                  type="number"
                  step="0.01"
                  value={editingOffer.offer_price || 0}
                  onChange={(e) => setEditingOffer({ ...editingOffer, offer_price: parseFloat(e.target.value) })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">صالح حتى</label>
                <input
                  type="text"
                  value={editingOffer.valid_until || ''}
                  onChange={(e) => setEditingOffer({ ...editingOffer, valid_until: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="31 ديسمبر 2024"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">رابط الصورة</label>
                <input
                  type="url"
                  value={editingOffer.image || ''}
                  onChange={(e) => setEditingOffer({ ...editingOffer, image: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editingOffer.active !== false}
                    onChange={(e) => setEditingOffer({ ...editingOffer, active: e.target.checked })}
                    className="mr-2"
                  />
                  العرض نشط
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSaveOffer}
                className="flex-1 bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                حفظ
              </button>
              <button
                onClick={() => setEditingOffer(null)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}