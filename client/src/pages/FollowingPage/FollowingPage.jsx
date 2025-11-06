import FollowerList from "../../widgets/follow/FollowerList";
import { useFollow } from "../../features/follow/hooks/useFollow";
import { useUser } from "../../shared/context/UserContext";
import { Loading } from "../../shared/components/Loading";
import { Error } from "../../shared/components/Error";
import { useNavigate } from "react-router-dom";

export default function FollowingPage() {
    const { user } = useUser();
    const { followers, loading, error, handleToggleFollow } = useFollow(user.id);
    const navigate = useNavigate();

    if (!user.id) {
        navigate("/loginplz");
    }

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <Error />
    }

    return (
        <div className="bg-black text-white min-h-screen overflow-hidden">
            <main className="flex-1 overflow-y-auto">
                <section className="p-4 md:p-6 lg:p-8 pb-48">
                    <FollowerList followers={followers} onToggleFollow={handleToggleFollow} />
                </section>
            </main>

            <style>
                {`
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
                `}
            </style>
    </div>
    );
};