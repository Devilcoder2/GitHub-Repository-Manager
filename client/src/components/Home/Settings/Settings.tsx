import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SyncLoader } from 'react-spinners';
import { BASE_URL } from '../../../helper';
import {
    changeSortingOrder,
    toggleDarkMode,
    toggleRepoSize,
    toggleShowTag,
} from '../../../redux/actionCreators';

import { UserDetails } from '../../../redux/interfaces';
import { RootState } from '../../../redux/store';
import KeyboardShortcuts from './KeyboardShortcuts';
const Settings = () => {
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null); // Store the user details

    const sortingOrder = useSelector((state: RootState) => state.sortingOrder);
    const isDarkModeOn = useSelector((state: RootState) => state.isDarkModeOn);
    const isRepoSizeVisible = useSelector(
        (state: RootState) => state.isRepoSizeVisible
    );
    const isTagsVisible = useSelector(
        (state: RootState) => state.isTagsVisible
    );

    const disptach = useDispatch();

    // Fetch the user details 
    useEffect(() => {
        fetchUserDetails();
    }, []);

    // Fetch the user details from the server
    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/user`, {
                headers: {
                    Authorization: `${localStorage.getItem('accessToken')}`,
                },
            });

            setUserDetails(response.data);
        } catch (error) {
            console.log('Error fetching user details:', error);
        }
    };

    // Toggle the visibility of the repository size
    const isRepoSizeVisibleChangeHandler = () => {
        disptach(toggleRepoSize(isRepoSizeVisible));
    };

    // Toggle the dark mode
    const darkModeChangeHandler = () => {
        disptach(toggleDarkMode(isDarkModeOn));
    };

    // Toggle the visibility of the public/private tags
    const isTagsVisibleChangeHandler = () => {
        disptach(toggleShowTag(isTagsVisible));
    };

    // Show a loading spinner while fetching the user details
    if (!userDetails) {
        return (
            <div className='flex justify-center items-center min-h-screen w-full bg-[#FAFAFA] dark:bg-[#383838]'>
                <SyncLoader color={`${isDarkModeOn ? '#ECECEC' : '#1570EF'}`} />
            </div>
        );
    }

    const {
        avatar_url,
        bio,
        created_at,
        followers,
        following,
        html_url,
        name,
        public_repos,
        total_private_repos,
        two_factor_authentication,
        plan,
    } = userDetails;

    return (
        <div className={`${isDarkModeOn ? 'dark' : ''}`}>
            <div
                className={`flex flex-col items-center justify-start p-4 w-full min-h-screen dark:bg-[#171717] dark:text-[#ECECEC]`}
            >
                {/* USER DETAILS SECTION  */}
                <div className='bg-white dark:bg-[#212121] rounded-lg shadow-md w-full p-6'>
                    <div className='flex flex-col md:flex-row items-center gap-6'>
                        <img
                            src={avatar_url}
                            alt={`${name}'s avatar`}
                            className='w-24 h-24 rounded-full border'
                        />

                        <div className='text-center md:text-left'>
                            <h2 className='text-2xl font-semibold'>{name}</h2>
                            <p className='text-gray-600 dark:text-[#ECECEC]'>
                                {bio || 'No bio available.'}
                            </p>
                            <p className='text-sm text-gray-500'>
                                Joined on{' '}
                                {new Date(created_at).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <div className='mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 text-center'>
                        <div className='bg-gray-50 dark:bg-[#171717] p-4 rounded-lg shadow-sm'>
                            <p className='text-lg font-bold'>{followers}</p>
                            <p className='text-sm text-gray-500 dark:text-[#ECECEC]'>
                                Followers
                            </p>
                        </div>
                        <div className='bg-gray-50 dark:bg-[#171717] p-4 rounded-lg shadow-sm'>
                            <p className='text-lg font-bold'>{following}</p>
                            <p className='text-sm text-gray-500 dark:text-[#ECECEC]'>
                                Following
                            </p>
                        </div>
                        <div className='bg-gray-50 dark:bg-[#171717] p-4 rounded-lg shadow-sm'>
                            <p className='text-lg font-bold'>{public_repos}</p>
                            <p className='text-sm text-gray-500 dark:text-[#ECECEC]'>
                                Public Repos
                            </p>
                        </div>
                        <div className='bg-gray-50 dark:bg-[#171717] p-4 rounded-lg shadow-sm'>
                            <p className='text-lg font-bold'>
                                {total_private_repos}
                            </p>
                            <p className='text-sm text-gray-500 dark:text-[#ECECEC]'>
                                Private Repos
                            </p>
                        </div>
                        <div className='bg-gray-50 dark:bg-[#171717] p-4 rounded-lg shadow-sm col-span-2 md:col-span-1'>
                            <p className='text-lg font-bold'>
                                {two_factor_authentication
                                    ? 'Enabled'
                                    : 'Disabled'}
                            </p>
                            <p className='text-sm text-gray-500 dark:text-[#ECECEC]'>
                                2FA
                            </p>
                        </div>
                        <div className='bg-gray-50 dark:bg-[#171717] p-4 rounded-lg shadow-sm col-span-2 md:col-span-1'>
                            <p className='text-lg font-bold'>
                                {plan ? plan?.name?.toUpperCase() : 'Free'}
                            </p>
                            <p className='text-sm text-gray-500 dark:text-[#ECECEC]'>
                                Current Plan
                            </p>
                        </div>
                    </div>

                    <div className='mt-6 text-center'>
                        <a
                            href={html_url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-block px-6 py-2 bg-[#1570EF] dark:bg-[#171717] text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:dark:dark:bg-[#383838]'
                        >
                            Visit Profile on GitHub
                        </a>
                    </div>
                </div>

                {/* SETTINGS SECTION  */}
                <div className='bg-white dark:bg-[#212121] rounded-lg shadow-lg w-full mt-8 p-6 md:p-8'>
                    <h3 className='text-xl md:text-2xl font-semibold text-center text-gray-800 dark:text-[#ECECEC] mb-4'>
                        User Settings
                    </h3>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                        <div className='flex justify-between items-center border-b pb-4 dark:border-gray-600'>
                            <span className='text-sm md:text-base text-gray-700 dark:text-[#ECECEC]'>
                                Dark Mode
                            </span>
                            <label className='relative inline-flex items-center cursor-pointer'>
                                <input
                                    type='checkbox'
                                    className='sr-only peer'
                                    checked={isDarkModeOn}
                                    onChange={darkModeChangeHandler}
                                />
                                <div className='w-10 h-5 bg-gray-300 dark:bg-[#383838] rounded-full peer-checked:bg-[#1570EF] peer-focus:ring-2 peer-focus:ring-[#1570EF] dark:peer-focus:ring-[#383838] dark:peer-checked:bg-[#383838] transition-all'></div>
                                <div className='w-4 h-4 bg-white dark:bg-[#ECECEC] rounded-full absolute top-0.5 left-1 peer-checked:left-5 transition-all'></div>
                            </label>
                        </div>

                        <div className='flex justify-between items-center border-b pb-4 dark:border-gray-600'>
                            <span className='text-sm md:text-base text-gray-700 dark:text-[#ECECEC]'>
                                Show Repo Size
                            </span>
                            <label className='relative inline-flex items-center cursor-pointer'>
                                <input
                                    type='checkbox'
                                    className='sr-only peer'
                                    checked={isRepoSizeVisible}
                                    onChange={isRepoSizeVisibleChangeHandler}
                                />
                                <div className='w-10 h-5 bg-gray-300 dark:bg-[#383838] rounded-full peer-checked:bg-[#1570EF]  peer-focus:ring-2 peer-focus:ring-[#1570EF] dark:peer-focus:ring-[#383838] dark:peer-checked:bg-[#383838] transition-all'></div>
                                <div className='w-4 h-4 bg-white dark:bg-[#ECECEC] rounded-full absolute top-0.5 left-1 peer-checked:left-5 transition-all'></div>
                            </label>
                        </div>

                        <div className='flex justify-between items-center border-b pb-4 dark:border-gray-600'>
                            <span className='text-sm md:text-base text-gray-700 dark:text-[#ECECEC]'>
                                Show Public/Private Tags
                            </span>
                            <label className='relative inline-flex items-center cursor-pointer'>
                                <input
                                    type='checkbox'
                                    className='sr-only peer'
                                    checked={isTagsVisible}
                                    onChange={isTagsVisibleChangeHandler}
                                />
                                <div className='w-10 h-5 bg-gray-300 dark:bg-[#383838] rounded-full peer-checked:bg-[#1570EF] peer-focus:ring-2 peer-focus:ring-[#1570EF] dark:peer-focus:ring-[#383838] dark:peer-checked:bg-[#383838] transition-all'></div>
                                <div className='w-4 h-4 bg-white dark:bg-[#ECECEC] rounded-full absolute top-0.5 left-1 peer-checked:left-5 transition-all'></div>
                            </label>
                        </div>

                        <div className='flex justify-between items-center border-b pb-4 dark:border-gray-600'>
                            <span className='text-sm md:text-base text-gray-700 dark:text-[#ECECEC]'>
                                Sort Repos
                            </span>
                            <select
                                className='bg-gray-100 dark:bg-[#383838] dark:text-gray-200 border border-gray-300 dark:border-gray-600 text-sm rounded-md p-2.5 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#1570EF] dark:focus:ring-[#383838] focus:border-[#1570EF] dark:focus:border-[#383838] transition ease-in-out duration-200'
                                value={sortingOrder}
                                onChange={(e) =>
                                    disptach(
                                        changeSortingOrder(
                                            Number(e.target.value)
                                        )
                                    )
                                }
                            >
                                <option className='dark:bg-[#171717]' value={0}>
                                    Alphabetical
                                </option>
                                <option className='dark:bg-[#171717]' value={1}>
                                    Created on
                                </option>
                                <option className='dark:bg-[#171717]' value={2}>
                                    Updated on
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* KEYBOARD SHORTCUTS SECTION  */}
                <div className='bg-white dark:bg-[#212121] rounded-lg shadow-lg w-full mt-8 p-6 md:p-8'>
                    <KeyboardShortcuts />
                </div>
            </div>
        </div>
    );
};

export default Settings;
