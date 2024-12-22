import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SyncLoader } from 'react-spinners';
import { RootState } from '../../redux/store';
import {
    toggleDarkMode,
    toggleRepoSize,
    toggleShowTag,
} from '../../redux/actionCreators';

// Define the structure of the userDetails object
interface UserDetails {
    avatar_url: string;
    bio: string;
    created_at: string;
    followers: number;
    following: number;
    html_url: string;
    name: string;
    public_repos: number;
    total_private_repos: number;
    two_factor_authentication: boolean;
    plan: {
        name: string;
        space: number;
        collaborators: number;
        private_repos: number;
    };
}

const Settings = () => {
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [sortOption, setSortOption] = useState('alphabetical'); // Sorting repos option

    const isRepoSizeVisible = useSelector(
        (state: RootState) => state.isRepoSizeVisible
    );

    const isDarkModeOn = useSelector((state: RootState) => state.isDarkModeOn);
    const isTagsVisible = useSelector(
        (state: RootState) => state.isTagsVisible
    );

    console.log(isTagsVisible);

    const disptach = useDispatch();

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get('http://localhost:5000/user', {
                headers: {
                    Authorization: `${localStorage.getItem('accessToken')}`,
                },
            });

            setUserDetails(response.data);
            console.log(response.data);
        } catch (error) {
            console.log('Error fetching user details:', error);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const isRepoSizeVisibleChangeHandler = () => {
        console.log('CHANGING');
        disptach(toggleRepoSize(isRepoSizeVisible));
    };

    const darkModeChangeHandler = () => {
        disptach(toggleDarkMode(isDarkModeOn));
    };

    const isTagsVisibleChangeHandler = () => {
        disptach(toggleShowTag(isTagsVisible));
    };

    if (!userDetails) {
        return (
            <div className='flex justify-center items-center min-h-screen w-full bg-[#FAFAFA]'>
                <SyncLoader color='#1570EF' />
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
        <div
            className={`flex flex-col items-center justify-start p-4 bg-gray-100 w-full min-h-screen ${
                isDarkModeOn
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-black'
            }`}
        >
            {/* User Details Section */}
            <div className='bg-white rounded-lg shadow-md w-full p-6'>
                <div className='flex flex-col md:flex-row items-center gap-6'>
                    {/* Avatar */}
                    <img
                        src={avatar_url}
                        alt={`${name}'s avatar`}
                        className='w-24 h-24 rounded-full border'
                    />

                    {/* User Info */}
                    <div className='text-center md:text-left'>
                        <h2 className='text-2xl font-semibold'>{name}</h2>
                        <p className='text-gray-600'>
                            {bio || 'No bio available.'}
                        </p>
                        <p className='text-sm text-gray-500'>
                            Joined on{' '}
                            {new Date(created_at).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className='mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 text-center'>
                    <div className='bg-gray-50 p-4 rounded-lg shadow-sm'>
                        <p className='text-lg font-bold'>{followers}</p>
                        <p className='text-sm text-gray-500'>Followers</p>
                    </div>
                    <div className='bg-gray-50 p-4 rounded-lg shadow-sm'>
                        <p className='text-lg font-bold'>{following}</p>
                        <p className='text-sm text-gray-500'>Following</p>
                    </div>
                    <div className='bg-gray-50 p-4 rounded-lg shadow-sm'>
                        <p className='text-lg font-bold'>{public_repos}</p>
                        <p className='text-sm text-gray-500'>Public Repos</p>
                    </div>
                    <div className='bg-gray-50 p-4 rounded-lg shadow-sm'>
                        <p className='text-lg font-bold'>
                            {total_private_repos}
                        </p>
                        <p className='text-sm text-gray-500'>Private Repos</p>
                    </div>
                    <div className='bg-gray-50 p-4 rounded-lg shadow-sm col-span-2 md:col-span-1'>
                        <p className='text-lg font-bold'>
                            {two_factor_authentication ? 'Enabled' : 'Disabled'}
                        </p>
                        <p className='text-sm text-gray-500'>2FA</p>
                    </div>
                    <div className='bg-gray-50 p-4 rounded-lg shadow-sm col-span-2 md:col-span-1'>
                        <p className='text-lg font-bold'>
                            {plan ? plan?.name?.toUpperCase() : 'Free'}
                        </p>
                        <p className='text-sm text-gray-500'>Current Plan</p>
                    </div>
                </div>

                {/* Profile Button */}
                <div className='mt-6 text-center'>
                    <a
                        href={html_url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-block px-6 py-2 bg-[#1570EF] text-white font-semibold rounded-lg shadow-md hover:bg-blue-700'
                    >
                        Visit Profile on GitHub
                    </a>
                </div>
            </div>

            <div className='bg-white rounded-lg shadow-lg w-full mt-8 p-6 md:p-8'>
                <h3 className='text-xl md:text-2xl font-semibold text-center text-gray-800 mb-4'>
                    User Settings
                </h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                    {/* Dark/Light Mode Toggle */}
                    <div className='flex justify-between items-center border-b pb-4'>
                        <span className='text-sm md:text-base text-gray-700'>
                            Dark Mode
                        </span>
                        <label className='relative inline-flex items-center cursor-pointer'>
                            <input
                                type='checkbox'
                                className='sr-only peer'
                                checked={isDarkModeOn}
                                onChange={darkModeChangeHandler}
                            />
                            <div className='w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-[#1570EF] peer-focus:ring-2 peer-focus:ring-[#1570EF] transition-all'></div>
                            <div className='w-4 h-4 bg-white rounded-full absolute top-0.5 left-1 peer-checked:left-5 transition-all'></div>
                        </label>
                    </div>

                    {/* Show Repo Size */}
                    <div className='flex justify-between items-center border-b pb-4'>
                        <span className='text-sm md:text-base text-gray-700'>
                            Show Repo Size
                        </span>
                        <label className='relative inline-flex items-center cursor-pointer'>
                            <input
                                type='checkbox'
                                className='sr-only peer'
                                checked={isRepoSizeVisible}
                                onChange={isRepoSizeVisibleChangeHandler}
                            />
                            <div className='w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-[#1570EF] peer-focus:ring-2 peer-focus:ring-[#1570EF] transition-all'></div>
                            <div className='w-4 h-4 bg-white rounded-full absolute top-0.5 left-1 peer-checked:left-5 transition-all'></div>
                        </label>
                    </div>

                    {/* Show Public/Private Tags */}
                    <div className='flex justify-between items-center border-b pb-4'>
                        <span className='text-sm md:text-base text-gray-700'>
                            Show Public/Private Tags
                        </span>
                        <label className='relative inline-flex items-center cursor-pointer'>
                            <input
                                type='checkbox'
                                className='sr-only peer'
                                checked={isTagsVisible}
                                onChange={isTagsVisibleChangeHandler}
                            />
                            <div className='w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-[#1570EF] peer-focus:ring-2 peer-focus:ring-[#1570EF] transition-all'></div>
                            <div className='w-4 h-4 bg-white rounded-full absolute top-0.5 left-1 peer-checked:left-5 transition-all'></div>
                        </label>
                    </div>

                    {/* Sorting Repos */}
                    <div className='flex justify-between items-center border-b pb-4'>
                        <span className='text-sm md:text-base text-gray-700'>
                            Sort Repos
                        </span>
                        <select
                            className='bg-gray-100 border border-gray-300 text-sm rounded-md p-2.5 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#1570EF] focus:border-[#1570EF] transition ease-in-out duration-200'
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <option value='alphabetical'>Alphabetical</option>
                            <option value='created_on'>Created on</option>
                            <option value='updated_on'>Updated on</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Keyboard Shortcuts Section */}
            <div className='bg-white rounded-lg shadow-lg w-full mt-8 p-6 md:p-8'>
                <h3 className='text-xl md:text-2xl font-semibold text-center text-gray-800 mb-4'>
                    Keyboard Shortcuts
                </h3>
                <div className='space-y-4'>
                    <div className='flex justify-between'>
                        <span className='text-sm md:text-base text-gray-700'>
                            Toggle Dark Mode
                        </span>
                        <span className='text-sm md:text-base text-gray-500'>
                            Alt + P
                        </span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-sm md:text-base text-gray-700'>
                            Show Repo Size
                        </span>
                        <span className='text-sm md:text-base text-gray-500'>
                            Alt + R
                        </span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-sm md:text-base text-gray-700'>
                            Show Public/Private Tags
                        </span>
                        <span className='text-sm md:text-base text-gray-500'>
                            Alt + M
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
