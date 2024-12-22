import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Home/Dashboard';
import AuthCallback from './components/Auth/AuthCallback';

function App() {
    return (
        <BrowserRouter>
            <div className={`flex min-h-screen w-full bg-[#FAFAFA]`}>
                <Routes>
                    <Route path='/' element={<Auth />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/auth/callback' element={<AuthCallback />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
