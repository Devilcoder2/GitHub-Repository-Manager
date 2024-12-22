import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Auth from './components/Auth/Auth';
import AuthCallback from './components/Auth/AuthCallback';
import AiCodeReview from './components/Home/AICodeReview';
import CloudSecurity from './components/Home/CloudSecurity';
import Dashboard from './components/Home/Dashboard';
import HowToUse from './components/Home/HowToUse';
import Layout from './components/Home/Layout';
import Settings from './components/Home/Settings';
import { useHotkeys } from 'react-hotkeys-hook';
import { useDispatch, useSelector } from 'react-redux';
import {
    toggleDarkMode,
    toggleRepoSize,
    toggleShowTag,
} from './redux/actionCreators';
import store, { RootState } from './redux/store';

function App() {
    const [authenticated, setAuthenticated] = useState(false);
    const [isAuthDone, setIsAuthDone] = useState(false);
    const dispatch = useDispatch();

    const isRepoSizeVisible = useSelector(
        (store: RootState) => store.isRepoSizeVisible
    );

    const isTagsVisible = useSelector(
        (store: RootState) => store.isTagsVisible
    );

    const isDarkModeOn = useSelector((store: RootState) => store.isDarkModeOn);

    useHotkeys('alt+r', () => {
        dispatch(toggleRepoSize(isRepoSizeVisible));
    });

    useHotkeys('alt+m', () => {
        dispatch(toggleShowTag(isTagsVisible));
    });

    useHotkeys('alt+p', () => {
        dispatch(toggleDarkMode(isDarkModeOn));
    });

    useEffect(() => {
        setAuthenticated(!!localStorage.getItem('accessToken'));
    }, [isAuthDone]);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/'
                    element={
                        authenticated ? (
                            <Navigate to='/dashboard' replace />
                        ) : (
                            <Auth />
                        )
                    }
                />
                <Route
                    path='/auth/callback'
                    element={<AuthCallback setIsAuthDone={setIsAuthDone} />}
                />

                <Route
                    element={
                        authenticated ? (
                            <Layout setIsAuthDone={setIsAuthDone} />
                        ) : (
                            <Navigate to='/' replace />
                        )
                    }
                >
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
