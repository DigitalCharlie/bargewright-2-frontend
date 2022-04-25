import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import * as usersAPI from '../../utilities/users-api'


export default function UserHome({user}){

    const [chars, setChars] = useState([])

	useEffect(() => {
		(async () => {
			try {
				const data = await usersAPI.getAllChars(user.username)
				setChars(data)
                console.log(data)
			} catch(e) {
				console.log(e)
			}
		})()
	}, [])

    return (
        <main>
            <h1>User's Home</h1>
            <p>{user.username} </p>
            <h3>View characters</h3>
            {
                chars.map((character) => (
                    <p key={character._id}><Link to={`/user/${user.username}/character/${character._id}`}>{character.name}</Link></p>
                ))
            }
            <Link to={`/user/aaa/character/6265c1c8bbbaed6aa2dae704`}>Test hard link</Link><br />
            <Link to={`/user/${user.username}/character/new`}>new character</Link>
        </main>
    )
}