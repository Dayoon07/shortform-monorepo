import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTE } from '../../../shared/constants/Route';
import { REST_API_SERVER } from "../../../shared/constants/ApiServer";
import { SearchModalBackButton, SearchModalCloseButton } from '../../icon/icon';

export default function SearchModal({ user, onClose }) {
    const [searchHistory, setSearchHistory] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (user) fetchSearchHistory();

        const handleEscape = (e) => e.key === 'Escape' && onClose();
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [user, onClose]);

    const fetchSearchHistory = async () => {
        try {
            const res = await fetch(`${REST_API_SERVER}/api/user/search/list?id=${user.id}`);
            if (res.ok) {
                const data = await res.json();
                setSearchHistory(data.slice(0, 30));
            }
        } catch (err) {
            console.error('Failed to fetch search history:', err);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        navigate(`${ROUTE.SEARCH}?q=${searchQuery}`);
        onClose();
    };

    const deleteSearchWord = async (id, searchWord) => {
        try {
            const res = await fetch(`${REST_API_SERVER}/api/search/list/delete`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: user.id, searchWord }),
            });
            if (res.ok) setSearchHistory(prev => prev.filter(item => item.id !== id));
        } catch (err) {
            console.error('Failed to delete search word:', err);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]" onClick={onClose}>
            <div className="bg-black/90 backdrop-blur-sm border-b border-white/30 px-4 py-3" onClick={(e) => e.stopPropagation()}>

                <div className="flex items-center py-2">
                    <SearchModalBackButton onClick={onClose} />
                    <form onSubmit={handleSearch} className="relative w-full">
                        <SearchInput value={searchQuery} setValue={setSearchQuery} />
                    </form>
                    <SearchModalCloseButton onClick={onClose} />
                </div>

                {user ? (
                    searchHistory.length > 0 ? (
                        <SearchHistoryList
                            items={searchHistory}
                            onDelete={deleteSearchWord}
                            onSelect={(word) => {
                                navigate(ROUTE.SEARCH(word));
                                onClose();
                            }}
                        />
                    ) : null
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
            <button type="submit" className="absolute top-2.5 left-2.5 p-0 bg-transparent border-none cursor-pointer">
                <svg className="w-6 h-6 text-white/80 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
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
                className="w-full pl-10 pr-3 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white 
                    placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/25"
            />
        </>
    );
}

function SearchHistoryList({ items, onDelete, onSelect }) {
    return (
        <div className="mt-4 max-h-96 overflow-y-auto">
            <h3 className="text-white/70 text-sm mb-2 px-2">최근 검색</h3>
            {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center group">
                    <div
                        className="py-2 pr-4 pl-12 cursor-pointer rounded-full hover:bg-white/10 flex-1"
                        onClick={() => onSelect(item.searchedWord)}
                    >
                        <span className="text-white">{item.searchedWord}</span>
                    </div>
                    <button
                        className="cursor-pointer px-3 py-1 hover:bg-red-600 rounded text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => onDelete(item.id, item.searchedWord)}
                    >
                        &times;
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
