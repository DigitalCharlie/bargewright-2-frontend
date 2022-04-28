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
            <h1>Welcome back, {user.username}</h1>
            {
                user.welcome ?
                <p>{user.welcome}</p>
                :
                <>
                <p className="narrow-para">Click on any of your characters to view their details, or use the quicklinks to go directly to log a new adventure or downtime activity for them.</p>
                <p className="narrow-para">Clicking on any of the table headings will sort your characters by that category, and clicking it a second time will reverse the sort. The same is true on your character's individual pages.</p>
                </>
            }
            <hr />
            <h2 className="center">Your characters</h2>


            <table cellspacing="0" cellpadding="0">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Race</th>
                                <th scope="col">Class</th>
                                <th scope="col">Level</th>
                                <th scope="col" className="center">Quicklinks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                chars.map((character) => (
                                    <tr key={`${character._id}`} className="table-row">
                                        <td>
                                            <Link to={`/user/${user.username}/character/${character._id}`}>{character.name}</Link>
                                        </td>
                                        <td>
                                            <Link to={`/user/${user.username}/character/${character._id}`}>{character.race}</Link>
                                        </td>
                                        <td>
                                            <Link to={`/user/${user.username}/character/${character._id}`}>{character.class}</Link>
                                        </td>
                                        <td>
                                            <Link to={`/user/${user.username}/character/${character._id}`}>Character level (tbcalculated)</Link>
                                        </td>
                                        <td className="center"><Link to={`/user/${user.username}/character/${character._id}/adventure/new`}>🆕</Link>
                                        </td>                                                                                                                 
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <Link to={`/user/${user.username}/character/new`}><button className="red-button button-center">Add new character</button></Link>
            <hr />
            <button onClick={handleDelete}>delete user</button>
        </main>
    )
}