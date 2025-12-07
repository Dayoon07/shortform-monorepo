import { useLocation, useParams } from "react-router-dom";
import SearchVideo from "../../widgets/search/SearchVideo";
import { JSX } from "react";

export default function SearchPage(): JSX.Element {
    const l = useLocation();
    const w: string = new URLSearchParams(l.search).get("q") ?? "";

    const { q } = useParams();
    console.log(`uesParams: ${q}`);

    return <SearchVideo searchValue={w} />
}