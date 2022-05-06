import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as downtimeAPI from '../../utilities/downtime-api'
import * as moment from 'moment'
import CreatableSelect from 'react-select/creatable';

// COMPONENTS 

export default function DowntimeEdit({ user, downtime, flipEditToggle, flipSubmittedForm }) {


	const [selectedOption, setSelectedOption] = useState(null);
	const [magicItemCount, setMagicItemCount] = useState(null);
    const [ error, setError ] = useState('')
	const [formData, setFormData ] = useState({
		character: '',
		user:'',
		activity: '',
        date: moment().format('YYYY-MM-DD'),
        gold: 0,
		downtimeUsed: 0,
		levelGain: 0,
		healingPotions:0,
		notes:'',
    })

	const {charId, downtimeId} = useParams()


	useEffect(() => {
		(async () => {
			try {
				setSelectedOption({value:downtime.activity, label:downtime.activity})
				setFormData({...downtime})
			} catch(e) {
				console.log(e)
			}
		})()
	}, [])

    const handleChange = (evt) => {
      setFormData({ ...formData, [evt.target.name]: evt.target.value });
      setError('');
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
			const editedDowntime = await downtimeAPI.editDowntime(user.username, charId, downtimeId, formData)
			flipEditToggle()
			flipSubmittedForm()
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
		setSelectedOption(e.value)
	} 

	return (
		<section className="needs-min-height">
			<form className="wide-formContainer">
				<div>
					<label>Activity (type to customize)</label>
					{
						selectedOption !== null &&
						<CreatableSelect
							defaultValue={selectedOption}
							onChange={(e)=>handleSelect(e)}
							options={activityOptions}
							isSearchable
							className="black"
						/>
					}

				</div>
				<div>
					<label>Date</label>
					<input type="date" name="date" value={formData.date} onChange={handleChange} />
				</div>
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
			</form>
				<button className="button-fixed-width button-center red-button" type="submit" onClick={handleSubmit}>Save Downtime Log Edits</button>
				<p className="center">or</p>
				<button className="button-fixed-width button-center" onClick={flipEditToggle}>Discard changes</button>
			<h1 className="error-message">{error}</h1>
		</section>
	)
}