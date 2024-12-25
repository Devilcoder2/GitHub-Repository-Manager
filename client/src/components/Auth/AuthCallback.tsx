import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { BASE_URL } from '../../helper';

interface AuthCallbackProps {
    setIsAuthDone: (value: boolean) => void;
}

const AuthCallback: React.FC<AuthCallbackProps> = ({ setIsAuthDone }) => {
    const navigate = useNavigate();

    //REDIRECTS TO THE BACKEND FOR GETTING THE ACCESS TOKEN
    useEffect(() => {
        const fetchAccessToken = async () => {
            const params = new URLSearchParams(window.location.search);
            const code = params.get('code');

            if (code) {
                try {
                    const response = await fetch(
                        `${BASE_URL}/auth/github/callback?code=${code}`
                    );
                    const data = await response.json();

                    if (response.ok) {
                        setIsAuthDone(true);
                        localStorage.setItem('accessToken', data.accessToken);
                        navigate('/dashboard');
                    } else {
                        alert('Authentication failed. Please try again.');
                        navigate('/');
                    }
                } catch (error) {
                    console.error('Error during authentication:', error);
                    alert('An error occurred. Please try again.');
                    navigate('/');
                }
            }
        };

        fetchAccessToken();
    }, [navigate, setIsAuthDone]);

    return (
        <div className='flex justify-center items-center min-h-screen w-full bg-[#FAFAFA]'>
            <HashLoader color='#1570EF' />
        </div>
    );
};

export default AuthCallback;
