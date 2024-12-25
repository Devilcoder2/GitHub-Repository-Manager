/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    ArrowPathIcon,
    CircleStackIcon,
    MagnifyingGlassIcon,
    PlusIcon,
} from '@heroicons/react/24/outline';
import axios from 'axios';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useSelector } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import {
    areReposEqual,
    BASE_URL,
    dateFormatter,
    filteredItems,
    filterRepos,
    sortRepos,
} from '../../../helper.ts';
import { Repository } from '../../../redux/interfaces/index.ts';
import { RootState } from '../../../redux/store.ts';

const Dashboard = () => {
    const [filterdData, setFilterdData] = useState<Repository[]>([]); //To store the filtered repositories
    const [repos, setRepos] = useState<Repository[]>([]); //To store all the fetched repositories
    const [prevFetchedRepos, setPrevFetchedRepos] = useState<Repository[]>([]); //To check if the fetched data is same as the previous one
    const [loadingData, setLoadingData] = useState<boolean>(true); //When fetching data for the first time
    const [isLastPage, setIsLastPage] = useState<boolean>(false); //When there are no more pages to fetch
    const [isFetching, setIsFetching] = useState<boolean>(false); //When fetching data during infinite scroll

    const sortingOrder = useSelector((store: RootState) => store.sortingOrder);
    const isDarkModeOn = useSelector((store: RootState) => store.isDarkModeOn);
    const isRepoSizeVisible = useSelector(
        (state: RootState) => state.isRepoSizeVisible
    );
    const isTagsVisible = useSelector(
        (state: RootState) => state.isTagsVisible
    );

    const inputRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    // OUTLET CONTEXT FOR PAGINATION
    const { page, setPage } = useOutletContext<{
        page: number;
        setPage: (num: number) => void;
    }>();

    // HOTKEYS FOR FOCUSING ON THE SEARCH INPUT
    useHotkeys('alt+s', () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    });

    // SORTING THE REPOSITORIES
    useEffect(() => {
        const sortedData = sortRepos(repos, sortingOrder);
        setFilterdData(sortedData);
    }, [sortingOrder, repos]);

    // FETCHING REPOSITORIES
    useEffect(() => {
        if (!isLastPage) {
            if (!loadingData) setIsFetching(true);
            fetchRepositories();
        }
    }, [page]);

    // CHECKING IF THE REPOS ARE EMPTY
    useEffect(() => {
        if (repos.length === 0) {
            setPage(1);
            setIsLastPage(false);
        }
    }, [repos, isLastPage]);

    // FETCHING REPOSITORIES
    const fetchRepositories = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}/fetch-repos?page=${page}`,
                {
                    headers: {
                        Authorization: `${localStorage.getItem('accessToken')}`,
                    },
                }
            );

            const data = response.data;
            if (data.length === 0) {
                setIsLastPage(true);
                setIsFetching(false);
                return;
            }
            const filteredPropertiesRepo = data?.map((item: any) => {
                if (item.language === null) item.language = 'Unknown';
                return filteredItems(item);
            });

            if (response.status !== 401) {
                setPrevFetchedRepos(data);
                setRepos((prev) => [...prev, ...filteredPropertiesRepo]);
                setFilterdData((prev) => [...prev, ...filteredPropertiesRepo]);
            } else {
                console.error(data.error);
            }
            setLoadingData(false);
            setIsFetching(false);
        } catch (error) {
            console.error('Error fetching repositories:', error);
            alert('Failed to fetch repositories.');
            setLoadingData(false);
        }
    };

    // FILTERING THE REPOSITORIES
    const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const filtered = filterRepos(repos, value);
        setFilterdData(filtered);
    };

    // WHEN REFRESH ALL BUTTON IS CLICKED
    const refreshAllHandler = () => {
        setLoadingData(true);
        refreshRepos();
    };

    // REFRESHING THE REPOSITORIES
    const refreshRepos = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}/fetch-repos?page=${page}`,
                {
                    headers: {
                        Authorization: `${localStorage.getItem('accessToken')}`,
                    },
                }
            );

            const data = response.data;
            if (!areReposEqual(data, prevFetchedRepos)) {
                fetchRepositories();
            }
            setLoadingData(false);
            setIsFetching(false);
        } catch (error) {
            console.error('Error fetching repositories:', error);
            alert('Failed to fetch repositories.');
            setLoadingData(false);
        }
    };

    // NAVIGATING TO ADD REPO PAGE
    const addRepoHandler = () => {
        navigate('/add-repo');
    };

    return (
        <div className={`${isDarkModeOn ? 'dark' : ''}`}>
            <div className={`p-2 scrollbar-hide dark:bg-[#171717]`}>
                <div
                    className={`bg-white dark:bg-[#212121] dark:text-[#ECECEC] w-full rounded-xl border dark:border-[rgb(47,47,47)] flex flex-col`}
                >
                    {/* DASHBOARD HEADER  */}
                    <div
                        className={`flex flex-col gap-4 border-b dark:border-[rgb(47,47,47)] p-4`}
                    >
                        <div
                            className={`flex justify-between items-center flex-wrap gap-4`}
                        >
                            <div className={`flex flex-col`}>
                                <span className={`font-semibold text-xl`}>
                                    Repositories
                                </span>
                                <span
                                    className={`font-light text-sm dark:text-[#ECECEC]`}
                                >
                                    {filterdData.length} total repositories
                                </span>
                            </div>
                            <div className={`flex gap-2`}>
                                <button
                                    onClick={refreshAllHandler}
                                    className={`flex text-xs items-center p-2 px-4 gap-2 rounded-md border dark:border-[rgb(47,47,47)] dark:text-[#ECECEC] hover:bg-gray-100 dark:hover:bg-[rgb(47,47,47)]`}
                                >
                                    <ArrowPathIcon className={`size-4`} />
                                    Refresh All
                                </button>
                                <button
                                    onClick={addRepoHandler}
                                    className={`flex text-xs items-center p-2 px-4 gap-2 bg-[#1570EF] dark:bg-[#383838] text-white rounded-md hover:bg-[#1570efde] dark:hover:bg-[#171717]`}
                                >
                                    <PlusIcon className={`size-4`} />
                                    Add Repository
                                </button>
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor={`inputSearch`}
                                className={`border dark:border-[rgb(47,47,47)] w-fit rounded-md flex gap-2 items-center px-2 py-2 dark:bg-[#212121]`}
                            >
                                <MagnifyingGlassIcon
                                    className={`size-4 stroke-2 dark:stroke-[#ECECEC]`}
                                />
                                <input
                                    id={`inputSearch`}
                                    ref={inputRef}
                                    placeholder={`Search Repositories`}
                                    onChange={handleFilter}
                                    className={`text-xs w-[200px] placeholder:text-gray-700 dark:placeholder:text-[#ECECEC] outline-none dark:bg-[#212121] dark:text-[#ECECEC]`}
                                />
                            </label>
                        </div>
                    </div>

                    {/* ALL REPOS WHEN FETCHED */}
                    {!loadingData && (
                        <div className={`flex flex-col w-full`}>
                            {filterdData.length >= 1 ? (
                                filterdData.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            onClick={() =>
                                                navigate(
                                                    '/repo-details/' + item.id
                                                )
                                            }
                                            className={`flex flex-col p-4 gap-3 hover:bg-gray-100 dark:hover:bg-[rgb(47,47,47)] hover:cursor-pointer ${
                                                index !== filterdData.length - 1
                                                    ? 'border-b dark:border-[rgb(47,47,47)]'
                                                    : ''
                                            }`}
                                        >
                                            <div
                                                className={`flex gap-2 items-center`}
                                            >
                                                <span>{item.name}</span>
                                                {isTagsVisible && (
                                                    <span
                                                        className={`bg-[#EFF8FF] border-[#B2DDFF]  dark:bg-[#383838] text-[#1570EF] dark:text-white border  dark:border-[rgb(47,47,47)] text-xs px-2 rounded-full`}
                                                    >
                                                        {item.visibility}
                                                    </span>
                                                )}
                                            </div>
                                            <div
                                                className={`flex gap-4 md:gap-8 text-sm font-light dark:text-[#ECECEC]`}
                                            >
                                                <span
                                                    className={`flex items-center gap-2`}
                                                >
                                                    {item.language || 'Unknown'}
                                                    <span
                                                        className={`bg-[#1570EF] dark:bg-[#ECECEC] p-1 rounded-full`}
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
                                    className={`flex flex-col border-b dark:border-[rgb(47,47,47)] p-4 gap-3 text-gray-500 dark:text-[#ECECEC] text-center`}
                                >
                                    Looks like there is no repository to show.
                                </div>
                            )}
                        </div>
                    )}

                    {/* LOADER WHEN FETCHING REPOS  */}
                    {loadingData && (
                        <div className='flex justify-center items-center h-96'>
                            <SyncLoader
                                color={`${
                                    isDarkModeOn ? '#ECECEC' : '#1570EF'
                                }`}
                            />
                        </div>
                    )}

                    {/* LOADER WHEN FETCHING REPOS ON INFINTE SCROLL  */}
                    {isFetching && (
                        <div className='flex justify-center items-center h-24'>
                            <SyncLoader
                                color={`${
                                    isDarkModeOn ? '#ECECEC' : '#1570EF'
                                }`}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
