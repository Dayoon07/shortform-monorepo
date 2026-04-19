/**
 * 주어진 날짜 문자열(`dateString`)을 현재 시각 기준으로
 * 상대적 시간(예: "방금 전", "5분 전", "3일 전") 또는
 * 일정 기간이 지났을 경우 절대 날짜(예: "2025.11.06")로 변환합니다.
 *
 * @param {string} dateString - 날짜 문자열 (예: "25/11/06 12:39:28.273176")
 * @returns {string} 사람이 읽기 좋은 날짜 표현 (예: "방금 전", "3시간 전", "2025.11.06")
 *
 * @example
 * formatRelativeOrAbsoluteDate("2025-11-06T12:39:28Z"); // "5일 전"
 * formatRelativeOrAbsoluteDate("25/11/06 12:39:28.273176"); // "2025.11.06"
 * formatRelativeOrAbsoluteDate("invalid-date"); // "날짜 없음"
 */
export const defaultFormatDate = (dateString: string): string => {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return '날짜 없음';
        }
        
        const now = new Date();
        const diff = now.getTime() - date.getTime();
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

export const formatCommentDate = (time: Date | string): string => {
    const target = typeof time === "string" ? new Date(time) : time;
    const now = new Date();

    const seconds = Math.floor((now.getTime() - target.getTime()) / 1000);

    if (seconds < 60) {
        return "방금 전";
    } else if (seconds < 3600) {
        return `${Math.floor(seconds / 60)}분 전`;
    } else if (seconds < 86400) {
        return `${Math.floor(seconds / 3600)}시간 전`;
    } else if (seconds < 604800) {
        return `${Math.floor(seconds / 86400)}일 전`;
    } else if (seconds < 2592000) { // 약 30일
        return `${Math.floor(seconds / 604800)}주 전`;
    } else if (seconds < 31536000) { // 약 1년
        return `${Math.floor(seconds / 2592000)}개월 전`;
    } else {
        return `${Math.floor(seconds / 31536000)}년 전`;
    }
}

export const formatVideoGridViews = (value: number): string => {
    if (value >= 1_000_000_000) {
        return `${(value / 1_000_000_000).toFixed(1)}B`;
    } else if (value >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(1)}M`;
    } else if (value >= 1_000) {
        return `${(value / 1_000).toFixed(1)}K`;
    } else {
        return `${value}회`;
    }
}

export const formatNumberWithComma = (value: number): string => {
    return value.toLocaleString("ko-KR");
}

















