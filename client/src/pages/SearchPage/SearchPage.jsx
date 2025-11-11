import { useLocation, useParams } from "react-router-dom";
import SearchVideo from "../../widgets/search/SearchVideo";

export default function SearchPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchWord = queryParams.get("q");

    const { q } = useParams();
    console.log(`uesParams: ${q}`);

    return <SearchVideo searchValue={searchWord} />
}