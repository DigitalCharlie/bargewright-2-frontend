import {Link} from 'react-router-dom'
import styles from './Logo.module.css';

export default function Logo({user}) {
return (
	<Link  className={styles.logo} to={user ? `/user/${user.username}` : `/`}>
		<div className={styles.small}>The</div>
		<div className={styles.big}>Bargewright</div>
		<div className={styles.small}>Inn</div>
	</Link>
);
}