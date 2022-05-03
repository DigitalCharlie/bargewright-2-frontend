import { useParams, useNavigate, Link } from 'react-router-dom'
import * as downtimeAPI from '../../utilities/downtime-api'

export default function DowntimeShow({ user, flipEditToggle, downtime }) {

	const {charId, downtimeId} = useParams()
	const navigate = useNavigate()

	const charLink = `/user/${user.username}/character/${charId}`

	const handleDelete = async () => {
		try {
			let confirm = window.confirm('Are you sure you want to delete this downtime log?')
			if (confirm === true) {
				const deletedDt = await downtimeAPI.deleteDowntime(user.username, charId, downtimeId)
				console.log(deletedDt)
				navigate(`/user/${user.username}/character/${charId}`)
			}
		} catch(err) {
			console.log(err)
		}
	}

	return (
		<section className='show-section needs-min-height'>
			<div className="log-details-container">
				<table cellSpacing="0" cellPadding="0">
					<tbody>
					<tr>
						<td>Type of Activity: </td>
						<td>{downtime.activity}</td>
					</tr>
					<tr>
						<td>Date of Activity: </td>
						<td>{downtime.date || 'Unknown'}</td>
					</tr>
					<tr>
						<td>Downtime +/-: </td>
						<td>{downtime.downtimeUsed}</td>
					</tr>
					{
						downtime.gold !== 0 &&
						<tr>
							<td>Gold +/-: </td>
							<td>downtime.gold</td>
						</tr>
					}
					{
						downtime.levelGain !== 0 && downtime.levelGain &&
						<tr>
							<td>Levels gained: </td>
							<td>downtime.levelGain</td>
						</tr>
					}
					{
						downtime.healingPotions !== 0 && downtime.healingPotions &&
						<tr>
							<td>Healing Potion +/-: </td>
							<td>downtime.healingPotions</td>
						</tr>
					}
					{
						downtime.magicItemGained &&
						<tr>
							<td>Magic Items Gained: </td>
							<td>
								<Link className="block" to={`${charLink}/magicitem/${downtime.magicItemGained._id}`}>{downtime.magicItemGained.name}</Link>
							</td>
						</tr>
					}
					{
						downtime.notes &&
						<tr>
							<td>Notes: </td>
							<td>{downtime.notes}</td>
						</tr>
					}
					</tbody>
				</table>

			</div>
			<div className="show-buttons-container">
				<button onClick={flipEditToggle}>Edit downtime log</button>
				<button onClick={handleDelete}>Delete entry</button>
			</div>
		</section>
	)
}