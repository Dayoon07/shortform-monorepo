import { FollowingUserEmptyStateIcon } from "../../../shared/utils/icon/icon";

const DIV1 = "max-sm:w-[200px] mx-auto mt-32 text-center";
const DIV2 = "w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-8";
const T1 = "text-gray-400 text-sm md:text-base mb-8 max-w-md px-4 mx-auto";

export const EmptyState = () => {
    return (
        <div className={DIV1}>
            <div className={DIV2}><FollowingUserEmptyStateIcon /></div>
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
                아직 팔로잉한 <br className="hidden max-md:block" /> 사람이 없습니다
            </h2>
            <p className={T1}>다른 사람들과 소통하고 <br /> 팔로워를 늘려보세요!</p>
        </div>
    );
}