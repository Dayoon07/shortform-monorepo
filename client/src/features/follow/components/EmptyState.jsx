export const EmptyState = () => {
    return (
        <div className="max-sm:w-[200px] ml-20 mx-auto mt-20 text-center">
            <div className="w-24 h-24 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-8">
                <svg className="w-12 h-12 md:w-16 md:h-16 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
                아직 팔로워가 없어요
            </h2>
            <p className="text-gray-400 text-sm md:text-base mb-8 max-w-md px-4">
                다른 사람들과 소통하고 <br /> 팔로워를 늘려보세요!
            </p>
        </div>
    );
}