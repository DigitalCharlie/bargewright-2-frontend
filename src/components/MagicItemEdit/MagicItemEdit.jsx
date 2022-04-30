import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import * as magicAPI from '../../utilities/magic-api'

export default function MagicItemEdit({ user, flipEditToggle, magicItem, flipSubmittedForm }) {

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
				magicItem.attunement === true ? setAttunement(true) : setAttunement(false);
				setFormData({...magicItem})
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
			flipSubmittedForm()
        } catch (error) {
          setError(error.message)
        }
    }

	return (
		<section>
			<h1>Edit Magic Item</h1>
			<hr />
			<form className="magicItem-formContainer">
				<div>
					<label>Magic Item name</label>
					<input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Magic Item name (required)" />
				</div>
				<article>
					<div>
						<label>Rarity</label>
						<select id="rarity" name="rarity" value={formData.rarity} onChange={handleChange}>
							<option value="Common">Common</option>
							<option value="Uncommon">Uncommon</option>
							<option value="Rare">Rare</option>
							<option value="Very Rare">Very rare</option>
							<option value="Legendary">Legendary</option>
							<option value="Artifact">Artifact</option>
							<option value="Varies">Varies</option>
							<option value="Unknown">Unknown</option>
						</select>
					</div>
					<div>
						<label>Attunement?</label>
						<input type="checkbox" id="attunement" className="checkbox" checked={attunement === true} name="attunement"  onChange={toggleAttunement}/>
					</div>
					<div>
						<label>Item Type</label>
						<select id="itemCategory" name="itemCategory" value={formData.itemCategory} onChange={handleChange}>
							<option value="permanent">Permanent Magic Item</option>
							<option value="consumable">Consumeable (ex: necklace of fireballs)</option>
							<option value="scroll">Scroll</option>
							<option value="potion">Potion</option>
						</select>
					</div>

				</article>
				<div className="textarea">
					<label>Magic item description</label>
					<textarea className="textarea"name="effects" value={formData.effects} onChange={handleChange} placeholder="Magic item description" />
				</div>
				<div className="textarea">
					<label>Additional flavor</label>
					<textarea type="text" name="flavor" value={formData.flavor} onChange={handleChange} placeholder="Anything particularly special about your item?" />
				</div>

				<button className="button-center button-fixed-width red-button"type="submit" onClick={handleSubmit}>Log magic item</button>
			</form>
			<h1 className="error-message">{error}</h1>
		</section>
	)
}