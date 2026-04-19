import React, { useState } from "react";
import Modal from "../common/Modal";
import { ReportType } from "../../constants/enums/ReportType";
import { REPORT_TYPE_TEXT_DATA } from "./data/ReportTypeTextData";
import { useReport } from "../../../features/report/hooks/useReport";
import { ReportRegisterReq } from "../../../entities/report/ui/ReportRegisterReq";
import { showErrorToast, showSuccessToast } from "../../utils/toast";

const REPORT_TYPES = Object.values(ReportType);

interface ReportModalProps {
    onClose: () => void;
    targetType: string; // "VIDEO", "COMMENT" 등
    targetId: number;
    reportedUserId: number;
}

export const ReportModal: React.FC<ReportModalProps> = ({ 
    onClose, 
    targetType, 
    targetId, 
    reportedUserId 
}) => {
    const [selected, setSelected] = useState<ReportType | null>(null);
    const [reportReason, setReportReason] = useState<string>("");
    const { submitReport, isLoading, error } = useReport();

    const handleSubmit = async () => {
        if (!selected) {
            showErrorToast("신고 사유를 선택해주세요");
            return;
        }

        try {
            const reportData: ReportRegisterReq = {
                targetType,
                targetId,
                reportedUser: reportedUserId,
                reportType: selected,
                reportReason: reportReason || REPORT_TYPE_TEXT_DATA[selected].desc
            };

            await submitReport(reportData);
            showSuccessToast("신고가 접수되었습니다");
            onClose();
        } catch (err) {
            showErrorToast("신고 처리 중 오류가 발생했습니다");
        }
    }

    return (
        <Modal onClose={onClose} title="영상 신고하기" titleAlign="left">
            <div className="flex flex-col gap-2 h-96 overflow-y-auto">
                {REPORT_TYPES.map((type) => {
                    const { title, desc } = REPORT_TYPE_TEXT_DATA[type];
                    const checked = selected === type;

                    return (
                        <label key={type} 
                            className={`
                                flex gap-3 px-4 py-3 rounded-xl cursor-pointer border transition
                                ${checked ? "border-brand bg-brand-subtle" 
                                    : "border-default-medium hover:bg-neutral-secondary-medium"}
                            `}
                        >
                            <input
                                type="radio"
                                name="report-type"
                                checked={checked}
                                onChange={() => setSelected(type)}
                                className="mt-1 w-4 h-4 rounded-full border-2 border-default
                                    checked:border-brand checked:bg-brand"
                            />

                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-heading">{title}</span>
                                <span className="text-xs text-gray-500 leading-tight">{desc}</span>
                            </div>
                        </label>
                    );
                })}

                {/* 추가 사유 입력 (선택사항) */}
                <div>
                    {selected && (
                        <textarea
                            placeholder="추가 설명을 입력해주세요 (선택사항)"
                            value={reportReason}
                            onChange={(e) => setReportReason(e.target.value)}
                            className="w-full p-3 mt-2 border border-default-medium rounded-xl resize-none"
                            rows={3}
                        />
                    )}
                </div>

                {error && ( <p className="text-red-500 text-sm mt-2">{error}</p> )}

                <button 
                    type="button" 
                    className="w-full bg-gray-200 hover:bg-gray-300 py-2 mt-4 rounded-full duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleSubmit}
                    disabled={!selected || isLoading}
                >
                    {isLoading ? "처리 중..." : "신고"}
                </button>
            </div>
        </Modal>
    );
};