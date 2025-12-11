import { REST_API_SERVER } from "../constants/ApiServer";
import { showErrorToast } from "./toast";

// API 응답 래퍼 타입
export interface ApiResponse<T> {
    ok: boolean;
    status: number;
    data?: T;
    error?: string;
}

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
    ): Promise<ApiResponse<T>> {
        const token = localStorage.getItem("accessTkn");

        const headers: Record<string, string> = {
            ...(options.headers as Record<string, string> | undefined)
        };

        // FormData가 아닌 경우에만 Content-Type 설정
        // FormData는 브라우저가 자동으로 boundary와 함께 설정
        if (!(options.body instanceof FormData)) 
            headers['Content-Type'] = 'application/json';

        // 토큰이 있으면 헤더에 추가
        if (requireAuth && token) 
            headers['Authorization'] = `Bearer ${token}`;

        try {
            const response = await fetch(`${REST_API_SERVER}${endpoint}`, {
                ...options,
                headers,
            });

            // 401 에러 처리
            if (response.status === 401) {
                this.handleUnauthorized();
                return {
                    ok: false,
                    status: 401,
                    error: 'Unauthorized'
                };
            }

            // 응답이 JSON이 아닐 수도 있으므로 체크
            const contentType = response.headers.get('content-type');
            let data: T;
            
            contentType && contentType.includes('application/json') ? 
                data = await response.json() 
                : data = await response.text() as unknown as T;

            return {
                ok: response.ok,
                status: response.status,
                data: data,
                error: response.ok ? undefined : `요청 실패, 상태 코드 : ${response.status}`
            };
        } catch (error) {
            showErrorToast(error as Error);
            console.error('API 요청 실패:', error);
            return {
                ok: false,
                status: 0,
                error: error instanceof Error ? error.message : '알 수 없는 에러 발생'
            };
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
    async get<T>(endpoint: string, requireAuth: boolean = true, params?: Record<string, any>): Promise<ApiResponse<T>> {
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

    // POST 요청 (JSON 또는 FormData)
    async post<T>(endpoint: string, requireAuth: boolean = true, data?: any): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, requireAuth, {
            method: 'POST',
            body: data instanceof FormData ? data : (data ? JSON.stringify(data) : undefined),
        });
    }

    // PUT 요청 (JSON 또는 FormData)
    async put<T>(endpoint: string, requireAuth: boolean = true, data?: any): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, requireAuth, {
            method: 'PUT',
            body: data instanceof FormData ? data : (data ? JSON.stringify(data) : undefined),
        });
    }

    // DELETE 요청
    async delete<T>(endpoint: string, requireAuth: boolean = true): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, requireAuth, {
            method: 'DELETE',
        });
    }
}

export const apiClient = ApiClient.getInstance();