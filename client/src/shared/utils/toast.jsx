/**
 * 토스트 메시지를 표시합니다
 * @param {string} message - 표시할 메시지 (HTML 지원)
 * @param {Object} options - 옵션
 * @param {boolean} options.success - 성공 여부 (true: 초록색, false: 빨간색)
 * @param {number} options.duration - 표시 시간 (ms)
 * @param {string} options.position - 위치 ('top', 'bottom', 'center')
 */
export function showToast(message, options = {}) {
    const {
        success = true,
        duration = 3000,
        position = 'top'
    } = options;

    // 기존 토스트 제거
    const existingToast = document.querySelector('.custom-toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.innerHTML = message;
    toast.className = 'custom-toast text-white px-10 py-2 rounded shadow-md z-50 text-center transition-all duration-300';
    
    // 배경색 설정  rgb(107, 114, 128) 회색은 나중에 사용할 일이 있으면 그때 수정
    toast.style.backgroundColor = success ? 'rgb(22, 163, 74)' : 'rgb(239, 68, 68)';
    
    // 위치 설정
    toast.style.position = 'fixed';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    
    switch(position) {
        case 'bottom':
            toast.style.bottom = '80px';
            break;
        case 'center':
            toast.style.top = '50%';
            toast.style.transform = 'translate(-50%, -50%)';
            break;
        default: // 'top'
            toast.style.top = '50px';
    }

    // 페이드 인 애니메이션
    toast.style.opacity = '0';
    document.body.appendChild(toast);
    
    // 애니메이션 시작
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
    });

    // 자동 제거
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

/**
 * 에러 토스트를 표시합니다 (편의 함수)
 */
export function showErrorToast(message, duration = 3000) {
    showToast(message, { success: false, duration });
}

/**
 * 성공 토스트를 표시합니다 (편의 함수)
 */
export function showSuccessToast(message, duration = 3000) {
    showToast(message, { success: true, duration });
}