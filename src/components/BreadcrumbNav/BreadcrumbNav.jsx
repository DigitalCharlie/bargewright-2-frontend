import { useParams, Link, useNavigate } from "react-router-dom"
import styles from './BreadcrumbNav.module.css'

export default function BreadcrumbNav ({user, char, adv, magicItem, downtime}) {

	const {charId, advId, magicItemId, downtimeId} = useParams()
	const navigate = useNavigate()

	return (
		<nav role="navigation" aria-label="breadcrumb navigation" className={styles.breadcrumbContainer}>
			<li className={`${styles.breadcrumbBack} grayText red-hover pointer`} onClick={() => navigate(-1)}> Back</li>
			<ul className={styles.breadcrumbUl}>
				{
					charId 
					?
					<>
					<li><Link to={`/user/${user.username}`}>{user.username}</Link></li>
					<li> &gt; <Link to={`/user/${user.username}/character/${charId}`} className="white-link">{char}</Link></li>
					</>
					:
					''
				}
				{
					advId 
					?
					<li> &gt; <Link to={`/user/${user.username}/character/${charId}/adventure/${advId}`}>{adv}</Link></li>
					:
					''
				}
				{
					magicItemId 
					?
					<li> &gt; <Link to={`/user/${user.username}/character/${charId}/magicitem/${magicItemId}`}>{magicItem}</Link></li>
					:
					''
				}
				{
					downtimeId 
					?
					<li> &gt; <Link to={`/user/${user.username}/character/${charId}/downtime/${downtimeId}`}>{downtime}</Link></li>
					:
					''
				}
				<br />
			</ul>

		</nav>
	)
}