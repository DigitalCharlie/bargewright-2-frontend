import { useParams, useNavigate, Link } from 'react-router-dom'
import * as advAPI from '../../utilities/adv-api'
import * as moment from 'moment'
import styles from './AdvShow.module.css'

export default function AdvShow({ user, adv, flipEditToggle }) {

	const {charId, advId} = useParams()
	const navigate = useNavigate()

	const charLink = `/user/${user.username}/character/${charId}`

	const handleDelete = async () => {
		try {
			let confirm = window.confirm('Are you sure you want to delete this adventure log?')
			if (confirm === true) {
				const deletedAdv = await advAPI.deleteAdv(user.username, charId, advId)
				console.log(deletedAdv)
				navigate(`/user/${user.username}/character/${charId}`)
			}
		} catch(err) {
			console.log(err)
		}
	}

	return (
		<section className='show-section'>
			<div className="log-details-container">
				<table cellSpacing="0" cellPadding="0">
					<tr>
						<td>Date Played: </td>
						<td>{adv.datePlayed || 'Unknown'}</td>
					</tr>
					<tr>
						<td>Adventure Code: </td>
						<td>{adv.adventureCode || 'Unknown'}</td>
					</tr>
					<tr>
						<td>Adventure Title: </td>
						<td>{adv.adventureName}</td>
					</tr>
					<tr>
						<td>Dungeon Master: </td>
						<td>{adv.dungeonMaster || 'Unknown'}</td>
					</tr>
					<tr>
						<td>Gold +/-: </td>
						<td>{adv.goldFound || '0 (Not recorded)'}</td>
					</tr>
					<tr>
						<td>Levels gained: </td>
						<td>{adv.levelGain}</td>
					</tr>
					<tr>
						<td>Downtime +/-: </td>
						<td>{adv.downtimeEarned || 'Not recorded'}</td>
					</tr>
					<tr>
						<td>Magic Items: </td>
						<td>
							{
								adv.magicItems &&
								adv.magicItems.map((magicItem) => (
									<Link key={magicItem._id} className="block" to={`${charLink}/magicitem/${magicItem._id}`}>{magicItem.name}</Link>
								))
							}
						</td>
					</tr>
					{
						adv.magicItemNotes &&
						<tr>
							<td>Magic Item notes: </td>
							<td>{adv.magicItemNotes}</td>
						</tr>
					}
					{
						adv.notes &&
						<tr>
							<td>Adventure notes: </td>
							<td>{adv.notes}</td>
						</tr>
					}
				</table>
				{
					adv.storyAwards &&
					<>
						<h3 className={styles.storyAwardHeader}>Story Awards and Other Boons</h3>
						<table>
							{
								adv.storyAwards.map((award) => (
									<tr>
										<td>
											{award.title}
										</td>
										<td>
											{award.description}
										</td>
									</tr>
								))
							}
						</table>
					</>
				}

			</div>
			<div className="show-buttons-container">
				<button onClick={flipEditToggle}>Edit adventure log</button>
				<button onClick={handleDelete}>Delete entry</button>
			</div>
		</section>
	)
}