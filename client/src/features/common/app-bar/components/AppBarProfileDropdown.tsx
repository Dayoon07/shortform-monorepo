import { useRef, useState } from "react";
import { User } from "../../../../entities/user/model/User";
import { Link } from "react-router-dom";
import { ROUTE } from "../../../../shared/constants/Route";
import { CommunityPageIcon, LikePageIcon, UploadPageIcon } from "../../../../widgets/icon/icon";
import { LogOut } from "lucide-react";
import { Image } from "../../../../shared/components/common/custom/Image";
import { useSession } from "../../../../shared/hooks/user/useSession";

export const AppBarProfileDropdown = ({ user }: { user: User | null }) => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const dropdownItem = `block w-full px-4 py-2 text-black 
        hover:bg-gray-300/50 z-[91] 
        flex items-center space-x-2`;
    const { logoutHook } = useSession();
        
    // useEffect(() => {
    //     function handleClickOutside(event: { target: any | null; }): void {
    //         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    //             setShowDropdown(false);
    //         }
    //     }
    //     if (showDropdown) document.addEventListener('mousedown', handleClickOutside);
    //     return () => document.removeEventListener('mousedown', handleClickOutside);
    // }, [showDropdown]);

    return (
        <>
            {user ? (
                <div className="relative z-[91]" ref={dropdownRef}>
                    <button 
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="w-8 h-8 p-0.5 rounded-full bg-gradient-to-r from-pink-500 
                            to-sky-500 hover:opacity-80 transition-opacity"
                        aria-label="프로필 메뉴" 
                        aria-expanded={showDropdown}
                    >
                        <Image 
                            url={user.profileImgSrc}
                            alt={user.username + "의 프로필"}
                            social={user.social}
                            className="w-full h-full object-cover rounded-full"
                        />
                    </button>

                    {showDropdown && (
                        <div className="absolute right-0 top-14 bg-white border 
                            rounded-md z-[91] w-[180px] text-left shadow-lg"
                        >
                            <Link
                                to={ROUTE.PROFILE(user.mention)} 
                                onClick={() => setShowDropdown(false)} 
                                className="block w-full px-4 py-2 text-black hover:bg-gray-300/50 flex items-center transition-colors"
                            >
                                <Image 
                                    url={user.profileImgSrc}
                                    alt={user.username + "의 프로필"}
                                    social={user.social}
                                    className="w-[26px] h-[26px] p-0.5 object-cover 
                                        rounded-full mr-2 bg-gradient-to-r from-pink-500 to-sky-500"
                                />
                                <span>내 프로필</span>
                            </Link>
                            <Link 
                                to={ROUTE.STUDIO_UPLOAD} 
                                className={dropdownItem} 
                                onClick={() => setShowDropdown(false)}
                            >
                                <UploadPageIcon />
                                <span>업로드</span>
                            </Link>
                            <Link 
                                to={ROUTE.LIKES} 
                                className={dropdownItem} onClick={() => setShowDropdown(false)}
                            >
                                <LikePageIcon />
                                <span>좋아요</span>
                            </Link>
                            <Link 
                                to={ROUTE.STUDIO_POST_WRITE} 
                                className={dropdownItem}
                                onClick={() => setShowDropdown(false)}
                            >
                                <CommunityPageIcon />
                                <span>커뮤니티</span>
                            </Link>
                            <button 
                                onClick={logoutHook}
                                className={dropdownItem}
                            >
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
        </>
    );
}