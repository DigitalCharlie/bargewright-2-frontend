import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as advAPI from '../../utilities/adv-api'
import AdvShow from '../../components/AdvShow/AdvShow'
import AdvEdit from '../../components/AdvEdit/AdvEdit'

export default function NewAdvPage({ user }) {

	const [editToggle, setEditToggle] = useState(false)

	const navigate = useNavigate()
	const {charId, advId} = useParams()


	const flipEditToggle = () => {
		setEditToggle(!editToggle)
	}

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
		<main>
			<h1>Adventure Show Page</h1>
			{!editToggle ? <button onClick={flipEditToggle}>Edit adventure log</button> : <button onClick={flipEditToggle}>Discard changes</button>}
			<hr />
				{
					!editToggle ?
					<AdvShow user={user}/>
					:
					<AdvEdit user={user} flipEditToggle={flipEditToggle}/>
				}
			<hr />
			<button onClick={handleDelete}>delete entry</button>
			<Link to={`/user/${user.username}`}>home</Link>
		</main>
	)
}