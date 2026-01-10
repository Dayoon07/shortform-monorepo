import { CSSProperties } from "react";
import { REST_API_SERVER } from "../../../constants/ApiCollectionList";

interface ImageProps {
    url: string;
    alt: string;
    social: boolean;
    provider?: string;
    style?: CSSProperties | undefined;
    className?: string;
    onClick?: (p?: any) => void;
}

/**
 * 컴포넌트 사용 시 주의사항
 * 
 * 해당 컴포넌트는 social 여부를 가지고 주소를 가지므로  
 * 외부 이미지 사용 시 social 값은 true 값을 넣고 사용
 */
export const Image = ({
    url, alt, social, provider, style, className, onClick
}: ImageProps) => {
    // 외부 이미지인지 확인
    const sFunc = (url: string): boolean => {
        if (!url || !provider) return false;
        if (social && provider !== "LOCAL") return true;
        return false;
    };
    
    // 소셜 계정이면서 외부 이미지면 그대로, 아니면 서버 주소 추가
    const p = social && sFunc(url) ? url : REST_API_SERVER + url;
    return (
        <img 
            src={p}
            alt={alt}
            style={style}
            className={className}
            onClick={onClick} 
        />
    );
}