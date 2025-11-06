export function Loading({ message = "로딩 중..." }) {
    return (
        <div className="flex items-center justify-center h-96">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-gray-400">{message}</p>
            </div>
        </div>
    );
}