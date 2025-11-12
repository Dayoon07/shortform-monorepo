import { useState } from "react";
import { editUserProfile } from "../api/profileService";
import { useUser } from "../../../shared/context/UserContext";
import { useNavigate } from "react-router-dom";
import { showSuccessToast } from "../../../shared/utils/toast";

export function useProfileEdit(profile, onClose) {
    const [previewImg, setPreviewImg] = useState(profile?.profileImgSrc || '');
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();
    const { user, setUser } = useUser();

    const [formData, setFormData] = useState({
        username: profile?.username || '',
        mail: profile?.mail || '',
        mention: profile?.mention || '',
        bio: profile?.bio || ''
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImg(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            console.log(user.id);
            const data = await editUserProfile(
                formData.username,
                formData.mail,
                formData.mention,
                formData.bio,
                selectedFile,
                profile?.profileImgSrc,
                user.id
            );

            console.log("프로필 업데이트 완료:", data);
            setUser(null);
            showSuccessToast("프로필이 저장되었습니다<br/>다시 로그인 해주세요");
            
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
            }
            
            navigate("/");
            onClose();
        } catch (error) {
            console.error("업데이트 실패:", error);
            alert("프로필 수정 중 오류가 발생했습니다.");
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