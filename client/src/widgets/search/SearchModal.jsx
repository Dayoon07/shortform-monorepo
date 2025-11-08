import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchModalBackButton, SearchModalCloseButton } from '../../icon/icon';
import { useSearchHistory } from '../../../features/search/hooks/useSearchHistory';
import { SearchInput } from '../../../features/search/components/SearchInput';
import { SearchHistoryList } from '../../../features/search/components/SearchHistoryList';
import { LoginPrompt } from '../../../features/search/components/LoginPrompt';

export default function SearchModal({ user, onClose }) {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const { searchHistory, isLoading, deleteSearchWord } = useSearchHistory(user?.id);

    const handleSearch = (e) => {
        e.preventDefault();
        const trimmedQuery = searchQuery.trim();
        if (!trimmedQuery) return;
        
        navigate(`/search?q=${trimmedQuery}`);
        onClose();
    };

    const handleSelectHistory = (word) => {
        navigate(`/search?q=${word}`);
        onClose();
    };

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]" 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-modal-title"
        >
            <div 
                className="bg-black/90 backdrop-blur-sm border-b border-white/30 px-4 py-3" 
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center py-2">
                    <SearchModalBackButton onClick={onClose} aria-label="뒤로 가기" />
                    <form onSubmit={handleSearch} className="relative w-full">
                        <SearchInput 
                            value={searchQuery} 
                            setValue={setSearchQuery}
                            onSubmit={handleSearch}
                        />
                    </form>
                    <SearchModalCloseButton onClick={onClose} aria-label="닫기" />
                </div>

                {user ? (
                    isLoading ? (
                        <div className="mt-4 text-center py-8">
                            <p className="text-white/70">로딩 중...</p>
                        </div>
                    ) : (
                        <SearchHistoryList
                            items={searchHistory}
                            onDelete={deleteSearchWord}
                            onSelect={handleSelectHistory}
                        />
                    )
                ) : (
                    <LoginPrompt onClose={onClose} />
                )}
            </div>
        </div>
    );
}