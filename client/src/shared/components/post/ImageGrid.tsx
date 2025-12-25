import { useEffect, useState } from "react";
import { REST_API_SERVER } from "../../constants/ApiCollectionList";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

enum GridType {
    GRID = "grid",
    INLINE = "inline",
    BLOCK = "block"
}

interface ImageGridProps {
    files: string; // "image1.jpg, image2.png" 형태의 문자열
    gridType?: "grid" | "inline" | "block"
}

const ImageGrid: React.FC<ImageGridProps> = ({
    files,
    gridType = GridType.INLINE
}) => {
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const images = files ? files.split(',').map(img => img.trim()).filter(Boolean) : [];
    
    if (images.length === 0) return null;
    
    const total = images.length;
    const imgStyle = "w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity";

    // 슬라이드 제어 함수
    const openLightbox = (index: number) => setCurrentIndex(index);
    const closeLightbox = () => setCurrentIndex(null);
    const prevSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev !== null ? (prev - 1 + total) % total : null));
    };
    const nextSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev !== null ? (prev + 1) % total : null));
    };

    // ESC 키로 닫기
    // eslint-disable-next-line react-hooks/rules-of-hooks  
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => { 
            if (e.key === "Escape" && currentIndex !== null) {
                closeLightbox(); 
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [currentIndex]);

    // GRID 타입 렌더링
    const renderGridType = () => (
        <div className="grid gap-0.5">
            {total === 1 && (
                <div className="w-full aspect-video">
                    <img src={`${REST_API_SERVER}${images[0]}`} alt="img" className={imgStyle} onClick={() => openLightbox(0)} />
                </div>
            )}

            {total === 2 && (
                <div className="grid grid-cols-2 gap-0.5 h-64 md:h-80">
                    {images.map((img, i) => (
                        <img key={i} src={`${REST_API_SERVER}${img}`} alt="img" className={imgStyle} onClick={() => openLightbox(i)} />
                    ))}
                </div>
            )}

            {total === 3 && (
                <div className="grid grid-cols-2 gap-0.5 h-64 md:h-80">
                    <img src={`${REST_API_SERVER}${images[0]}`} alt="img" className={imgStyle} onClick={() => openLightbox(0)} />
                    <div className="grid grid-rows-2 gap-0.5">
                        <img src={`${REST_API_SERVER}${images[1]}`} alt="img" className={imgStyle} onClick={() => openLightbox(1)} />
                        <img src={`${REST_API_SERVER}${images[2]}`} alt="img" className={imgStyle} onClick={() => openLightbox(2)} />
                    </div>
                </div>
            )}

            {total >= 4 && (
                <div className="grid grid-cols-2 gap-0.5 h-64 md:h-80">
                    {images.slice(0, 3).map((img, i) => (
                        <img key={i} src={`${REST_API_SERVER}${img}`} alt="img" className={imgStyle} onClick={() => openLightbox(i)} />
                    ))}
                    <div className="relative h-full" onClick={() => openLightbox(3)}>
                        <img src={`${REST_API_SERVER}${images[3]}`} alt="img" className={imgStyle} />
                        {total > 4 && (
                            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center cursor-pointer hover:bg-black/60 transition-colors">
                                <span className="text-white text-3xl font-bold">+{total - 4}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

    // INLINE 타입 렌더링
    const renderInlineType = () => (
        <div className="overflow-x-scroll">
            <div className="flex gap-2 pb-2">
                {images.map((img, i) => (
                    <div 
                        key={i} 
                        className="flex-shrink-0 h-60"
                        onClick={() => openLightbox(i)}
                    >
                        <img 
                            src={`${REST_API_SERVER}${img}`} 
                            alt={`img-${i}`} 
                            className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    // BLOCK 타입 렌더링
    const renderBlockType = () => (
        <div className="space-y-2">
            {images.map((img, i) => (
                <div 
                    key={i} 
                    className="w-full aspect-video"
                    onClick={() => openLightbox(i)}
                >
                    <img 
                        src={`${REST_API_SERVER}${img}`} 
                        alt={`img-${i}`} 
                        className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    />
                </div>
            ))}
        </div>
    );

    return (
        <div className="mt-2 overflow-hidden border border-gray-100">
            {gridType === GridType.GRID && renderGridType()}
            {gridType === GridType.INLINE && renderInlineType()}
            {gridType === GridType.BLOCK && renderBlockType()}

            {currentIndex !== null && (
                <div 
                    className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center select-none"
                    onClick={closeLightbox}
                >
                    {/* 상단 도구 모음 */}
                    <div className="absolute top-5 right-5 z-[110] flex items-center gap-4 text-white">
                        <span className="text-sm font-light">{currentIndex + 1} / {total}</span>
                        <button onClick={closeLightbox} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                            <X size={28} />
                        </button>
                    </div>

                    {/* 이전 버튼 */}
                    {total > 1 && (
                        <button onClick={prevSlide} className="absolute left-4 p-3 text-white hover:bg-white/10 rounded-full transition-all z-[110]">
                            <ChevronLeft size={40} />
                        </button>
                    )}

                    {/* 이미지 슬라이드 */}
                    <div className="max-w-[90vw] max-h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                        <img 
                            src={`${REST_API_SERVER}${images[currentIndex]}`} 
                            alt="Zoomed"
                            className="max-w-full max-h-[85vh] object-contain shadow-2xl"
                        />
                    </div>

                    {/* 다음 버튼 */}
                    {total > 1 && (
                        <button onClick={nextSlide} className="absolute right-4 p-3 text-white hover:bg-white/10 rounded-full transition-all z-[110]">
                            <ChevronRight size={40} />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default ImageGrid;