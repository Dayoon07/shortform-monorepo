export function SearchHistoryList({ items, onDelete, onSelect }) {
    if (items.length === 0) {
        return (
            <div className="mt-4 text-center py-8">
                <p className="text-white/70">검색 기록이 없습니다</p>
            </div>
        );
    }

    return (
        <div className="mt-4 max-h-96 overflow-y-auto">
            <h3 
                id="search-modal-title" 
                className="text-white/70 text-sm mb-2 px-2"
            >
                최근 검색
            </h3>
            {items.map((item) => (
                <div 
                    key={item.id} 
                    className="flex justify-between items-center group"
                >
                    <button
                        type="button"
                        className="py-2 pr-4 pl-12 cursor-pointer rounded-full hover:bg-white/10 flex-1 text-left"
                        onClick={() => onSelect(item.searchedWord)}
                    >
                        <span className="text-white">{item.searchedWord}</span>
                    </button>
                    <button
                        type="button"
                        className="cursor-pointer px-3 py-1 hover:bg-red-600 rounded text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => onDelete(item.id, item.searchedWord)}
                        aria-label={`"${item.searchedWord}" 검색 기록 삭제`}
                    >
                        &times;
                    </button>
                </div>
            ))}
        </div>
    );
}