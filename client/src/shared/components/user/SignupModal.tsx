import { useState } from "react";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { signup } from "../../../features/user/api/userService";
import Modal from "../common/Modal";
import ProfileImageUpload from "./ui/ProfileImageUpload";
import SignupForm from "./ui/SignupForm";

interface SignupModalProps {
    onClose: () => void;
}

export default function SignupModal({ onClose }: SignupModalProps) {
    const [step, setStep] = useState<number>(1);
    const [profileImg, setProfileImg] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');

    const resetForm = () => {
        setStep(1);
        setProfileImg(null);
        setPreviewUrl('');
    };

    const handleImageSelect = (file: File, preview: string) => {
        setProfileImg(file);
        setPreviewUrl(preview);
    };

    const goToStep2 = () => {
        if (!profileImg) {
            showErrorToast("프로필 이미지를 업로드해주세요");
            return;
        }
        setStep(2);
    };

    const handleSubmit = async (formData: { email: string; username: string; password: string }) => {
        const data = new FormData();
        data.append('email', formData.email.trim());
        data.append('username', formData.username.trim());
        data.append('password', formData.password);
        if (profileImg) {
            data.append('profileImage', profileImg);
        }

        try {
            const response = await signup(data);

            if (response.data) {
                showSuccessToast("회원가입이<br className='md:hidden' />완료되었습니다");
                resetForm();
                onClose();
            } else {
                console.log(response);
                console.error(response);
                showErrorToast(`회원가입 실패: ${response}`);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
            showErrorToast(`에러 발생: ${errorMessage}`);
        }
    };

    return (
        <Modal onClose={onClose} title="회원가입">
            {step === 1 ? (
                <ProfileImageUpload
                    previewUrl={previewUrl}
                    onImageSelect={handleImageSelect}
                    onNext={goToStep2}
                />
            ) : (
                <SignupForm onSubmit={handleSubmit} />
            )}
        </Modal>
    );
}