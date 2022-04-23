import * as userService from '../../utilities/users-service';
import { Link } from 'react-router-dom';

export default function Header () {
    return (
        <>
            <Link to="/login/"><button onClick={userService.logout}>Log out</button></Link>
        </>
    )
}

// I don't like this link setup — I'd rather have it on the logout route but that's not working?