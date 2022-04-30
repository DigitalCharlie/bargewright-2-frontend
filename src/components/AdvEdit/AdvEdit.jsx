import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import * as advAPI from '../../utilities/adv-api'
import * as moment from 'moment'

export default function NewAdvPage({ user, flipEditToggle, adv, flipSubmittedForm }) {

	const {charId, advId} = useParams()

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
		healingPotions:0
    })
    const [ error, setError ] = useState('')

	useEffect(() => {
		(async () => {
			try {
				// const data = await advAPI.getById(user.username, charId, advId)
				const data = adv
				const date = data.datePlayed.slice(0,10)
				setFormData({...data, datePlayed:date})
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
			const editedAdv = await advAPI.editAdv(user.username, charId, advId, formData)
			flipEditToggle()
			flipSubmittedForm()
        } catch (error) {
          setError(error.message)
        }
    }

	return (
		<section>
			<h1>Edit Adventure</h1>
			<hr />
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
					<label>Magic Item Notes?</label>
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


				<button className="button-fixed-width button-center red-button" type="submit" onClick={handleSubmit}>Log adventure</button>
			</form>

			<h1 className="error-message">&nbsp;{error}</h1>
		</section>
	)
}