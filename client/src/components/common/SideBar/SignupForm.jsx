import { useState } from "react";
import { validateUsername, validateEmail } from "../../../features/user/api/validationService";
import ValidationMessage from "./ValidationMessage";

export default function SignupForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [validation, setValidation] = useState({
    username: { available: true, message: '', color: '' },
    email: { available: true, message: '', color: '' }
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameChange = async (value) => {
    setFormData(prev => ({ ...prev, username: value }));
    
    if (!value) {
      setValidation(prev => ({
        ...prev,
        username: { available: false, message: '이름을 입력해주세요.', color: 'red' }
      }));
      return;
    }

    try {
      const available = await validateUsername(value);
      setValidation(prev => ({
        ...prev,
        username: {
          available,
          message: available ? '사용 가능한 이름입니다.' : '이미 사용 중인 이름입니다.',
          color: available ? 'green' : 'red'
        }
      }));
    } catch (error) {
      console.error('Username validation error:', error);
    }
  };

  const handleEmailChange = async (value) => {
    setFormData(prev => ({ ...prev, email: value }));
    
    if (!value) {
      setValidation(prev => ({
        ...prev,
        email: { available: false, message: '이메일을 입력해주세요.', color: 'red' }
      }));
      return;
    }

    try {
      const available = await validateEmail(value);
      setValidation(prev => ({
        ...prev,
        email: {
          available,
          message: available ? '사용 가능한 이메일입니다.' : '이미 사용 중인 이메일입니다.',
          color: available ? 'green' : 'red'
        }
      }));
    } catch (error) {
      console.error('Email validation error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.username || !formData.password || !formData.confirmPassword) {
      alert('모든 정보를 입력해주세요.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!validation.username.available || !validation.email.available) {
      alert('입력 정보를 확인해주세요.');
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
        <input
          type="text"
          value={formData.username}
          onChange={(e) => handleUsernameChange(e.target.value)}
          placeholder="사용자명"
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-gray-400 focus:outline-none"
          disabled={isLoading}
        />
        <ValidationMessage 
          message={validation.username.message}
          color={validation.username.color}
        />
      </div>
      
      <div>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleEmailChange(e.target.value)}
          placeholder="이메일"
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-gray-400 focus:outline-none"
          disabled={isLoading}
        />
        <ValidationMessage 
          message={validation.email.message}
          color={validation.email.color}
        />
      </div>
      
      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="비밀번호"
        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-gray-400 focus:outline-none"
        disabled={isLoading}
      />
      
      <input
        type="password"
        value={formData.confirmPassword}
        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        placeholder="비밀번호 확인"
        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-gray-400 focus:outline-none"
        disabled={isLoading}
      />
      
      <button 
        type="submit" 
        className="w-full py-3 rounded-xl font-semibold bg-gray-700 hover:bg-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? '처리 중...' : '가입하기'}
      </button>
    </form>
  );
}