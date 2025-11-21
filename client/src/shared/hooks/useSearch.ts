import { useState } from "react";

export function useSearch(initial: string = "") {
    const [searchWord, setSearchWord] = useState(initial);
    return [searchWord, setSearchWord];
}
