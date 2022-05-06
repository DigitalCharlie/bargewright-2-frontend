import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import * as downtimeAPI from '../../utilities/downtime-api'

// COMPONENTS
import BreadcrumbNav from "../../components/BreadcrumbNav/BreadcrumbNav"
import DowntimeShow from "../../components/DowntimeShow/DowntimeShow"
import DowntimeEdit from "../../components/DowntimeEdit/DowntimeEdit"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"

export default function DowntimePage({ user }) {

	const [editToggle, setEditToggle] = useState(false)
	const [submittedForm, setSubmittedForm] = useState(false)
	const [downtime, setDowntime] = useState('')
	const [displayName, setDisplayName] = useState(null)
	const [loaded, setLoaded] = useState(null)


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
				const date = data.date.slice(0,10)
				setDowntime({...data, date:date})
			} catch(e) {
				console.log(e)
			}
			setTimeout(() => {
				setLoaded(true)
			}, 300)	
		})()
	}, [submittedForm])

	return (
		<main>
			<h1>Downtime log for {downtime.activity && downtime.character.name}</h1>
				{
					loaded === null ? 
						<>
							<h3 className="center">Loading</h3>
							<LoadingSpinner />
						</> 
					:
					!editToggle ?
					<DowntimeShow downtime={downtime} flipEditToggle={flipEditToggle} user={user}/>
					:
					<DowntimeEdit user={user} downtime={downtime} flipEditToggle={flipEditToggle} flipSubmittedForm={flipSubmittedForm}/>
				}
			<BreadcrumbNav user={user} charId={charId} char={downtime.character && downtime.character.name} downtime={downtime.activity} />
		</main>
	)
}