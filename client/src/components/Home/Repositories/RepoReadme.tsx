/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BASE_URL } from '../../../helper';

interface RepoReadmeProps {
    owner: string;
    name: string;
}

interface ReadmeResponse {
    content: string;
}

const RepoReadme: React.FC<RepoReadmeProps> = ({ owner, name }) => {
    const [readme, setReadme] = useState<ReadmeResponse | null>(null);

    const fetchReadme = async () => {
        try {
            const readmeResponse = await axios.get<ReadmeResponse>(
                `${BASE_URL}/repo/${owner}/${name}/readme`,
                {
                    headers: {
                        Authorization: `${localStorage.getItem('accessToken')}`,
                    },
                }
            );
            setReadme(readmeResponse.data);
        } catch (error) {
            console.error('Error fetching README:', error);
        }
    };

    useEffect(() => {
        fetchReadme();
    }, []);

    return (
        <div>
            {readme ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {readme.content}
                </ReactMarkdown>
            ) : (
                'Loading README...'
            )}
        </div>
    );
};

export default RepoReadme;
