export default function AuthButtons({ user, onLogout, onShowLogin, onShowSignup }) {
  if (user) {
    return (
      <div>
        <button 
          onClick={onLogout} 
          className="w-full p-3 border border-gray-600 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-300/10 transition-all"
        >
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <button 
        onClick={onShowLogin} 
        className="w-full p-3 border border-gray-600 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-300/10 transition-all"
      >
        로그인
      </button>
      <button 
        onClick={onShowSignup} 
        className="w-full p-3 border border-gray-600 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-300/10 transition-all"
      >
        회원가입
      </button>
    </div>
  );
}