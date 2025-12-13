import React from "react";

interface ErrorAndLoadingProps {
    isLoading: boolean,
    swipeError: string | null,
    canGoPrev: boolean
}

export const ErrorAndLoading: React.FC<ErrorAndLoadingProps> = ({
    isLoading, swipeError, canGoPrev
}) => {
    return (
        <>
            {isLoading && (
                <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 pointer-events-none">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
                        <p className="text-black text-sm">다음 영상 로딩중...</p>
                    </div>
                </div>
            )}

            {swipeError && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500 
                    text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fadeIn"
                >
                    {swipeError}
                </div>
            )}

            <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 flex items-center 
                space-x-4 text-white text-sm opacity-50 z-40 pointer-events-none"
            >
                {canGoPrev && (
                    <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 
                                0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd"
                            />
                        </svg>
                        <span>위로 스와이프</span>
                    </div>
                )}
                <div className="flex items-center space-x-1">
                    <span>아래로 스와이프</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 
                            1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"
                        />
                    </svg>
                </div>
            </div>
        </>
    );
}