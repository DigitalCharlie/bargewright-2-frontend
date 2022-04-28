import * as userService from '../../utilities/users-service';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import Logo from '../Logo/Logo'
import HeaderLogin from '../HeaderLogin/HeaderLogin';

export default function Header ({user, setUser}) {
    return (
        <header>
            <Logo user={user} />
            <HeaderLogin user={user} setUser={setUser} />
        </header>
    )
}