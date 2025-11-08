import { Link } from "react-router-dom";
import { ROUTE } from "../../../shared/constants/Route";

export function LoginPrompt({ onClose }) {
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