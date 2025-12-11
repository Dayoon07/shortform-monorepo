import { MouseEvent, ReactNode, useEffect } from "react";

interface ModalProps {
    onClose: () => void,
    title: string,
    children: ReactNode
}

export default function Modal({ onClose, title, children }: ModalProps) {
    const modalCn = "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 w-full";
    const modalItemCn = "w-full max-w-md bg-white rounded-2xl shadow-2xl mx-4 p-8";
    const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    return (
        <div className={modalCn} onClick={handleBackdropClick}>
            <div className={modalItemCn} onClick={(e) => e.stopPropagation()}>
                <h3 className="text-2xl font-bold mb-6 text-center text-black">{title}</h3>
                {children}
                <div className="mt-6 text-center">
                    <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors">
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
}