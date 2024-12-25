/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import { BASE_URL, convertToPercentages } from '../../../helper';
import { RootState } from '../../../redux/store';

const RepoDetails = () => {
    const { id } = useParams<{ id: string }>(); // Get the repository ID from the URL
    const [repoDetails, setRepoDetails] = useState<any>(null); // Store the repository details
    const [languages, setLanguages] = useState<any>(null); // Store the languages used in the repository
    const [isRepoPrivate, setIsRepoPrivate] = useState(false); // Check if the repository is private

    const isDarkModeOn = useSelector((store: RootState) => store.isDarkModeOn);

    // Fetch the repository details using the repository ID
    const fetchRepoDetails = async (repoId: number) => {
        try {
            const response = await axios.get(`${BASE_URL}/repo/${repoId}`, {
                headers: {
                    Authorization: `${localStorage.getItem('accessToken')}`,
                },
            });
            const languages = await axios.get(response.data.languages_url);
            setRepoDetails(response.data);
            setLanguages(convertToPercentages(languages.data));
        } catch (error) {
            setIsRepoPrivate(true);
            console.error('Error fetching repository details:', error);
        }
    };

    // Fetch the repository details when the component mounts
    useEffect(() => {
        if (id) fetchRepoDetails(Number(id));
    }, [id]);

    // Show a loading spinner while fetching the repository details
    if (!repoDetails && !isRepoPrivate) {
        return (
            <div className='flex justify-center items-center min-h-screen w-full bg-[#FAFAFA] dark:bg-[#383838]'>
                <SyncLoader color={`${isDarkModeOn ? '#ECECEC' : '#1570EF'}`} />
            </div>
        );
    }

    // Show a message if the repository is private
    if (isRepoPrivate) {
        return (
            <div className='flex justify-center items-center min-h-screen bg-gray-100 dark:bg-[#212121]'>
                <span className='text-lg text-gray-600 dark:text-gray-300'>
                    THIS REPOSITORY IS PRIVATE
                </span>
            </div>
        );
    }

    const {
        allow_forking,
        archived,
        created_at,
        default_branch,
        forks_count,
        name,
        open_issues_count,
        size,
        visibility,
        html_url,
    } = repoDetails;

    return (
        <div className=''>
            <div className='p-8 bg-gray-50 dark:bg-[#212121] min-h-screen text-gray-800 dark:text-[#ECECEC]'>
                <div className='mx-auto bg-white dark:bg-[#171717] rounded-lg shadow-md p-6'>
                    {/* HEADER SECTION */}
                    <header className='mb-6'>
                        <h1 className='text-4xl font-bold mb-2'>{name}</h1>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>
                            Created on:{' '}
                            {new Date(created_at).toLocaleDateString()}
                        </p>
                    </header>

                    {/* SHOWS DETAILS OF THE REPOSITORY  */}
                    <div className='grid gap-6 sm:grid-cols-2'>
                        <div className='space-y-4'>
                            <div className='flex justify-between items-center'>
                                <span className='font-semibold'>
                                    Visibility:
                                </span>
                                <span className='px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-200'>
                                    {visibility}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='font-semibold'>
                                    Allow Forking:
                                </span>
                                <span
                                    className={`px-3 py-1 text-sm rounded-full ${
                                        allow_forking
                                            ? 'bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-200'
                                            : 'bg-red-100 text-red-600 dark:bg-red-800 dark:text-red-200'
                                    }`}
                                >
                                    {allow_forking ? 'Yes' : 'No'}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='font-semibold'>Archived:</span>
                                <span
                                    className={`px-3 py-1 text-sm rounded-full ${
                                        archived
                                            ? 'bg-red-100 text-red-600 dark:bg-red-800 dark:text-red-200'
                                            : 'bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-200'
                                    }`}
                                >
                                    {archived ? 'Yes' : 'No'}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='font-semibold'>
                                    Default Branch:
                                </span>
                                <span className='px-3 py-1 text-sm rounded-full bg-purple-100 text-purple-600 dark:bg-purple-800 dark:text-purple-200'>
                                    {default_branch}
                                </span>
                            </div>
                        </div>
                        <div className='space-y-4'>
                            <div className='flex justify-between items-center'>
                                <span className='font-semibold'>
                                    Forks Count:
                                </span>
                                <span className='text-lg font-semibold text-blue-600 dark:text-blue-400'>
                                    {forks_count}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='font-semibold'>
                                    Open Issues:
                                </span>
                                <span className='text-lg font-semibold text-red-600 dark:text-red-400'>
                                    {open_issues_count}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='font-semibold'>Size:</span>
                                <span>{size} KB</span>
                            </div>
                        </div>
                    </div>

                    {/* SHOWS THE LANGUAGES USED IN THE REPOSITORY  */}
                    {languages && (
                        <div className='mt-6'>
                            <h2 className='text-xl font-semibold mb-4'>
                                Languages Used:
                            </h2>
                            <div className='space-y-2'>
                                {Object.entries(languages).map(
                                    ([language, percentage]) => (
                                        <div
                                            key={language}
                                            className='flex justify-between items-center'
                                        >
                                            <span className='font-medium'>
                                                {language}:
                                            </span>
                                            <span className='text-gray-600 dark:text-gray-400'>
                                                {percentage as number}%
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}

                    {/* FOOTER SECTION  */}
                    <footer className='mt-6 flex justify-end'>
                        <a
                            href={html_url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='px-6 py-2 bg-blue-600 dark:bg-[#383838] dark:hover:bg-[#212121] text-white text-sm font-semibold rounded-md hover:bg-blue-700 '
                        >
                            View on GitHub
                        </a>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default RepoDetails;
