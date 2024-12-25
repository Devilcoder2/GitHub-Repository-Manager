# GitHub Repository Manager

## Introduction  
This project is a feature-rich web application built with ReactJS and TypeScript, enabling users to manage their GitHub repositories effectively. The application includes GitHub OAuth for secure login, real-time repository fetching, AI-powered code reviews, and advanced UI/UX features.

## Tech Stack  

### Frontend  
- React  
- TypeScript  
- TailwindCSS  
- React Router DOM  
- Redux Toolkit  
- React Hotkeys Hook  
- React Markdown  
- React Spinners  

### Backend  
- Express.js  
- Axios  
- Generative AI (Gemini API)  

### Others  
- Git  
- GitHub OAuth  

## Features  

### Authentication  
- Implemented GitHub OAuth for secure login and restricted home page access to logged-in users.

### Repository Management  
- Displayed public and private repositories in real-time.  
- Enabled infinite scrolling with pagination.  
- Added functionality to create new repositories directly.  

### AI Code Review  
- Integrated Gemini API for AI-powered code reviews.  

### Profile and Settings  
- Displayed user profile with an option to visit GitHub.  
- Added light/dark mode toggle and UI customization.  
- Included options to show/hide repo tags and file sizes.  
- Implemented keyboard shortcuts, shown in settings.  

### UI/UX Enhancements  
- Pixel-perfect and responsive design using TailwindCSS.  
- Spinners and loaders for data fetching.  

### Repository Details  
- Displayed detailed information about a repository on click.  

### Logout Functionality  
- Fully functional logout button for secure session management.  

### Additional Features  
- Infinite scrolling with smooth pagination.  


## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Devilcoder2/CodeAnt.ai-Assign
   ```

2. Navigate to the project directory:
   ```bash
   cd project-directory
   ```

3. Install dependencies for both frontend and backend:

   For the frontend:
   ```bash
   cd client
   npm install
   ```

   For the backend:
   ```bash
   cd ../server
   npm install
   ```

4. Start the development servers:

   For the frontend:
   ```bash
   cd ../client
   npm start
   ```

   For the backend:
   ```bash
   cd ../server
   node server.js
   ```

5. Set up environment variables in a `.env` file for backend configuration:
   ```env
   GITHUB_CLIENT_ID=your_client_id
   GITHUB_CLIENT_SECRET=your_client_secret
   GEMINI_API_KEY=your_gemini_api_key
   ```


