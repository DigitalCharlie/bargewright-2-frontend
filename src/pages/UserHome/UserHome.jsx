import { Link } from "react-router-dom"

export default function UserHome({user}){

    return (
        <main>
            <h1>User's Home</h1>
            <p>{user.username} </p>
            <Link to={`/user/aaa/character/6265c1c8bbbaed6aa2dae704`}>Test hard link</Link><br />
            <Link to={`/user/${user.username}/character/new`}>new character</Link>
        </main>
    )
}