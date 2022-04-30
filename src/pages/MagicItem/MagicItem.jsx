// DEPENDENCIES
import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as magicAPI from '../../utilities/magic-api'

// DISPLAY COMPONENTS
import MagicItemShow from '../../components/MagicItemShow/MagicItemShow'
import MagicItemEdit from '../../components/MagicItemEdit/MagicItemEdit'
import BreadcrumbNav from "../../components/BreadcrumbNav/BreadcrumbNav"

export default function AdvNewPage({ user }) {

	const [editToggle, setEditToggle] = useState(false)
	const [submittedForm, setSubmittedForm] = useState(false)
	const [magicItem, setMagicItem] = useState('')

	const {charId, magicItemId} = useParams()

	const flipEditToggle = () => {
		setEditToggle(!editToggle)
	}

	const flipSubmittedForm = () => {
		setSubmittedForm(!submittedForm)
	}

	useEffect(() => {
		(async () => {
			try {
				const data = await magicAPI.getById(user.username, charId, magicItemId)
				setMagicItem(data)
				console.log(data.character.name)
			} catch(e) {
				console.log(e)
			}
		})()
	}, [submittedForm])


	return (
		<main>
			<h1>{magicItem.name}</h1>
			{!editToggle ? <button onClick={flipEditToggle}>Edit magic item</button> : <button onClick={flipEditToggle}>Discard changes</button>}
			<hr />
				{
					!editToggle ?
					<MagicItemShow user={user} magicItem={magicItem}/>
					:
					<MagicItemEdit user={user} magicItem={magicItem} flipEditToggle={flipEditToggle} flipSubmittedForm={flipSubmittedForm}/>
				}
			<BreadcrumbNav user={user} magicItem={magicItem.name} char={magicItem && magicItem.character.name}/>
		</main>
	)
}