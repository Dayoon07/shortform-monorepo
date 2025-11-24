import SearchVideoList from "../../features/video/components/SearchVideoList";

export default function SearchVideo({ searchValue }: { searchValue: string }) {
    return <SearchVideoList searchValue={searchValue} />
}