import { useState, useEffect, useCallback } from 'react';
import { deleteSearchWord, getSearchHistory } from '../api/searchService';
import { SearchHistory } from '../../../entities/search/ui/SearchHistory';
import { User } from '../../../entities/user/model/User';

export function useSearchHistory(user: User | null) {
    const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const deleteSearchWordHook = async (id: number, searchWord: string) => {
        if (!user?.id) return;
        
        try {
            const w = await deleteSearchWord(searchWord);
            if (w) setSearchHistory(prev => prev.filter(item => item.id !== id));
        } catch (err) {
            console.error('검색어 삭제 실패:', err);
        }
    };

    const setupSearchHistoryLoadData = useCallback(async () => {
        if (!user?.id) return;
        
        setIsLoading(true);
        setError(null);
        try {
            const data = await getSearchHistory(user?.id);
            setSearchHistory(data);
        } catch (err) {
            console.error('검색 기록 불러오기 실패:', err);
            setError(err as unknown as string);
        } finally {
            setIsLoading(false);
        }
    }, [user?.id]);

    useEffect(() => {
        setupSearchHistoryLoadData();
    }, [setupSearchHistoryLoadData]);

    return {
        searchHistory,
        isLoading,
        error,
        deleteSearchWordHook
    };
}