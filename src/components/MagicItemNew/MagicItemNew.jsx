import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import * as magicAPI from '../../utilities/magic-api'
import CreatableSelect from 'react-select/creatable';
import styles from './MagicItemNew.module.css';

export default function MagicItemNew({ user, magicItemCount, updateMagicItems, advId, downtimeId }) {

	const [selectedOption, setSelectedOption] = useState(null);
    const [ error, setError ] = useState('')
	const [attunement, setAttunement] = useState(false)
	const [magicItemList, setMagicItemList] = useState('')
	const [options, setOptions] = useState('')
	const [formData, setFormData ] = useState({
		character: '',
        adventureFound: '',
		downtimeActivity:'',
        name:'',
        effects: '',
        flavor: '',
		rarity:'',
		attunement:'',
		charges:'',
		itemCategory:'Permanent',
    })

	const {charId} = useParams()

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
			formData.downtimeActivity = downtimeId
			const createdMagicItem = await magicAPI.createNew(user.username, charId, formData)
			setForNextMagicItem()
			updateMagicItems(magicItemCount-1, advId)
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
			downtimeActivity:'',
			adventureFound: '',
			name:'',
			effects: '',
			flavor: '',
			itemCategory:'Permanent',
			rarity:'',
			attunement:'',
		})
		setSelectedOption(null)
	}

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('https://www.dnd5eapi.co/api/magic-items/')
				const data = await response.json()
				setMagicItemList(data.results)
				const tempArray = data.results
				const optionsArray = []
				tempArray.map((magicItem) => (
					optionsArray.push({value:magicItem.index, label:magicItem.name})
				))
				setOptions(optionsArray)
			} catch(e) {
				console.log(e)
			}
		})()
	}, [])

	const handleSelect = async (option) => {
		setSelectedOption(option)
		if(magicItemList.find(x => x.index === option.value)) {
			let index = magicItemList.findIndex(x => x.index === option.value)
			let urlToFetch = 'https://www.dnd5eapi.co'+magicItemList[index].url
			const magicItemResponse = await fetch(urlToFetch)
			const magicItemData = await magicItemResponse.json()
			setFormData({
				...formData,
				effects: magicItemData.desc.join('\r\n \r\n'),
				rarity: magicItemData.rarity.name,
				name: magicItemData.name
			})
			magicItemData.desc[0].includes('attunement') ? setAttunement(true) : setAttunement(false)
		} else {
			setFormData ({
				...formData,
				name:option.value
			})
		}
		if (option.value.toUpperCase().includes('SCROLL')) {
			setFormData({
				...formData,
				itemCategory: 'Scroll'
			})
		}
		if (option.value.toUpperCase().includes('POTION')) {
			setFormData({
				...formData,
				itemCategory: 'Potion'
			})
		}
	}

	return (
		<section>
			<h2 className="center">Magic Item details — {magicItemCount} remaining</h2>
			<label>Magic item name (required)</label>
			<CreatableSelect
				defaultValue={selectedOption}
				onChange={(e) => handleSelect(e)}
				options={options}
				isSearchable
				isClearable
				className={styles.dropdown}
			/>
			<form className="magicItem-formContainer">
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
							<option value="Permanent">Permanent Magic Item</option>
							<option value="Consumable">Consumeable (ex: +1 arrows)</option>
							<option value="Scroll">Scroll</option>
							<option value="Potion">Potion</option>
						</select>
					</div>
					{
						formData.itemCategory === 'Consumable' &&
						<div className={styles.charges}>
							<label>Uses/Charges</label>
							<input type="number" min='0' id='charges' name='charges' value={formData.charges} onChange={handleChange} />
						</div>
					}
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
			<hr />
			<button className="button-center button-fixed-width" onClick={() => updateMagicItems(magicItemCount-1, advId)}>Skip entry</button>
			<h1 className="error-message">{error}</h1>
		</section>
	)
}