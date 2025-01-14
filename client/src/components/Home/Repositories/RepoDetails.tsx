/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import { BASE_URL, convertToPercentages } from '../../../helper';
import { RootState } from '../../../redux/store';
import ContributorDetails from './ContributorDetails';
import RenameRepo from './RenameRepo';
import RepoCommitGraph from './RepoCommitGraph';
import RepoReadme from './RepoReadme';
import RepoVisitorGraph from './RepoVisitorGraph';
import ToggleVisibility from './ToggleVisibility';
import ToggleArchived from './ToggleArchived';
import ChangeDefaultBranch from './ChangeDefaultBranch';
import CreateNewBranch from './CreateNewBranch';
import ShowLanguages from './ShowLanguages';

const RepoDetails = () => {
    const { id } = useParams<{ id: string }>(); // Get the repository ID from the URL
    const [repoDetails, setRepoDetails] = useState<any>(null); // Store the repository details
    const [languages, setLanguages] = useState<any>(null); // Store the languages used in the repository
    const [isRepoPrivate, setIsRepoPrivate] = useState(false); // Check if the repository is private
    const [repoContributors, setRepoContributors] = useState<any>([]); // Store the repository contributors
    const [refetchAllBranches, setRefetchAllBranches] = useState<boolean>(false);

    const isDarkModeOn = useSelector((store: RootState) => store.isDarkModeOn);

    // Fetch the repository details using the repository ID
    const fetchRepoDetails = async (repoId: number) => {
        try {
            // Fetch the repository details
            const response = await axios.get(`${BASE_URL}/repo/${repoId}`, {
                headers: {
                    Authorization: `${localStorage.getItem('accessToken')}`,
                },
            });

            console.log('REPO DETAILS:', response.data);
            // Fetch the languages
            const languages = await axios.get(response.data.languages_url);

            // Fetch the contributors
            const contributors = await axios.get(
                response.data.contributors_url
            );

            setRepoDetails(response.data);
            setLanguages(convertToPercentages(languages.data));
            setRepoContributors(contributors.data);
        } catch (error) {
            setIsRepoPrivate(true);
            console.error('Error fetching repository details:', error);
        }
    };

    // Fetch the repository details when the component mounts
    useEffect(() => {
        if (id) fetchRepoDetails(Number(id));
    }, [id]);

    // Show a loading spinner while fetching the repository details
    if (!repoDetails && !isRepoPrivate) {
        return (
            <div className='flex justify-center items-center min-h-screen w-full bg-[#FAFAFA] dark:bg-[#383838]'>
                <SyncLoader color={`${isDarkModeOn ? '#ECECEC' : '#1570EF'}`} />
            </div>
        );
    }

    // Show a message if the repository is private
    if (isRepoPrivate) {
        return (
            <div className='flex justify-center items-center min-h-screen bg-gray-100 dark:bg-[#212121]'>
                <span className='text-lg text-gray-600 dark:text-gray-300'>
                    THIS REPOSITORY IS PRIVATE
                </span>
            </div>
        );
    }

    const deleteButtonClickHandler = async () => {
        console.log('DELETE BUTTON CLICKED');

        //TODO: THIS IS WORKING, BUT HAVE A MODAL TO CONFIRM DELETE
        // const response = await axios.delete(`${BASE_URL}/repo/${id}`, {
        //     headers: {
        //         Authorization: `${localStorage.getItem('accessToken')}`,
        //     },
        // });

        console.log('RESONSE FROM DELETE:');
    };

    const {
        allow_forking,
        archived,
        created_at,
        default_branch,
        forks_count,
        name,
        open_issues_count,
        size,
        visibility,
        html_url,
        owner,
    } = repoDetails;

    return (
        <div className=''>
            <div className='p-8 bg-gray-50 dark:bg-[#212121] min-h-screen text-gray-800 dark:text-[#ECECEC]'>
                <div className='mx-auto bg-white dark:bg-[#171717] rounded-lg shadow-md p-6'>
                    {/* HEADER SECTION */}
                    <header className='mb-6'>
                        <h1 className='text-4xl font-bold mb-2'>{name}</h1>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>
                            Created on:{' '}
                            {new Date(created_at).toLocaleDateString()}
                        </p>
                    </header>

                    {/* SHOWS DETAILS OF THE REPOSITORY  */}
                    <div className='grid gap-6 sm:grid-cols-2'>
                        <div className='space-y-4'>
                            <div className='flex justify-between items-center'>
                                <span className='font-semibold'>
                                    Visibility:
                                </span>
                                <span className='px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-200'>
                                    {visibility}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='font-semibold'>
                                    Allow Forking:
                                </span>
                                <span
                                    className={`px-3 py-1 text-sm rounded-full ${
                                        allow_forking
                                            ? 'bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-200'
                                            : 'bg-red-100 text-red-600 dark:bg-red-800 dark:text-red-200'
                                    }`}
                                >
                                    {allow_forking ? 'Yes' : 'No'}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='font-semibold'>Archived:</span>
                                <span
                                    className={`px-3 py-1 text-sm rounded-full ${
                                        archived
                                            ? 'bg-red-100 text-red-600 dark:bg-red-800 dark:text-red-200'
                                            : 'bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-200'
                                    }`}
                                >
                                    {archived ? 'Yes' : 'No'}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='font-semibold'>
                                    Default Branch:
                                </span>
                                <span className='px-3 py-1 text-sm rounded-full bg-purple-100 text-purple-600 dark:bg-purple-800 dark:text-purple-200'>
                                    {default_branch}
                                </span>
                            </div>
                        </div>
                        <div className='space-y-4'>
                            <div className='flex justify-between items-center'>
                                <span className='font-semibold'>
                                    Forks Count:
                                </span>
                                <span className='text-lg font-semibold text-blue-600 dark:text-blue-400'>
                                    {forks_count}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='font-semibold'>
                                    Open Issues:
                                </span>
                                <span className='text-lg font-semibold text-red-600 dark:text-red-400'>
                                    {open_issues_count}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='font-semibold'>Size:</span>
                                <span>{size} KB</span>
                            </div>
                        </div>
                    </div>

                    {/* SHOWS THE LANGUAGES USED IN THE REPOSITORY  */}
                    <ShowLanguages languages={languages} />

                    <h1 className='font-bold mt-10'>
                        CONTRIBUTORS OF THE REPO
                    </h1>

                    {repoContributors.map((contributor: any) => {
                        return (
                            <ContributorDetails
                                key={contributor.id}
                                user={contributor}
                            />
                        );
                    })}

                    {/* FOOTER SECTION  */}
                    <footer className='mt-6 flex justify-end'>
                        <a
                            href={html_url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='px-6 py-2 bg-blue-600 dark:bg-[#383838] dark:hover:bg-[#212121] text-white text-sm font-semibold rounded-md hover:bg-blue-700 '
                        >
                            View on GitHub
                        </a>
                    </footer>
                    <button
                        onClick={deleteButtonClickHandler}
                        className='bg-red-600 p-2 rounded-sm'
                    >
                        DELETE REPO
                    </button>
                </div>

                <CreateNewBranch owner={owner.login} name={name}  setRefetch={setRefetchAllBranches}/>

                <RenameRepo owner={owner.login} name={name} fetchRepoDetails={fetchRepoDetails} />
                <ToggleVisibility owner={owner.login} name={name} currentVisibility={visibility} fetchRepoDetails={fetchRepoDetails} />

                <ToggleArchived owner={owner.login} name={name} currentArchived={archived} fetchRepoDetails={fetchRepoDetails} />

                <ChangeDefaultBranch owner={owner.login} name={name} fetchRepoDetails={fetchRepoDetails} refetch={refetchAllBranches}/>

                {/* TODO: TOGGLE FORKING ONLY WORKS FOR ORGS REPO AND NOT FOR USER REPO 
                    SO SHOW TOGGLE FORKING ONLY IF THE REPO IS AN ORG REPO
                */}
                {/* <ToggleForking owner={owner.login} name={name} currentForking={allow_forking} fetchRepoDetails={fetchRepoDetails} /> */}
                <RepoCommitGraph owner={owner.login} name={name} />
                <RepoVisitorGraph owner={owner.login} name={name} />
                <RepoReadme owner={owner.login} name={name} />
            </div>
        </div>
    );
};

export default RepoDetails;
