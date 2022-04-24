import { Link } from "react-router-dom"

export default function UserHome({user}){

    return (
        <main>
            <h1>User's Home</h1>
            <p>{user.username} </p>
            <Link to={`/user/${user.username}/new`}>new character</Link>
        </main>
    )
}