import { useState, useEffect } from "react";
import { X, Upload, Check, AlertCircle } from "lucide-react";
import { signup } from "../../../features/user/api/userService";
import { validateUsername, validateEmail } from "../../../features/user/api/validationService";
import { showSuccessToast } from "../../../shared/utils/toast";

const MAX_FILE_SIZE = 1024 * 1024 * 3; // 3MB

export default function SignupModal({ onClose }) {
    const [step, setStep] = useState(1); // 1: 프로필 이미지, 2: 회원 정보
    const [profileImg, setProfileImg] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Step 2 state
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [validation, setValidation] = useState({
        username: { checking: false, available: null, message: '' },
        email: { checking: false, available: null, message: '' }
    });

    const [error, setError] = useState('');

    // ESC 키로 닫기
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    // 백드롭 클릭으로 닫기
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // 파일 처리
    const processFile = (file) => {
        if (!file) return;

        if (file.size > MAX_FILE_SIZE) {
            setError('프로필 이미지 최대 용량은 3MB입니다.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setProfileImg(file);
            setPreviewUrl(e.target.result);
            setError('');
        };
        reader.readAsDataURL(file);
    };

    const handleFileChange = (e) => {
        processFile(e.target.files[0]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        processFile(e.dataTransfer.files[0]);
    };

    // Step 1에서 Step 2로
    const goToStep2 = () => {
        if (!profileImg) {
            setError('프로필 이미지를 업로드해주세요.');
            return;
        }
        setStep(2);
        setError('');
    };

    // 사용자명 검증
    const checkUsername = async (value) => {
        if (!value) {
            setValidation(prev => ({
                ...prev,
                username: { checking: false, available: null, message: '' }
            }));
            return;
        }

        setValidation(prev => ({
            ...prev,
            username: { checking: true, available: null, message: '확인 중...' }
        }));

        try {
            const available = await validateUsername(value);
            setValidation(prev => ({
                ...prev,
                username: {
                    checking: false,
                    available,
                    message: available ? '사용 가능한 이름입니다.' : '이미 사용 중인 이름입니다.'
                }
            }));
        } catch (error) {
            console.error('사용자명 검증 오류:', error);
            setValidation(prev => ({
                ...prev,
                username: { checking: false, available: false, message: '확인 실패' }
            }));
        }
    };

    // 이메일 검증
    const checkEmail = async (value) => {
        if (!value) {
            setValidation(prev => ({
                ...prev,
                email: { checking: false, available: null, message: '' }
            }));
            return;
        }

        setValidation(prev => ({
            ...prev,
            email: { checking: true, available: null, message: '확인 중...' }
        }));

        try {
            const available = await validateEmail(value);
            setValidation(prev => ({
                ...prev,
                email: {
                    checking: false,
                    available,
                    message: available ? '사용 가능한 이메일입니다.' : '이미 사용 중인 이메일입니다.'
                }
            }));
        } catch (error) {
            console.error('이메일 검증 오류:', error);
            setValidation(prev => ({
                ...prev,
                email: { checking: false, available: false, message: '확인 실패' }
            }));
        }
    };

    // 폼 제출
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // 유효성 검사
        if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('모든 정보를 입력해주세요.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (!validation.username.available || !validation.email.available) {
            setError('입력 정보를 확인해주세요.');
            return;
        }

        setIsLoading(true);

        try {
            const data = new FormData();
            data.append('email', formData.email.trim());
            data.append('username', formData.username.trim());
            data.append('password', formData.password);
            data.append('profileImage', profileImg);

            const response = await signup(data);

            if (response?.data) {
                showSuccessToast('회원가입이 완료되었습니다!');
                onClose();
            }
        } catch (error) {
            console.error('회원가입 오류:', error);
            setError('회원가입 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleBackdropClick}
        >
            <div 
                className="bg-gray-900 rounded-2xl max-w-md w-full mx-4 p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-white">회원가입</h3>
                        <p className="text-sm text-gray-400 mt-1">Step {step}/2</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-800 rounded-lg"
                        aria-label="닫기"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start space-x-2">
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="text-red-400 text-sm">{error}</p>
                    </div>
                )}

                {step === 1 && (
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            프로필 이미지
                        </label>
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`relative bg-gray-800 rounded-lg px-3 py-6 flex flex-col items-center justify-center transition-all cursor-pointer
                                ${isDragging ? 'border-2 border-blue-500 bg-blue-500/10' : 'border-2 border-gray-700 hover:border-gray-600'}`}
                        >
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                                accept="image/*"
                            />
                            {previewUrl ? (
                                <img 
                                    src={previewUrl} 
                                    alt="프로필 미리보기" 
                                    className="w-28 h-28 object-cover rounded-full ring-4 ring-gradient-to-r from-pink-500 to-sky-500" 
                                />
                            ) : (
                                <>
                                    <Upload className="w-12 h-12 text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-400 text-center">
                                        이미지를 업로드하려면 <br /> 
                                        클릭하거나 <span className="text-white font-semibold">드래그</span> 하세요
                                    </p>
                                    <p className="text-xs text-gray-500 mt-2">최대 3MB</p>
                                </>
                            )}
                        </div>
                        <button 
                            onClick={goToStep2}
                            disabled={!profileImg}
                            className="w-full py-3 mt-4 rounded-xl font-semibold 
                                     bg-gradient-to-r from-pink-500 to-sky-500 
                                     hover:from-pink-600 hover:to-sky-600
                                     disabled:from-gray-700 disabled:to-gray-800
                                     disabled:cursor-not-allowed disabled:opacity-50
                                     text-white transition-all shadow-lg"
                        >
                            다음
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="signup-username" className="block text-sm font-medium text-gray-300 mb-2">
                                사용자명
                            </label>
                            <input
                                id="signup-username"
                                type="text"
                                value={formData.username}
                                onChange={(e) => {
                                    setFormData({ ...formData, username: e.target.value });
                                    checkUsername(e.target.value);
                                }}
                                placeholder="사용자명을 입력하세요"
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl 
                                         text-white placeholder-gray-500
                                         focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400/20"
                                disabled={isLoading}
                                required
                            />
                            {validation.username.message && (
                                <div className={`mt-1 flex items-center space-x-1 text-sm ${
                                    validation.username.available ? 'text-green-400' : 'text-red-400'
                                }`}>
                                    {validation.username.available && <Check className="w-4 h-4" />}
                                    {validation.username.available === false && <AlertCircle className="w-4 h-4" />}
                                    <span>{validation.username.message}</span>
                                </div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="signup-email" className="block text-sm font-medium text-gray-300 mb-2">
                                이메일
                            </label>
                            <input
                                id="signup-email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => {
                                    setFormData({ ...formData, email: e.target.value });
                                    checkEmail(e.target.value);
                                }}
                                placeholder="이메일을 입력하세요"
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl 
                                         text-white placeholder-gray-500
                                         focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400/20"
                                disabled={isLoading}
                                required
                            />
                            {validation.email.message && (
                                <div className={`mt-1 flex items-center space-x-1 text-sm ${
                                    validation.email.available ? 'text-green-400' : 'text-red-400'
                                }`}>
                                    {validation.email.available && <Check className="w-4 h-4" />}
                                    {validation.email.available === false && <AlertCircle className="w-4 h-4" />}
                                    <span>{validation.email.message}</span>
                                </div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="signup-password" className="block text-sm font-medium text-gray-300 mb-2">
                                비밀번호
                            </label>
                            <input
                                id="signup-password"
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="비밀번호를 입력하세요"
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl 
                                         text-white placeholder-gray-500
                                         focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400/20"
                                disabled={isLoading}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-gray-300 mb-2">
                                비밀번호 확인
                            </label>
                            <input
                                id="signup-confirm-password"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                placeholder="비밀번호를 다시 입력하세요"
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl 
                                         text-white placeholder-gray-500
                                         focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400/20"
                                disabled={isLoading}
                                required
                            />
                        </div>

                        <div className="flex space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="flex-1 py-3 rounded-xl font-semibold 
                                         border-2 border-gray-700 text-gray-300
                                         hover:border-gray-600 hover:bg-gray-800
                                         transition-all"
                                disabled={isLoading}
                            >
                                이전
                            </button>
                            <button 
                                type="submit" 
                                className="flex-1 py-3 rounded-xl font-semibold 
                                         bg-gradient-to-r from-pink-500 to-sky-500 
                                         hover:from-pink-600 hover:to-sky-600
                                         disabled:from-gray-600 disabled:to-gray-700
                                         disabled:cursor-not-allowed
                                         text-white transition-all shadow-lg"
                                disabled={isLoading || !validation.username.available || !validation.email.available}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>처리 중...</span>
                                    </div>
                                ) : (
                                    '가입하기'
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}