import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import * as magicAPI from '../../utilities/magic-api'

export default function MagicItemNew({ user, magicItemCount, updateMagicItems, advId }) {

	const {charId} = useParams()

	const [formData, setFormData ] = useState({
		character: '',
        adventureFound: '',
        name:'',
        effects: '',
        flavor: '',
		rarity:'',
		attunement:'',
		itemCategory:'permanent',
    })
    const [ error, setError ] = useState('')

	const [attunement, setAttunement] = useState(false)

    const handleChange = (evt) => {
      setFormData({ ...formData, [evt.target.name]: evt.target.value });
      setError('');
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
			attunement === true ? formData.attunement = true : formData.attunement = false;
			formData.character = charId
			formData.adventureFound = advId
			console.log(formData)
			const createdMagicItem = await magicAPI.createNew(user.username, charId, formData)
			console.log(createdMagicItem)
			setForNextMagicItem()
			updateMagicItems(magicItemCount-1)
        } catch (error) {
          setError(error.message)
        }
    }

	const toggleAttunement = () => {
		setAttunement(!attunement)
	}

	const setForNextMagicItem = () => {
		setFormData({
			character: '',
			adventureFound: '',
			name:'',
			effects: '',
			flavor: '',
			itemCategory:'permanent',
			rarity:'',
			attunement:'',
		})
	}

	return (
		<main>
			<h1>New Magic Item</h1>
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

				<button type="submit" onClick={handleSubmit}>Log magic item</button>
			</form>
			<hr />
			<h1 className="error-message">&nbsp;{error}</h1>
		</main>
	)
}