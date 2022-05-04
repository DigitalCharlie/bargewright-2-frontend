import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import * as charAPI from '../../utilities/char-api'

// OTHER COMPONENTS
import MagicItemTable from "../MagicItemTable/MagicItemTable"
import CharTable from "../AdvTable/AdvTable"
import MoreInfoTab from "../MoreInfo/MoreInfo"

// CSS
import styles from './CharShow.module.css'

export default function UserHome({user, char}){
	const [advs, setAdvs] = useState([])
	const [magicItems, setmagicItems] = useState([])
	const [downtimes, setDowntimes] = useState([])
	const [currentTable, setCurrentTable] = useState('adventures')

	const {charId} = useParams()
	const charLink = `/user/${user.username}/character/${charId}`

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
				const downtimeData = await charAPI.getAllDowntime(user.username, charId)
				console.log(downtimeData)
			} catch(e) {
				console.log(e)
			}
		})()
	}, [])

    return (
        <section>
			<div className={styles.headlineToggles}>
				<h2 onClick={()=> setCurrentTable('adventures')} className={currentTable === 'adventures' ? styles.active : styles.inactive}>Adventures</h2>
				<h2 onClick={()=> setCurrentTable('magicItems')} className={currentTable === 'magicItems' ? styles.active : styles.inactive}>Magic Items</h2>
				<h2 onClick={()=> setCurrentTable('moreInfo')} className={currentTable === 'moreInfo' ? styles.active : styles.inactive}>Other Details</h2>
			</div>
			{
				currentTable === 'adventures'
				? <CharTable charLink={charLink} advs={advs} />
				: currentTable === 'magicItems' 
				? <MagicItemTable charLink={charLink} magicItems={magicItems} />
				: <MoreInfoTab charLink={charLink} advs={advs} downtimes={downtimes} />
			}


        </section>
    )
}