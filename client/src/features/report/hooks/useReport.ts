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
            const res = await reportRegister(reportData);
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