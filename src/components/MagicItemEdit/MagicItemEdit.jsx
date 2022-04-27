import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import * as magicAPI from '../../utilities/magic-api'

export default function MagicItemEdit({ user, flipEditToggle }) {

	const {charId, magicItemId} = useParams()

	const [formData, setFormData ] = useState({
		character: '',
        adventureFound: '',
        name:'',
        effects: '',
        flavor: '',
		rarity:'',
		attunement:'',
		itemCategory:'',
    })

	const [attunement, setAttunement] = useState(formData.attunement)

    const [ error, setError ] = useState('')

	useEffect(() => {
		(async () => {
			try {
				const data = await magicAPI.getById(user.username, charId, magicItemId)
				data.attunement === true ? setAttunement(true) : setAttunement(false);
				setFormData({...data})
			} catch(e) {
				console.log(e)
			}
		})()
	}, [])

	const toggleAttunement = () => {
		setAttunement(!attunement)
	}

	const handleChange = (evt) => {
		setFormData({ ...formData, [evt.target.name]: evt.target.value });
		setError('');
	  }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
			attunement === true ? formData.attunement = true : formData.attunement = false;
			const editedMagicItem = await magicAPI.editMagicItem(user.username, charId, magicItemId, formData)
			flipEditToggle()
        } catch (error) {
          setError(error.message)
        }
    }

	return (
		<main>
			<h1>Edit Magic Item</h1>
			<hr />
			<form>
				<input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Magic Item name (required)" />
				<input type="text" name="effects" value={formData.effects} onChange={handleChange} placeholder="Effects" />
				<input type="text" name="flavor" value={formData.flavor} onChange={handleChange} />
				<input type="text" name="rarity" value={formData.rarity} onChange={handleChange} />
				<input type="checkbox" id="attunement" checked={attunement === true} name="attunement"  onChange={toggleAttunement}/>
				<select id="itemCategory" name="itemCategory" value={formData.itemCategory} onChange={handleChange}>
					<option value="permanent">Permanent Magic Item</option>
					<option value="consumable">Consumeable (ex: necklace of fireballs)</option>
					<option value="scroll">Scroll</option>
					<option value="potion">Potion</option>
				</select>

				<button type="submit" onClick={handleSubmit}>Save edited magic item</button>
			</form>
			<hr />
			<h1 className="error-message">&nbsp;{error}</h1>
		</main>
	)
}