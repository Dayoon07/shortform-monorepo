export function TryAgain({ errorMessage = "데이터를 불러오는 과정에서 실패했습니다" }) {
    return (
        <div className="mx-auto flex items-center justify-center h-96">
            <div className="text-center">
                <p className="text-red-400 mb-4">{errorMessage}</p>
                <button onClick={() => window.location.reload()} 
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                    다시 시도
                </button>
            </div>
        </div>
    )
}