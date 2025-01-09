import { useNavigate } from 'react-router-dom';

const ContributorDetails = ({ user }) => {
    console.log('USER DETAILS: ', user);

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/user-details/${user.login}`);
    };

    return (
        <div>
            <button onClick={handleClick}>{user.login}</button>
        </div>
    );
};

export default ContributorDetails;
