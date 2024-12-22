import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';

const Layout = () => {
    return (
        <div
            className={`flex w-full h-full flex-col md:flex-row scrollbar-hide`}
        >
            <SideBar />
            <div className={`h-screen w-full box-border overflow-y-auto`}>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
