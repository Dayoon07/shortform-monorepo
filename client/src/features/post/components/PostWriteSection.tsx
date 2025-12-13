import { PostWriteForm } from "./ui/PostWriteForm";

export default function PostWriteSection() {
    return (
        <section className="max-w-4xl mx-auto px-6 md:py-16 max-md:py-6 max-md:pb-[100px]">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">커뮤니티 글 작성</h1>
                <p className="text-gray-400">사람들과 생각을 공유해보세요</p>
            </div>
            <PostWriteForm />
        </section>
    );
}