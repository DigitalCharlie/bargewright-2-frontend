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
			const deletedAdv = await advAPI.deleteAdv(user.username, charId, advId)
			console.log(deletedAdv)
		} catch(err) {
			console.log(err)
		} finally {
			navigate(-1)
		}
	}

	return (
		<main>
			<h1>Adventure Log: {adv.adventureName}</h1>
			<hr />
			<p>Adventure details</p>
			<p>Date played: {adv.datePlayed}</p>
			<p><Link to={`/user/${user.username}/character/${charId}/adventure/${advId}/edit`}>Edit adventure log</Link></p>
			<button onClick={handleDelete}>delete entry</button>
			<hr />
			<Link to={`/user/${user.username}`}>home</Link>
		</main>
	)
}