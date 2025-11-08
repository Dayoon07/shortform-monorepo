import { useState, useEffect, useCallback } from 'react';
import { getSearchHistory } from '../api/searchService';

export function useSearchHistory(userId) {
    const [searchHistory, setSearchHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSearchHistory = useCallback(async () => {
        if (!userId) return;
        
        setIsLoading(true);
        setError(null);
        try {
            const data = await getSearchHistory(userId);
            setSearchHistory(data);
        } catch (err) {
            console.error('검색 기록 불러오기 실패:', err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    const deleteSearchWord = async (id, searchWord) => {
        if (!userId) return;
        
        try {
            await searchService.deleteSearchWord(userId, searchWord);
            setSearchHistory(prev => prev.filter(item => item.id !== id));
        } catch (err) {
            console.error('검색어 삭제 실패:', err);
        }
    };

    useEffect(() => {
        fetchSearchHistory();
    }, [fetchSearchHistory]);

    return {
        searchHistory,
        isLoading,
        error,
        deleteSearchWord
    };
}