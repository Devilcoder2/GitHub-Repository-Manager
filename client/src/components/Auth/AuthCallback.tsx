import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';

const AuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccessToken = async () => {
            const params = new URLSearchParams(window.location.search);
            const code = params.get('code');

            if (code) {
                try {
                    const response = await fetch(
                        `http://localhost:5000/auth/github/callback?code=${code}`
                    );
                    const data = await response.json();

                    setTimeout(() => {
                        if (response.ok) {
                            console.log('Access token:', data.accessToken);
                            localStorage.setItem(
                                'accessToken',
                                data.accessToken
                            );
                            navigate('/dashboard'); // Redirect to dashboard on success
                        } else {
                            alert('Authentication failed. Please try again.');
                            navigate('/'); // Redirect to home on failure
                        }
                    }, 5000);
                } catch (error) {
                    console.error('Error during authentication:', error);
                    alert('An error occurred. Please try again.');
                    navigate('/');
                }
            }
        };

        fetchAccessToken();
    }, [navigate]);

    return (
        <div className='flex justify-center items-center min-h-screen w-full bg-[#FAFAFA]'>
            <HashLoader color='#1570EF' />
        </div>
    );
};

export default AuthCallback;
