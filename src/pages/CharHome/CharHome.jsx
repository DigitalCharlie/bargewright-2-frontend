import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import * as charAPI from '../../utilities/char-api'

export default function UserHome({user}){
	const {charId} = useParams()
	const [char, setChar] = useState({})
	const [advs, setAdvs] = useState([])


	useEffect(() => {
		(async () => {
			try {
				const charData = await charAPI.getById(user.username, charId)
				setChar(charData)
				const advData = await charAPI.getAllAdv(user.username, charId)
				setAdvs(advData)
			} catch(e) {
				console.log(e)
			}
		})()
	}, [])

    return (
        <main>
            <h1>Character Home</h1>
            <p>Character name is: {char.name}</p>
			<hr />
			<p>Adventures</p>
			{
				advs.map((adventure) => (
					<p key={adventure._id}><Link to={`/user/${user.username}/character/${charId}/adventure/${adventure._id}/`}>{adventure.adventureName}</Link></p>
				))
			}
			<hr />
			<p><Link to={`/user/${user.username}/character/${charId}/adventure/new`}>Log Adventure</Link></p>
			<p><Link to={`/user/${user.username}/character/${charId}/edit`}>Edit character</Link></p>
			<p><Link to={`/user/${user.username}/`}>Home</Link></p>
        </main>
    )
}