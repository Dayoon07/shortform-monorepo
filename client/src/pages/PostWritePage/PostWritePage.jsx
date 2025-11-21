import { Navigate } from "react-router-dom";
import PostWriteForm from "../../features/post/components/ui/PostWriteForm";
import { useUser } from "../../shared/context/UserContext";
import { useDocTitle } from "../../shared/hooks/useDocTitle";
import { ROUTE } from "../../shared/constants/Route";

export default function PostWritePage() {
    useDocTitle('FlipFlop | 커뮤니티 작성');
    const { user } = useUser();

    if (!user) return <Navigate to={ROUTE.LOGINPLZ} replace />;

    return (
        <main className="flex-1 overflow-y-auto bg-black text-white">
            <PostWriteForm />
        </main>
    );
}