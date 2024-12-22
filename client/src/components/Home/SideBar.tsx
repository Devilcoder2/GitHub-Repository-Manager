import {
    ArrowRightStartOnRectangleIcon,
    Bars4Icon,
    BookOpenIcon,
    ChevronDownIcon,
    CloudIcon,
    CodeBracketIcon,
    Cog6ToothIcon,
    HomeIcon,
    PhoneIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

interface SideBarProps {
    setIsAuthDone: (value: boolean) => void;
}

const SideBar: React.FC<SideBarProps> = ({ setIsAuthDone }) => {
    const [isSideBarVisible, setIsSideBarVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [selectedItem, setSelectedItem] = useState<number>(0);
    const isMobileRef = useRef(false);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const isMobileLocal = width < 768;
            if (isMobileLocal) {
                setIsMobile(true);
                isMobileRef.current = true;
            } else {
                setIsMobile(false);
                isMobileRef.current = false;
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='flex flex-col w-full md:w-64 bg-white md:h-screen border-r relative scrollbar-hide'>
            <div
                className={`flex justify-between md:justify-around w-full px-4 items-center`}
            >
                <div className='flex items-center justify-center gap-4 h-16'>
                    <img src={'/svg/logo.svg'} alt={'logo'} className={`w-6`} />
                    <h1 className='text-lg font-semibold'>CodeAnt AI</h1>
                </div>

                <div className={`flex md:hidden`}>
                    <button
                        onClick={() =>
                            setIsSideBarVisible((prevState) => !prevState)
                        }
                    >
                        <Bars4Icon className={`size-5`} />
                    </button>
                </div>
            </div>

            <div
                className={`absolute md:static bottom-0 w-full h-screen md:h-full bg-black/10 translate-y-full md:translate-y-0 flex overflow-hidden transition-all`}
                style={{
                    height: isMobile
                        ? isSideBarVisible
                            ? 'calc(100vh - 64px)'
                            : '0px'
                        : '100%',
                }}
            >
                <div
                    className={`bg-white w-full h-fit md:h-full flex flex-col`}
                >
                    <div className='flex flex-col items-center py-4'>
                        <span className='mt-2 text-sm border p-2 rounded-xl flex gap-2 items-center'>
                            <span>UtkarshDhairyaPanwar...</span>
                            <ChevronDownIcon className={`w-5`} />
                        </span>
                    </div>

                    <nav className='flex-1 px-4 py-2 space-y-2'>
                        <Link
                            to='/dashboard'
                            onClick={() => setSelectedItem(0)}
                            className={`flex items-center px-4 py-2 w-full text-sm font-medium  rounded-lg ${
                                selectedItem === 0
                                    ? 'bg-[#1570EF] text-white'
                                    : 'hover:bg-gray-100 text-gray-700'
                            }`}
                        >
                            <span className='flex-shrink-0'>
                                <HomeIcon className={`w-6`} />
                            </span>
                            <span className='ml-3 font-light'>
                                Repositories
                            </span>
                        </Link>
                        <Link
                            to='/ai-code-review'
                            onClick={() => setSelectedItem(1)}
                            className={`flex items-center px-4 py-2 w-full text-sm font-medium  rounded-lg ${
                                selectedItem === 1
                                    ? 'bg-[#1570EF] text-white'
                                    : 'hover:bg-gray-100 text-gray-700'
                            }`}
                        >
                            <span className='flex-shrink-0'>
                                <CodeBracketIcon className={`w-6`} />
                            </span>
                            <span className='ml-3 font-light'>
                                AI Code Review
                            </span>
                        </Link>
                        <Link
                            to='/cloud-security'
                            onClick={() => setSelectedItem(2)}
                            className={`flex items-center px-4 py-2 w-full text-sm font-medium  rounded-lg ${
                                selectedItem === 2
                                    ? 'bg-[#1570EF] text-white'
                                    : 'hover:bg-gray-100 text-gray-700'
                            }`}
                        >
                            <span className='flex-shrink-0'>
                                <CloudIcon className={`w-6`} />
                            </span>
                            <span className='ml-3 font-light'>
                                Cloud Security
                            </span>
                        </Link>
                        <Link
                            to='/how-to-use'
                            onClick={() => setSelectedItem(3)}
                            className={`flex items-center px-4 py-2 w-full text-sm font-medium  rounded-lg ${
                                selectedItem === 3
                                    ? 'bg-[#1570EF] text-white'
                                    : 'hover:bg-gray-100 text-gray-700'
                            }`}
                        >
                            <span className='flex-shrink-0'>
                                <BookOpenIcon className={`w-6`} />
                            </span>
                            <span className='ml-3 font-light'>How to Use</span>
                        </Link>
                        <Link
                            to='/settings'
                            onClick={() => setSelectedItem(4)}
                            className={`flex items-center px-4 py-2 w-full text-sm font-medium  rounded-lg ${
                                selectedItem === 4
                                    ? 'bg-[#1570EF] text-white'
                                    : 'hover:bg-gray-100 text-gray-700'
                            }`}
                        >
                            <span className='flex-shrink-0'>
                                <Cog6ToothIcon className={`w-6`} />
                            </span>
                            <span className='ml-3 font-light'>Settings</span>
                        </Link>
                    </nav>

                    <div className='px-4 py-4'>
                        <button className='flex items-center w-full px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100'>
                            <span className='flex-shrink-0'>
                                <PhoneIcon className={`w-5`} />
                            </span>
                            <span className='ml-3 font-light'>Support</span>
                        </button>
                        <button
                            onClick={() => {
                                localStorage.removeItem('accessToken');
                                setIsAuthDone(false);
                            }}
                            className='flex items-center w-full px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100'
                        >
                            <span className='flex-shrink-0'>
                                <ArrowRightStartOnRectangleIcon
                                    className={`w-5`}
                                />
                            </span>
                            <span className='ml-3'>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
