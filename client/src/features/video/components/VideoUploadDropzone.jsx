import { useState } from 'react';
import { UploadIcon } from '../../../widgets/icon/icon';
import { useClickSound } from '../../../shared/hooks/useClickSound';

export default function VideoUploadDropzone({ onFileSelect, disabled }) {
    const [isDragging, setIsDragging] = useState(false);
    const handlePlaySound = useClickSound("/mp3/click.mp3");

    const handleDragOver = (e) => {
        e.preventDefault();
        if (!disabled) setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        
        if (disabled) return;
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            onFileSelect(files[0]);
        }
    };

    const handleFileInput = (e) => {
        if (disabled) return;
        
        const files = e.target.files;
        if (files.length > 0) {
            onFileSelect(files[0]);
        }
    };

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`w-full max-w-3xl border-2 border-dashed rounded-2xl p-4 md:p-10 text-center cursor-pointer relative transition-colors ${
                isDragging 
                    ? 'border-blue-500 bg-blue-500/10' 
                    : 'border-gray-300 bg-gray-100 hover:bg-gray-200'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            <input
                type="file"
                accept="video/*"
                onChange={handleFileInput}
                className="hidden"
                id="video-file-input"
                disabled={disabled}
            />
            
            <label 
                htmlFor="video-file-input" 
                className={`flex flex-col items-center ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
                <UploadIcon />
                <p className="text-base md:text-lg font-semibold text-gray-800 mt-2">
                    업로드할 동영상 선택
                </p>
                <p className="text-xs md:text-sm text-gray-600 mt-1">
                    또는 여기에 드래그하여 놓기
                </p>
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('video-file-input').click();
                        handlePlaySound();
                    }}
                    disabled={disabled}
                    className="mt-4 px-4 py-2 md:px-6 md:py-2 bg-gradient-to-r from-pink-500 to-sky-500 
                        hover:from-pink-600 hover:to-sky-600 text-white rounded-md font-medium
                        disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    동영상 선택
                </button>
            </label>
        </div>
    );
}
