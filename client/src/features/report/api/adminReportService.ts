import { API_LIST } from "../../../shared/constants/ApiCollectionList";
import { apiClient, ApiResponse } from "../../../shared/utils/ApiClient";
import { ReportAdmin } from "../../../entities/report/ui/ReportAdmin";

export const checkAdmin = async (): Promise<ApiResponse<boolean>> =>
    await apiClient.get<boolean>(API_LIST.ADMIN.REPORT.CHECK, true);

export const getAdminReports = async (status?: string): Promise<ApiResponse<ReportAdmin[]>> =>
    await apiClient.get<ReportAdmin[]>(API_LIST.ADMIN.REPORT.LIST(status), true);

export const processReport = async (
    reportId: number, status: string, actionTaken: string, reviewComment: string
): Promise<ApiResponse<any>> =>
    await apiClient.post<any>(API_LIST.ADMIN.REPORT.PROCESS, true, { reportId, status, actionTaken, reviewComment });
