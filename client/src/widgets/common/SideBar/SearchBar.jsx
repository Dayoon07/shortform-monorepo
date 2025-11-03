import { useState } from "react";

export default function SearchBar({ initialValue = '', onSearch }) {
    const [searchQuery, setSearchQuery] = useState(initialValue);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchQuery);
    };

    return (
        <div style={{ marginTop: '25px' }}>
            <form onSubmit={handleSubmit} className="relative">
                <button 
                    type="submit" 
                    className="absolute top-2.5 left-2.5 p-0 bg-transparent border-none cursor-pointer"
                    aria-label="검색"
                >
                    <svg className="w-6 h-6 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    </svg>
                </button>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="검색"
                    maxLength="100"
                    className="w-full pl-10 pr-3 py-2 rounded-full bg-gray-900 text-white focus:outline-none focus:ring-2"
                    required
                />
                </form>
        </div>
    );
}