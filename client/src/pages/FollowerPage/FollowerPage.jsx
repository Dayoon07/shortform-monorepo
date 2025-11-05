import { useEffect, useState } from "react";
import FollowerList from "../../widgets/follow/FollowerList";
import { useFollowers } from "../../features/follow/hooks/useFollowers";
import { Link } from "react-router-dom";
import { ROUTE } from "../../shared/constants/Route";
import { useUser } from "../../shared/context/UserContext";

 export default function FollowerPage() {
    const { user } = useUser();
    const [userId, setUserId] = useState(null);
    const { followers, loading, error, handleToggleFollow } = useFollowers(user.id);

    useEffect(() => {
        if (user && user.id) setUserId(user.id);
    }, []);

    if (!user.id) {
        return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="text-center">
                <p className="text-white text-xl mb-4">로그인이 필요합니다</p>
                <Link to={ROUTE.LOGINPLZ} className="text-blue-400 hover:text-blue-300">
                    로그인하러 가기
                </Link>
            </div>
        </div>
        );
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="text-center">
                <p className="text-red-500 text-xl mb-4">오류가 발생했습니다</p>
                <p className="text-gray-400">{error}</p>
            </div>
        </div>
        );
    }

    return (
        <div className="bg-black text-white min-h-screen overflow-hidden">
        <main className="flex-1 overflow-y-auto">
            <section className="p-4 md:p-6 lg:p-8 pb-48">
            <FollowerList followers={followers} onToggleFollow={handleToggleFollow} />
            </section>
        </main>

        <style>{`
            main::-webkit-scrollbar {
            width: 8px;
            }
            main::-webkit-scrollbar-track {
            background: rgba(55, 65, 81, 0.3);
            }
            main::-webkit-scrollbar-thumb {
            background: rgba(107, 114, 128, 0.6);
            border-radius: 4px;
            }
            main::-webkit-scrollbar-thumb:hover {
            background: rgba(107, 114, 128, 0.8);
            }
            * {
            transition: all 0.2s ease-in-out;
            }
            .hover\\:shadow-blue-500\\/10:hover {
            box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.1);
            }
        `}</style>
    </div>
    );
};