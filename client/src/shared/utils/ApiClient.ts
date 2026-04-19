import { REST_API_SERVER } from "../constants/ApiCollectionList";
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

            // === 응답 본문 처리 로직 ===

            let data: T | undefined = undefined;
            const contentType = response.headers.get('content-type');
            const isJson = contentType && contentType.includes('application/json');
            
            // 응답이 성공(ok: true)이거나 실패했지만 본문이 있을 경우를 위해
            // 그리고 상태 코드가 204 (No Content)가 아닌 경우에 본문을 읽습니다.
            if (response.status !== 204) {
                try {
                    if (isJson) {
                        // JSON 형태일 경우 응답 본문이 비어있지 않은지 먼저 확인하는 것이 좋습니다.
                        const text = await response.text();
                        if (text) {
                            data = JSON.parse(text) as T;
                        }
                    } else {
                        // JSON이 아닐 경우 (텍스트, HTML 등)
                        data = await response.text() as unknown as T;
                    }
                } catch (e) {
                    // 본문 파싱 에러 (예: 비어있는 본문에 대해 JSON.parse 시도, 유효하지 않은 JSON 등)
                    // 로그만 남기고 data는 undefined로 유지
                    console.warn(`응답 본문 파싱 실패 (status: ${response.status}):`, e);
                }
            }

            // response.ok가 false인 경우 에러 처리
            if (!response.ok) {
                console.error(`API 요청 실패 (Status: ${response.status})`, response);
                return {
                    ok: false,
                    status: response.status,
                    error: data && typeof data === 'object' && 'message' in data ? (data as any).message : `요청 실패, 상태 코드 : ${response.status}`
                };
            }

            return {
                ok: response.ok,
                status: response.status,
                data: data,
                error: undefined
            };

            // === 응답 본문 처리 로직 개선 끝 ===

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