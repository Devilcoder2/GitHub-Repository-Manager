import { BASE_URL } from '../../helper';
import AuthLeft from './AuthLeft';
import AuthRight from './AuthRight';

const Auth = () => {
    //REDIRECTS TO THE BACKEND FOR LOGIN USING GITHUB
    const handleGithubLogin = () => {
        window.location.href = `${BASE_URL}/auth/github`;
    };

    return (
        <div className={`flex gap-2 h-[100vh] w-full  justify-center`}>
            <AuthLeft />
            <AuthRight onGithubLogin={handleGithubLogin} />
        </div>
    );
};

export default Auth;
