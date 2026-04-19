import { showErrorToast, showSuccessToast } from "../utils/toast";

export const useShare = () => {
    const shareFunc = async (p?: string) => {
        try {
            const a = p === undefined ? window.location.href : p;
            await navigator.clipboard.writeText(a);
            showSuccessToast("링크가 복사되었습니다");
        } catch (error) {
            console.error(error);
            showErrorToast("링크 복사를 실패했습니다");
        }
    }

    return { shareFunc }
}