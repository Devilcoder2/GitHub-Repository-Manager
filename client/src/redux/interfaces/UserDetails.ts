interface UserDetails {
    avatar_url: string;
    bio: string;
    created_at: string;
    followers: number;
    following: number;
    html_url: string;
    name: string;
    public_repos: number;
    total_private_repos: number;
    two_factor_authentication: boolean;
    plan: {
        name: string;
        space: number;
        collaborators: number;
        private_repos: number;
    };
}

export type { UserDetails };
