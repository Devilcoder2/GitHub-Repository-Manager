import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL } from '../../../helper';

interface ToggleArchivedProps {
    owner: string;
    name: string;
    currentArchived: boolean;
    fetchRepoDetails: (id: number) => void;
}

const ToggleArchived: React.FC<ToggleArchivedProps> = ({
    owner,
    name,
    currentArchived,
    fetchRepoDetails,
}) => {
    const [isArchived, setIsArchived] = useState<boolean>(currentArchived);

    const handleForkingChange = async (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setIsArchived(event.target.value === 'true');
        try {
            const response = await axios.patch(
                `${BASE_URL}/repo/${owner}/${name}/archive`,
                {
                    archived: event.target.value === 'true',
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
            <h1 className='text-xl font-bold mb-4'>Change Archived</h1>
            <div className='flex flex-col gap-2'>
                <label htmlFor='archived' className='font-medium'>
                    Repository Archived
                </label>
                <select
                    id='archived'
                    value={isArchived ? 'true' : 'false'}
                    onChange={handleForkingChange}
                    className='border rounded-md p-2 w-48'
                >
                    <option value='true'>Yes</option>
                    <option value='false'>No</option>
                </select>
                <p className='text-sm text-gray-600 mt-2'>
                    {isArchived
                        ? 'This repository will be archived.'
                        : 'This repository will not be archived.'}
                </p>
            </div>
        </div>
    );
};

export default ToggleArchived;
