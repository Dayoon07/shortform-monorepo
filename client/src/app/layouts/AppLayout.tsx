import { Outlet } from 'react-router-dom';
import AppBar from '../../widgets/common/app-bar/AppBar';
import SideBar from '../../widgets/common/side-bar/SideBar';
import BottomNavBar from '../../widgets/common/bottom-nav-bar/BottomNavBar';

export default function AppLayout() {
    return (
        <div>
            <AppBar />
            <div className="md:flex md:pl-64">
                <SideBar />
                <Outlet />
            </div>
            <BottomNavBar />
        </div>
    );
}