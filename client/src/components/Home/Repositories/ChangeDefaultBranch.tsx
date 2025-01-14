/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../../helper';

interface ChangeDefaultBranchProps {
    owner: string;
    name: string;
    fetchRepoDetails: (id: number) => void;
    refetch: boolean;
}

const ChangeDefaultBranch: React.FC<ChangeDefaultBranchProps> = ({
    owner,
    name,
    fetchRepoDetails,
    refetch,
}) => {
    const [allBranches, setAllBranches] = useState<any[]>([]);
    const [selectedBranch, setSelectedBranch] = useState<string>('');
    const [baseBranch, setBaseBranch] = useState<string>('');

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

    const fetchAllBranches = async () => {
        const response = await axios.get(
            `${BASE_URL}/repo/${owner}/${name}/branches`,
            {
                headers: {
                    Authorization: `${localStorage.getItem('accessToken')}`,
                },
            }
        );
        const branches = response.data.map((branch: any) => branch.name);
        setAllBranches(branches);
    };

    useEffect(() => {
        fetchDefaultBranch();
        fetchAllBranches();
    }, [refetch]);

    useEffect(() => {
        if (baseBranch) {
            setSelectedBranch(baseBranch);
        }
    }, [baseBranch]);

    const handleBranchChange = async (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const newBranch = event.target.value;
        setSelectedBranch(newBranch);

        try {
            const res = await axios.patch(
                `${BASE_URL}/repo/${owner}/${name}/default-branch`,
                { branch: newBranch },
                {
                    headers: {
                        Authorization: `${localStorage.getItem('accessToken')}`,
                    },
                }
            );
            fetchRepoDetails(res.data.repository.id);
        } catch (error) {
            console.error('Error changing default branch:', error);
        }
    };

    return (
        <div className='flex flex-col gap-3 my-24'>
            <h1>Change Default Branch</h1>
            <select
                value={selectedBranch}
                onChange={handleBranchChange}
                className='form-select mt-3'
            >
                {allBranches.map((branch) => (
                    <option key={branch} value={branch}>
                        {branch}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ChangeDefaultBranch;
