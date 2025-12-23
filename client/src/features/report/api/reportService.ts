import { ReportRegisterReq } from "../../../entities/report/ui/ReportRegisterReq"
import { API_LIST } from "../../../shared/constants/ApiCollectionList"
import { apiClient, ApiResponse } from "../../../shared/utils/ApiClient"

export async function reportRegister(formData: FormData): 
    Promise<ApiResponse<ReportRegisterReq>> {
    return await apiClient.post<ReportRegisterReq>
    (API_LIST.REPORT.REPORT_REGISTER, true, { formData });
}
