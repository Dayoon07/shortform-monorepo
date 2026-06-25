export interface ReportAdmin {
    id: number;
    targetType: string;
    targetId: number;
    reporterUserId: number;
    reporterUsername: string;
    reportedUserId: number;
    reportedUsername: string;
    reportType: string;
    reportReason: string | null;
    status: string;
    actionTaken: string;
    reviewComment: string | null;
    reviewedAt: string | null;
    createdAt: string;
    updatedAt: string | null;
}
