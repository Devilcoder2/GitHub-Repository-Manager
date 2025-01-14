/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../../helper';

import axios from 'axios';

interface CreateNewBranchProps {
    owner: string;
    name: string;
    setRefetch: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateNewBranch: React.FC<CreateNewBranchProps> = ({
    owner,
    name,
    setRefetch,
}) => {
    const [baseBranch, setBaseBranch] = useState<string | null>(null);
    const [newBranchName, setNewBranchName] = useState<string>('');

    const fetchDefaultBranch = async () => {
        const response = await axios.get(
            `${BASE_URL}/repo/${owner}/${name}/default-branch`,
            {
                headers: {
                    Authorization: `${localStorage.getItem('accessToken')}`,
                },
            }
        );
        setBaseBranch(response.data.default_branch);
    };

    useEffect(() => {
        fetchDefaultBranch();
    }, []);

    const handleCreateNewBranch = async () => {
        if (!newBranchName.trim()) {
            alert('Please enter a branch name');
            return;
        }

        await axios.post(
            `${BASE_URL}/repo/${owner}/${name}/branches`,
            {
                newBranch: newBranchName,
                baseBranch: baseBranch,
            },
            {
                headers: {
                    Authorization: `${localStorage.getItem('accessToken')}`,
                },
            }
        );
        setRefetch(prev => !prev);
    };

    return (
        <div className='flex flex-col gap-3 my-24'>
            <h1>CREATE A NEW BRANCH</h1>
            <input
                type='text'
                value={newBranchName}
                onChange={(e) => setNewBranchName(e.target.value)}
                placeholder='Enter new branch name'
                className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
            <button
                className='bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition-colors'
                onClick={handleCreateNewBranch}
                disabled={!newBranchName.trim()}
            >
                Create New Branch
            </button>
        </div>
    );
};

export default CreateNewBranch;
