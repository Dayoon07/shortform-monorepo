import { useState } from "react";
import { editUserProfile } from "../api/profileService";
import { useUser } from "../../../shared/context/UserContext";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "../../../shared/utils/toast";
import { ProfileUserInfo } from "../../../entities/profile/ui/ProfileUserInfo";
import { REST_API_SERVER } from "../../../shared/constants/ApiCollectionList";
import { ROUTE } from "../../../shared/constants/Route";

export function useProfileEdit(profile: ProfileUserInfo, onClose: () => void) {
    const [previewImg, setPreviewImg] = useState<ProfileUserInfo | string>(profile?.profileImgSrc || "");
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
            const data = await editUserProfile(
                formData, // DTO에 들어갈 모든 필드가 담긴 객체
                selectedFile, // MultipartFile
                profile?.social ? profile.profileImgSrc : REST_API_SERVER + profile?.profileImgSrc, // currentProfileImgSrc
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
            showErrorToast("프로필 수정 중 오류가 발생했습니다");
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