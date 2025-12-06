import { REST_API_SERVER } from "../constants/ApiServer";

class ApiClient {
    private static instance: ApiClient;

    private constructor() {}

    static getInstance(): ApiClient {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient();
        }
        return ApiClient.instance;
    }

    async request<T>(
        endpoint: string, 
        requireAuth: boolean = true,
        options: RequestInit = {}
    ): Promise<T> {
        const token = localStorage.getItem("accessTkn");

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(options.headers as Record<string, string> | undefined)
        };

        // 토큰이 있으면 헤더에 추가
        if (requireAuth && token) {
            const token = localStorage.getItem("accessTkn");
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(`${REST_API_SERVER}${endpoint}`, {
                ...options,
                headers,
            });

            // 401 에러 처리
            if (response.status === 401) {
                this.handleUnauthorized();
                throw new Error('Unauthorized');
            }

            // 응답이 JSON이 아닐 수도 있으므로 체크
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }
            
            return await response.text() as unknown as T;
        } catch (error) {
            console.error('API 요청 실패:', error);
            throw error;
        }
    }

    private handleUnauthorized() {
        localStorage.clear();   // 토큰 만료 시 처리

        // UserContext의 setUser를 직접 호출할 수 없으므로
        // 커스텀 이벤트 발생
        window.dispatchEvent(new Event('token-expired'));
        window.location.href = '/loginplz';
    }

    // GET 요청
    async get<T>(endpoint: string, requireAuth: boolean = true, data?: any): Promise<T> {
        return this.request<T>(endpoint, requireAuth, {
            method: 'GET',
            body: data ? JSON.stringify(data) : undefined
        });
    }

    // POST 요청
    async post<T>(endpoint: string, requireAuth: boolean = true, data?: any): Promise<T> {
        return this.request<T>(endpoint, requireAuth, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    // PUT, DELETE 등 메서드는 
    // 필요하지 않으니 추가하지는 않았습니다
}

export const apiClient = ApiClient.getInstance();
