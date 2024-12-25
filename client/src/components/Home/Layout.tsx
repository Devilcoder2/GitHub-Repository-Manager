/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import { useEffect, useRef, useState } from 'react';

interface LayoutProps {
    setIsAuthDone: (value: boolean) => void;
}
const Layout: React.FC<LayoutProps> = ({ setIsAuthDone }) => {
    const [page, setPage] = useState(1); // Page number for infinite scrolling
    const listRef = useRef<HTMLDivElement>(null); // Reference to the list element for getting the position of scrollbar

    // Function to handle infinite scrolling
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
        // Debounce function to handle scroll events
        const debounce = (func: (...args: any[]) => void, delay: number) => {
            let timer: ReturnType<typeof setTimeout>;
            return (...args: any[]) => {
                clearTimeout(timer);
                timer = setTimeout(() => func(...args), delay);
            };
        };

        const debouncedScroll = debounce(handleScrollChange, 100);

        // Add event listener for scroll event
        if (listRef.current) {
            listRef.current.addEventListener('scroll', debouncedScroll);
        }

        // Remove event listener
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
            {/* SIDEBAR  */}
            <SideBar setIsAuthDone={setIsAuthDone} />

            {/* CONTENT */}
            <div
                ref={listRef}
                className={`h-screen w-full box-border overflow-y-auto`}
            >
                <Outlet context={{ page, setPage }} />
            </div>
        </div>
    );
};

export default Layout;
