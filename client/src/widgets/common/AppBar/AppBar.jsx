import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTE } from '../../../shared/constants/Route';
import { SearchIcon, UploadPageIcon, LikePageIcon, CommunityPageIcon } from '../../icon/icon';
import { REST_API_SERVER } from "../../../shared/constants/ApiServer";
import { useUser } from '../../../shared/context/UserContext';
import { logout } from "../../../features/user/api/userService";
import SearchModal from './SearchModal';
import { LogOut } from 'lucide-react';
import { useClickSound } from '../../../shared/hooks/useClickSound';
import { showSuccessToast } from '../../../shared/utils/toast';

export default function AppBar() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const { user, setUser } = useUser();
    const dropdownRef = useRef(null);
    const handlePlayClickSound = useClickSound("/mp3/click.mp3");
    const navigate = useNavigate();
    const dropdownItem = `block w-full px-4 py-2 text-gray-300 
        hover:text-white hover:bg-gray-700/50 z-[91] 
        flex items-center space-x-2
    `;
    const nav = `sticky top-0 left-0 bg-black/90 backdrop-blur-sm border-b 
        border-gray-800 md:px-4 px-3 md:py-2 py-1 md:hidden 
        z-[41] flex justify-between items-center
    `;

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
        navigate("/");
        showSuccessToast("로그아웃 되었습니다.");
    }

    return (
        <>
            <nav className={nav}>
                <h1 className="md:text-3xl text-2xl font-bold bg-gradient-to-t from-pink-500 to-sky-500 bg-clip-text text-transparent pl-2">
                    <Link to={ROUTE.HOMEPAGE}>FlipFlop</Link>
                </h1>

                <div className="flex justify-around items-center gap-2">
                    <button
                        onClick={() => {
                            setShowSearchModal(true);
                            handlePlayClickSound();
                        }}
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
                                    <Link to={ROUTE.PROFILE(user.mention)} onClick={() => setShowDropdown(false)} 
                                        className="block w-full px-4 py-2 text-gray-300 hover:text-white 
                                        hover:bg-gray-700/50 flex items-center transition-colors"
                                    >
                                        <img src={`${REST_API_SERVER}${user.profileImgSrc}`} alt="..." 
                                            className="w-[26px] h-[26px] p-0.5 object-cover 
                                            rounded-full mr-2 bg-gradient-to-r from-pink-500 to-sky-500" 
                                        />
                                        <span>내 채널 보기</span>
                                    </Link>
                                    <Link to={ROUTE.STUDIO_UPLOAD} className={dropdownItem} onClick={() => setShowDropdown(false)}>
                                        <UploadPageIcon />
                                        <span>업로드</span>
                                    </Link>
                                    <Link to={ROUTE.LIKES} className={dropdownItem} onClick={() => setShowDropdown(false)}>
                                        <LikePageIcon />
                                        <span>좋아요</span>
                                    </Link>
                                    <Link to={ROUTE.STUDIO_POST_WRITE} className={dropdownItem} onClick={() => setShowDropdown(false)}>
                                        <CommunityPageIcon />
                                        <span>커뮤니티</span>
                                    </Link>
                                    <button onClick={handleLogout} className={dropdownItem}>
                                        <LogOut className="w-6 h-6" />
                                        <span>로그아웃</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to={ROUTE.LOGINPLZ} className="px-4 py-2 bg-gradient-to-r from-pink-500 to-sky-500 
                            rounded-full text-white font-semibold hover:opacity-80 transition-opacity text-sm"
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
