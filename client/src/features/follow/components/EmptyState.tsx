import { JSX } from "react";
import { FollowingUserEmptyState } from "../../../widgets/icon/icon";

export const EmptyState = (): JSX.Element => {
    return (
        <div className="max-sm:w-[200px] mx-auto mt-32 text-center">
            <div className="w-24 h-24 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-8">
                <FollowingUserEmptyState />
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
                아직 팔로잉한 <br className="hidden max-md:block" /> 사람이 없습니다
            </h2>
            <p className="text-gray-400 text-sm md:text-base mb-8 max-w-md px-4 mx-auto">
                다른 사람들과 소통하고 <br /> 팔로워를 늘려보세요!
            </p>
        </div>
    );
}