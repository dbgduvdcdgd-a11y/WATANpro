
import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

interface PromptFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  aspectRatio: string;
  setAspectRatio: (ratio: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const aspectRatios = ['1:1', '16:9', '9:16', '4:3', '3:4'];

const PromptForm: React.FC<PromptFormProps> = ({
  prompt,
  setPrompt,
  aspectRatio,
  setAspectRatio,
  onSubmit,
  isLoading,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="prompt" className="block text-lg font-medium text-gray-300 mb-2">
          صف الصورة التي تريد إنشائها
        </label>
        <textarea
          id="prompt"
          name="prompt"
          rows={3}
          className="block w-full bg-gray-900 border border-gray-600 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
          placeholder="مثال: قط رائد فضاء يطفو في مجرة من الكعك الملون"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-300 mb-2">
          نسبة الأبعاد
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {aspectRatios.map((ratio) => (
            <button
              key={ratio}
              type="button"
              onClick={() => setAspectRatio(ratio)}
              disabled={isLoading}
              className={`py-2 px-4 rounded-lg font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 ${
                aspectRatio === ratio
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {ratio}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              جاري التوليد...
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5" />
              <span>ولّد الصورة</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default PromptForm;
