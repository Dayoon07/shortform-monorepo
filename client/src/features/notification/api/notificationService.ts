import { Notification } from "../../../entities/notification/model/Notification";
import { API_LIST } from "../../../shared/constants/ApiCollectionList";
import { apiClient, ApiResponse } from "../../../shared/utils/ApiClient";

/** 내 알림 목록(최근 50개) */
export const getNotifications = async (): Promise<ApiResponse<Notification[]>> =>
    await apiClient.get<Notification[]>(API_LIST.NOTIFICATION.LIST, true);

/** 안 읽은 알림 개수 (벨 배지용) */
export const getUnreadCount = async (): Promise<ApiResponse<{ count: number }>> =>
    await apiClient.get<{ count: number }>(API_LIST.NOTIFICATION.UNREAD_COUNT, true);

/** 모두 읽음 처리 */
export const markAllRead = async (): Promise<ApiResponse<{ success: boolean }>> =>
    await apiClient.post<{ success: boolean }>(API_LIST.NOTIFICATION.READ_ALL, true);
