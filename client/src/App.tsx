import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import AuthCallback from './components/Auth/AuthCallback';
import AiCodeReview from './components/Home/AICodeReview';
import CloudSecurity from './components/Home/CloudSecurity';
import Dashboard from './components/Home/Dashboard';
import HowToUse from './components/Home/HowToUse';
import Layout from './components/Home/Layout';
import Settings from './components/Home/Settings';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Auth Route - No Sidebar */}
                <Route path='/' element={<Auth />} />
                <Route path='/auth/callback' element={<AuthCallback />} />

                {/* Layout Route - Sidebar is included */}
                <Route element={<Layout />}>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/settings' element={<Settings />} />
                    <Route path='/ai-code-review' element={<AiCodeReview />} />
                    <Route path='/cloud-security' element={<CloudSecurity />} />
                    <Route path='/how-to-use' element={<HowToUse />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
