import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTE } from '../../../shared/constants/Route';
import { SearchIcon, UploadPageIcon, LikePageIcon } from '../../icon/icon';
import { REST_API_SERVER } from "../../../shared/constants/ApiServer";
import { useSearchWord } from "../../../shared/hooks/useSearchWord";
import { useUser } from '../../../features/user/hooks/useUsers';
import { CommunityPageIcon } from '../../icon/icon';

export function AppBar() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const searchWord = useSearchWord();
    const user = useUser();

    const handleLogout = async () => {
        await fetch('/logout', { method: 'POST' });
        window.location.href = '/';
    };

    return (
        <>
            <nav className="sticky top-0 left-0 bg-black/90 backdrop-blur-sm border-b border-gray-800 md:px-4 px-3 md:py-2 py-1 md:hidden z-[41] flex justify-between items-center">
                <h1 className="md:text-3xl text-2xl font-bold bg-gradient-to-t from-pink-500 to-sky-500 bg-clip-text text-transparent pl-2">
                    <Link to={ROUTE.HOMEPAGE}>FlipFlop</Link>
                </h1>

                {searchWord && (
                    <div>
                        <h1 className="text-white font-semibold">{searchWord}</h1>
                    </div>
                )}

                <div className="flex justify-around items-center">
                    <button
                        onClick={() => setShowSearchModal(true)}
                        className="nav-btn flex items-center space-x-3 p-3 hover:bg-gray-800/50 rounded-xl transition-colors group"
                    >
                        <SearchIcon />
                    </button>

                    {user && (
                        <div className="relative z-[91]">
                            <button onClick={() => setShowDropdown(!showDropdown)}
                                className="w-8 h-8 p-0.5 rounded-full bg-gradient-to-r from-pink-500 to-sky-500"
                            >
                                <img src={user.profileImgSrc} alt="Profile" className="w-full h-full object-cover rounded-full" />
                            </button>

                            {showDropdown && (
                                <div className="absolute right-0 top-14 bg-black border border-gray-700 rounded-md z-[91] w-[180px] text-left">
                                    <Link to={ROUTE.PROFILE(user.mention)} className="block w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 flex items-center">
                                        <img src={`${REST_API_SERVER}${user.profileImgSrc}`} alt="Profile" className="w-[26px] h-[26px] p-0.5 object-cover rounded-full mr-2 bg-gradient-to-r from-pink-500 to-sky-500" />
                                        내 채널 보기
                                    </Link>
                                    <Link to={ROUTE.STUDIO_UPLOAD} className="block w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 flex items-center">
                                        <UploadPageIcon />
                                        업로드
                                    </Link>
                                    <Link to={ROUTE.LIKES} className="block w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 flex items-center">
                                        <LikePageIcon />
                                        좋아요
                                    </Link>
                                    <Link to={ROUTE.STUDIO_POST_WRITE} className="block w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 flex items-center">
                                        <CommunityPageIcon />
                                        커뮤니티
                                    </Link>
                                    <button onClick={handleLogout} className="block w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 text-left flex items-center">
                                        <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="m16 17 5-5-5-5"/>
                                            <path d="M21 12H9"/>
                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                                        </svg>
                                        로그아웃
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </nav>

            {showSearchModal && <SearchModal user={user} onClose={() => setShowSearchModal(false)} />}
        </>
    );
}

// SearchModal Component
function SearchModal({ user, onClose }) {
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchSearchHistory();
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [user]);

  const fetchSearchHistory = async () => {
    try {
      const response = await fetch(`/api/user/search/list?id=${user.id}`);
      const data = await response.json();
      setSearchHistory(data.slice(0, 30));
    } catch (error) {
      console.error('Failed to fetch search history:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      onClose();
    }
  };

  const deleteSearchWord = async (id, searchWord) => {
    try {
      const response = await fetch('/api/search/list/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id, searchWord })
      });

      if (response.ok) {
        setSearchHistory(prev => prev.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete search word:', error);
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-white/20 backdrop-blur-md border-b border-white/30 px-4 px-3 py-2 py-1" style={{ zIndex: 777 }}>
      <div className="flex items-center py-2">
        <svg
          onClick={onClose}
          className="w-8 h-8 text-white cursor-pointer mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 20 20"
          style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>

        <form onSubmit={handleSearch} className="relative w-full">
          <button type="submit" className="absolute top-2.5 left-2.5 p-0 bg-transparent border-none cursor-pointer">
            <svg className="w-6 h-6 text-white/80 hover:text-white" fill="currentColor" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}>
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </button>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="검색"
            maxLength="100"
            className="w-full pl-10 pr-3 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/25"
            style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
            autoFocus
          />
        </form>

        <svg
          onClick={onClose}
          className="w-7 h-7 text-white cursor-pointer ml-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}
        >
          <path d="M18 6 6 18"/>
          <path d="m6 6 12 12"/>
        </svg>
      </div>

      {searchHistory.length > 0 && (
        <div className="mt-4">
          {searchHistory.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div
                className="py-2 pr-4 pl-12 cursor-pointer rounded-full hover:bg-black/70 hover:backdrop-blur-xs transition duration-300 flex-1"
                onClick={() => {
                  navigate(`/search?q=${item.searchedWord}`);
                  onClose();
                }}
              >
                {item.searchedWord}
              </div>
              <div
                className="cursor-pointer px-2 py-1 hover:bg-red-600 rounded text-white text-xl"
                onClick={() => deleteSearchWord(item.id, item.searchedWord)}
              >
                &times;
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}