export function Error({ message = "오류가 발생했습니다." }) {
    return <div className="text-red-500 text-center">{message}</div>;
}
