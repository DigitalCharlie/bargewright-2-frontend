import { Link } from "react-router-dom"
import {useState, useEffect} from 'react'

export default function MagicItemTable ({charLink, magicItems}) {

	const [sortType, setSortType ] = useState('name')
	const [sortOrder, setSortOrder] = useState(true)
	
	const handleMagicSort = (type) => {
		if (sortType === type) {
			setSortOrder(!sortOrder)
		} else {
			setSortType(type)
			setSortOrder(true)
		}
	}

	const sortMagic = (x, y) => {
		let a = ''
		let b = ''
		const rarityArr = ['Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary', 'Artifact', 'Varies', 'Unknown']
		if (sortType === 'name') {
			a = x.name.toUpperCase();
			b = y.name.toUpperCase();
		}
		if (sortType === 'type') {
			a = x.type;
			b = y.type;
		}
		if (sortType === 'rarity') {
			a = rarityArr.indexOf(x.rarity) || 0
			b = rarityArr.indexOf(y.rarity) || 0
		}
		if (sortType === 'attunement') {
			a = x.attunement;
			b = y.attunement;
		}
		if (sortType === 'adventure') {
			a = x.adventureFound.adventureName.toUpperCase();
			b = y.adventureFound.adventureName.toUpperCase();
		}

		if (sortOrder === true) {
			return a === b ? 0 : a > b ? 1 : -1;
		} else {
			return a === b ? 0 : a > b ? -1 : 1;
		}
	}

	useEffect(() => {
	}, [sortOrder, sortType])

	return (
		<table cellSpacing="0" cellPadding="0">
			<thead>
				<tr>
					<th className="pointer" scope="col" onClick={() => {handleMagicSort('name')}}>Magic Item {sortType === 'name' && sortOrder ===true ? ' ▲' : sortType === 'name' ? ' ▼' : "\u00A0\u00A0\u00A0\u00A0" }</th>
					<th className="pointer" scope="col" onClick={() => {handleMagicSort('type')}}>Type {sortType === 'type' && sortOrder ===true ? ' ▲' : sortType === 'type' ? ' ▼' : "\u00A0\u00A0\u00A0\u00A0"}</th>
					<th className="pointer" scope="col" onClick={() => {handleMagicSort('rarity')}}>Rarity {sortType === 'rarity' && sortOrder ===true ? ' ▲' : sortType === 'rarity' ? ' ▼' : "\u00A0\u00A0\u00A0\u00A0"}</th>
					<th className="pointer" scope="col" onClick={() => {handleMagicSort('attunement')}}>Attunement {sortType === 'attunement' && sortOrder ===true ? ' ▲' : sortType === 'attunement' ? ' ▼' : "\u00A0\u00A0\u00A0\u00A0"}</th>
					<th className="pointer" scope="col" onClick={() => {handleMagicSort('adventure')}}>Source {sortType === 'adventure' && sortOrder ===true ? ' ▲' : sortType === 'adventure' ? ' ▼' : "\u00A0\u00A0\u00A0\u00A0"}</th>
					<th scope="col" className="center">Quicklinks</th>
				</tr>
			</thead>
			<tbody>
				{
					magicItems.sort(sortMagic).map((magicItem) => (
						<tr key={`${magicItem._id}`} className="table-row">
							<td>
								<Link to={`${charLink}/magicitem/${magicItem._id}`}>{magicItem.name}</Link>
							</td>
							<td>
								<Link to={`${charLink}/magicitem/${magicItem._id}`}>{magicItem.itemCategory}</Link>
							</td>
							<td>
								<Link to={`${charLink}/magicitem/${magicItem._id}`}>{magicItem.rarity}</Link>
							</td>
							<td>
								<Link to={`${charLink}/magicitem/${magicItem._id}`}>{magicItem.attunement ? 'Yes' : 'No'}</Link>
							</td>
							<td>
								<Link to={`${charLink}/magicitem/${magicItem._id}`}>{magicItem.adventureFound.adventureName}</Link>
							</td>
							<td className="center"><Link to={`${charLink}/magicitem/${magicItem._id}`}>edit</Link>
							</td>            
						</tr>
					))
				}
			</tbody>
		</table>
	)
}