import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as advAPI from '../../utilities/adv-api'

export default function NewAdvPage({ user }) {

	const {charId, advId} = useParams()
	const [adv, setAdv] = useState({})
	const navigate = useNavigate()

	useEffect(() => {
		(async () => {
			try {
				const data = await advAPI.getById(user.username, charId, advId)
				const date = data.datePlayed.slice(0,10)
				setAdv({...data, datePlayed:date})
			} catch(e) {
				console.log(e)
			}
		})()
	}, [])

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
			<h1>Adventure Log: {adv.adventureName}</h1>
			<hr />
			<p>Adventure details</p>
			<p>Date played: {adv.datePlayed}</p>
			<button onClick={handleDelete}>delete entry</button>
		</main>
	)
}