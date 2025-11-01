import { Link } from "react-router-dom";
import NavItem from "./NavItem";

const NAV_ITEMS = [
  {
    to: "/",
    label: "홈",
    icon: (
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    )
  },
  {
    to: "/explore",
    label: "추천",
    icon: (
      <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
    )
  },
  {
    to: "/likes",
    label: "좋아요",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
    ),
    stroke: true
  },
  {
    to: "/following",
    label: "팔로잉",
    icon: (
      <path d="M18.99 3a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm0 4a6 6 0 1 0 0 12.00A6 6 0 0 0 19 7ZM18.99 26c2.96 0 5.6.58 7.87 1.65l-3.07 3.06a15.38 15.38 0 0 0-4.8-.71C10.9 30 6.3 35.16 6 43c-.02.55-.46 1-1.02 1h-2c-.55 0-1-.45-.98-1C2.33 32.99 8.7 26 19 26ZM35.7 41.88 31.82 38H45a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H31.82l3.88-3.88a1 1 0 0 0 0-1.41l-1.41-1.42a1 1 0 0 0-1.42 0l-7.3 7.3a2 2 0 0 0 0 2.82l7.3 7.3a1 1 0 0 0 1.42 0l1.41-1.42a1 1 0 0 0 0-1.41Z"/>
    ),
    viewBox: "0 0 48 48"
  },
  {
    to: "/studio/upload",
    label: "업로드",
    icon: (
      <path d="M25 15a1 1 0 0 1 1 1v6h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-6v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-6h-6a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h6v-6a1 1 0 0 1 1-1h2Z"/>
    ),
    viewBox: "0 0 48 48"
  },
  {
    to: "/studio/post/write",
    label: "커뮤니티",
    icon: (
      <>
        <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>
      </>
    ),
    stroke: true,
    strokeWidth: "2"
  }
];

export default function Navigation({ user }) {
  return (
    <nav className="flex flex-col space-y-2">
      {NAV_ITEMS.map((item) => (
        <NavItem key={item.to} {...item} />
      ))}
      
      {user && (
        <Link 
          to={`/@${user.mention}`} 
          className="nav-btn flex items-center space-x-3 p-3 hover:bg-gray-800/50 rounded-xl transition-colors group"
        >
          <img 
            src={user.profileImgSrc} 
            alt="Profile" 
            className="w-6 h-6 rounded-full" 
          />
          <span className="font-medium">프로필</span>
        </Link>
      )}
    </nav>
  );
}