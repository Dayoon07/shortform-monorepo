import { CommonVideoGrid } from "../../../shared/components/CommonVideoGrid";
import { useUser } from "../../../shared/context/UserContext";
import { useSearchVideoList } from "../hooks/useSearchVideoList";

export default function SearchVideoList({ searchValue }) {
    const { user } = useUser();
    const { videos } = useSearchVideoList(user, searchValue);
    
    return <CommonVideoGrid videos={videos} />
}