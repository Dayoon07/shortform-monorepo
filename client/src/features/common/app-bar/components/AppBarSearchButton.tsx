import { SearchIcon } from "../../../../shared/utils/icon/icon";

export const AppBarSearchButton = ({ 
    onClickChangeState 
}: { onClickChangeState: () => void }) => {
    const searchBtn = `nav-btn flex items-center space-x-3 p-3 
        hover:bg-gray-400/50 rounded-xl transition-colors group`;
    return (
        <button className={searchBtn} aria-label="검색" 
            onClick={() => onClickChangeState()}>
            <SearchIcon />
        </button>
    );
}