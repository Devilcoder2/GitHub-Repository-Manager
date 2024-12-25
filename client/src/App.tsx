import { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import AuthCallback from './components/Auth/AuthCallback';
import AddNewRepo from './components/Home/Repositories/AddNewRepo';
import AiCodeReview from './components/Home/AICodeReview/AICodeReview';
import CloudSecurity from './components/Home/CloudSecurity/CloudSecurity';
import HowToUse from './components/Home/HowToUse/HowToUse';
import Layout from './components/Home/Layout';
import RepoDetails from './components/Home/Repositories/RepoDetails';
import Dashboard from './components/Home/Repositories/Dashboard';
import Settings from './components/Home/Settings/Settings';
import {
    changeSortingOrder,
    toggleDarkMode,
    toggleRepoSize,
    toggleShowTag,
} from './redux/actionCreators';
import { RootState } from './redux/store';

function App() {
    //STATES FOR MANAGING AUTHENTICATION
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

    //HOTKEYS FOR TOGGLING FEATURES
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

    //CHECKING IF USER IS AUTHENTICATED
    useEffect(() => {
        setAuthenticated(!!localStorage.getItem('accessToken'));
    }, [isAuthDone]);

    //MANAGE DARK MODE
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
                {/* ROUTES FOR AUTHENTICATION */}
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

                {/* ROUTES FOR DASHBOARD */}
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
