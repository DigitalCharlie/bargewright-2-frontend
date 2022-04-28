import { Link, NavLink } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import styles from './HeaderLogin.module.css';

export default function HeaderLogin({user, setUser}) {

	const handleLogout = () => {
		userService.logout()
		setUser(null)
	}

	return (
		<section>
				{
					user && user.username ?
					<div className={styles.loginButtons}><Link className="white-link" to={`/user/${user.username}`}>Home</Link><Link to="/login/"><button className="red-button" onClick={handleLogout}>Log out</button></Link></div>
					:
					<div className={styles.loginButtons}><Link className="white-link" to="/login">Login</Link><Link to="/login/"><button className="red-button">Sign Up</button></Link></div>
				}
		</section>
	);
}