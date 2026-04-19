import { useState } from "react";
import { validateEmail, validateUsername } from "../../../services/user/validationService";
import { showErrorToast } from "../../../utils/toast";
import { FloatingInput } from "./FloatingInput";
import { ValidationMessage } from "../../../utils/ValidationMessage";
import { SignupFormData } from "../../../../entities/user/ui/SignupFormData";

interface SignupFormProps {
    onSubmit: (formData: any) => Promise<void>
}

export default function SignupForm({ onSubmit }: SignupFormProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<SignupFormData>({
        username: "", email: "", password: "", confirmPassword: ""
    });
    const [validation, setValidation] = useState({
        username:   { available: true, message: "", color: "" },
        email:      { available: true, message: "", color: "" }
    });

    const handleUsernameChange = async (value: string) => {
        setFormData(prev => ({ ...prev, username: value }));
        
        if (!value) {   // 1. 입력값 없을 때
            setValidation(prev => ({
                ...prev,
                username: { available: false, message: "이름을 입력해주세요", color: "red" }
            }));
            return;
        }

        try {   // 2. 서버 유효성 검사 및 중복 확인
            const available = await validateUsername(value);
            setValidation(prev => ({
            ...prev,
            username: {
                available,
                message: available ? "사용 가능한 이름입니다" : "이미 사용 중인 이름입니다",
                color: available ? "green" : "red"
            }
            }));
        } catch (error) {   // 서버에서 형식 오류를 처리하는 경우의 메시지
            console.error("형식에 맞지 않는 이름입니다: ", error);
            setValidation(prev => ({
                ...prev,
                username: { available: false, message: "이름 형식이 올바르지 않습니다", color: "red" }
            }));
        }
    };

    const handleEmailChange = async (value: string) => {
        setFormData(prev => ({ ...prev, email: value }));
        
        if (!value) {
            setValidation(prev => ({
                ...prev,
                email: { available: false, message: "이메일을 입력해주세요", color: "red" }
            }));
            return;
        }

        if (!/^.+@.+$/.test(value)) {
            setValidation(prev => ({
                ...prev,
                email: { available: false, message: "올바른 이메일 형식이 아닙니다", color: "red" }
            }));
            return;
        }
        
        try {
            const available = await validateEmail(value);
            setValidation(prev => ({
                ...prev,
                email: {
                    available,
                    message: available ? "사용 가능한 이메일입니다" : "이미 사용 중인 이메일입니다",
                    color: available ? "green" : "red"
                }
            }));
        } catch (error) {
            console.error("이메일 유효성 검사 실패: ", error);
            setValidation(prev => ({
                ...prev,
                email: { available: false, message: "이메일 유효성 검사 중 오류가 발생했습니다", color: "red" }
            }));
        }
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!formData.email || !formData.username || !formData.password || !formData.confirmPassword) {
            showErrorToast("모든 정보를 입력해주세요");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            showErrorToast("비밀번호가 일치하지 않습니다");
            return;
        }

        if (!validation.username.available || !validation.email.available) {
            showErrorToast("입력 정보를 확인해주세요");
            return;
        }

        setIsLoading(true);
        try {
            await onSubmit(formData);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <FloatingInput 
                    type="text"
                    id="signup-username"
                    htmlFor="signup-username"
                    labelText="사용자 이름"
                    value={formData.username}
                    onChange={(e) => handleUsernameChange(e.target.value)}
                    disabled={isLoading}
                />
                <ValidationMessage 
                    message={validation.username.message}
                    color={validation.username.color}
                />
            </div>
            
            <div>
                <FloatingInput 
                    type="email"
                    id="signup-email"
                    htmlFor="signup-email"
                    labelText="이메일"
                    value={formData.email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    disabled={isLoading}
                />
                <ValidationMessage 
                    message={validation.email.message}
                    color={validation.email.color}
                />
            </div>

            <FloatingInput
                type="password"
                id="signup-password"
                htmlFor="signup-password"
                labelText="비밀번호"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                disabled={isLoading}
            />

            <FloatingInput
                type="password"
                id="signup-confirm-password"
                htmlFor="signup-confirm-password"
                labelText="비밀번호 확인"
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                disabled={isLoading}
            />
            
            <button type="submit" disabled={isLoading} className="w-full py-3 rounded-xl font-semibold 
                bg-gray-200 hover:bg-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? '처리 중...' : '가입하기'}
            </button>
        </form>
    );
}