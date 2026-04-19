import { SearchIcon } from "../../../../shared/utils/icon/icon";

interface SearchModalInputProps {
    value: string,
    setValue: (e: string) => void
}

export function SearchModalInput({ value, setValue }: SearchModalInputProps) {
    return (
        <div className="w-full max-w-sm min-w-[200px]">
            <div className="relative flex items-center">
                <input 
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="FlipFlop 검색"
                    maxLength={100}
                    autoFocus 
                    aria-label="검색어 입력"
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-md border border-slate-200 
                        rounded-md pl-3 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 
                        hover:border-slate-300 shadow-sm focus:shadow"
                />
                
                <button 
                    type="submit"
                    aria-label="검색"
                    className="rounded-md bg-black py-2 px-4 text-center text-md text-white transition-all ml-2"
                >
                    <SearchIcon />
                </button> 
            </div>
        </div>
    );
}