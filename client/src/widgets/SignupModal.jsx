import { useState } from "react";
import Modal from "./Modal";
import ProfileImageUpload from "./ProfileImageUpload";
import SignupForm from "./SignupForm";
import { signupUser } from "../../services/authService";
import { showToast } from "../../utils/toast";

export default function SignupModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [profileImg, setProfileImg] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const resetForm = () => {
    setStep(1);
    setProfileImg(null);
    setPreviewUrl('');
  };

  const handleImageSelect = (file, preview) => {
    setProfileImg(file);
    setPreviewUrl(preview);
  };

  const goToStep2 = () => {
    if (!profileImg) {
      alert('프로필 이미지를 업로드해주세요.');
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (formData) => {
    const data = new FormData();
    data.append('email', formData.email.trim());
    data.append('username', formData.username.trim());
    data.append('password', formData.password);
    data.append('profileImage', profileImg);

    try {
      const response = await signupUser(data);

      if (response.ok) {
        showToast('회원가입이<br/>완료되었습니다.');
        resetForm();
        onClose();
      } else {
        const message = await response.text();
        alert('회원가입 실패: ' + message);
      }
    } catch (error) {
      alert('에러 발생: ' + error.message);
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