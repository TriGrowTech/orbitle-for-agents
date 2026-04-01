import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

interface ImageUploadSlotProps {
  label: string;
  preview: string | null;
  onFile: (file: File) => void;
  onClear: () => void;
}

export function ImageUploadSlot({
  label, preview, onFile, onClear,
}: ImageUploadSlotProps) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE_BYTES) { setError(`File too large. Max ${MAX_FILE_SIZE_MB}MB.`); return; }
    setError(null);
    onFile(file);
  };

  return (
    <div className="w-full">
      <label className="block text-[10px] font-medium text-gray-500 mb-1">{label}</label>
      {preview ? (
        <div className="relative h-[140px] rounded overflow-hidden border border-gray-200">
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          <button onClick={onClear}
            className="absolute top-2 right-2 w-6 h-6 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center text-xs">✕</button>
        </div>
      ) : (
        <div className="flex flex-col">
          <label
            className={`flex flex-col items-center justify-center gap-1.5 h-[140px] border-2 border-dashed rounded cursor-pointer transition-colors ${dragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
              }`}
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
          >
            <input ref={fileRef} type="file" accept="image/*" className="hidden"
              onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
            <Upload className="w-6 h-6 text-gray-300" />
            <span className="text-xs text-gray-500 font-medium text-center px-2">Click or drag &amp; drop</span>
            <span className="text-[10px] text-gray-400">JPG, PNG, WEBP · Max {MAX_FILE_SIZE_MB}MB</span>
          </label>
          {error && <p className="mt-1 text-[10px] text-red-500 text-center">{error}</p>}
        </div>
      )}
    </div>
  );
}
