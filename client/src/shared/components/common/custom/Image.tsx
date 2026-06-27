import { CSSProperties } from "react";
import { mediaUrl } from "../../../utils/mediaUrl";

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
    url, alt, style, className, onClick
}: ImageProps) => {
    // 절대 URL(S3/CloudFront/소셜)은 그대로, 상대경로(/resources)는 서버 주소를 붙인다
    const p = mediaUrl(url);
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