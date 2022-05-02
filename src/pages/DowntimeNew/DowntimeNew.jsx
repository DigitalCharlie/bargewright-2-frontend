import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as downtimeAPI from '../../utilities/downtime-api'
import * as moment from 'moment'
import CreatableSelect from 'react-select/creatable';
import styles from './DowntimeNew.module.css'

// COMPONENTS 
import MagicItemNew from "../../components/MagicItemNew/MagicItemNew"
import BreadcrumbNav from "../../components/BreadcrumbNav/BreadcrumbNav"

export default function AdvNewPage({ user }) {

	const [selectedOption, setSelectedOption] = useState(null);
	const [magicItemCount, setMagicItemCount] = useState(null)
	const [magicItemsFound, setMagicItemsFound] = useState(null)
	const [downtimeId, setDowntimeId] = useState('')
    const [ error, setError ] = useState('')
	const [formData, setFormData ] = useState({
		character: '',
		user:'',
		activity: String,
        date: moment().format('YYYY-MM-DD'),
        gold: 0,
		downtimeUsed: -10,
		levelGain: 0,
		healingPotions:0,
		notes:'',
    })


	const navigate = useNavigate()

	const {charId} = useParams()


    const handleChange = (evt) => {
      setFormData({ ...formData, [evt.target.name]: evt.target.value });
      setError('');
    }

	const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
			formData.character = charId
			formData.user = user.username
			console.log(formData)			
			const newDowntime = await downtimeAPI.createNew(user.username, charId, formData)
			console.log(newDowntime)
			setDowntimeId(newDowntime._id)
			navigate(`/user/${user.username}/character/${charId}`)
        } catch (error) {
          setError(error.message)
        }
    }

	const activityOptions = [
		{value:'Brewing Potions', label:'Brewing Potions'},
		{value:'Buying Basic Gear', label:'Buying Basic Gear'},
		{value:'Catching Up', label:'Catching Up'},
		{value:'Copying Spells', label:'Copying Spells'},
		{value:'Scribing Spells', label:'Scribing Spells'},
		{value:'Trading Magic Item', label:'Trading Magic Item'},
	]

	const handleSelect = (e) => {
		formData.activity = e.value
		setSelectedOption(e.value)
	} 

	return (
		<main>
			<h1>Downtime Activity Log</h1>
			<section>
			<form className="wide-formContainer">
				<div>
					<label>Activity (type to customize)</label>
					<CreatableSelect
						defaultValue={selectedOption}
						onChange={(e)=>handleSelect(e)}
						options={activityOptions}
						isSearchable
						isClearable
						className={styles.dropdown}
					/>
				</div>
				<div>
					<label>Date</label>
					<input type="date" name="datePlayed" value={formData.date} onChange={handleChange} />
				</div>
				<div>
					<label>Gold +/-</label>
					<input type="number" name="gold" value={formData.gold} onChange={handleChange}/>
				</div>
				<div>
					<label>Downtime +/-</label>
					<input type="number" name="downtimeUsed" value={formData.downtimeUsed} onChange={handleChange}/>
				</div>
				<div>
					<label>Level(s) gained</label>
					<input type="number" name="levelGain" min='0' value={formData.levelGain} onChange={handleChange}/>
				</div>
				<div>
					<label>Healing potions +/-</label>
					<input type="number" name="healingPotions" value={formData.healingPotions} onChange={handleChange}/>
				</div>
				<div className="textarea">
					<label>Notes/details</label>
					<textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="notes"/>
				</div>
				<button className="button-fixed-width button-center red-button" type="submit" onClick={handleSubmit}>Log downtime</button>
			</form>
			<h1 className="error-message">{error}</h1>
		</section>
				{
					magicItemCount &&
					<>
					<hr />
					<h2 className="center">New Magic Item</h2>
					<MagicItemNew user={user} magicItemCount={magicItemCount} downtimeId={downtimeId} />
					</>
				}
			<BreadcrumbNav user={user} />
		</main>
	)
}