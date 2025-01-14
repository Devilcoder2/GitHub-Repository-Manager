import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL } from '../../../helper';

interface ToggleForkingProps {
    owner: string;
    name: string;
    currentForking: boolean;
    fetchRepoDetails: (id: number) => void;
}

const ToggleForking: React.FC<ToggleForkingProps> = ({
    owner,
    name,
    currentForking,
    fetchRepoDetails,
}) => {
    const [isForking, setIsForking] = useState<boolean>(currentForking);

    const handleForkingChange = async (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setIsForking(event.target.value === 'true');
        try {
            const response = await axios.patch(
                `${BASE_URL}/repo/${owner}/${name}/forking`,
                {
                    allowForking: event.target.value === 'true',
                },
                {
                    headers: {
                        Authorization: `${localStorage.getItem('accessToken')}`,
                    },
                }
            );
            console.log(response.data);
            fetchRepoDetails(response.data.repository.id);
        } catch (error) {
            console.error(
                'Error while changing the visibility of the repository:',
                error
            );
        }
    };

    return (
        <div className='p-4'>
            <h1 className='text-xl font-bold mb-4'>Change Forking</h1>
            <div className='flex flex-col gap-2'>
                <label htmlFor='forking' className='font-medium'>
                    Repository Forking
                </label>
                <select
                    id='forking'
                    value={isForking ? 'true' : 'false'}
                    onChange={handleForkingChange}
                    className='border rounded-md p-2 w-48'
                >
                    <option value='true'>Yes</option>
                    <option value='false'>No</option>
                </select>
                <p className='text-sm text-gray-600 mt-2'>
                    {isForking
                        ? 'This repository will be forkable by anyone.'
                        : 'This repository will not be forkable by anyone.'}
                </p>
            </div>
        </div>
    );
};

export default ToggleForking;
