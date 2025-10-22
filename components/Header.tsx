
import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex items-center justify-center gap-3">
        <SparklesIcon className="w-8 h-8 text-purple-400" />
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-indigo-500 text-transparent bg-clip-text">
          مولد الصور بالذكاء الاصطناعي
        </h1>
        <SparklesIcon className="w-8 h-8 text-indigo-400" />
      </div>
      <p className="mt-3 text-lg text-gray-400">
        حوّل كلماتك إلى صور فنية مذهلة باستخدام Gemini.
      </p>
    </header>
  );
};

export default Header;
