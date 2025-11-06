import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../../shared/constants/Route';
import { SearchIcon, UploadPageIcon, LikePageIcon, CommunityPageIcon } from '../../icon/icon';
import { REST_API_SERVER } from "../../../shared/constants/ApiServer";
import { useUser } from '../../../shared/context/UserContext';
import { logout } from "../../../features/user/api/userService";
import SearchModal from './SearchModal';

export default function AppBar() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const { user, setUser } = useUser();
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        if (showDropdown) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showDropdown]);

    const handleLogout = async () => {
        await logout();
        setUser(null); // <- 이거 없으면 로컬 스토리지 안 지워짐
    }

    return (
        <>
            <nav className="sticky top-0 left-0 bg-black/90 backdrop-blur-sm border-b border-gray-800 
                md:px-4 px-3 md:py-2 py-1 md:hidden z-[41] flex justify-between items-center"
            >
                <h1 className="md:text-3xl text-2xl font-bold bg-gradient-to-t from-pink-500 to-sky-500 bg-clip-text text-transparent pl-2">
                    <Link to={ROUTE.HOMEPAGE}>FlipFlop</Link>
                </h1>

                <div className="flex justify-around items-center gap-2">
                    {/* 검색 버튼 */}
                    <button
                        onClick={() => setShowSearchModal(true)}
                        className="nav-btn flex items-center space-x-3 p-3 hover:bg-gray-800/50 rounded-xl transition-colors group"
                        aria-label="검색"
                    >
                        <SearchIcon />
                    </button>

                    {user ? (
                        <div className="relative z-[91]" ref={dropdownRef}>
                            <button 
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="w-8 h-8 p-0.5 rounded-full bg-gradient-to-r from-pink-500 to-sky-500 hover:opacity-80 transition-opacity"
                                aria-label="프로필 메뉴"
                                aria-expanded={showDropdown}
                            >
                                <img 
                                    src={`${REST_API_SERVER}${user.profileImgSrc}`} 
                                    alt={`${user.username}의 프로필`}
                                    className="w-full h-full object-cover rounded-full" 
                                />
                            </button>

                            {showDropdown && (
                                <div className="absolute right-0 top-14 bg-black border border-gray-700 rounded-md z-[91] w-[180px] text-left shadow-lg">
                                    <Link to={ROUTE.PROFILE(user.mention)} className="block w-full px-4 py-2 text-gray-300 hover:text-white 
                                        hover:bg-gray-700/50 flex items-center transition-colors"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        <img src={`${REST_API_SERVER}${user.profileImgSrc}`} alt="..." className="w-[26px] h-[26px] p-0.5 object-cover 
                                            rounded-full mr-2 bg-gradient-to-r from-pink-500 to-sky-500" 
                                        />
                                        내 채널 보기
                                    </Link>
                                    <Link to={ROUTE.STUDIO_UPLOAD} className="dropdown-item" onClick={() => setShowDropdown(false)}>
                                        <UploadPageIcon /> 업로드
                                    </Link>
                                    <Link to={ROUTE.LIKES} className="dropdown-item" onClick={() => setShowDropdown(false)}>
                                        <LikePageIcon /> 좋아요
                                    </Link>
                                    <Link to={ROUTE.STUDIO_POST_WRITE} className="dropdown-item" onClick={() => setShowDropdown(false)}>
                                        <CommunityPageIcon /> 커뮤니티
                                    </Link>
                                    <button onClick={handleLogout} className="dropdown-item text-left">
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
                    ) : (
                        <Link to={ROUTE.LOGINPLZ} className="px-4 py-2 bg-gradient-to-r from-pink-500 to-sky-500 rounded-full text-white 
                            font-semibold hover:opacity-80 transition-opacity text-sm"
                        >
                            로그인
                        </Link>
                    )}
                </div>
            </nav>

            {showSearchModal && (
                <SearchModal user={user} onClose={() => setShowSearchModal(false)} />
            )}
        </>
    );
}
