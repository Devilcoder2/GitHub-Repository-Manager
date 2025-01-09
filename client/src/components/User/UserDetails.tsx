import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserDetailsInterface } from '../../redux/interfaces';

const UserDetails = () => {
    const [userDetails, setUserDetails] = useState<UserDetailsInterface | null>(
        null
    );
    const { id } = useParams();

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(
                `https://api.github.com/users/${id}`
            );
            setUserDetails(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);

    if (!userDetails) {
        return <div>Loading...</div>;
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
        two_factor_authentication,
        plan,
    } = userDetails;

    return (
        <div className='flex flex-col items-center justify-start p-4 w-full min-h-screen dark:bg-[#171717] dark:text-[#ECECEC]'>
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
                    <div className='bg-gray-50 dark:bg-[#171717] p-4 rounded-lg shadow-sm col-span-2 md:col-span-1'>
                        <p className='text-lg font-bold'>
                            {two_factor_authentication ? 'Enabled' : 'Disabled'}
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
        </div>
    );
};

export default UserDetails;
