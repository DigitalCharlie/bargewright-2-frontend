import { useNavigate, useParams, Link } from 'react-router-dom'
import * as magicAPI from '../../utilities/magic-api'

export default function NewAdvPage({ user, magicItem, flipEditToggle }) {

	const navigate = useNavigate()
	const {charId, magicItemId} = useParams()

	const handleDelete = async () => {
		try {
			let confirm = window.confirm('Are you sure you want to delete this magic item?')
			if (confirm === true) {
				const deletedMagicItem = await magicAPI.deleteMagicItem(user.username, charId, magicItemId)
				console.log(deletedMagicItem)
				navigate(`/user/${user.username}/character/${charId}`)
			}
		} catch(err) {
			console.log(err)
		}
	}


	return (
		<section className='show-section'>
			<div className="log-details-container wide-log">
				<table cellSpacing="0" cellPadding="0">
					<tr>
						<td>Name:</td>
						<td>{magicItem.name}</td>
					</tr>
					<tr>
						<td>Source:</td>
						<td>
							{
								magicItem.adventureFound &&
								<Link to={`/user/${user.username}/character/${charId}/adventure/${magicItem.adventureFound._id}`}>{magicItem.adventureFound.adventureName}</Link>
							}
							{
								magicItem.downtimeActivity &&
								<Link to={`/user/${user.username}/character/${charId}/downtime/${magicItem.downtimeActivity}`}>{magicItem.downtimeActivity}</Link>
							}
						</td>
					</tr>
					<tr>
						<td>Rarity: </td>
						<td>{magicItem.rarity}</td>
					</tr>
					<tr>
						<td>Type: </td>
						<td>{magicItem.itemCategory}</td>
					</tr>
					<tr>
						<td>Attunement?</td>
						<td>{magicItem.attunement === true ? "Yes" : "No"}</td>
					</tr>
					{
						magicItem.charges &&
						<>
							<tr>
								<td>Charges:</td>
								<td>{magicItem.charges}</td>
							</tr>
						</>
					}
					{
						magicItem.status && magicItem.status !== 'owned' &&
						<>
							<tr>
								<td>Status:</td>
								<td>{magicItem.status.toUpperCase()}</td>
							</tr>
						</>
					}
					{
						magicItem.effects &&
						<>
							<br />
							<tr>
								<td>Description</td>
								<td>{magicItem.effects}</td>
							</tr>
						</>
					}
					{
						magicItem.flavor &&
						<>
							<br />
							<tr>
								<td>Description</td>
								<td>{magicItem.flavor}</td>
							</tr>
						</>
					}
				</table>
			</div>

			<div className="show-buttons-container">
				<button onClick={flipEditToggle}>Edit Magic Item</button>
				<button onClick={handleDelete}>Delete entry</button>
			</div>		
		</section>
	)
}