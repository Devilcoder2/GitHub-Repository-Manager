/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    ArrowPathIcon,
    CircleStackIcon,
    MagnifyingGlassIcon,
    PlusIcon,
} from '@heroicons/react/24/outline';
import { ChangeEvent, useEffect, useState } from 'react';
import { SyncLoader } from 'react-spinners';
import { dateFormatter } from '../../helper.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store.ts';

// Define a type for the repository objects
interface Repository {
    archived: string;
    clone_url: string;
    contributors_url: string;
    created_at: string;
    updated_at: string;
    default_branch: string;
    forks_count: string;
    forks_url: string;
    name: string;
    id: string;
    language: string;
    languages_url: string;
    open_issues_count: string;
    owner: { login: string; url: string };
    private: string;
    size: string;
    ssh_url: string;
    visibility: string;
}

const Dashboard = () => {
    const [filterdData, setFilterdData] = useState<Repository[]>([]);
    const [repos, setRepos] = useState<Repository[]>([]);
    const [loadingData, setLoadingData] = useState<boolean>(true);

    const isRepoSizeVisible = useSelector(
        (state: RootState) => state.isRepoSizeVisible
    );

    const isTagsVisible = useSelector(
        (state: RootState) => state.isTagsVisible
    );

    const sortingOrder = useSelector((store: RootState) => store.sortingOrder);
    console.log(sortingOrder);

    useEffect(() => {
        const sortedData = [...repos];

        switch (sortingOrder) {
            case 0:
                // Sort by name alphabetically
                sortedData.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 1:
                // Sort by created_at in decreasing order
                sortedData.sort(
                    (a, b) =>
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime()
                );
                break;
            case 2:
                // Sort by updated_at in decreasing order
                sortedData.sort(
                    (a, b) =>
                        new Date(b.updated_at).getTime() -
                        new Date(a.updated_at).getTime()
                );
                break;
            default:
                break;
        }

        setFilterdData(sortedData);
    }, [sortingOrder, repos]);

    const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        const value = e.target.value;
        const filtered = repos.filter(
            (item) =>
                item.name.toLowerCase().includes(value.toLowerCase()) ||
                item?.visibility
                    ?.toLowerCase()
                    ?.includes(value.toLowerCase()) ||
                item?.language?.toLowerCase()?.includes(value.toLowerCase())
        );
        setFilterdData(filtered);
    };

    const fetchRepositories = async () => {
        try {
            const response = await fetch('http://localhost:5000/fetch-repos', {
                headers: {
                    Authorization: `${localStorage.getItem('accessToken')}`,
                },
            });

            const data = await response.json();
            const filteredPropertiesRepo = data?.filter((item: any) => {
                if (item.language === null) return;
                console.log(item.name, item.language);
                return {
                    archived: item.archived,
                    clone_url: item.clone_url,
                    contributors_url: item.contributors_url,
                    created_at: item.created_at,
                    updated_at: item.updated_at,
                    default_branch: item.default_branch,
                    forks_count: item.forks_count,
                    forks_url: item.forks_url,
                    name: item.name,
                    id: item.id,
                    language: item.language,
                    languages_url: item.languages_url,
                    open_issues_count: item.open_issues_count,
                    owner: { login: item.owner.login, url: item.owner.url },
                    private: item.private,
                    size: item.size,
                    ssh_url: item.ssh_url,
                    visibility: item.visibility,
                };
            });

            if (response.status !== 401) {
                setRepos(filteredPropertiesRepo);
                setFilterdData(filteredPropertiesRepo);
            } else {
                console.log(data.error);
            }
            setLoadingData(false);
        } catch (error) {
            console.error('Error fetching repositories:', error);
            alert('Failed to fetch repositories.');
            setLoadingData(false);
        }
    };

    useEffect(() => {
        fetchRepositories();
    }, []);

    const refreshAllHandler = () => {
        setLoadingData(true);
        fetchRepositories();
    };

    return (
        <div>
            <div className={`p-2 scrollbar-hide`}>
                <div
                    className={`bg-white w-full rounded-xl border flex flex-col`}
                >
                    <div className={`flex flex-col gap-4 border-b p-4`}>
                        <div
                            className={`flex justify-between items-center flex-wrap gap-4`}
                        >
                            <div className={`flex flex-col`}>
                                <span className={`font-semibold text-xl`}>
                                    Repositories
                                </span>
                                <span className={`font-light text-sm`}>
                                    {filterdData.length} total repositories
                                </span>
                            </div>
                            <div className={`flex gap-2`}>
                                <button
                                    onClick={refreshAllHandler}
                                    className={`flex text-xs items-center p-2 px-4 gap-2 rounded-md border`}
                                >
                                    <ArrowPathIcon className={`size-4`} />
                                    Refresh All
                                </button>
                                <button
                                    className={`flex text-xs items-center p-2 px-4 gap-2 bg-[#1570EF] text-white rounded-md`}
                                >
                                    <PlusIcon className={`size-4`} />
                                    Add Repository
                                </button>
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor={`inputSearch`}
                                className={`border w-fit rounded-md flex gap-2 items-center px-2 py-2`}
                            >
                                <MagnifyingGlassIcon
                                    className={`size-4 stroke-2`}
                                />
                                <input
                                    id={`inputSearch`}
                                    placeholder={`Search Repositories`}
                                    onChange={handleFilter}
                                    className={`text-xs w-[200px] placeholder:text-gray-700 outline-none`}
                                />
                            </label>
                        </div>
                    </div>

                    {!loadingData && (
                        <div className={`flex flex-col w-full scrollbar-hide`}>
                            {filterdData.length >= 1 ? (
                                filterdData.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={`flex flex-col  p-4 gap-3 hover:bg-gray-100 ${
                                                index !== filterdData.length - 1
                                                    ? 'border-b'
                                                    : ''
                                            }`}
                                        >
                                            <div
                                                className={`flex gap-2 items-center`}
                                            >
                                                <span>{item.name}</span>
                                                {isTagsVisible && (
                                                    <span
                                                        className={`bg-[#EFF8FF] border border-[#B2DDFF] text-primary text-xs px-2 rounded-full`}
                                                    >
                                                        {item.visibility}
                                                    </span>
                                                )}
                                            </div>
                                            <div
                                                className={`flex gap-4 md:gap-8 text-sm font-light`}
                                            >
                                                <span
                                                    className={`flex items-center gap-2`}
                                                >
                                                    {item.language || 'Unknown'}
                                                    <span
                                                        className={`bg-[#1570EF] p-1 rounded-full`}
                                                    ></span>
                                                </span>
                                                {isRepoSizeVisible && (
                                                    <span
                                                        className={`flex items-center gap-2`}
                                                    >
                                                        <CircleStackIcon
                                                            className={`w-4`}
                                                        />
                                                        {item.size} KB
                                                    </span>
                                                )}
                                                <span>
                                                    Updated{' '}
                                                    {dateFormatter(
                                                        item.updated_at
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div
                                    className={`flex flex-col border-b p-4 gap-3 text-gray-500 text-center`}
                                >
                                    Looks like there is no repository to show.
                                </div>
                            )}
                        </div>
                    )}

                    {loadingData && (
                        <div className='flex justify-center items-center h-96'>
                            <SyncLoader color={`#1570EF`} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
