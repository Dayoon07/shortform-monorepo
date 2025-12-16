import { showSuccessToast } from "../../../utils/toast";
import Modal from "../../common/Modal";

export const DeleteModal = ({ onClose }: { onClose: () => void }) => {
    const baseCn = `w-full duration-300 font-bold text-lg py-4 rounded-xl`;



    return (
        <Modal onClose={onClose} title="영상을 삭제하시겠습니까?">
            <div className="flex justify-between items-center space-x-4">
                <button type="button" onClick={onClose}
                    className={`${baseCn} bg-gray-200 hover:bg-gray-300`}
                >
                    취소
                </button>
                <button type="button" onClick={() => showSuccessToast("삭제 요청!!!")} 
                    className={`${baseCn} bg-red-500 hover:bg-red-600 text-white`}>
                    삭제
                </button>
            </div>
        </Modal>
    );
}