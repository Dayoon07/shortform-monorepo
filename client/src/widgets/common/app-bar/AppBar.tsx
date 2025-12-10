import { useState } from 'react';
import { useUser } from '../../../shared/context/UserContext';
import SearchModal from '../../../features/search/components/SearchModal';
import { useClickSound } from '../../../shared/hooks/useClickSound';
import { clickSound } from '../../../shared/constants/Mp3List';
import { Logo } from '../../../shared/components/common/Logo';
import { AppBarProfileDropdown } from '../../../features/common/app-bar/components/AppBarProfileDropdown';
import { AppBarSearchButton } from '../../../features/common/app-bar/components/AppBarSearchButton';

export default function AppBar() {
    const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
    const handlePlayClickSound = useClickSound(clickSound);
    const { user } = useUser();

    const nav = `sticky top-0 left-0 bg-gray-200/90 backdrop-blur-sm 
        border-b md:px-4 px-3 md:py-2 py-1 md:hidden 
        z-[41] flex justify-between items-center`
    ;
    return (
        <>
            <nav className={nav}>
                <Logo />
                <div className="flex justify-around items-center gap-2">
                    <AppBarSearchButton
                        onClickChangeState={() => setShowSearchModal(true)}
                        onClickPlaySound={handlePlayClickSound}
                    />
                    <AppBarProfileDropdown user={user} />
                </div>
            </nav>

            {showSearchModal && (
                <SearchModal 
                    user={user}
                    onClose={() => setShowSearchModal(false)} 
                />
            )}
        </>
    );
}
