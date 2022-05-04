import { useState, useEffect } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import * as advAPI from '../../utilities/adv-api'
import * as moment from 'moment'
import CreatableSelect from 'react-select/creatable';
import styles from '../AdvNew/AdvNew.module.css'


export default function NewAdvPage({ user, flipEditToggle, adv, flipSubmittedForm }) {

	const {charId, advId} = useParams()
	const navigate = useNavigate()

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
		storyAwards:[]
    })
    const [ error, setError ] = useState('')

	const [currentStoryAwards, setCurrentStoryAwards] = useState([])

	useEffect(() => {
		(async () => {
			try {
				const data = adv
				const date = data.datePlayed.slice(0,10)
				setFormData({...data, datePlayed:date})
				setCurrentStoryAwards(data.storyAwards)
			} catch(e) {
				console.log(e)
			}
		})()
	}, [])
	console.log(formData)

    const handleChange = (evt) => {
      setFormData({ ...formData, [evt.target.name]: evt.target.value });
      setError('');
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
			formData.storyAwards = currentStoryAwards
			const editedAdv = await advAPI.editAdv(user.username, charId, advId, formData)
			flipEditToggle()
			flipSubmittedForm()
        } catch (error) {
          setError(error.message)
        }
    }

	const handleDelete = async () => {
		try {
			let confirm = window.confirm('Are you sure you want to delete this adventure log?')
			if (confirm === true) {
				const deletedAdv = await advAPI.deleteAdv(user.username, charId, advId)
				console.log(deletedAdv)
				navigate(`/user/${user.username}/character/${charId}`)
			}
		} catch(err) {
			console.log(err)
		}
	}

	const renderAwards = () => {
		const awardhtml = []
		for(let i=0; i<formData.storyAwards.length ; i++) {
			awardhtml.push(
				<>
					<div className={styles.awardTypeAndTitle}>
						<div className={styles.labelAndDescDiv}>
						<label>Award Type</label>
						<CreatableSelect
							defaultValue={{value:formData.storyAwards[i].type, label:formData.storyAwards[i].type}}
							onChange={(e) => handleAwardType({e:e,idx:i})}
							options={awardOptions}
							className={styles.dropdown}
						/>
						</div>
						<div className={styles.labelAndDescDiv}>
						<label>Award Name</label>
						<input className={styles.storyAwardTitle} placeholder="Enemy of the Red Wizards" onChange={(e)=>handleStoryTitleChange({e:e,idx:i})} type="text" defaultValue={formData.storyAwards[i].title}/>
						</div>
					</div>
					<div>
						<label>Award Description</label>
						<textarea className={styles.storyAwardDesc} placeholder="Describe your award" defaultValue={formData.storyAwards[i].description} onChange={(e)=>handleStoryDescChange({e:e,idx:i})}/>
					</div>
				</>
			)
		}
		return awardhtml
	}

	const handleStoryTitleChange = (obj) => {
		const stateArray = [...currentStoryAwards]
		if(!stateArray[obj.idx]) stateArray[obj.idx] = {}
		stateArray[obj.idx].title=obj.e.target.value
		setCurrentStoryAwards(stateArray)
	}
	const handleStoryDescChange = (obj) => {
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

	return (
		<section>
			<h2 className="center">Edit Adventure</h2>
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
					<input type="number" name="levelGain" value={formData.levelGain} onChange={handleChange}/>
				</div>
				<div>
					<label>Healing potions +/-</label>
					<input type="number" name="healingPotions" value={formData.healingPotions} onChange={handleChange}/>
				</div>
				<div>
					<label>Magic Item Notes</label>
					<input type="text" name="magicItemNotes" value={formData.magicItemNotes} onChange={handleChange} placeholder="Anything destroyed? Used?"/>
				</div>
				<div>
					<label>Magic Items Found</label>
					<input type="number" name="magicItemsFound" value={formData.magicItemsFound} onChange={handleChange}/>
				</div>
				<div className="textarea">
					<label>Adventure Notes</label>
					<textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="notes"/>
				</div>
				{
					formData.storyAwards && formData.storyAwards.length > 0 &&
					<section className={styles.storyAwardSection}>
					<hr className={styles.rule} />
					<h2 className="center">Story Awards and Other Boons</h2>
					{renderAwards()}
					</section>
				}

				<button className="button-fixed-width button-center red-button" type="submit" onClick={handleSubmit}>Save changes</button>
			</form>
				<button className="button-fixed-width button-center" onClick={flipEditToggle}>Discard changes</button>
				<p className="center">or</p>
				<button className="button-fixed-width button-center" onClick={handleDelete}>Delete entry</button>


			<h1 className="error-message">{error}</h1>
		</section>
	)
}