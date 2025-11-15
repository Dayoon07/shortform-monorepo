import { X } from "lucide-react";
import { REST_API_SERVER } from "../../../../shared/constants/ApiServer";

export const FollowRelationModal = ({
    isOpen,
    onClose,
    title,
    users = [],
    onToggleFollow,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" 
            onClick={onClose}
        >
            <div onClick={(e) => e.stopPropagation()} className="bg-white md:rounded-xl 
                shadow-xl w-full h-full md:w-[450px] md:h-[500px] mx-auto md:max-w-md flex flex-col"
            >
                <div className="flex items-center justify-between py-3 px-4 border-b">
                    <div style={{ "width": 24 }}></div>
                    <h2 className="text-lg font-semibold text-black text-center flex-1">
                        {title}
                    </h2>
                    <button type="button" onClick={onClose} className="text-black text-3xl leading-none">
                        <X />
                    </button>
                </div>

                <ul className="divide-y divide-gray-200 overflow-y-auto flex-1">
                    {users.map((u) => (
                        <li key={u.id || u.mention} className="flex items-center justify-between p-4">
                            <div className="flex items-center space-x-3">
                                <img src={`${REST_API_SERVER}${u.profileImgSrc}`} alt={u.username}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold text-black">
                                        {u.username}
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                        @{u.mention}
                                    </p>
                                </div>
                            </div>

                            <button onClick={() => onToggleFollow(u)} 
                                className={`text-sm px-4 py-1 rounded-md font-medium border ${
                                    u.isFollowing
                                    ? "bg-gray-100 text-black border-gray-300"
                                    : "bg-blue-500 text-white border-blue-500"
                                }`}
                            >
                                {u.isFollowing ? "Following" : "Follow"}
                            </button>
                        </li>
                    ))}

                    {users.length === 0 && (
                        <div className="flex justify-center items-center h-full text-gray-500">
                            표시할 유저가 없습니다.
                        </div>
                    )}
                </ul>
            </div>
        </div>
    );
};
