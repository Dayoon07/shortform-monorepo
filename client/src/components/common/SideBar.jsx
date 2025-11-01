import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import Navigation from "./Navigation";
import AuthButtons from "./AuthButtons";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

export default function SideBar({ user, searchWord }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleLogout = async () => {
    await fetch('/logout', { method: 'POST' });
    window.location.href = '/';
  };

  return (
    <>
      <aside className="max-md:hidden w-64 bg-black/50 backdrop-blur-sm flex flex-col px-3 py-6 space-y-4">
        <h1 className="text-3xl font-bold bg-gradient-to-t from-pink-500 to-sky-500 bg-clip-text text-transparent pl-2">
          <Link to="/">FlipFlop</Link>
        </h1>

        <SearchBar 
          initialValue={searchWord} 
          onSearch={handleSearch} 
        />

        <Navigation user={user} />

        <AuthButtons 
          user={user}
          onLogout={handleLogout}
          onShowLogin={() => setShowLoginModal(true)}
          onShowSignup={() => setShowSignupModal(true)}
        />
      </aside>

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
      {showSignupModal && <SignupModal onClose={() => setShowSignupModal(false)} />}
    </>
  );
}