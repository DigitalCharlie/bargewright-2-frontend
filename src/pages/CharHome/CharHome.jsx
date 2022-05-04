import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import * as charAPI from '../../utilities/char-api'

// COMPONENTS
import CharShow from '../../components/CharShow/CharShow'
import CharEdit from '../../components/CharEdit/CharEdit'
import BreadcrumbNav from "../../components/BreadcrumbNav/BreadcrumbNav"

// STYLES
import styles from './CharHome.module.css'


export default function UserHome({user}){

	const [char, setChar] = useState({})
	const [editToggle, setEditToggle] = useState(false)
	const [submittedForm, setSubmittedForm] = useState(false)


	const {charId} = useParams()
	const navigate = useNavigate()

	const flipEditToggle = () => {
		setEditToggle(!editToggle)
	}

	const flipSubmittedForm = () => {
		setSubmittedForm(!submittedForm)
	}

	useEffect(() => {
		(async () => {
			try {
				const charData = await charAPI.getById(user.username, charId)
				console.log(charData)
				const fullTitle = displayName(charData.name, charData.race, charData.class)
				let advLevels = charData.adventures.reduce((acc, adv) => acc + parseInt(adv.levelGain), 1)
				let currentLevel = charData.levelAdjust + parseInt(advLevels)
				let advGold = charData.adventures.reduce((acc, adv) => acc + parseInt(adv.goldFound), 0)
				let advDowntime = charData.adventures.reduce((acc, adv) => acc + parseInt(adv.downtimeEarned), 0)
				let advHealthPotions = charData.adventures.reduce((acc, adv) => acc + parseInt(adv.healingPotions), 0)
				let advCount = charData.adventures.length
				setChar({...charData, fullTitle, currentLevel, advGold, advDowntime, advHealthPotions, advCount})
			} catch(e) {
				console.log(e)
			}
		})()
	}, [submittedForm])

	const handleDelete = async () => {
		try {
			let confirm = window.confirm(`Are you sure you want to delete ${char.name}?`)
			if (confirm === true) {
				const deletedChar = await charAPI.deleteChar(user.username, charId)
				console.log(deletedChar)
				navigate(`/user/${user.username}`)
			}
		} catch(err) {
			console.log(err)
		} 
	}

	const displayName = (charName,charRace,charClass) => {
		if (charRace && charClass) return `${charName} the ${charRace} ${charClass}`
		if (charRace) return `${charName} the ${charRace}`
		if (charClass) return `${charName} the ${charClass}`
		return charName
	}

	return (
		<main>
			<h1>{char.fullTitle}</h1>
			<section className={styles.charTopSection}>
				<img src={char.image || '../../../images/default-image.jpg'} alt="The character's portrait" className={styles.portrait}/>
				<div className={styles.stats}>
					<table cellSpacing="0" cellPadding="0" className={styles.tableStats}>
						<tr>
							<td>Level:</td>
							<td>{char.currentLevel} / {char.levelTotal}</td>
						</tr>
						<tr>
							<td>Gold:</td>
							<td>{char.advGold}</td>
						</tr>
						<tr>
							<td>Downtime:</td>
							<td>{char.advDowntime}</td>
						</tr>
						<tr>
							<td>Adventures Played:</td>
							<td>{char.advCount}</td>
						</tr>
						<tr>
							<td>Healing Potions in Stock:</td>
							<td>{char.advHealthPotions}</td>
						</tr>
						<tr>
							<td></td>
						</tr>
						<tr>
							<td>Campaign Setting:</td>
							<td>Forgotten Realms</td>
						</tr>
					</table>
				</div>
				<div className={styles.buttons}>
					<Link to={`/user/${user.username}/character/${charId}/adventure/new`}><button>Log Adventure</button></Link>
					<Link to={`/user/${user.username}/character/${charId}/downtime/new`}><button>Log Downtime</button></Link>
					{char.sheet && <a href={char.sheet} target="_blank"><button>View Character Sheet</button></a>}
					{!editToggle ? <button onClick={flipEditToggle}>Edit character details</button> : <button onClick={flipEditToggle}>Discard changes</button>}
					<button onClick={handleDelete}>delete character</button>
				</div>
			</section>
			<hr />
				{
					!editToggle ?
					<CharShow user={user} char={char}/>
					:
					<CharEdit user={user} char={char} flipEditToggle={flipEditToggle} flipSubmittedForm={flipSubmittedForm}/>
				}
			<BreadcrumbNav user={user} char={char.name} />
		</main>
	)
}