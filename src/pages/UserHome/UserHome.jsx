import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import * as usersAPI from '../../utilities/users-api'
import * as userService from '../../utilities/users-service';


export default function UserHome({user}){

    const [chars, setChars] = useState([])
    const navigate = useNavigate()

	useEffect(() => {
		(async () => {
			try {
				const data = await usersAPI.getAllChars(user.username)
				setChars(data)
			} catch(e) {
				console.log(e)
			}
		})()
	}, [])

    const handleDelete = async () => {
		try {
            let confirm = window.confirm(`Are you sure you want to delete your whole account? This cannot be undone.`)
            if(confirm === true) {
                const deletedUser = await usersAPI.deleteUser(user.username)
                userService.logout()
                navigate(`/`)
            }
		} catch(err) {
			console.log(err)
		}
	}

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
            <hr />
            <Link to={`/user/${user.username}/character/new`}>new character</Link><br />
            <button onClick={handleDelete}>delete user</button>
        </main>
    )
}