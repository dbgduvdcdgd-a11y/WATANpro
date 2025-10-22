
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import PromptForm from './components/PromptForm';
import ImageDisplay from './components/ImageDisplay';
import { generateImageFromPrompt } from './services/geminiService';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<string>('1:1');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = useCallback(async () => {
    if (!prompt.trim()) {
      setError('الرجاء إدخال وصف للصورة.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      const imageUrl = await generateImageFromPrompt(prompt, aspectRatio);
      setGeneratedImageUrl(imageUrl);
    } catch (err) {
      console.error(err);
      setError('حدث خطأ أثناء توليد الصورة. الرجاء المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, aspectRatio]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl">
        <Header />
        <main className="mt-8">
          <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl p-6 sm:p-8">
            <PromptForm
              prompt={prompt}
              setPrompt={setPrompt}
              aspectRatio={aspectRatio}
              setAspectRatio={setAspectRatio}
              onSubmit={handleGenerateImage}
              isLoading={isLoading}
            />
          </div>

          {error && (
            <div className="mt-6 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
              {error}
            </div>
          )}

          <div className="mt-8">
            <ImageDisplay 
              imageUrl={generatedImageUrl} 
              isLoading={isLoading} 
              prompt={prompt} 
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
