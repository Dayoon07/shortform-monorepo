import { useEffect, useState } from "react"
import { getTagVideoList } from "../api/videoService";

export const useTagVideo = (tag) => {
    const [tagVideoList, setTagVideoList] = useState([]);
    
    useEffect(() => {
        if (!tag) return; // tag 없으면 실행 안함
        
        // cleanup flag (메모리 누수 방지)
        let isMounted = true;
        
        const fetchData = async () => {
            try {
                const data = await getTagVideoList(tag);
                if (isMounted) {
                    setTagVideoList(data);
                }
            } catch (error) {
                if (isMounted) console.error(error);
            }
        };
        
        fetchData();
        
        return () => {
            isMounted = false;
        };
    }, [tag]); // tag만 의존성으로 놓고 재생성 할 필요 없게 만듬
    
    return { tagVideoList };
}