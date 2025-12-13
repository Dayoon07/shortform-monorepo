import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../../../shared/constants/Route";
import { Search } from "lucide-react"; // lucide-react의 Search 아이콘을 사용하는 것이 모던한 느낌을 줍니다.

export default function SearchBar({ initialValue = "" }: { initialValue?: string }) {
    const [searchQuery, setSearchQuery] = useState<string>(initialValue);
    const navigate = useNavigate();
    const btnCn = `absolute top-1/2 left-3 -translate-y-1/2 p-1 
        text-gray-500 hover:text-blue-500 transition-colors`;

    const SearchFunc = (query: string): void => {
        if (query.trim()) navigate(ROUTE.SEARCH_V2(encodeURIComponent(query)));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        SearchFunc(searchQuery);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="relative w-full">
                <button type="submit" aria-label="검색" className={btnCn}>
                    <Search size={20} />
                </button>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="검색"
                    maxLength={100}
                    required
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full border border-transparent 
                        focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 
                        text-gray-900 placeholder-gray-500 transition-all duration-200"
                />
            </form>
        </>
    );
}