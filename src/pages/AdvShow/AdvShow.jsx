import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import * as advAPI from '../../utilities/adv-api'
import AdvShow from '../../components/AdvShow/AdvShow'
import AdvEdit from '../../components/AdvEdit/AdvEdit'
import BreadcrumbNav from "../../components/BreadcrumbNav/BreadcrumbNav"

export default function NewAdvPage({ user }) {

	const [editToggle, setEditToggle] = useState(false)
	const [submittedForm, setSubmittedForm] = useState(false)
	const [adv, setAdv] = useState('')
	const [displayName, setDisplayName] = useState(null)

	const navigate = useNavigate()
	const {charId, advId} = useParams()


	const flipEditToggle = () => {
		setEditToggle(!editToggle)
	}

	const flipSubmittedForm = () => {
		setSubmittedForm(!submittedForm)
	}

	useEffect(() => {
		(async () => {
			try {
				const data = await advAPI.getById(user.username, charId, advId)
				console.log(data)
				const date = data.datePlayed.slice(0,10)
				setAdv({...data, datePlayed:date})
				if(data.adventureCode && data.adventureName) {
					setDisplayName(data.adventureCode+ ': '+ data.adventureName)
				} else if(data.adventureName) {
					setDisplayName(data.adventureName)
				} else {
					setDisplayName(data.adventureCode)
				}
			} catch(e) {
				console.log(e)
			}
		})()
	}, [submittedForm])

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
			<h1>Adventure Show Page for {displayName}</h1>
			{!editToggle ? <button onClick={flipEditToggle}>Edit adventure log</button> : <button onClick={flipEditToggle}>Discard changes</button>}
			<hr />
				{
					!editToggle ?
					<AdvShow user={user} adv={adv}/>
					:
					<AdvEdit user={user} adv={adv} flipEditToggle={flipEditToggle} flipSubmittedForm={flipSubmittedForm}/>
				}
			<hr />
			<button onClick={handleDelete}>delete entry</button>
			<BreadcrumbNav user={user} adv={displayName} char={adv && adv.character.name} />
		</main>
	)
}