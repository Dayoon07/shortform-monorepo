import { useState } from "react";

const MAX_FILE_SIZE = 1024 * 1024 * 3; // 3MB

export default function ProfileImageUpload({ previewUrl, onImageSelect, onNext }) {
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file) => {
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert('프로필 이미지 최대 용량은 3MB입니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      onImageSelect(file, e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    processFile(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    processFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm mb-2">프로필 이미지</label>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative bg-gray-800 rounded px-3 py-6 flex flex-col items-center justify-center transition-all ${
          isDragging ? 'border-2 border-gray-400 bg-gray-400/10' : ''
        }`}
      >
        <input
          type="file"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          accept="image/*"
        />
        {previewUrl ? (
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-28 h-28 object-cover rounded-full" 
          />
        ) : (
          <p className="text-sm text-gray-400 text-center">
            이미지를 업로드하려면 <br /> 
            클릭하거나 <span className="text-white font-semibold">드래그</span> 하세요
          </p>
        )}
      </div>
      <button 
        onClick={onNext} 
        className="w-full py-3 mt-4 rounded-xl font-semibold bg-gray-700 hover:bg-gray-600 transition-all"
      >
        다음
      </button>
    </div>
  );
}