import { SearchIcon } from "../../../../widgets/icon/icon";

interface SearchModalInputProps {
    value: string,
    setValue: (e: string) => void
}

export function SearchModalInput({ value, setValue }: SearchModalInputProps) {
    const iptcn = `w-full pl-10 pr-3 py-2 rounded-full bg-white/20 backdrop-blur-sm 
        border border-white/30 text-white placeholder-white/70 focus:outline-none 
        focus:ring-2 focus:ring-white/50 focus:bg-white/25`;
    return (
        <>
            <button 
                type="submit" 
                className="absolute top-2.5 left-2.5 p-0 
                    bg-transparent border-none cursor-pointer"
                aria-label="검색"
            >
                <SearchIcon />
            </button>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="검색"
                maxLength={100}
                autoFocus
                aria-label="검색어 입력"
                className={iptcn}
            />
        </>
    );
}