import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Home/Dashboard';

function App() {
    return (
        <BrowserRouter>
            <div className={`flex min-h-screen w-full bg-[#FAFAFA]`}>
                <Routes>
                    <Route path={'/'} Component={Auth} />
                    <Route path={'/dashboard'} Component={Dashboard} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
