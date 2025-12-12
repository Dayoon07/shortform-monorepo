import { X } from "lucide-react";
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
                <div className="flex justify-between items-center mb-6">
                    <div className="w-12 h-6"></div>
                    <h3 className="text-2xl font-bold text-center text-black">{title}</h3>
                    <button onClick={onClose} aria-label="모달 닫기" className="p-2 rounded-full hover:bg-gray-200">
                        <X className="w-6 h-6 text-gray-400 transition-colors" />
                    </button>
                </div>
                {children}
                
                {/* 기존 하단 닫기 버튼은 상단 X 버튼과 기능이 겹치므로 제거하거나, 필요하다면 스타일을 변경하여 사용하실 수 있습니다. */}
                {/* <div className="mt-6 text-center">
                    <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors">
                        닫기
                    </button>
                </div> */}
            </div>
        </div>
    );
}