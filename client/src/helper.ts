/* eslint-disable @typescript-eslint/no-explicit-any */
import { Repository } from './redux/interfaces';
type LanguageUsage = { [key: string]: number };

// Function to format the date
const dateFormatter = (date: string | Date): string => {
    const now = new Date();
    const pastDate = new Date(date);
    const diffInMilliseconds = now.getTime() - pastDate.getTime();

    const seconds = Math.floor(diffInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
};

// Function to sort the repositories based on the selected sorting order
const sortRepos = (
    sortedData: Repository[],
    sortingOrder: number
): Repository[] => {
    switch (sortingOrder) {
        case 0:
            sortedData.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 1:
            sortedData.sort(
                (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
            );
            break;
        case 2:
            sortedData.sort(
                (a, b) =>
                    new Date(b.updated_at).getTime() -
                    new Date(a.updated_at).getTime()
            );
            break;
        default:
            break;
    }

    return sortedData;
};

// Function to filter the repositories based on the search value
const filterRepos = (repos: Repository[], value: string): Repository[] => {
    return repos.filter(
        (item) =>
            item.name.toLowerCase().includes(value.toLowerCase()) ||
            item?.visibility?.toLowerCase()?.includes(value.toLowerCase()) ||
            item?.language?.toLowerCase()?.includes(value.toLowerCase())
    );
};

// Function to filter the items to be displayed
const filteredItems = (item: any): any => {
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
};

// Function to check if two arrays of repositories are equal
const areReposEqual = (arr1: Repository[], arr2: Repository[]): boolean => {
    if (arr1.length !== arr2.length) return false;

    return arr1.every((repo, index) => repo.id === arr2[index].id);
};

// Function to convert the language usage to percentages
const convertToPercentages = (languageUsage: LanguageUsage): LanguageUsage => {
    const total = Object.values(languageUsage).reduce(
        (sum, value) => sum + value,
        0
    );
    if (total === 0) return {};

    const percentages: LanguageUsage = {};
    for (const [language, value] of Object.entries(languageUsage)) {
        percentages[language] = parseFloat(((value / total) * 100).toFixed(2));
    }

    return percentages;
};

// Base URL for the API
const BASE_URL = 'http://localhost:5000';

export {
    dateFormatter,
    BASE_URL,
    sortRepos,
    filterRepos,
    filteredItems,
    areReposEqual,
    convertToPercentages,
};
