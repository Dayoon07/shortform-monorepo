import { createContext, useContext, useState, useEffect, useCallback } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            const saved = localStorage.getItem("user");
            return saved ? JSON.parse(saved) : null;
        } catch (error) {
            console.error('Failed to parse user data:', error);
            localStorage.removeItem("user");
            return null;
        }
    });

    const [loading, setLoading] = useState(true);

    // 사용자 정보 업데이트
    const updateUser = useCallback((newUser) => {
        setUser(newUser);
    }, []);

    // 로그아웃
    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem("user");
    }, []);

    // localStorage 동기화
    useEffect(() => {
        if (user) {
            try {
                localStorage.setItem("user", JSON.stringify(user));
            } catch (error) {
                console.error('Failed to save user data:', error);
            }
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    // 사용자 세션 검증 (선택적)
    useEffect(() => {
        const validateSession = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                // 서버에 세션 유효성 검증 요청
                // 이 부분은 실제 API 엔드포인트에 맞게 수정 필요
                /*
                const response = await fetch('/api/user/validate', {
                    method: 'GET',
                    credentials: 'include'
                });

                if (!response.ok) {
                    // 세션이 만료되었거나 유효하지 않음
                    logout();
                }
                */
            } catch (error) {
                console.error('Session validation failed:', error);
                // 네트워크 오류 시 일단 유지
            } finally {
                setLoading(false);
            }
        };

        validateSession();
    }, [user, logout]);

    // 다른 탭에서의 로그인/로그아웃 감지
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'user') {
                if (e.newValue) {
                    try {
                        setUser(JSON.parse(e.newValue));
                    } catch (error) {
                        console.error('Failed to parse user data from storage event:', error);
                    }
                } else {
                    setUser(null);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const value = {
        user,
        setUser: updateUser,
        logout,
        loading,
        isAuthenticated: !!user
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    
    return context;
}

/** 로그인 필요 여부 체크 훅 */
export function useRequireAuth() {
    const { user, loading } = useUser();
    
    return {
        isAuthenticated: !!user,
        isLoading: loading,
        user
    };
}