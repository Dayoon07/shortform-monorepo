import FollowingList from "../../widgets/follow/FollowingList";
import { useFollow } from "../../features/follow/hooks/useFollow";
import { useUser } from "../../shared/context/UserContext";
import { Loading } from "../../shared/components/common/Loading";
import { Error } from "../../shared/components/common/Error";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../shared/constants/Route";
// import { useEffect } from "react"; // useEffect 제거

export default function FollowingPage() {
    const { user } = useUser();
    const navigate = useNavigate();
    const { 
        followings, 
        error, 
        loading,
    } = useFollow(user);

    if (!user) {
        navigate(ROUTE.LOGINPLZ);
        return;
    }
    
    if (loading) return <Loading />;
    if (error) return <Error />;

    return (
        <div className="min-h-screen overflow-hidden w-full">
            <main className="flex-1 overflow-y-auto">
                <section className="p-4 md:p-6 lg:p-8 pb-48">
                    <FollowingList followings={followings} />
                </section>
            </main>
        </div>
    );
}