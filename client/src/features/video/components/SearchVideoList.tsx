import { CommonVideoGrid } from "../../../shared/components/CommonVideoGrid";
import { useSearchVideoList } from "../hooks/useSearchVideoList";

export default function SearchVideoList({ searchValue }: { searchValue: string }) {
    const { videos } = useSearchVideoList(searchValue);
    
    return <CommonVideoGrid videos={videos} />
}