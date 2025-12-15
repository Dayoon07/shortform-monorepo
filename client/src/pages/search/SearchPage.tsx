import { useLocation } from "react-router-dom";
import SearchVideo from "../../widgets/search/SearchVideo";

export default function SearchPage() {
    const w = new URLSearchParams(useLocation().search).get("q") ?? "";
    return <SearchVideo searchValue={w} />
}