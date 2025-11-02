import { useState } from "react";

export function useSearch(initial = "") {
    const [searchWord, setSearchWord] = useState(initial);
    return [searchWord, setSearchWord];
}
