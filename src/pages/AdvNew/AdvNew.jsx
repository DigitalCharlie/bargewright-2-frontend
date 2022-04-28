import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as advAPI from '../../utilities/adv-api'
import * as moment from 'moment'
import AdvNew from '../../components/AdvNew/AdvNew'
import MagicItemNew from "../../components/MagicItemNew/MagicItemNew"

export default function AdvNewPage({ user }) {

	const [magicItemCount, setMagicItemCount] = useState(null)
	const [advId, setAdvId] = useState('')
	const navigate = useNavigate()

	const {charId} = useParams()

	const updateMagicItems = (num) => {
		if(num === 0) navigate(`/user/${user.username}/character/${charId}`)
		setMagicItemCount(num)
	}

	return (
		<main>
			<h1>New Adventure</h1>
			<hr />
				{
					!magicItemCount ?
					<AdvNew user={user} updateMagicItems={updateMagicItems} setAdvId={setAdvId} />
					:
					<MagicItemNew user={user} updateMagicItems={updateMagicItems} magicItemCount={magicItemCount} advId={advId} />
				}
			<hr />
			<Link to={`/user/${user.username}`}>home</Link>
		</main>
	)
}