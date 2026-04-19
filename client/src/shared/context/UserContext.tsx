import { User } from "../../entities/user/model/User";
import { 
    createContext, 
    useContext, 
    useState, 
    useEffect, 
    useCallback,
    ReactNode,
    FC
} from "react";
import { showErrorToast } from "../utils/toast";

// ----------------------------------------------------
// 1. Context 타입 정의
// ----------------------------------------------------

interface UserContextType {
    user: User | null;
    setUser: (newUser: User | null) => void;
    logout: () => void;
    loading: boolean;
    isAuthenticated: boolean;
    accessTkn: string | null;
    accessTknType: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// ----------------------------------------------------
// 2. Provider 컴포넌트
// ----------------------------------------------------

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        try {
            const saved = localStorage.getItem("user");
            return saved ? (JSON.parse(saved) as User) : null;
        } catch (error) {
            console.error('사용자 정보 JSON 파싱 실패:', error);
            localStorage.removeItem("user");
            return null;
        }
    });

    const [loading, setLoading] = useState<boolean>(true);

    const updateUser = useCallback((newUser: User | null) => {
        setUser(newUser);
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("accessTkn");
        localStorage.removeItem("accessTknType");
    }, []);

    const accessTkn = localStorage.getItem("accessTkn");
    const accessTknType = localStorage.getItem("accessTknType");

    useEffect(() => {
        if (user) {
            try {
                localStorage.setItem("user", JSON.stringify(user));
            } catch (error) {
                console.error('사용자 정보 저장 실패:', error);
            }
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    useEffect(() => {
        const validateSession = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                // 서버 세션 검증 로직 (생략)
            } catch (error) {
                console.error('Session validation failed:', error);
            } finally {
                setLoading(false);
            }
        };

        validateSession();
    }, [user, logout]);

    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'user') {
                if (e.newValue) {
                    try {
                        setUser(JSON.parse(e.newValue) as User);
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

    useEffect(() => {
        const handleTokenExpired = () => {
            setUser(null);
            showErrorToast('세션이 만료되었습니다<br className="sm:hidden"/>다시 로그인해주세요');
        };

        window.addEventListener('token-expired', handleTokenExpired);
        return () => window.removeEventListener('token-expired', handleTokenExpired);
    }, []);

    const value: UserContextType = {
        user,
        setUser: updateUser,
        logout,
        loading,
        isAuthenticated: !!user,
        accessTkn,
        accessTknType
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

// ----------------------------------------------------
// 3. 커스텀 훅
// ----------------------------------------------------

export function useUser(): UserContextType {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}

interface AuthStatus {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;
}

export function useRequireAuth(): AuthStatus {
    const { user, loading } = useUser();
    return {
        isAuthenticated: !!user,
        isLoading: loading,
        user
    };
}
