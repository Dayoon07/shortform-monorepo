import { useState, useEffect, useCallback } from 'react';
import { deleteSearchWord, getSearchHistory } from '../api/searchService';


export function useSearchHistory(userId) {
    const [searchHistory, setSearchHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSearchHistoryHook = useCallback(async () => {
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

    const deleteSearchWordHook = async (id, searchWord) => {
        if (!userId) return;
        
        try {
            const what_the = await deleteSearchWord(userId, searchWord);
            if (what_the) {
                setSearchHistory(prev => prev.filter(item => item.id !== id));
            }
        } catch (err) {
            console.error('검색어 삭제 실패:', err);
        }
    };

    useEffect(() => {
        fetchSearchHistoryHook();
    }, [fetchSearchHistoryHook]);

    return {
        searchHistory,
        isLoading,
        error,
        deleteSearchWordHook
    };
}