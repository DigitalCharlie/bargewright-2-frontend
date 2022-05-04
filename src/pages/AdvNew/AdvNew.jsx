import { useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import AdvNew from '../../components/AdvNew/AdvNew'
import MagicItemNew from "../../components/MagicItemNew/MagicItemNew"
import BreadcrumbNav from "../../components/BreadcrumbNav/BreadcrumbNav"

export default function AdvNewPage({ user }) {

	const [magicItemCount, setMagicItemCount] = useState(null)
	const [magicItemsFound, setMagicItemsFound] = useState(null)
	const [advId, setAdvId] = useState('')
	const navigate = useNavigate()

	const {charId} = useParams()

	const updateMagicItems = async (num, newAdvId) => {
		await setMagicItemCount(num)	
		if(num === 0) navigate(`/user/${user.username}/character/${charId}/adventure/${newAdvId}`)
	}

	return (
		<main>
			<h1>New Adventure</h1>
			<hr />
				{
					!magicItemCount ?
					<AdvNew user={user} updateMagicItems={updateMagicItems} setMagicItemsFound={setMagicItemsFound} setAdvId={setAdvId} />
					:
					<MagicItemNew user={user} updateMagicItems={updateMagicItems} magicItemCount={magicItemCount} advId={advId} magicItemsFound={magicItemsFound} />
				}
			<BreadcrumbNav user={user} charId={charId}  />
		</main>
	)
}