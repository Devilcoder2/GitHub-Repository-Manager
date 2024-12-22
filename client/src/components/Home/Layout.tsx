import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';

interface LayoutProps {
    setIsAuthDone: (value: boolean) => void;
}
const Layout: React.FC<LayoutProps> = ({ setIsAuthDone }) => {
    return (
        <div
            className={`flex w-full h-full flex-col md:flex-row scrollbar-hide`}
        >
            <SideBar setIsAuthDone={setIsAuthDone} />
            <div className={`h-screen w-full box-border overflow-y-auto`}>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
