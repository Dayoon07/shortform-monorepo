import { useState } from "react";

export function useSearch(initial: string = ""): [
    string,
    React.Dispatch<React.SetStateAction<string>>
] {
    const [searchWord, setSearchWord] = useState<string>(initial);
    return [searchWord, setSearchWord];
}
