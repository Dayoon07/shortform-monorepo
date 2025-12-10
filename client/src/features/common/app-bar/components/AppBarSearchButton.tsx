import { SearchIcon } from "../../../../widgets/icon/icon";

interface AppBarSearchButtonProps {
    onClickChangeState: () => void,
    onClickPlaySound: () => void
}

export const AppBarSearchButton = ({
    onClickChangeState,
    onClickPlaySound
}: AppBarSearchButtonProps) => {
    const searchBtn = `
        nav-btn flex items-center space-x-3 p-3 
        hover:bg-gray-400/50 rounded-xl transition-colors group
    `;
    return (
        <button 
            aria-label="검색" 
            className={searchBtn}
            onClick={() => {
                onClickChangeState();
                onClickPlaySound();
            }}
        >
            <SearchIcon />
        </button>
    );
}