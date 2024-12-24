/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import { useEffect, useRef, useState } from 'react';

interface LayoutProps {
    setIsAuthDone: (value: boolean) => void;
}
const Layout: React.FC<LayoutProps> = ({ setIsAuthDone }) => {
    const [page, setPage] = useState(1);
    const listRef = useRef<HTMLDivElement>(null);

    const handleScrollChange = () => {
        const listElement = listRef.current as HTMLDivElement;
        const isAtBottom =
            Math.ceil(listElement.scrollTop + listElement.clientHeight) >=
            listElement.scrollHeight - 10;

        if (isAtBottom) {
            setPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        const debounce = (func: (...args: any[]) => void, delay: number) => {
            let timer: ReturnType<typeof setTimeout>;
            return (...args: any[]) => {
                clearTimeout(timer);
                timer = setTimeout(() => func(...args), delay);
            };
        };

        const debouncedScroll = debounce(handleScrollChange, 100);

        if (listRef.current) {
            listRef.current.addEventListener('scroll', debouncedScroll);
        }

        return () => {
            if (listRef.current) {
                listRef.current.removeEventListener('scroll', debouncedScroll);
            }
        };
    }, [listRef]);

    return (
        <div
            className={`flex w-full h-full flex-col md:flex-row scrollbar-hide`}
        >
            <SideBar setIsAuthDone={setIsAuthDone} />
            <div
                ref={listRef}
                className={`h-screen w-full box-border overflow-y-auto`}
            >
                <Outlet context={{ page }} />
            </div>
        </div>
    );
};

export default Layout;
