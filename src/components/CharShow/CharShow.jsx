import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import * as charAPI from '../../utilities/char-api'

export default function UserHome({user, char}){
	const {charId} = useParams()
	const [advs, setAdvs] = useState([])
	const [magicItems, setmagicItems] = useState([])
	const [sortType, setSortType ] = useState(null)
	const [sortOrder, setSortOrder] = useState(true)
	const charLink = `/user/${user.username}/character/${charId}`

	const sortAdventures = (x, y) => {
		let a = ''
		let b = ''
		if (sortType === 'title') {
			 a = x.adventureName.toUpperCase();
			 b = y.adventureName.toUpperCase();
		}
		if (sortType === 'date'){
			 a = new Date(x.hireDate);
       		 b = new Date(y.hireDate);
		}
		if (sortType === 'gold') {
			a = parseInt(x.goldFound);
			b = parseInt(y.goldFound);
	   }
	   if (sortType === 'magicItems') {
		a = x.magicItems.length;
		b = y.magicItems.length;
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
				const advData = await charAPI.getAllAdv(user.username, charId)
				advData.forEach((adv) => (
					adv.datePlayed = adv.datePlayed.slice(0,10),
					adv.displayName = adv.adventureCode && adv.adventureName 
					? `${adv.adventureCode} ${adv.adventureName}`
					: adv.adventureName
					? adv.adventureName
					: adv.adventureCode
				))
				setAdvs(advData)
				const magicData = await charAPI.getAllMagic(user.username, charId)
				setmagicItems(magicData)
			} catch(e) {
				console.log(e)
			}
		})()
	}, [sortOrder, sortType])

    return (
        <section>
			<h2 className="center">Adventures</h2>
				<table cellSpacing="0" cellPadding="0">
				<thead>
					<tr>
						<th className="pointer" scope="col" onClick={() => {handleAdventureSort('title')}}>Adventure Title {sortType === 'title' && sortOrder ===true ? ' ▲' : sortType === 'title' ? ' ▼' : "\u00A0\u00A0\u00A0\u00A0" }</th>
						<th className="pointer" scope="col" onClick={() => {handleAdventureSort('date')}}>Date Played {sortType === 'date' && sortOrder ===true ? ' ▲' : sortType === 'date' ? ' ▼' : "\u00A0\u00A0\u00A0\u00A0"}</th>
						<th className="pointer" scope="col" onClick={() => {handleAdventureSort('gold')}}>Gold Found {sortType === 'gold' && sortOrder ===true ? ' ▲' : sortType === 'gold' ? ' ▼' : "\u00A0\u00A0\u00A0\u00A0"}</th>
						<th className="pointer" scope="col" onClick={() => {handleAdventureSort('magicItems')}}>Magic Items {sortType === 'magicItems' && sortOrder ===true ? ' ▲' : sortType === 'magicItems' ? ' ▼' : "\u00A0\u00A0\u00A0\u00A0"}</th>
						<th scope="col" className="center">Quicklinks</th>
					</tr>
				</thead>
				<tbody>
					{
						advs.sort(sortAdventures).map((adventure) => (
							<tr key={`${adventure._id}`} className="table-row">
								<td>
									<Link to={`${charLink}/adventure/${adventure._id}`}>{adventure.displayName}</Link>
								</td>
								<td>
									<Link to={`${charLink}/adventure/${adventure._id}`}>{adventure.datePlayed}</Link>
								</td>
								<td>
									<Link to={`${charLink}/adventure/${adventure._id}`}>{adventure.goldFound}</Link>
								</td>
								<td>
									{
										adventure.magicItems.map((magicItem) => (
											<Link className="block" to={`${charLink}/magicitem/${magicItem._id}`}>{magicItem.name}</Link>
										))
									}
								</td>
								<td className="center"><Link to={`${charLink}/adventure/${adventure._id}`}>edit</Link>
								</td>            
							</tr>
						))
					}
				</tbody>
			</table>

			<hr />
			<p>Magic Items</p>
			{
				magicItems.map((magicItem) => (
					<p key={magicItem._id}><Link to={`/user/${user.username}/character/${charId}/magicitem/${magicItem._id}/`}>{magicItem.name}</Link></p>
				))
			}
        </section>
    )
}