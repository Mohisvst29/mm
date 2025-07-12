import React from 'react';
import { MenuSection } from '../types/menu';

interface CategoryButtonsProps {
  sections: MenuSection[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({ sections, activeSection, onSectionChange }) => {
  console.log('CategoryButtons received sections:', sections.length);
  
  if (!sections || sections.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-amber-200/50">
          <p className="text-amber-800 font-medium" dir="rtl">
            لا توجد أقسام متاحة حالياً
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="category-grid grid gap-3 mb-8">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSectionChange(section.id)}
          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
            activeSection === section.id
              ? 'text-white shadow-lg'
              : 'bg-white/90 backdrop-blur-md text-gray-700 hover:shadow-lg hover:scale-105 hover:bg-white/95'
          }`}
          style={activeSection === section.id 
            ? { background: `linear-gradient(to right, #d4a574, #c49660)`, borderColor: '#d4a574' }
            : { borderColor: '#d4a57450' }
          }
        >
          <div className="text-2xl mb-2">{section.icon}</div>
          <div className="text-sm font-bold" dir="rtl">{section.title}</div>
        </button>
      ))}
    </div>
  );
};

export default CategoryButtons;