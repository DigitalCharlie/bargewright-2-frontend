import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as advAPI from '../../utilities/adv-api'
import AdvShow from '../../components/AdvShow/AdvShow'
import AdvEdit from '../../components/AdvEdit/AdvEdit'

export default function NewAdvPage({ user }) {


	const [editToggle, setEditToggle] = useState(false)

	const flipEditToggle = () => {
		setEditToggle(!editToggle)
	}

	return (
		<main>
			<h1>Adventure Show Page</h1>
			{!editToggle ? <button onClick={flipEditToggle}>Edit adventure log</button> : <button onClick={flipEditToggle}>Discard changes</button>}
			<hr />
				{
					!editToggle ?
					<AdvShow user={user}/>
					:
					<AdvEdit user={user} flipEditToggle={flipEditToggle}/>
				}
			<hr />
			<Link to={`/user/${user.username}`}>home</Link>
		</main>
	)
}