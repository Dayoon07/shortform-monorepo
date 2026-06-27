import { useState } from "react";
import { editUserProfile } from "../api/profileService";
import { useUser } from "../../../shared/context/UserContext";
import { useNavigate } from "react-router-dom";
import { showSuccessToast } from "../../../shared/utils/toast";
import { ProfileUserInfo } from "../../../entities/profile/ui/ProfileUserInfo";
import { mediaUrl } from "../../../shared/utils/mediaUrl";
import { ROUTE } from "../../../shared/constants/Route";

export function useProfileEdit(profile: ProfileUserInfo, onClose: () => void) {
    const a: string = mediaUrl(profile?.profileImgSrc);
    const [previewImg, setPreviewImg] = useState<string>(a);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const navigate = useNavigate();
    const { setUser } = useUser();

    const [formData, setFormData] = useState({
        username: profile?.username || '',
        mail: profile?.mail || '',
        mention: profile?.mention || '',
        bio: profile?.bio || ''
    });

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setPreviewImg(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            console.log(profile?.id);
            
            // 절대 URL(소셜/S3)은 그대로, 상대경로는 서버 주소 추가 (이미 절대면 중복 안 붙음)
            const currentImgSrc = mediaUrl(profile?.profileImgSrc);
            
            const data = await editUserProfile(
                formData,
                selectedFile,
                currentImgSrc  // 수정된 부분
            );
            
            if (data === undefined) throw new Error("값이 없음: " + data);
            if (data.user) 
                localStorage.setItem("user", JSON.stringify(data.user));

            console.log("프로필 업데이트 완료:", data);
            navigate(ROUTE.HOMEPAGE);
            showSuccessToast("프로필이 저장되었습니다<br/>다시 로그인 해주세요", 5000);
            setUser(null);
            onClose();
        } catch (error) {
            console.error("업데이트 실패:", error);
        }
    };

    const resetForm = () => {
        setFormData({
            username: profile?.username || '',
            mail: profile?.mail || '',
            mention: profile?.mention || '',
            bio: profile?.bio || ''
        });
        setPreviewImg(profile?.profileImgSrc || '');
        setSelectedFile(null);
    };

    return {
        previewImg,
        formData,
        handleImageChange,
        handleInputChange,
        handleSubmit,
        resetForm
    };
}