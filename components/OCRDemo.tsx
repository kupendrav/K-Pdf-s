import React, { useState, useRef } from 'react';
import { Upload, X, FileText, Loader2, Search, Wand2 } from 'lucide-react';
import { analyzeDocumentImage } from '../services/geminiService';

interface OCRDemoProps {
  onClose: () => void;
}

const OCRDemo: React.FC<OCRDemoProps> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setResult('');
    }
  };

  const handleScan = async () => {
    if (!file || !preview) return;

    setLoading(true);
    try {
      // Remove data URL prefix for API
      const base64Data = preview.split(',')[1];
      const mimeType = file.type;
      
      const text = await analyzeDocumentImage(base64Data, mimeType);
      setResult(text);
    } catch (error) {
      setResult("Error processing document. Please check your API key and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                    <Wand2 className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                    <h3 className="text-xl leading-6 font-bold text-gray-900" id="modal-title">
                        Smart OCR & Analysis
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Powered by Gemini 2.5 Flash</p>
                </div>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500 transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Upload */}
              <div className="flex flex-col h-full">
                <label className="flex-1 flex flex-col items-center justify-center w-full min-h-[300px] border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-indigo-50 hover:border-indigo-300 transition-all">
                  {preview ? (
                    <div className="relative w-full h-full flex items-center justify-center p-4">
                        <img src={preview} alt="Preview" className="max-h-64 object-contain shadow-lg rounded-md" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-10 transition-all rounded-xl">
                            <span className="sr-only">Change image</span>
                        </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-12 h-12 mb-4 text-indigo-400" />
                      <p className="mb-2 text-lg text-gray-700 font-medium">Click to upload document image</p>
                      <p className="text-sm text-gray-500">PNG, JPG or WEBP (Max 5MB)</p>
                    </div>
                  )}
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange} 
                  />
                </label>
                
                <button
                  onClick={handleScan}
                  disabled={!file || loading}
                  className={`mt-4 w-full py-3 px-4 rounded-xl text-white font-bold text-lg shadow-md transition-all flex items-center justify-center gap-2
                    ${!file || loading 
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5'
                    }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="h-5 w-5" />
                      Extract Text & Analyze
                    </>
                  )}
                </button>
              </div>

              {/* Right Column: Result */}
              <div className="flex flex-col h-full bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200 bg-white flex justify-between items-center">
                    <span className="font-semibold text-gray-700 flex items-center gap-2">
                        <FileText className="w-4 h-4" /> 
                        Extracted Content
                    </span>
                    {result && (
                         <span className="text-xs font-mono text-green-600 bg-green-100 px-2 py-1 rounded">Analysis Complete</span>
                    )}
                </div>
                <div className="flex-1 p-4 overflow-y-auto max-h-[400px] min-h-[300px]">
                    {loading ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                            <p>Gemini is reading your document...</p>
                        </div>
                    ) : result ? (
                        <div className="prose prose-sm max-w-none text-gray-800 whitespace-pre-wrap">
                            {result}
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                            Results will appear here
                        </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OCRDemo;