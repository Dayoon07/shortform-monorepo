import { Link } from "react-router-dom";
import { ROUTE } from "../../../../shared/constants/Route";
import React from "react";

export const SearchModalLoginPrompt: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const c = `inline-block px-6 py-2 rounded-full 
        font-semibold hover:opacity-80 transition-opacity`;
    return (
        <div className="mt-4 text-center py-8">
            <p className="text-black/70 mb-4">로그인 시 검색 기록을 저장할 수 있어요</p>
            <Link to={ROUTE.LOGINPLZ} className={c} onClick={onClose}>
                로그인하기
            </Link>
        </div>
    );
}