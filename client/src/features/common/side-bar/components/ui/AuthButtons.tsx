import { User } from "../../../../../entities/user/model/User";

interface AuthButtonsProps {
    user: User | null,
    onLogout: () => void,
    onShowLogin: () => void,
    onShowSignup: () => void
}

export default function AuthButtons({
    user,
    onLogout,
    onShowLogin,
    onShowSignup
}: AuthButtonsProps) {
    const btnClassName = `
        sm:w-full max-sm:w-32 p-2 bg-black text-white font-semibold 
        rounded-lg transition-all hover:bg-gray-800/90
    `;
    if (user) {
        return <><button onClick={onLogout} className={btnClassName}>로그아웃</button></>
    }

    return (
        <div className="space-y-3">
            <button onClick={onShowLogin} className={btnClassName}>
                로그인
            </button>
            <button onClick={onShowSignup} className={btnClassName}>
                회원가입
            </button>
        </div>
    );
}