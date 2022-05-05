import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import * as charAPI from '../../utilities/char-api'

// OTHER COMPONENTS
import MagicItemTable from "../MagicItemTable/MagicItemTable"
import CharTable from "../AdvTable/AdvTable"
import MoreInfoTab from "../MoreInfo/MoreInfo"
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"

// CSS
import styles from './CharShow.module.css'

export default function UserHome({user, char}){
	const [advs, setAdvs] = useState([])
	const [magicItems, setmagicItems] = useState([])
	const [downtimes, setDowntimes] = useState([])
	const [currentTable, setCurrentTable] = useState('adventures')
	const [loaded, setLoaded] = useState(null)

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
				console.log(user.username + charId)
				const magicData = await charAPI.getAllMagic(user.username, charId)
				setmagicItems(magicData)
				console.log(magicData)
				const downtimeData = await charAPI.getAllDowntime(user.username, charId)
				setDowntimes(downtimeData)
				setTimeout(() => {
					setLoaded(true)
				}, 200)
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
				loaded === null ? 
					<>
						<h3 className="center">Loading</h3>
						<LoadingSpinner />
					</> 
				:
				advs.length === 0 ?
					<div>
						<h3 className="center narrow">You haven't logged any adventures yet!</h3><p className="center">You can log some activity by clicking "log adventure" or "log downtime" in the upper right of this box.</p><p className="center">One good thing to note is that the "downtime activities" tab is a catch-all. You can add your 5th level magic item there, for example.</p>
					</div>
				:
				currentTable === 'adventures'
				? <CharTable charLink={charLink} advs={advs} />
				: currentTable === 'magicItems' 
				? <MagicItemTable charLink={charLink} magicItems={magicItems} />
				: <MoreInfoTab charLink={charLink} advs={advs} downtimes={downtimes} charName={char.name} />
			}


        </section>
    )
}