import AuthLeft from './AuthLeft';
import AuthRight from './AuthRight';

const Auth = () => {
    return (
        <div className={`flex gap-2 w-full justify-center`}>
            <AuthLeft />
            <AuthRight />
        </div>
    );
};

export default Auth;
