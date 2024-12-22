import AuthLeft from './AuthLeft';
import AuthRight from './AuthRight';

const Auth = () => {
    const handleGithubLogin = () => {
        window.location.href = 'http://localhost:5000/auth/github';
    };
    return (
        <div className={`flex gap-2 h-[100vh] w-full  justify-center`}>
            <AuthLeft />
            <AuthRight onGithubLogin={handleGithubLogin} />
        </div>
    );
};

export default Auth;
