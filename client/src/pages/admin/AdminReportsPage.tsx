import React, { useEffect, useState } from "react";
import { ReportAdmin } from "../../entities/report/ui/ReportAdmin";
import { checkAdmin, getAdminReports, processReport } from "../../features/report/api/adminReportService";
import { defaultFormatDate } from "../../shared/utils/formatUtil";
import { showSuccessToast, showErrorToast } from "../../shared/utils/toast";

const STATUS_OPTIONS = [
    { value: "PENDING", label: "접수" },
    { value: "REVIEWING", label: "검토중" },
    { value: "REJECTED", label: "반려" },
    { value: "RESOLVED", label: "처리완료" },
];

const ACTION_OPTIONS = [
    { value: "NONE", label: "조치 없음" },
    { value: "WARNING", label: "경고" },
    { value: "CONTENT_HIDDEN", label: "콘텐츠 숨김" },
    { value: "CONTENT_DELETED", label: "콘텐츠 삭제" },
    { value: "USER_SUSPENDED", label: "계정 정지" },
    { value: "USER_BANNED", label: "계정 영구정지" },
];

const statusLabel = (v: string) => STATUS_OPTIONS.find(o => o.value === v)?.label ?? v;
const actionLabel = (v: string) => ACTION_OPTIONS.find(o => o.value === v)?.label ?? v;

const statusColor = (v: string) => ({
    PENDING: "bg-yellow-100 text-yellow-800",
    REVIEWING: "bg-blue-100 text-blue-800",
    REJECTED: "bg-gray-200 text-gray-700",
    RESOLVED: "bg-green-100 text-green-800",
}[v] ?? "bg-gray-100 text-gray-700");

const AdminReportsPage: React.FC = () => {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [reports, setReports] = useState<ReportAdmin[]>([]);
    const [statusFilter, setStatusFilter] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [selected, setSelected] = useState<ReportAdmin | null>(null);

    const load = async (status: string) => {
        setLoading(true);
        const res = await getAdminReports(status || undefined);
        setLoading(false);
        if (!res.ok || res.data === undefined) {
            showErrorToast("신고 목록을 불러오지 못했습니다");
            return;
        }
        setReports(res.data);
    };

    useEffect(() => {
        (async () => {
            const res = await checkAdmin();
            const ok = res.ok && res.data === true;
            setIsAdmin(ok);
            if (ok) load("");
        })();
    }, []);

    const onFilterChange = (s: string) => {
        setStatusFilter(s);
        load(s);
    };

    if (isAdmin === null) {
        return <div className="p-10 text-center text-gray-500">확인 중...</div>;
    }
    if (!isAdmin) {
        return (
            <div className="p-10 text-center">
                <p className="text-lg font-bold">접근 권한이 없습니다</p>
                <p className="text-gray-500 mt-2">관리자만 접근할 수 있는 페이지입니다.</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">신고 처리 관리</h1>
                <select
                    value={statusFilter}
                    onChange={(e) => onFilterChange(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-black"
                >
                    <option value="">전체 상태</option>
                    {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
            </div>

            {loading ? (
                <div className="py-16 text-center text-gray-500">불러오는 중...</div>
            ) : reports.length === 0 ? (
                <div className="py-16 text-center text-gray-400">신고 내역이 없습니다.</div>
            ) : (
                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-600">
                            <tr>
                                <th className="text-left px-3 py-2 font-medium">ID</th>
                                <th className="text-left px-3 py-2 font-medium">대상</th>
                                <th className="text-left px-3 py-2 font-medium">유형</th>
                                <th className="text-left px-3 py-2 font-medium">신고자 → 피신고자</th>
                                <th className="text-left px-3 py-2 font-medium">상태</th>
                                <th className="text-left px-3 py-2 font-medium">조치</th>
                                <th className="text-left px-3 py-2 font-medium">접수일</th>
                                <th className="px-3 py-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map(r => (
                                <tr key={r.id} className="border-t border-gray-100 hover:bg-gray-50">
                                    <td className="px-3 py-2">{r.id}</td>
                                    <td className="px-3 py-2">{r.targetType} #{r.targetId}</td>
                                    <td className="px-3 py-2">{r.reportType}</td>
                                    <td className="px-3 py-2">{r.reporterUsername} → {r.reportedUsername}</td>
                                    <td className="px-3 py-2">
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor(r.status)}`}>
                                            {statusLabel(r.status)}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2 text-gray-600">{actionLabel(r.actionTaken)}</td>
                                    <td className="px-3 py-2 text-gray-500">{defaultFormatDate(r.createdAt)}</td>
                                    <td className="px-3 py-2 text-right">
                                        <button
                                            className="text-blue-600 font-medium hover:underline"
                                            onClick={() => setSelected(r)}
                                        >
                                            처리
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {selected && (
                <ProcessModal
                    report={selected}
                    onClose={() => setSelected(null)}
                    onDone={() => { setSelected(null); load(statusFilter); }}
                />
            )}
        </div>
    );
};

const ProcessModal: React.FC<{ report: ReportAdmin; onClose: () => void; onDone: () => void }> = ({
    report, onClose, onDone
}) => {
    const [status, setStatus] = useState<string>(report.status || "REVIEWING");
    const [actionTaken, setActionTaken] = useState<string>(report.actionTaken || "NONE");
    const [reviewComment, setReviewComment] = useState<string>(report.reviewComment ?? "");
    const [saving, setSaving] = useState<boolean>(false);

    const submit = async () => {
        setSaving(true);
        const res = await processReport(report.id, status, actionTaken, reviewComment);
        setSaving(false);
        if (!res.ok) {
            showErrorToast("처리에 실패했습니다");
            return;
        }
        showSuccessToast("신고를 처리했습니다");
        onDone();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white rounded-xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-lg font-bold mb-1">신고 #{report.id} 처리</h2>
                <p className="text-sm text-gray-500 mb-4">
                    {report.targetType} #{report.targetId} · {report.reportType}
                    {report.reportReason ? ` · ${report.reportReason}` : ""}
                </p>

                <label className="block text-sm font-medium mb-1">상태</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-3 outline-none focus:border-black">
                    {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>

                <label className="block text-sm font-medium mb-1">조치</label>
                <select value={actionTaken} onChange={(e) => setActionTaken(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-3 outline-none focus:border-black">
                    {ACTION_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>

                <label className="block text-sm font-medium mb-1">검토 의견</label>
                <textarea value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} rows={3}
                    placeholder="처리 사유나 메모를 남겨주세요"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-4 resize-none outline-none focus:border-black" />

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} disabled={saving}
                        className="px-4 py-2 text-sm font-bold hover:bg-gray-100 rounded-full">
                        취소
                    </button>
                    <button onClick={submit} disabled={saving}
                        className="px-4 py-2 text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 rounded-full disabled:bg-gray-300">
                        {saving ? "저장 중..." : "저장"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminReportsPage;
