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

export type { Repository };
