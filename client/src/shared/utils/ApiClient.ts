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
        window.location.href = `${window.location.origin}/loginplz`;
    }

    // GET 요청 (쿼리 파라미터 지원)
    async get<T>(endpoint: string, requireAuth: boolean = true, params?: Record<string, any>): Promise<T> {
        // 쿼리 파라미터가 있으면 URL에 추가
        let url = endpoint;
        if (params) {
            const queryString = new URLSearchParams(
                Object.entries(params)
                    .filter(([_, value]) => value !== null && value !== undefined)
                    .map(([key, value]) => [key, String(value)])
            ).toString();
            
            if (queryString) {
                url += `?${queryString}`;
            }
        }

        return this.request<T>(url, requireAuth, {
            method: 'GET',
        });
    }

    // POST 요청
    async post<T>(endpoint: string, requireAuth: boolean = true, data?: any): Promise<T> {
        return this.request<T>(endpoint, requireAuth, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    // PUT 요청
    async put<T>(endpoint: string, requireAuth: boolean = true, data?: any): Promise<T> {
        return this.request<T>(endpoint, requireAuth, {
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    // DELETE 요청
    async delete<T>(endpoint: string, requireAuth: boolean = true): Promise<T> {
        return this.request<T>(endpoint, requireAuth, {
            method: 'DELETE',
        });
    }
}

export const apiClient = ApiClient.getInstance();