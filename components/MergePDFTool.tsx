import React, { useState, useRef } from 'react';
import { X, Upload, FileText, ArrowUp, ArrowDown, Download, Loader2, Files } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import download from 'downloadjs';

interface MergePDFToolProps {
  onClose: () => void;
}

const MergePDFTool: React.FC<MergePDFToolProps> = ({ onClose }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files).filter((f: File) => f.type === 'application/pdf');
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter((f: File) => f.type === 'application/pdf');
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === files.length - 1) return;

    const newFiles = [...files];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]];
    setFiles(newFiles);
  };

  const mergePDFs = async () => {
    if (files.length < 2) {
      alert("Please select at least 2 PDF files to merge.");
      return;
    }

    setProcessing(true);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      download(pdfBytes, "k-pdfs-merged.pdf", "application/pdf");
    } catch (error) {
      console.error("Error merging PDFs:", error);
      alert("An error occurred while merging your PDF files.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4 pb-20 text-center sm:p-0">
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full h-[85vh] flex flex-col">
          
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Files className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Merge PDF Files</h3>
                <p className="text-sm text-gray-500">Combine PDFs in the order you want.</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden flex flex-col md:flex-row bg-gray-50">
            
            {/* Left: Dropzone / File List */}
            <div className="flex-1 p-6 overflow-y-auto">
              {files.length === 0 ? (
                <div 
                  className={`h-full border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-colors ${isDragging ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-400 hover:bg-white'}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="p-8 text-center">
                    <Upload className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Drop PDF files here</h3>
                    <p className="text-gray-500 mb-6">or</p>
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
                    >
                      Select PDF files
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {files.map((file, index) => (
                    <div key={`${file.name}-${index}`} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 group hover:shadow-md transition-shadow">
                      <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-red-500" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>

                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => moveFile(index, 'up')}
                          disabled={index === 0}
                          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-30"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => moveFile(index, 'down')}
                          disabled={index === files.length - 1}
                          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-30"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                        <div className="w-px h-4 bg-gray-200 mx-1"></div>
                        <button 
                          onClick={() => removeFile(index)}
                          className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-medium hover:border-red-400 hover:text-red-500 hover:bg-white transition-all flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4" /> Add more files
                  </button>
                </div>
              )}
              <input 
                ref={fileInputRef}
                type="file" 
                multiple 
                accept="application/pdf" 
                className="hidden" 
                onChange={handleFileSelect} 
              />
            </div>

            {/* Right: Actions sidebar */}
            {files.length > 0 && (
              <div className="w-full md:w-80 bg-white border-l border-gray-200 p-6 flex flex-col flex-shrink-0 z-10">
                <h4 className="font-bold text-gray-900 mb-4">Summary</h4>
                <div className="space-y-3 mb-auto">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Total Files</span>
                        <span className="font-medium">{files.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Total Size</span>
                        <span className="font-medium">
                            {(files.reduce((acc, f) => acc + f.size, 0) / 1024 / 1024).toFixed(2)} MB
                        </span>
                    </div>
                </div>

                <button
                  onClick={mergePDFs}
                  disabled={processing || files.length < 2}
                  className="w-full py-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-bold text-lg shadow-lg shadow-red-100 flex items-center justify-center gap-2 transition-all"
                >
                  {processing ? (
                    <>
                        <Loader2 className="animate-spin w-5 h-5" /> Merging...
                    </>
                  ) : (
                    <>
                        Merge PDF <ArrowDown className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MergePDFTool;