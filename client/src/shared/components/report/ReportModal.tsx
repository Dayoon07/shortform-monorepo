import React from "react";
import Modal from "../common/Modal";

interface ReportModalProps { onClose: () => void }

export const ReportModal: React.FC<ReportModalProps> = ({
    onClose
}) => {
    return (
        <Modal onClose={onClose} title="신고하기">
            <div>
                신고 모달
            </div>
        </Modal>
    );
}