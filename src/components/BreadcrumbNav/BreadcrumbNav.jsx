import { useParams, Link } from "react-router-dom"
import styles from './BreadcrumbNav.module.css'

export default function BreadcrumbNav ({user, char, adv, magicItem}) {

	const {charId, advId, magicItemId} = useParams()

	return (
		<nav role="navigation" aria-label="breadcrumb navigation" className={styles.breadcrumbContainer}>
			<ul className={styles.breadcrumbUl}>
				{
					charId 
					?
					<>
					<li><Link to={`/user/${user.username}`} className="white-link">{user.username}</Link></li>
					<li> &gt; <Link to={`/user/${user.username}/character/${charId}`} className="white-link">{char}</Link></li>
					</>
					:
					''
				}
				{
					advId 
					?
					<li> &gt; <Link to={`/user/${user.username}/character/${charId}/adventure/${advId}`}className="white-link">{adv}</Link></li>
					:
					''
				}
				{
					magicItemId 
					?
					<li> &gt; <Link to={`/user/${user.username}/character/${charId}/magicitem/${magicItemId}`}className="white-link">{magicItem}</Link></li>
					:
					''
				}
			</ul>
		</nav>
	)
}