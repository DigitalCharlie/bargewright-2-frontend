import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import * as advAPI from '../../utilities/adv-api'
import AdvShow from '../../components/AdvShow/AdvShow'
import AdvEdit from '../../components/AdvEdit/AdvEdit'
import BreadcrumbNav from "../../components/BreadcrumbNav/BreadcrumbNav"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"

export default function AdvShowPage({ user }) {

	const [editToggle, setEditToggle] = useState(false)
	const [submittedForm, setSubmittedForm] = useState(false)
	const [adv, setAdv] = useState('')
	const [displayName, setDisplayName] = useState(null)
	const [loaded, setLoaded] = useState(null)
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
				const date = data.datePlayed.slice(0,10)
				setAdv({...data, datePlayed:date})
				if(data.adventureCode && data.adventureName) {
					setDisplayName(data.adventureCode+ ': '+ data.adventureName)
				} else if(data.adventureName) {
					setDisplayName(data.adventureName)
				} else {
					setDisplayName(data.adventureCode)
				}
				setTimeout(() => {
					setLoaded(true)
				}, 200)	
			} catch(e) {
				console.log(e)
			}
		})()
	}, [submittedForm])

	return (
		<main>
			<h1>Adventure log for {displayName}</h1>
				{
					loaded === null ? 
					<>
						<h3 className="center">Loading</h3>
						<LoadingSpinner />
					</> 
					:
					!editToggle ?
					<AdvShow user={user} adv={adv} flipEditToggle={flipEditToggle}/>
					:
					<AdvEdit user={user} adv={adv} flipEditToggle={flipEditToggle} flipSubmittedForm={flipSubmittedForm}/>
				}
			<BreadcrumbNav user={user} adv={displayName} char={adv && adv.character.name} />
		</main>
	)
}