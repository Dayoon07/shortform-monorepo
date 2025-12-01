// src/shared/components/common/Modal.tsx

import { ReactNode, useEffect } from "react";

interface ModalProps {
    onClose: () => void,
    title: string,
    children: ReactNode
}

export default function Modal({ onClose, title, children }: ModalProps) {
    useEffect(() => {
        const handleEscape = (e: { key: string; }) => e.key === 'Escape' && onClose();
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[150] flex items-center justify-center p-4 w-full"
            onClick={handleBackdropClick}
        >
            <div 
                className="bg-gray-900 p-8 rounded-2xl w-full max-w-md shadow-2xl" 
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-2xl font-bold mb-6 text-center text-white">{title}</h3>
                {children}
                <div className="mt-6 text-center">
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
}