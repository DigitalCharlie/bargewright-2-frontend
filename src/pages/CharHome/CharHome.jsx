import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import * as charAPI from '../../utilities/char-api'


export default function UserHome({user}){
	const {charId} = useParams()
	const [char, setChar] = useState({})

	console.log(charId)

	useEffect(() => {
		(async () => {
			try {
				const data = await charAPI.getById(user.username, charId)
				setChar(data)
			} catch(e) {
				console.log(e)
			}
		})()
	}, [])

    return (
        <main>
            <h1>Character Home</h1>
            <p>Character name is: {char.name}</p>
        </main>
    )
}