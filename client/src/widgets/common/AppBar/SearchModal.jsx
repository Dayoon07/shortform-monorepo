import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTE } from '../../../shared/constants/Route';
import { SearchIcon, SearchModalBackButton, SearchModalCloseButton } from '../../icon/icon';
import { X } from 'lucide-react';
import { useSearchHistory } from '../../../features/search/hooks/useSearchHistory';
import { Error } from '../../../shared/components/Error';

export default function SearchModal({ user, onClose }) {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const {
        isLoading,
        error,
        deleteSearchWordHook,
        searchHistory
    } = useSearchHistory(user.id);

    const handleSearch = (e) => {
        e.preventDefault();
        const trimmedQuery = searchQuery.trim();
        if (!trimmedQuery) return;
        
        navigate(ROUTE.DYNAMIC_SEARCH_ROUTE(trimmedQuery));
        onClose();
    };

    useEffect(() => {
        const handleEscape = (e) => e.key === 'Escape' && onClose();
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    if (error) return <Error message={error} />

    return (
        <div 
            className="fixed inset-0 bg-black/80 z-[100]" 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-modal-title"
        >
            <div 
                className="bg-black/90 border-b border-white/30 px-4 py-3" 
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center py-2">
                    <SearchModalBackButton onClick={onClose} aria-label="뒤로 가기" />
                    <form onSubmit={handleSearch} className="relative w-full">
                        <SearchInput 
                            value={searchQuery} 
                            setValue={setSearchQuery}
                        />
                    </form>
                    <SearchModalCloseButton onClick={onClose} aria-label="닫기" />
                </div>

                {user ? (
                    isLoading ? (
                        <div className="mt-4 text-center py-8">
                            <p className="text-white/70">로딩 중...</p>
                        </div>
                    ) : searchHistory.length > 0 ? (
                        <SearchHistoryList
                            items={searchHistory}
                            onDelete={deleteSearchWordHook}
                            onSelect={(word) => navigate(ROUTE.DYNAMIC_SEARCH_ROUTE(word))}
                        />
                    ) : (
                        <div className="mt-4 text-center py-8">
                            <p className="text-white/70">검색 기록이 없습니다</p>
                        </div>
                    )
                ) : (
                    <LoginPrompt onClose={onClose} />
                )}
            </div>
        </div>
    );
}

function SearchInput({ value, setValue }) {
    return (
        <>
            <button 
                type="submit" 
                className="absolute top-2.5 left-2.5 p-0 bg-transparent border-none cursor-pointer"
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
                className="w-full pl-10 pr-3 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white 
                    placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/25"
            />
        </>
    );
}

function SearchHistoryList({ items, onDelete, onSelect }) {
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
                        <X />
                    </button>
                </div>
            ))}
        </div>
    );
}

function LoginPrompt({ onClose }) {
    return (
        <div className="mt-4 text-center py-8">
            <p className="text-white/70 mb-4">로그인하면 검색 기록을 저장할 수 있어요</p>
            <Link
                to={ROUTE.LOGINPLZ}
                className="inline-block px-6 py-2 bg-gradient-to-r from-pink-500 to-sky-500 rounded-full text-white font-semibold hover:opacity-80 transition-opacity"
                onClick={onClose}
            >
                로그인하기
            </Link>
        </div>
    );
}