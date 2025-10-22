
import React from 'react';
import PhotoIcon from './icons/PhotoIcon';

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  prompt: string;
}

const LoadingSkeleton: React.FC = () => (
  <div className="w-full aspect-square bg-gray-700/50 rounded-lg animate-pulse flex items-center justify-center">
    <div className="text-center text-gray-500">
      <svg className="animate-spin mx-auto h-12 w-12 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p className="mt-4 text-lg">الذكاء الاصطناعي يرسم الآن...</p>
    </div>
  </div>
);

const Placeholder: React.FC = () => (
  <div className="w-full aspect-square border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center">
    <div className="text-center text-gray-500">
      <PhotoIcon className="mx-auto h-16 w-16" />
      <p className="mt-4 text-lg">ستظهر صورتك المولّدة هنا</p>
      <p className="text-sm">اكتب وصفاً واضغط على زر التوليد لتبدأ</p>
    </div>
  </div>
);

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, isLoading, prompt }) => {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (imageUrl) {
    return (
      <div className="w-full aspect-square bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-700">
        <img
          src={imageUrl}
          alt={prompt}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  return <Placeholder />;
};

export default ImageDisplay;
