import axios from 'axios';
import { useState } from 'react';
import { BASE_URL } from '../../../helper';

const RenameRepo = ({ owner, name, fetchRepoDetails }: { owner: string; name: string; fetchRepoDetails: (id: number) => void }) => {
    const [newName, setNewName] = useState<string>('');

    const renameRepoHandler = async () => {
        try {
            const response = await axios.patch(
                `${BASE_URL}/repo/${owner}/${name}/rename`,
                {
                    newName: newName,
                },
                {
                    headers: {
                        Authorization: `${localStorage.getItem('accessToken')}`,
                    },
                }
            );

            fetchRepoDetails(response.data.repository.id);
        } catch (error) {
            console.error('Error fetching commit data:', error);
        }
    };

    return (
        <div>
            <input
                type='text'
                value={newName}
                className='w-full p-2 border rounded-md border-black'    
                onChange={(e) => setNewName(e.target.value)}
            />
            <button onClick={renameRepoHandler}>Rename</button>
        </div>
    );
};

export default RenameRepo;
