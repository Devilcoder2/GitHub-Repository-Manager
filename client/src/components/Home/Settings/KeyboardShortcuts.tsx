const KeyboardShortcuts = () => {
    return (
        // LIST DOWN ALL THE KEYBOARD SHORTCUTS HERE
        <div>
            <h3 className='text-xl md:text-2xl font-semibold text-center text-gray-800 dark:text-[#ECECEC] mb-4'>
                Keyboard Shortcuts
            </h3>
            <div className='space-y-4'>
                <div className='flex justify-between'>
                    <span className='text-sm md:text-base text-gray-700 dark:text-[#ECECEC]'>
                        Toggle Dark Mode
                    </span>
                    <span className='text-sm md:text-base text-gray-500 dark:text-[#ECECEC]'>
                        Alt + P
                    </span>
                </div>
                <div className='flex justify-between'>
                    <span className='text-sm md:text-base text-gray-700 dark:text-[#ECECEC]'>
                        Show Repo Size
                    </span>
                    <span className='text-sm md:text-base text-gray-500 dark:text-[#ECECEC]'>
                        Alt + R
                    </span>
                </div>
                <div className='flex justify-between'>
                    <span className='text-sm md:text-base text-gray-700 dark:text-[#ECECEC]'>
                        Show Public/Private Tags
                    </span>
                    <span className='text-sm md:text-base text-gray-500 dark:text-[#ECECEC]'>
                        Alt + M
                    </span>
                </div>
                <div className='flex justify-between'>
                    <span className='text-sm md:text-base text-gray-700 dark:text-[#ECECEC]'>
                        Sort Repos Alphabetically
                    </span>
                    <span className='text-sm md:text-base text-gray-500 dark:text-[#ECECEC]'>
                        Alt + 1
                    </span>
                </div>
                <div className='flex justify-between'>
                    <span className='text-sm md:text-base text-gray-700 dark:text-[#ECECEC]'>
                        Sort Repos by Created On
                    </span>
                    <span className='text-sm md:text-base text-gray-500 dark:text-[#ECECEC]'>
                        Alt + 2
                    </span>
                </div>
                <div className='flex justify-between'>
                    <span className='text-sm md:text-base text-gray-700 dark:text-[#ECECEC]'>
                        Sort Repos by Updated On
                    </span>
                    <span className='text-sm md:text-base text-gray-500 dark:text-[#ECECEC]'>
                        Alt + 3
                    </span>
                </div>
                <div className='flex justify-between'>
                    <span className='text-sm md:text-base text-gray-700 dark:text-[#ECECEC]'>
                        Search Repos
                    </span>
                    <span className='text-sm md:text-base text-gray-500 dark:text-[#ECECEC]'>
                        Alt + S
                    </span>
                </div>
            </div>
        </div>
    );
};

export default KeyboardShortcuts;
