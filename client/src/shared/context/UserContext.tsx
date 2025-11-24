import { 
    createContext, 
    useContext, 
    useState, 
    useEffect, 
    useCallback,
    ReactNode, // children prop의 타입
    FC // 함수형 컴포넌트 타입
} from "react";

// User 엔티티 정의 (별도 파일에 있을 경우 import 처리)
export interface User {
    id: number;
    username: string;
    mail: string;
    mention: string;
    profileImgSrc: string;
    createAt: string;
}

// ----------------------------------------------------
// 1. Context 타입 정의
// ----------------------------------------------------

/** UserContext가 제공하는 값의 타입 */
interface UserContextType {
    user: User | null; // 사용자 정보 또는 null (로그아웃 상태)
    setUser: (newUser: User | null) => void; // 사용자 정보 업데이트 함수
    logout: () => void; // 로그아웃 함수
    loading: boolean; // 초기 로딩 상태
    isAuthenticated: boolean; // 인증 상태
}

// Context 생성: 초기값은 `null`이지만, 사용 시 `UserContextType`임을 보장합니다.
// null을 사용하고 useUser 훅에서 에러 처리하는 방식을 유지합니다.
const UserContext = createContext<UserContextType | undefined>(undefined);

// ----------------------------------------------------
// 2. Provider 컴포넌트
// ----------------------------------------------------

// children prop 타입을 명시
interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
    // useState의 초기 상태 함수에 User | null 타입 명시
    const [user, setUser] = useState<User | null>(() => {
        try {
            const saved = localStorage.getItem("user");
            // saved가 있을 경우 JSON.parse 결과가 User 타입임을 명시
            return saved ? (JSON.parse(saved) as User) : null;
        } catch (error) {
            console.error('사용자 정보 JSON 파싱 실패:', error);
            localStorage.removeItem("user");
            return null;
        }
    });

    const [loading, setLoading] = useState<boolean>(true);

    // 사용자 정보 업데이트 함수: 인수에 타입 명시
    const updateUser = useCallback((newUser: User | null) => {
        setUser(newUser);
    }, []);

    // 로그아웃 함수
    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem("user");
    }, []);

    // localStorage 동기화
    useEffect(() => {
        if (user) {
            try {
                // user가 User 타입임을 알고 있으므로 바로 stringify
                localStorage.setItem("user", JSON.stringify(user));
            } catch (error) {
                console.error('사용자 정보 저장 실패:', error);
            }
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    // 사용자 세션 검증 (선택적)
    useEffect(() => {
        // user 의존성이 있으므로, logout 함수도 의존성 배열에 추가해야 합니다.
        const validateSession = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                // 서버에 세션 유효성 검증 요청 (주석 처리된 로직)
                /*
                const response = await fetch('/api/user/validate', {
                    method: 'GET',
                    credentials: 'include'
                });

                if (!response.ok) {
                    logout();
                }
                */
            } catch (error) {
                console.error('Session validation failed:', error);
            } finally {
                setLoading(false);
            }
        };

        validateSession();
    }, [user, logout]); // logout 함수를 의존성에 추가

    // 다른 탭에서의 로그인/로그아웃 감지
    useEffect(() => {
        // StorageEvent 인수에 타입 명시
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'user') {
                if (e.newValue) {
                    try {
                        // e.newValue가 string이므로 JSON.parse 결과가 User 타입임을 명시
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

    // Context value 타입 명시
    const value: UserContextType = {
        user,
        setUser: updateUser,
        logout,
        loading,
        isAuthenticated: !!user // !!user는 boolean을 반환
    };

    return (
        // Context.Provider value에 UserContextType 타입의 객체를 전달
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

// ----------------------------------------------------
// 3. Custom Hooks
// ----------------------------------------------------

export function useUser(): UserContextType {
    // useContext 호출 시 UserContextType | undefined 타입을 받음
    const context = useContext(UserContext);
    
    // context가 undefined일 경우 런타임 에러 발생 (Provider 외부 사용 방지)
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    
    // 에러 검사를 통과했으므로 context는 UserContextType 타입임이 보장됨
    return context;
}

/** 로그인 필요 여부 체크 훅 */
interface AuthStatus {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;
}

export function useRequireAuth(): AuthStatus {
    // useUser의 반환 타입이 UserContextType임을 알고 있음
    const { user, loading } = useUser();
    
    return {
        isAuthenticated: !!user,
        isLoading: loading,
        user
    };
}