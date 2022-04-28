import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import * as magicAPI from '../../utilities/magic-api'
import CreatableSelect from 'react-select/creatable';
import styles from './MagicItemNew.module.css';

export default function MagicItemNew({ user, magicItemCount, updateMagicItems, advId }) {

	const [selectedOption, setSelectedOption] = useState(null);
    const [ error, setError ] = useState('')
	const [attunement, setAttunement] = useState(false)
	const [magicItemList, setMagicItemList] = useState('')
	const [options, setOptions] = useState('')
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

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('https://www.dnd5eapi.co/api/magic-items/')
				const data = await response.json()
				setMagicItemList(data.results)
				console.log(data.results)
				const tempArray = data.results
				const optionsArray = []
				tempArray.map((magicItem) => (
					optionsArray.push({value:magicItem.index, label:magicItem.name})
				))
				console.log(optionsArray)
				setOptions(optionsArray)
			} catch(e) {
				console.log(e)
			}
		})()
	}, [])

	const handleSelect = async (option) => {
		setSelectedOption(option)
		console.log(option.value)
		if(magicItemList.find(x => x.index === option.value)) {
			let index = magicItemList.findIndex(x => x.index === option.value)
			let urlToFetch = 'https://www.dnd5eapi.co'+magicItemList[index].url
			const magicItemResponse = await fetch(urlToFetch)
			const magicItemData = await magicItemResponse.json()
			console.log(magicItemData)
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
				itemCategory: 'scroll'
			})
		}
		if (option.value.toUpperCase().includes('POTION')) {
			setFormData({
				...formData,
				itemCategory: 'potion'
			})
		}
	}

	return (
		<main>
			<h1>New Magic Item</h1>
			<hr />
			<form>
				<input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Magic Item name (required)" />
				<textarea name="effects" value={formData.effects} onChange={handleChange} placeholder="Magic item description" />
				<input type="text" name="flavor" value={formData.flavor} onChange={handleChange} placeholder="additional flavor" />
				<input type="text" name="rarity" value={formData.rarity} onChange={handleChange} placeholder="rarity"/>
				<input type="checkbox" id="attunement" checked={attunement === true} name="attunement"  onChange={toggleAttunement}/>
				<select id="itemCategory" name="itemCategory" value={formData.itemCategory} onChange={handleChange}>
					<option value="permanent">Permanent Magic Item</option>
					<option value="consumable">Consumeable (ex: necklace of fireballs)</option>
					<option value="scroll">Scroll</option>
					<option value="potion">Potion</option>
				</select>

				<button type="submit" onClick={handleSubmit}>Log magic item</button>
			</form>
			<CreatableSelect
				defaultValue={selectedOption}
				onChange={(e) => handleSelect(e)}
				options={options}
				isSearchable
				isClearable
				className={styles.dropdown}
			/>
			<hr />
			<h1 className="error-message">&nbsp;{error}</h1>
		</main>
	)
}