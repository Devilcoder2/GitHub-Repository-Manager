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
        origin: 'http://localhost:5174',
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

// Start the server
const PORT = 5000; // Backend server port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
