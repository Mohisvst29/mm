import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'جاري التحميل...' }) => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#d4a574' }}></div>
        <p className="font-medium" dir="rtl" style={{ color: '#d4a574' }}>{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;