import { useNavigate } from "react-router-dom";
import PostWriteForm from "../../features/post/components/ui/PostWriteForm";
import { useUser } from "../../shared/context/UserContext";
import { useDocTitle } from "../../shared/hooks/useDocTitle";
import { useEffect } from "react";
import { ROUTE } from "../../shared/constants/Route";

export default function PostWritePage() {
    useDocTitle('FlipFlop | 커뮤니티 작성');
    const navigate = useNavigate();
    const { user } = useUser();

    useEffect(() => {
        if (!user) navigate(ROUTE.LOGINPLZ);
    }, [user, navigate]);

    return (
        <main className="flex-1 overflow-y-auto bg-black text-white">
            <PostWriteForm />
        </main>
    );
}