import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import * as charAPI from '../../utilities/char-api'
import CharShow from '../../components/CharShow/CharShow'
import CharEdit from '../../components/CharEdit/CharEdit'
import BreadcrumbNav from "../../components/BreadcrumbNav/BreadcrumbNav"

export default function UserHome({user}){

	const [editToggle, setEditToggle] = useState(false)
	const [char, setChar] = useState({})
	const [submittedForm, setSubmittedForm] = useState(false)


	const {charId} = useParams()
	const navigate = useNavigate()

	const flipEditToggle = () => {
		setEditToggle(!editToggle)
	}

	const flipSubmittedForm = () => {
		setSubmittedForm(!submittedForm)
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
	}, [submittedForm])

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
					<CharShow user={user} char={char}/>
					:
					<CharEdit user={user} char={char} flipEditToggle={flipEditToggle} flipSubmittedForm={flipSubmittedForm}/>
				}
			<hr />
			<p><Link to={`/user/${user.username}/character/${charId}/adventure/new`}>Log Adventure</Link></p>
			<button onClick={handleDelete}>delete character</button>
			<BreadcrumbNav user={user} char={char.name} />
		</main>
	)
}