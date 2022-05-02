import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import * as downtimeAPI from '../../utilities/downtime-api'

// COMPONENTS
import BreadcrumbNav from "../../components/BreadcrumbNav/BreadcrumbNav"
import DowntimeShow from "../../components/DowntimeShow/DowntimeShow"

export default function DowntimePage({ user }) {

	const [editToggle, setEditToggle] = useState(false)
	const [submittedForm, setSubmittedForm] = useState(false)
	const [downtime, setDowntime] = useState('')
	const [displayName, setDisplayName] = useState(null)

	const {charId, downtimeId} = useParams()


	const flipEditToggle = () => {
		setEditToggle(!editToggle)
	}

	const flipSubmittedForm = () => {
		setSubmittedForm(!submittedForm)
	}

	useEffect(() => {
		(async () => {
			try {
				const data = await downtimeAPI.getById(user.username, charId, downtimeId)
				console.log(data)
				const date = data.date.slice(0,10)
				setDowntime({...data, date:date})
			} catch(e) {
				console.log(e)
			}
		})()
	}, [submittedForm])

	return (
		<main>
			<h1>Downtime log for {downtime.activity && downtime.character.name}</h1>
				{
					!editToggle ?
					<DowntimeShow downtime={downtime} flipEditToggle={flipEditToggle} user={user}/>
					:
					<p>Edit downtime</p>
				}
			<BreadcrumbNav user={user} />
		</main>
	)
}