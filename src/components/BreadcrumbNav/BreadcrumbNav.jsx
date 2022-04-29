import { useParams, Link, useNavigate } from "react-router-dom"
import styles from './BreadcrumbNav.module.css'

export default function BreadcrumbNav ({user, char, adv, magicItem}) {

	const {charId, advId, magicItemId} = useParams()
	const navigate = useNavigate()

	return (
		<nav role="navigation" aria-label="breadcrumb navigation" className={styles.breadcrumbContainer}>
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
				<li> &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span className="red-hover pointer" onClick={() => navigate(-1)}>go back</span></li>

			</ul>
		</nav>
	)
}