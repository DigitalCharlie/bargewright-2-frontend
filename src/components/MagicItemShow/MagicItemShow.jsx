import { useNavigate, useParams } from 'react-router-dom'
import * as magicAPI from '../../utilities/magic-api'

export default function NewAdvPage({ user, magicItem }) {

	const {charId, magicItemId} = useParams()
	const navigate = useNavigate()

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
		<section>
			<h1>Magic Item: {magicItem.name}</h1>
			<hr />
			<p>Magic Item details</p>
			<p>Magic item type: {magicItem.itemCategory}</p>
			<button onClick={handleDelete}>delete entry</button>
		</section>
	)
}