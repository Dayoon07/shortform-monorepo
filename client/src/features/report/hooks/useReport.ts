import { useState } from "react"
import { reportRegister } from "../api/reportService";
import { ReportRegisterReq } from "../../../entities/report/ui/ReportRegisterReq";

export const useReport = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submitReport = async (reportData: ReportRegisterReq) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const fd = new FormData();
            fd.append("targetType", reportData.targetType);
            fd.append("targetId", reportData.targetId.toString());
            fd.append("reportedUser", reportData.reportedUser.toString());
            fd.append("reportType", reportData.reportType);
            fd.append("reportReason", reportData.reportReason);
            
            const res = await reportRegister(fd);
            setIsLoading(false);
            return res;
        } catch (err) {
            setError(err instanceof Error ? err.message : "신고 처리 중 오류가 발생했습니다");
            setIsLoading(false);
            throw err;
        }
    }

    return {
        submitReport,
        isLoading,
        error
    }
}