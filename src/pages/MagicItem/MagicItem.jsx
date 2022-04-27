import { useState } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom'
import MagicItemShow from '../../components/MagicItemShow/MagicItemShow'
import MagicItemEdit from '../../components/MagicItemEdit/MagicItemEdit'


export default function AdvNewPage({ user }) {

	const [editToggle, setEditToggle] = useState(false)

	const flipEditToggle = () => {
		setEditToggle(!editToggle)
	}

	return (
		<main>
			<h1>Magic Item Show Page</h1>
			{!editToggle ? <button onClick={flipEditToggle}>Edit magic item</button> : <button onClick={flipEditToggle}>Discard changes</button>}
			<hr />
				{
					!editToggle ?
					<MagicItemShow user={user}/>
					:
					<MagicItemEdit user={user} flipEditToggle={flipEditToggle}/>
				}
			<hr />
			<Link to={`/user/${user.username}`}>home</Link>
		</main>
	)
}