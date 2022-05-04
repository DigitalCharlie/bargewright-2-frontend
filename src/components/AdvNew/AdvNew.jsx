import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as advAPI from '../../utilities/adv-api'
import * as moment from 'moment'
import styles from './AdvNew.module.css'
import CreatableSelect from 'react-select/creatable';

export default function AdvNew({ user, updateMagicItems, setAdvId }) {

	const navigate = useNavigate()

	const {charId} = useParams()

	const [storyAwardCount, setStoryAwardCount] = useState(0)

	const [currentStoryAwards, setCurrentStoryAwards] = useState([])

	const [formData, setFormData ] = useState({
		character: '',
        adventureName: '',
        adventureCode: '',
        datePlayed: moment().format('YYYY-MM-DD'),
        dungeonMaster: '',
        goldFound: 0,
		downtimeEarned: 10,
		levelGain: 1,
		notes:'',
		magicItemNotes:'',
		healingPotions:0,
		magicItemsFound:0,
		storyAwards:[],
    })

	const renderAwards = () => {
		const awardhtml = []
		for(let i=0; i<storyAwardCount ; i++) {
			awardhtml.push(
				<>
					<div className={styles.awardTypeAndTitle}>
						<div className={styles.labelAndDescDiv}>
						<label>Award Type</label>
						<CreatableSelect
							defaultValue={'Story Award'}
							onChange={(e) => handleAwardType({e:e,idx:i})}
							options={awardOptions}
							className={styles.dropdown}
						/>
						</div>
						<div className={styles.labelAndDescDiv}>
						<label>Award Name</label>
						<input className={styles.storyAwardTitle} placeholder="Enemy of the Red Wizards" onChange={(e)=>handleStoryTitleChange({e:e,idx:i})} type="text"/>
						</div>
					</div>
					<div>
						<label>Award Description</label>
						<textarea className={styles.storyAwardDesc} placeholder="Describe your award" onChange={(e)=>handleStoryDescChange({e:e,idx:i})}/>
					</div>
				</>
			)
		}
		return awardhtml
	}

    const [ error, setError ] = useState('')

    const handleChange = (evt) => {
      setFormData({ ...formData, [evt.target.name]: evt.target.value });
      setError('');
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
			formData.character = charId
			formData.storyAwards = currentStoryAwards
			console.log(formData)			
			const createdAdv = await advAPI.createNew(user.username, charId, formData)
			console.log(createdAdv)
			setAdvId(createdAdv._id)
			updateMagicItems(createdAdv.magicItemsFound, createdAdv._id)
        } catch (error) {
          setError(error.message)
        }
    }

	const handleStoryTitleChange = (obj) => {
		// const newStoryObject = {title:obj.e.target.value}
		// updateState(obj, newStoryObject)
		
		const stateArray = [...currentStoryAwards]
		if(!stateArray[obj.idx]) stateArray[obj.idx] = {}
		stateArray[obj.idx].title=obj.e.target.value
		setCurrentStoryAwards(stateArray)
	}
	const handleStoryDescChange = (obj) => {
		// const newStoryObject = {description:obj.e.target.value}
		// updateState(obj, newStoryObject)

		const stateArray = [...currentStoryAwards]
		if(!stateArray[obj.idx]) stateArray[obj.idx] = {}
		stateArray[obj.idx].description=obj.e.target.value
		setCurrentStoryAwards(stateArray)

	}

	const awardOptions = [
		{value:'Story Award', label:'Story Award'},
		{value:'Downtime Activity', label:'Downtime Activity'},
		{value:'Permanent Boon', label:'Permanent Boon'},
		{value:'Other', label:'Other'},
	]

	const handleAwardType = (obj) => {
		const stateArray = [...currentStoryAwards]
		if(!stateArray[obj.idx]) stateArray[obj.idx] = {}
		stateArray[obj.idx].type=obj.e.value
		setCurrentStoryAwards(stateArray)
	}

	const increaseStoryAwards = () => {
		setStoryAwardCount(storyAwardCount+1)
	}

	console.log(currentStoryAwards)

	return (
		<section>
			<form className="wide-formContainer">
				<div>
					<label>Adventure code</label>
					<input type="text" name="adventureCode" value={formData.adventureCode} onChange={handleChange} placeholder="DDAL-01" />
				</div>
				<div>
					<label>Adventure title (required) </label>
					<input type="text" name="adventureName" value={formData.adventureName} onChange={handleChange} placeholder="Super awesome adventure title" />
				</div>
				<div>
					<label>Date played</label>
					<input type="date" name="datePlayed" value={formData.datePlayed} onChange={handleChange} />
				</div>
				<div>
					<label>Dungeon Master</label>
					<input type="text" name="dungeonMaster" value={formData.dungeonMaster} onChange={handleChange} placeholder="Dungeon Master"/>
				</div>
				<div>
					<label>Gold +/-</label>
					<input type="number" name="goldFound" value={formData.goldFound} onChange={handleChange}/>
				</div>
				<div>
					<label>Downtime +/-</label>
					<input type="number" name="downtimeEarned" value={formData.downtimeEarned} onChange={handleChange}/>
				</div>
				<div>
					<label>Level(s) gained</label>
					<input type="number" name="levelGain" min='0' value={formData.levelGain} onChange={handleChange}/>
				</div>
				<div>
					<label>Healing potions +/-</label>
					<input type="number" name="healingPotions" value={formData.healingPotions} onChange={handleChange}/>
				</div>
				<div>
					<label>Magic Item Notes?</label>
					<input type="text" name="magicItemNotes" value={formData.magicItemNotes} onChange={handleChange} placeholder="Anything destroyed? Used?"/>
				</div>
				<div>
					<label>Magic Items Found (details recorded on next page)</label>
					<input type="number" name="magicItemsFound" min='0' value={formData.magicItemsFound} onChange={handleChange}/>
				</div>
				<div className="textarea">
					<label>Adventure Notes</label>
					<textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="notes"/>
				</div>
				{
					storyAwardCount > 0 &&
					<section className={styles.storyAwardSection}>
					<hr className={styles.rule} />
					<h2 className="center">Story Awards and Other Boons</h2>
					{renderAwards()}
					</section>
				}
				<button className="button-center button-fixed-width" type="button" onClick={increaseStoryAwards}>Add Story Award (or other boon)</button>
				<button className="button-fixed-width button-center red-button" type="submit" onClick={handleSubmit}>Log adventure</button>
			</form>
			<h1 className="error-message">{error}</h1>
		</section>
	)
}