export function SearchInput({ value, setValue, onSubmit }) {
    return (
        <>
            <button 
                type="submit" 
                className="absolute top-2.5 left-2.5 p-0 bg-transparent border-none cursor-pointer"
                aria-label="검색"
            >
                <svg 
                    className="w-6 h-6 text-white/80 hover:text-white transition-colors" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5z"/>
                </svg>
            </button>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="검색"
                maxLength={100}
                autoFocus
                aria-label="검색어 입력"
                className="w-full pl-10 pr-3 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white 
                    placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/25"
            />
        </>
    );
}