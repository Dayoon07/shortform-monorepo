import { useLocation, useParams } from "react-router-dom";
import SearchVideo from "../../widgets/search/SearchVideo";
import { JSX } from "react";

export default function SearchPage(): JSX.Element {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchWord: string = queryParams.get("q") ?? "";

    const { q } = useParams();
    console.log(`uesParams: ${q}`);

    return <SearchVideo searchValue={searchWord} />
}