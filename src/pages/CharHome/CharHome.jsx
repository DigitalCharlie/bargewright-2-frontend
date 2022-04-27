import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import * as charAPI from '../../utilities/char-api'
import CharShow from '../../components/CharShow/CharShow'
import CharEdit from '../../components/CharEdit/CharEdit'

export default function UserHome({user}){

	const [editToggle, setEditToggle] = useState(false)
	const [char, setChar] = useState({})


	const {charId} = useParams()
	const navigate = useNavigate()

	const flipEditToggle = () => {
		setEditToggle(!editToggle)
	}

	useEffect(() => {
		(async () => {
			try {
				const charData = await charAPI.getById(user.username, charId)
				setChar(charData)
			} catch(e) {
				console.log(e)
			}
		})()
	}, [])

	const handleDelete = async () => {
		try {
			let confirm = window.confirm(`Are you sure you want to delete ${char.name}?`)
			if (confirm === true) {
				const deletedChar = await charAPI.deleteChar(user.username, charId)
				console.log(deletedChar)
				navigate(`/user/${user.username}`)
			}
		} catch(err) {
			console.log(err)
		} 
	}

	return (
		<main>
			<h1>Character Show Page</h1>
			{!editToggle ? <button onClick={flipEditToggle}>Edit character details</button> : <button onClick={flipEditToggle}>Discard changes</button>}
			<hr />
				{
					!editToggle ?
					<CharShow user={user}/>
					:
					<CharEdit user={user} flipEditToggle={flipEditToggle}/>
				}
			<hr />
			<p><Link to={`/user/${user.username}/character/${charId}/adventure/new`}>Log Adventure</Link></p>
			<button onClick={handleDelete}>delete character</button>
			<p><Link to={`/user/${user.username}/`}>Home</Link></p>
		</main>
	)
}