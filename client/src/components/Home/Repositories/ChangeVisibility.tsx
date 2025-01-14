import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL } from '../../../helper';

interface ChangeVisibilityProps {
    owner: string;
    name: string;
    currentVisibility: string;
    fetchRepoDetails: (id: number) => void;
}

const ChangeVisibility: React.FC<ChangeVisibilityProps> = ({
    owner,
    name,
    currentVisibility,
    fetchRepoDetails
}) => {
    const [isPrivate, setIsPrivate] = useState<boolean>(
        currentVisibility === 'private'
    );

    const handleVisibilityChange = async (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setIsPrivate(event.target.value === 'private'); 
        try{
            const response = await axios.patch(
                `${BASE_URL}/repo/${owner}/${name}/visibility`,
                {
                    private: event.target.value === 'private'
                },
                {
                    headers: {
                        Authorization: `${localStorage.getItem('accessToken')}`,
                    },
                }
            );

            fetchRepoDetails(response.data.repository.id);
        } catch (error) {
            console.error('Error while changing the visibility of the repository:', error);
        }

    };

    return (
        <div className='p-4'>
            <h1 className='text-xl font-bold mb-4'>Change Visibility</h1>
            <div className='flex flex-col gap-2'>
                <label htmlFor='visibility' className='font-medium'>
                    Repository visibility
                </label>
                <select
                    id='visibility'
                    value={isPrivate ? 'private' : 'public'}
                    onChange={handleVisibilityChange}
                    className='border rounded-md p-2 w-48'
                >
                    <option value='public'>Public</option>
                    <option value='private'>Private</option>
                </select>
                <p className='text-sm text-gray-600 mt-2'>
                    {isPrivate
                        ? 'This repository will only be visible to you and people you share it with.'
                        : 'This repository will be visible to anyone on the internet.'}
                </p>
            </div>
        </div>
    );
};

export default ChangeVisibility;
