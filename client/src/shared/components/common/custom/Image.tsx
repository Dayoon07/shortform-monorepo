import { CSSProperties } from "react";
import { REST_API_SERVER } from "../../../constants/ApiCollectionList";

interface ImageProps {
    url: string,
    alt: string,
    social: boolean,
    style?: CSSProperties | undefined,
    className?: string,
    onClick?: (p?: any) => void
}

/**
 * 컴포넌트 사용 시 주의사항
 * 
 * 해당 컴포넌트는 social 여부를 가지고 주소를 가지므로  
 * 외부 이미지 사용 시 social 값은 true 값을 넣고 사용
 */
export const Image = ({
    url, alt, social, style, className, onClick
}: ImageProps) => {
    const p = social ? url : REST_API_SERVER + url;
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