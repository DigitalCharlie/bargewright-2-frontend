import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import * as charAPI from '../../utilities/char-api'

export default function UserHome({user}){
	const {charId} = useParams()
	const [char, setChar] = useState({})
	const [advs, setAdvs] = useState([])
	const [magicItems, setmagicItems] = useState([])

	const navigate = useNavigate()


	useEffect(() => {
		(async () => {
			try {
				const charData = await charAPI.getById(user.username, charId)
				setChar(charData)
				const advData = await charAPI.getAllAdv(user.username, charId)
				setAdvs(advData)
				const magicData = await charAPI.getAllMagic(user.username, charId)
				setmagicItems(magicData)
				console.log(magicData)
			} catch(e) {
				console.log(e)
			}
		})()
	}, [])

    return (
        <main>
            <h1>Character Home</h1>
            <p>Character name is: {char.name}</p>
			<hr />
			<p>Adventures</p>
			{
				advs.map((adventure) => (
					<p key={adventure._id}><Link to={`/user/${user.username}/character/${charId}/adventure/${adventure._id}/`}>{adventure.adventureName}</Link></p>
				))
			}
			<hr />
			<p>Magic Items</p>
			{
				magicItems.map((magicItem) => (
					<p key={magicItem._id}><Link to={`/user/${user.username}/character/${charId}/magicitem/${magicItem._id}/`}>{magicItem.name}</Link></p>
				))
			}
        </main>
    )
}