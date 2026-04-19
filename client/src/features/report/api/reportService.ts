import { ReportRegisterReq } from "../../../entities/report/ui/ReportRegisterReq"
import { API_LIST } from "../../../shared/constants/ApiCollectionList"
import { apiClient, ApiResponse } from "../../../shared/utils/ApiClient"

export const reportRegister = async (formData: FormData): Promise<ApiResponse<ReportRegisterReq>> => 
    await apiClient.post<ReportRegisterReq>(API_LIST.REPORT.REPORT_REGISTER, true, { formData });