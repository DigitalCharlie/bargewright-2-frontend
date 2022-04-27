import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import * as charAPI from '../../utilities/char-api'

export default function UserHome({user}){
	const {charId} = useParams()
	const [char, setChar] = useState({})
	const [advs, setAdvs] = useState([])
	const [magicItems, setmagicItems] = useState([])
	const [sortType, setSortType ] = useState(null)
	const [sortOrder, setSortOrder] = useState(true)

	const navigate = useNavigate()

	const sortAdventures = (x, y) => {
		let a = ''
		let b = ''
		if (sortType === 'name') {
			 a = x.adventureName.toUpperCase();
			 b = y.adventureName.toUpperCase();
		} else {
			 a = new Date(x.hireDate);
       		 b = new Date(y.hireDate);
		}
		if (sortOrder === true) {
			return a === b ? 0 : a > b ? 1 : -1;
		} else {
			return a === b ? 0 : a > b ? -1 : 1;
		}
	}

	const handleAdventureSort = (type) => {
		if (sortType === type) {
			setSortOrder(!sortOrder)
		} else {
			setSortType(type)
			setSortOrder(true)
		}
	}

	useEffect(() => {
		(async () => {
			try {
				const charData = await charAPI.getById(user.username, charId)
				setChar(charData)
				const advData = await charAPI.getAllAdv(user.username, charId)
				setAdvs(advData)
				setAdvs(advData.sort(sortAdventures))
				const magicData = await charAPI.getAllMagic(user.username, charId)
				setmagicItems(magicData)
			} catch(e) {
				console.log(e)
			}
		})()
	}, [sortOrder, sortType])

    return (
        <main>
            <h1>Character Home</h1>
            <p>Character name is: {char.name}</p>
			<hr />
			<p>Adventures</p>
			<button onClick={()=>handleAdventureSort('name')}>Sort by adventure name</button>
			<button onClick={()=>handleAdventureSort('date')}>Sort by adventure date</button>
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