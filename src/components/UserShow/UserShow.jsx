import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"

export default function UserShow ({user, chars, flipEditToggle, loaded}) {

	const [sortType, setSortType ] = useState(null)
	const [sortOrder, setSortOrder] = useState(true)

	const sortCharacters = (x, y) => {
		let a = ''
		let b = ''
		if (sortType === 'name') {
			 a = x.name.toUpperCase();
			 b = y.name.toUpperCase();
		} 
		if (sortType === 'race') {
			a = x.race.toUpperCase();
			b = y.race.toUpperCase();
		}
		if (sortType === 'class') {
			a = x.class.toUpperCase();
			b = y.class.toUpperCase();
		}
		if (sortType === 'level') {
			a = x.currentLevel;
			b = y.currentLevel;
		}
		if (sortOrder === true) {
			return a === b ? 0 : a > b ? 1 : -1;
		} else {
			return a === b ? 0 : a > b ? -1 : 1;
		}
	}

	const handleCharacterSort = (type) => {
		if (sortType === type) {
			setSortOrder(!sortOrder)
		} else {
			setSortType(type)
			setSortOrder(true)
		}
	}

	useEffect(() => {

	}, [sortOrder, sortType])


	return (
		<main>
			{
				loaded === null ? 
				<>
					<h3 className="center">Loading</h3>
					<LoadingSpinner />
				</> 
				:
				<>
				<h1>Greetings, {user.username}</h1>
				{
					user.welcomeMessage ?
					<p className="narrow-para">{user.welcomeMessage}</p>
					:
					<>
					<p className="narrow-para">Click on any of your characters to view their details, or use the quicklinks to go directly to log a new adventure or downtime activity for them.</p>
					<p className="narrow-para">Clicking on any of the table headings will sort your characters by that category, and clicking it a second time will reverse the sort. The same is true on your character's individual pages.</p>
					</>
				}
				<hr />
				<h2 className="center">Your characters</h2>

				{
					chars.length === 0 ?
					<p className="center">It looks like you don't have any characters yet.<br />Click the button below to add your first one!</p>
					:
					<table cellSpacing="0" cellPadding="0">
						<thead>
							<tr>
								<th className="pointer" scope="col" onClick={() => {handleCharacterSort('name')}}>Name{sortType === 'name' && sortOrder ===true ? ' ▲' : sortType === 'name' ? ' ▼' : "\u00A0\u00A0\u00A0\u00A0" }</th>
								<th className="pointer" scope="col" onClick={() => {handleCharacterSort('race')}}>Race{sortType === 'race' && sortOrder ===true ? ' ▲' : sortType === 'race' ? ' ▼' : "\u00A0\u00A0\u00A0\u00A0"}</th>
								<th className="pointer" scope="col" onClick={() => {handleCharacterSort('class')}}>Class{sortType === 'class' && sortOrder ===true ? ' ▲' : sortType === 'class' ? ' ▼' : "\u00A0\u00A0\u00A0\u00A0"}</th>
								<th className="pointer" scope="col" onClick={() => {handleCharacterSort('level')}}>Level{sortType === 'level' && sortOrder ===true ? ' ▲' : sortType === 'level' ? ' ▼' : "\u00A0\u00A0\u00A0\u00A0"}</th>
								<th scope="col" className="center">Quicklinks</th>
							</tr>
						</thead>
						<tbody>
							{
								chars.sort(sortCharacters).map((character) => (
									<tr key={`${character._id}`} className="table-row">
										<td>
											<Link to={`/user/${user.username}/character/${character._id}`}>{character.name}</Link>
										</td>
										<td>
											<Link to={`/user/${user.username}/character/${character._id}`}>{character.race}</Link>
										</td>
										<td>
											<Link to={`/user/${user.username}/character/${character._id}`}>{character.class}</Link>
										</td>
										<td>
											<Link to={`/user/${user.username}/character/${character._id}`}>{character.currentLevel}</Link>
										</td>
										<td className="center"><Link to={`/user/${user.username}/character/${character._id}/adventure/new`}>🆕</Link>
										</td>                                                                                                                 
									</tr>
								))
							}
						</tbody>
					</table>
				}
				<Link to={`/user/${user.username}/character/new`}><button className="red-button button-center button-fixed-width">Add new character</button></Link>
				<p className="smallText grayText center offsetTop pointer" onClick={flipEditToggle}>edit account</p>
				</>
		}
		</main>

	)
}