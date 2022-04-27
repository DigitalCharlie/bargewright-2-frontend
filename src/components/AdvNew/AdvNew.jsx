import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as advAPI from '../../utilities/adv-api'
import * as moment from 'moment'

export default function AdvNew({ user, updateMagicItems, setAdvId }) {

	const navigate = useNavigate()

	const {charId} = useParams()

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
		magicItemsFound:0
    })

    const [ error, setError ] = useState('')

    const handleChange = (evt) => {
      setFormData({ ...formData, [evt.target.name]: evt.target.value });
      setError('');
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
			formData.character = charId
			console.log(formData)			
			const createdAdv = await advAPI.createNew(user.username, charId, formData)
			console.log(createdAdv)
			setAdvId(createdAdv._id)
			updateMagicItems(createdAdv.magicItemsFound)
        } catch (error) {
          setError(error.message)
        }
    }

	return (
		<section>
			<form>
				<input type="text" name="adventureName" value={formData.adventureName} onChange={handleChange} placeholder="Adventure name (required)" />
				<input type="text" name="adventureCode" value={formData.adventureCode} onChange={handleChange} placeholder="Adventure code" />
				<input type="date" name="datePlayed" value={formData.datePlayed} onChange={handleChange} />
				<input type="text" name="dungeonMaster" value={formData.dungeonMaster} onChange={handleChange} placeholder="Dungeon Master"/>
				<input type="number" name="goldFound" value={formData.goldFound} onChange={handleChange}/>
				<input type="number" name="downtimeEarned" value={formData.downtimeEarned} onChange={handleChange}/>
				<input type="number" name="levelGain" value={formData.levelGain} onChange={handleChange}/>
				<input type="number" name="healingPotions" value={formData.healingPotions} onChange={handleChange}/>
				<input type="text" name="magicItemNotes" value={formData.magicItemNotes} onChange={handleChange} placeholder="magicItemNotes"/>
				<input type="text" name="notes" value={formData.notes} onChange={handleChange} placeholder="notes"/>
				<input type="number" name="magicItemsFound" value={formData.magicItemsFound} onChange={handleChange}/>


				<button type="submit" onClick={handleSubmit}>Log adventure</button>
			</form>
			<hr />
			<h1 className="error-message">&nbsp;{error}</h1>
		</section>
	)
}