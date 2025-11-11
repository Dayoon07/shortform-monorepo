import PostWriteForm from "../../features/post/components/ui/PostWriteForm";
import { useDocTitle } from "../../shared/hooks/useDocTitle";

export default function PostWritePage() {
    useDocTitle('FlipFlop | 커뮤니티 작성');

    return (
        <main className="flex-1 overflow-y-auto bg-black text-white">
            <PostWriteForm />
        </main>
    );
}