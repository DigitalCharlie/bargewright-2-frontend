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
	const [magicItemCount, setMagicItemCount] = useState(null);
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
			formData.activity === "Trading Magic Item" ? setMagicItemCount(1) : setMagicItemCount(0)
			magicItemCount === 0 && navigate(`/user/${user.username}/character/${charId}/downtime/${newDowntime._id}`)
        } catch (error) {
          setError(error.message)
        }
    }

	const activityOptions = [
		{value:'Brewing Potions', label:'Brewing Potions (from Xanathars)'},
		{value:'Buying Basic Gear', label:'Buying Basic Gear'},
		{value:'Catching Up', label:'Catching Up'},
		{value:'Copying Spells', label:'Copying Spells'},
		{value:'Scribing Scroll', label:'Scribing Scroll (from Xanathars)'},
		{value:'Trading Magic Item', label:'Trading Magic Item'},
	]

	const handleSelect = (e) => {
		formData.activity = e.value
		if(e.value === 'Brewing Potions') setFormData({...formData, downtimeUsed: -5})
		if(e.value === 'Buying Basic Gear')setFormData({...formData, downtimeUsed: 0})
		if(e.value === 'Catching Up') setFormData({...formData, downtimeUsed: -10, levelGain:1})
		if(e.value === 'Copying Spells')setFormData({...formData, downtimeUsed: -1})
		if(e.value === 'Scribing Scroll')setFormData({...formData, downtimeUsed: -5})
		if(e.value === 'Trading Magic Item')setFormData({...formData, downtimeUsed: -5})
		if(e.value !== 'Trading Magic Item')setMagicItemCount(0)
		setSelectedOption(e.value)
	} 

	const updateMagicItems = async (num) => {
		await setMagicItemCount(num)	
		if(num === 0) navigate(`/user/${user.username}/character/${charId}/downtime/${downtimeId}`)
	}

	return (
		<main>
			<h1>Downtime Activity Log</h1>
				{	
				!magicItemCount &&
				<section className="needs-min-height">
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
					{
					selectedOption && selectedOption !== 'Trading Magic Item' &&
					<>
						<div>
							<label>Downtime +/-</label>
							<input type="number" name="downtimeUsed" value={formData.downtimeUsed} onChange={handleChange}/>
						</div>
						<div>
							<label>Gold +/-</label>
							<input type="number" name="gold" value={formData.gold} onChange={handleChange}/>
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
					</>			
					}
					{
						selectedOption && selectedOption === 'Trading Magic Item' &&
						<>
							<div>
								<label>Downtime +/-</label>
								<input type="number" name="downtimeUsed" value={formData.downtimeUsed} onChange={handleChange}/>
							</div>
							<div className="textarea">
								<label>Trade Details</label>
								<textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Traded with Bob the Builder, DCI numbers entirely optional, some people like to include what adventure the item you received was found in."/>
							</div>
							<p className="center one-hundred-width" >You'll enter your new item's info on the next page.</p>
							<button className="button-fixed-width button-center red-button" type="submit" onClick={handleSubmit}>Log downtime</button>
						</>
					}
				</form>
				<h1 className="error-message">{error}</h1>
			</section>
		}
		{
			magicItemCount > 0 &&
			<MagicItemNew user={user} magicItemCount={magicItemCount} downtimeId={downtimeId} updateMagicItems={updateMagicItems}/>
		}
			<BreadcrumbNav user={user} />
		</main>
	)
}