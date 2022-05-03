import { Link } from "react-router-dom"
import {useState, useEffect} from 'react'

export default function AdvTable ({charLink, downtimeActivities}) {

	const [sortType, setSortType ] = useState('date')
	const [sortOrder, setSortOrder] = useState(true)

	const sortDowntime = (x, y) => {
		let a = ''
		let b = ''
		if (sortType === 'title') {
			 a = x.adventureName.toUpperCase();
			 b = y.adventureName.toUpperCase();
		}
		if (sortType === 'date'){
			 a = x.datePlayed;
       		 b = y.datePlayed;
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

	return (
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
											<Link key={magicItem._id} className="block" to={`${charLink}/magicitem/${magicItem._id}`}>{magicItem.name}</Link>
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
	)
}