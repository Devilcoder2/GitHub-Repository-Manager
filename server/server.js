const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// Enable CORS
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
);

app.use(express.json());

// GitHub OAuth: Redirect to GitHub login
app.get('/auth/github', (req, res) => {
    const redirectUri = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo,user`;
    res.redirect(redirectUri);
});

// GitHub OAuth: Handle callback and exchange code for access token
app.get('/auth/github/callback', async (req, res) => {
    const code = req.query.code;

    try {
        const tokenResponse = await axios.post(
            'https://github.com/login/oauth/access_token',
            {
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                code: code,
            },
            { headers: { Accept: 'application/json' } }
        );

        const accessToken = tokenResponse.data.access_token;

        res.status(200).json({ accessToken });
    } catch (error) {
        console.error('Error fetching access token:', error);
        res.status(500).send('Error during authentication');
    }
});

// Fetch All Repositories (Public & Private)
app.get('/fetch-repos', async (req, res) => {
    const perPage = 100; // Number of repositories per page
    try {
        const response = await axios.get('https://api.github.com/user/repos', {
            headers: {
                Authorization: `token ${req.headers.authorization}`,
            },
            params: {
                per_page: perPage,
            },
        });

        console.log(response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching repositories:', error);
        res.status(500).json({ error: 'Failed to fetch repositories' });
    }
});

// Fetch user details (Logged in user)
app.get('/user', async (req, res) => {
    try {
        const response = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `token ${req.headers.authorization}`,
            },
        });

        console.log(response.data); // Log the user details to the console for debugging
        res.json(response.data); // Send the user details as JSON response
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Failed to fetch user details' });
    }
});

app.post('/create-repo', async (req, res) => {
    const {
        name,
        description,
        visibility,
        autoInit,
        allowForking,
        defaultBranch,
    } = req.body;

    if (!name || !visibility) {
        return res
            .status(400)
            .json({ error: 'Repository name and visibility are required' });
    }

    try {
        const response = await axios.post(
            'https://api.github.com/user/repos',
            {
                name: name,
                description: description || '', // Optional description
                private: visibility === 'private', // Private based on visibility
                auto_init: autoInit || false, // Initialize with README if true
                allow_forking: allowForking !== undefined ? allowForking : true, // Enable forking by default
            },
            {
                headers: {
                    Authorization: `token ${req.headers.authorization}`, // Access token from headers
                },
            }
        );

        console.log('Repository created:', response.data);
        res.status(201).json({
            message: 'Repository created successfully',
            repo: response.data,
        });
    } catch (error) {
        console.error(
            'Error creating repository:',
            error.response?.data || error.message
        );
        res.status(500).json({
            error: 'Failed to create repository',
            details: error.response?.data,
        });
    }
});

// Start the server
const PORT = 5000; // Backend server port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
