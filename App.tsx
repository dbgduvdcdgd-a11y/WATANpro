import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import PromptForm from './components/PromptForm';
import ImageDisplay from './components/ImageDisplay';
import { generateImageFromPrompt } from './services/geminiService';

// FIX: Removed conflicting global declaration for `window.aistudio` to fix TypeScript errors.
// The type is expected to be provided by the execution environment.
const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<string>('1:1');
  const [model, setModel] = useState<string>('imagen-4.0-generate-001');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKeyReady, setApiKeyReady] = useState<boolean>(false);

  useEffect(() => {
    const checkApiKey = async () => {
      if (await window.aistudio.hasSelectedApiKey()) {
        setApiKeyReady(true);
      }
    };
    checkApiKey();
  }, []);

  const handleSelectKey = async () => {
    await window.aistudio.openSelectKey();
    setApiKeyReady(true); // Assume success and proceed to app
  };

  const handleGenerateImage = useCallback(async () => {
    if (!prompt.trim()) {
      setError('الرجاء إدخال وصف للصورة.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      const imageUrl = await generateImageFromPrompt(prompt, aspectRatio, model);
      setGeneratedImageUrl(imageUrl);
    } catch (err) {
      console.error(err);
      if (err instanceof Error && err.message.includes("API_KEY_INVALID")) {
        setError("مفتاح API غير صالح أو لم يتم العثور عليه. الرجاء تحديد مفتاح مرة أخرى.");
        setApiKeyReady(false);
      } else {
        setError('حدث خطأ أثناء توليد الصورة. الرجاء المحاولة مرة أخرى.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [prompt, aspectRatio, model]);

  if (!apiKeyReady) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4 text-center">
        <div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-indigo-500 text-transparent bg-clip-text">
            مطلوب مفتاح API
          </h1>
          <p className="mb-6 text-gray-400">
            لاستخدام مولد الصور، يرجى تحديد مفتاح Gemini API الخاص بك.
          </p>
          <button
            onClick={handleSelectKey}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            تحديد مفتاح API
          </button>
          <p className="mt-4 text-xs text-gray-500">
            بالنقر، فإنك توافق على أنه قد يتم تطبيق رسوم على استخدامك لواجهة برمجة التطبيقات.
            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline ms-1">
              اعرف المزيد عن التسعير.
            </a>
          </p>
        </div>
      </div>
    );
  }

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
              model={model}
              setModel={setModel}
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