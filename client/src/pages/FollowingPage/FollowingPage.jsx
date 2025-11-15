import FollowingList from "../../widgets/follow/FollowingList";
import { useFollow } from "../../features/follow/hooks/useFollow";
import { useUser } from "../../shared/context/UserContext";
import { Loading } from "../../shared/components/Loading";
import { Error } from "../../shared/components/Error";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function FollowingPage() {
    const navigate = useNavigate();
    const { user } = useUser();
    const { 
        followings, 
        error, 
        loading,
    } = useFollow(user.id);

    useEffect(() => {
        if (!user) navigate("/loginplz");
    }, [user, navigate]);

    if (loading) return <Loading />;
    if (error) return <Error />;

    return (
        <div className="bg-black text-white min-h-screen overflow-hidden w-full">
            <main className="flex-1 overflow-y-auto">
                <section className="p-4 md:p-6 lg:p-8 pb-48">
                    <FollowingList followings={followings} />
                </section>
            </main>
        </div>
    );
};