const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const { runGemini } = require('./geminiConfig');

dotenv.config();

const app = express();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

//HANDLE CORS
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
);

app.use(express.json());

// GITHUB OAUTH: Redirect to GitHub login page
app.get('/auth/github', (req, res) => {
    const redirectUri = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo,delete_repo,user`;
    res.redirect(redirectUri);
});

// GITHUB OAUTH: Handle callback and exchange code for access token
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

// FETCH ALL REPOSITORIES (both public & private)
app.get('/fetch-repos', async (req, res) => {
    const perPage = 10;
    const page = req.query.page || 1;
    try {
        const response = await axios.get('https://api.github.com/user/repos', {
            headers: {
                Authorization: `token ${req.headers.authorization}`,
            },
            params: {
                per_page: perPage,
                page,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching repositories:', error);
        res.status(500).json({ error: 'Failed to fetch repositories' });
    }
});

//FETCH USER DETAILS (Logged in user)
app.get('/user', async (req, res) => {
    try {
        const response = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `token ${req.headers.authorization}`,
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Failed to fetch user details' });
    }
});

//CREATE A NEW REPOSITORY
app.post('/create-repo', async (req, res) => {
    const { name, description, visibility, autoInit, allowForking } = req.body;

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
                description: description || '',
                private: visibility === 'private',
                auto_init: autoInit || false,
                allow_forking: allowForking !== undefined ? allowForking : true,
            },
            {
                headers: {
                    Authorization: `token ${req.headers.authorization}`,
                },
            }
        );

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

//FETCH REPOSITORY DETAILS
app.get('/repo/:id', async (req, res) => {
    const repoId = req.params.id;

    try {
        const response = await axios.get(
            `https://api.github.com/repositories/${repoId}`,
            {
                headers: {
                    Authorization: `token ${req.headers.authorization}`, // Access token from headers
                },
            }
        );

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching repository details:', error.message);
        res.status(500).json({
            message: 'Error fetching repository details',
            error: error.message,
        });
    }
});

// DELETE A REPOSITORY
app.delete('/repo/:id', async (req, res) => {
    const repoId = req.params.id;

    try {
        const repoResponse = await axios.get(
            `https://api.github.com/repositories/${repoId}`,
            {
                headers: {
                    Authorization: `token ${req.headers.authorization}`,
                },
            }
        );

        const { full_name } = repoResponse.data;
        console.log('FULL NAME: ', full_name);

        await axios.delete(`https://api.github.com/repos/${full_name}`, {
            headers: {
                Authorization: `token ${req.headers.authorization}`,
            },
        });

        res.status(200).json({ message: 'Repository deleted successfully' });
    } catch (error) {
        console.error(
            'Error deleting repository:',
            error.response?.data || error.message
        );
        res.status(500).json({
            error: 'Failed to delete repository',
            details: error.response?.data,
        });
    }
});

// FETCH README.md FILE
app.get('/repo/:owner/:repo/readme', async (req, res) => {
    const { owner, repo } = req.params;

    try {
        const response = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}/readme`,
            {
                headers: {
                    Authorization: `token ${req.headers.authorization}`,
                    Accept: 'application/vnd.github.v3+json',
                },
            }
        );

        // Decode the base64 content
        const decodedContent = Buffer.from(
            response.data.content,
            'base64'
        ).toString('utf8');

        res.status(200).json({
            name: response.data.name,
            path: response.data.path,
            size: response.data.size,
            content: decodedContent,
            html_url: response.data.html_url,
        });
    } catch (error) {
        console.error(
            'Error fetching README file:',
            error.response?.data || error.message
        );
        res.status(500).json({
            error: 'Failed to fetch README file',
            details: error.response?.data,
        });
    }
});

// FETCH COMMITS OVER TIME
app.get('/repo/:owner/:repo/commits', async (req, res) => {
    const { owner, repo } = req.params;

    try {
        const response = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}/commits`,
            {
                headers: {
                    Authorization: `token ${req.headers.authorization}`,
                },
            }
        );

        // Group commits by date
        const commitsByDate = response.data.reduce((acc, commit) => {
            const date = new Date(commit.commit.author.date)
                .toISOString()
                .split('T')[0]; // Format as YYYY-MM-DD
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});

        // Format the result as an array of { date, count } for graph plotting
        const formattedData = Object.keys(commitsByDate).map((date) => ({
            date,
            count: commitsByDate[date],
        }));

        res.status(200).json(formattedData);
    } catch (error) {
        console.error(
            'Error fetching commits:',
            error.response?.data || error.message
        );
        res.status(500).json({
            error: 'Failed to fetch commits',
            details: error.response?.data,
        });
    }
});

//AI CODE REVIEW
app.post('/codeReview', async (req, res) => {
    const { codeSnippet } = req.body;

    try {
        const review = await runGemini(codeSnippet);
        res.status(200).json({ review });
    } catch (error) {
        console.error('Error during code review:', error);
        res.status(500).json({ error: 'Failed to review code snippet' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
