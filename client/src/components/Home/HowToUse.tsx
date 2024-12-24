const HowToUse = () => {
    return (
        <div className='p-8 bg-gray-50 dark:bg-[#212121] min-h-screen text-gray-800 dark:text-[#ECECEC]'>
            <div className='mx-auto bg-white dark:bg-[#171717] rounded-lg shadow-md p-6 '>
                <h1 className='text-3xl font-bold mb-4'>How to Use</h1>
                <p className='text-gray-700 dark:text-gray-300 mb-6'>
                    This application is designed to help you view detailed
                    information about GitHub repositories. Follow the
                    instructions below to make the most of its features.
                </p>
                <ol className='list-decimal list-inside space-y-4'>
                    <li>
                        <span className='font-semibold mr-1 '>
                            Browse Repositories:
                        </span>
                        Use the repository list page to search and select a
                        repository of your choice.
                    </li>
                    <li>
                        <span className='font-semibold mr-1'>
                            View Details:
                        </span>
                        Click on a repository to view detailed information,
                        including its visibility, default branch, and language
                        usage.
                    </li>
                    <li>
                        <span className='font-semibold mr-1'>
                            Explore Languages:
                        </span>
                        See the percentage breakdown of the programming
                        languages used in the repository.
                    </li>
                    <li>
                        <span className='font-semibold mr-1'>
                            Visit on GitHub:
                        </span>
                        Use the "View on GitHub" button to navigate directly to
                        the repository's GitHub page.
                    </li>
                </ol>
                <p className='mt-6 text-gray-700 dark:text-gray-300'>
                    This app also supports both light and dark themes. Toggle
                    your device's theme settings to see the seamless transition.
                </p>
            </div>
        </div>
    );
};

export default HowToUse;
