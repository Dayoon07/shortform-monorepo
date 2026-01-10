import React, { useState } from "react";
import { Image } from "../../../../shared/components/common/custom/Image";
import { User } from "../../../../entities/user/model/User";

interface DetailCommentProps {
    user: User,
    onSubmit: () => void
}

export const DetailComment: React.FC<DetailCommentProps> = ({
    user, onSubmit
}) => {
    const [commentText, setCommentText] = useState<string>("");
    return (
        <>
            <div className="p-4">
                <div className="flex space-x-3">
                    <Image 
                        url={user.profileImgSrc}
                        social={user.social}
                        provider={user.provider}
                        alt="profile"
                        style={{ background: "linear-gradient(to right, #ec4899, #0ea5e9)" }}
                        className="w-10 h-10 p-0.5 rounded-full object-cover"
                    />

                    <div className="flex-1 flex space-x-2 items-center">
                        <textarea className="flex-1 bg-gray-200 px-3 py-2 h-[40px] rounded-full text-sm focus:outline-none 
                            focus:ring-2 focus:ring-blue-500 resize-none"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="댓글을 입력하세요..."
                        ></textarea>

                        <button className="px-4 py-2 rounded-full text-sm bg-black text-white transition-all duration-200 transform hover:scale-105"
                            onClick={() => {
                                if (commentText.trim() === "") return;
                                onSubmit();
                                setCommentText("");
                            }}
                        >
                            전송
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}