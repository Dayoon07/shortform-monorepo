import { useEffect } from "react";

export default function Modal({ onClose, title, children }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-2xl max-w-md w-full mx-4">
        <h3 className="text-2xl font-bold mb-6 text-center">{title}</h3>
        {children}
        <div className="mt-6 text-center">
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}