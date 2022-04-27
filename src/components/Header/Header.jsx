import * as userService from '../../utilities/users-service';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import Logo from '../Logo/Logo'

export default function Header () {
    return (
        <Header>
        <Logo />
            <Link to="/login/"><button onClick={userService.logout}>Log out</button></Link><br /><br />
            <NavLink to={-1}>Back</NavLink>
        </Header>
    )
}

// I don't like this link setup — I'd rather have it on the logout route but that's not working?