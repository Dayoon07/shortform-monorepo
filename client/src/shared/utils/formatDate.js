/**
 * 날짜 포맷팅 함수
 * 
 * 주어진 날짜 문자열(`dateString`)을 현재 시각 기준으로
 * 상대적 시간(예: "방금 전", "5분 전", "3일 전") 또는
 * 일정 기간이 지났을 경우 절대 날짜(예: "2025.11.06")로 변환합니다.
 *
 * @param {string} dateString - 날짜 문자열 (예: "25/11/06 12:39:28.273176")
 * @returns {string} 사람이 읽기 좋은 날짜 표현 (예: "방금 전", "3시간 전", "2025.11.06")
 *
 * @example
 * formatDate("2025-11-06T12:39:28Z"); // "5일 전"
 * formatDate("25/11/06 12:39:28.273176"); // "2025.11.06"
 * formatDate("invalid-date"); // "날짜 없음"
 */
export const formatDate = (dateString) => {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return '날짜 없음';
        }
        
        const now = new Date();
        const diff = now - date;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        if (seconds < 60) return '방금 전';
        if (minutes < 60) return `${minutes}분 전`;
        if (hours < 24) return `${hours}시간 전`;
        if (days < 7) return `${days}일 전`;
        
        // 1주일 이상이면 날짜 표시
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        return `${year}.${month}.${day}`;
    } catch (error) {
        console.error('Date formatting error:', error);
        return '날짜 없음';
    }
};