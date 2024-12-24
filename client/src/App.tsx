import { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import AuthCallback from './components/Auth/AuthCallback';
import AiCodeReview from './components/Home/AICodeReview';
import CloudSecurity from './components/Home/CloudSecurity';
import Dashboard from './components/Home/Dashboard';
import HowToUse from './components/Home/HowToUse';
import Layout from './components/Home/Layout';
import Settings from './components/Home/Settings';
import {
    changeSortingOrder,
    toggleDarkMode,
    toggleRepoSize,
    toggleShowTag,
} from './redux/actionCreators';
import { RootState } from './redux/store';
import AddNewRepo from './components/Home/AddNewRepo';
import RepoDetails from './components/Home/RepoDetails';

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

    useHotkeys('alt+1', () => {
        dispatch(changeSortingOrder(0));
    });

    useHotkeys('alt+2', () => {
        dispatch(changeSortingOrder(1));
    });

    useHotkeys('alt+3', () => {
        dispatch(changeSortingOrder(2));
    });

    useEffect(() => {
        setAuthenticated(!!localStorage.getItem('accessToken'));
    }, [isAuthDone]);

    useEffect(() => {
        if (isDarkModeOn) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [isDarkModeOn]);

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
                    <Route path='/add-repo' element={<AddNewRepo />} />
                    <Route path='/repo-details/:id' element={<RepoDetails />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
