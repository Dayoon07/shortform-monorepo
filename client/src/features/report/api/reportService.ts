import { ReportRegisterReq } from "../../../entities/report/ui/ReportRegisterReq"
import { API_LIST } from "../../../shared/constants/ApiCollectionList"
import { apiClient, ApiResponse } from "../../../shared/utils/ApiClient"

// 백엔드는 @RequestBody ReportReqDto(JSON)를 받으므로 객체를 그대로 JSON으로 전송한다.
export const reportRegister = async (req: ReportRegisterReq): Promise<ApiResponse<any>> =>
    await apiClient.post<any>(API_LIST.REPORT.REPORT_REGISTER, true, req);