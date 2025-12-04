import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../../shared/constants/Route';
import { SearchModalBackButton, SearchModalCloseButton } from '../../../widgets/icon/icon';
import { useSearchHistory } from '../hooks/useSearchHistory';
import { Error } from '../../../shared/components/common/Error';
import { User } from '../../../entities/user/model/User';
import { SearchModalInput } from "./ui/SearchModalInput";
import { SearchModalHistoryList } from './ui/SearchModalHistoryList';
import { SearchModalLoginPrompt } from './ui/SearchModalLoginPrompt';

interface SearchModalProps {
    user: User | null,
    onClose: () => void
}

export default function SearchModal({ user, onClose }: SearchModalProps) {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const navigate = useNavigate();

    const {
        isLoading,
        error,
        deleteSearchWordHook,
        searchHistory
    } = useSearchHistory(user);

    const handleSearch = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const trimmedQuery = searchQuery.trim();
        if (!trimmedQuery) return;
        
        navigate(ROUTE.SEARCH_V2(trimmedQuery));
        onClose();
    };

    useEffect(() => {
        const handleEscape = (e: { key: string; }) => e.key === 'Escape' && onClose();
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
                        <SearchModalInput  
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
                        <SearchModalHistoryList 
                            items={searchHistory}
                            onDelete={deleteSearchWordHook}
                            onSelect={(word: string) => navigate(ROUTE.SEARCH_V2(word))}
                        />
                    ) : (
                        <div className="mt-4 text-center py-8">
                            <p className="text-white/70">검색 기록이 없습니다</p>
                        </div>
                    )
                ) : (
                    <SearchModalLoginPrompt onClose={onClose} />
                )}
            </div>
        </div>
    );
}
