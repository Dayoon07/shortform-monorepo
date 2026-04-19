import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface VideoActionButtonProps {
    onClick: () => void,
    disabled?: boolean,
    ariaLabel: string,
    BtnIcon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
    text: string | number,
    className?: string, 
}

/** 좋아요 버튼을 제외한 나머지 액션 버튼을 위한 공통 컴포넌트 */
export const VideoActionButton = ({
    onClick, disabled = false, ariaLabel,
    BtnIcon, text, className = ''
}: VideoActionButtonProps) => {
    return (
        <div className="flex flex-col items-center group">
            <button
                onClick={onClick}
                disabled={disabled}
                className={`bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full p-2 md:p-3 transition-all ${className}`}
                aria-label={ariaLabel}
            >
                <BtnIcon className="h-7 w-7" />
            </button>
            <span className="text-xs md:text-sm mt-1">{text}</span>
        </div>
    );
};