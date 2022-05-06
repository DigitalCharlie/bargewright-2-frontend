import { Link } from "react-router-dom"
import {useState, useEffect} from 'react'
import Select from 'react-select'
import styles from './MagicItemTable.module.css'


export default function MagicItemTable ({charLink, magicItems}) {

	const [sortType, setSortType ] = useState('name')
	const [sortOrder, setSortOrder] = useState(true)
	const [showFilters, setShowFilters] = useState(false)
	const [filterAttunement, setFilterAttunement] = useState(null)
	const [filterRarity, setFilterRarity] = useState([])
	const [filterType, setFilterType] = useState([])
	const [filterStatus, setFilterStatus] = useState([])

	useEffect(() => {
		magicItems.forEach((item) => {
			if(!item.adventureFound) item.adventureFound = ''
			if(!item.downtimeActivity) item.downtimeActivity = ''
		})
	}, [sortOrder, sortType])
	
	const handleMagicSort = (type) => {
		if (sortType === type) {
			setSortOrder(!sortOrder)
		} else {
			setSortType(type)
			setSortOrder(true)
		}
	}

	const sortMagic = (x, y) => {
		let a = ''
		let b = ''
		const rarityArr = ['Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary', 'Artifact', 'Varies', 'Unknown']
		if (sortType === 'name') {
			a = x.name.toUpperCase();
			b = y.name.toUpperCase();
		}
		if (sortType === 'type') {
			a = x.itemCategory;
			b = y.itemCategory;
		}
		if (sortType === 'rarity') {
			a = rarityArr.indexOf(x.rarity) || 0
			b = rarityArr.indexOf(y.rarity) || 0
		}
		if (sortType === 'attunement') {
			a = x.attunement;
			b = y.attunement;
		}
		if (sortType === 'source') {
			if (x.adventureFound !== '') {
				a = x.adventureFound.adventureName.toUpperCase();
			} else {
				a = x.downtimeActivity.activity.toUpperCase();
			}
			if (y.adventureFound !== '') {
				b = y.adventureFound.adventureName.toUpperCase();
			} else {
				b = y.downtimeActivity.activity.toUpperCase();
			}

		}

		if (sortOrder === true) {
			return a === b ? 0 : a > b ? 1 : -1;
		} else {
			return a === b ? 0 : a > b ? -1 : 1;
		}
	}

	const attunementFilter = (magicItem) => {
		if (filterAttunement === 'yes') return magicItem.attunement === true
		if (filterAttunement === 'no') return magicItem.attunement === false
		return magicItem
	}

	const attunementOptions = [
		{value:'yes', label:'Yes'},
		{value:'no', label:'No'}
	]

	const handleAttunement = (option) => {
		if (option) {
			option.value === 'yes' ? setFilterAttunement('yes')
			: setFilterAttunement('no')
		} else {
			setFilterAttunement(null)
		}
	}

	const rarityOptions = [
		{value:'common', label:'Common'},
		{value:'uncommon', label:'Uncommon'},
		{value:'rare', label:'Rare'},
		{value:'very rare', label:'Very Rare'},
		{value:'legendary', label:'Legendary'},
		{value:'artifact', label:'Artifact'},
		{value:'unknown', label:'Unknown'},
	]

	const handleRarity = (option) => {
		const tempArr = []
		option.forEach((rarity) => {
			tempArr.push(rarity.value)
		})
		if (option) {
				setFilterRarity(tempArr)
		} else {
			setFilterRarity([])
		}
	}

	const rarityFilter = (magicItem) => {
		if (filterRarity.length === 0) {
			return magicItem
		} else if (filterRarity.indexOf(magicItem.rarity.toLowerCase()) !== -1) {
			return magicItem
		}
	}

	const typeOptions = [
		{value:'permanent', label:'Permanent'},
		{value:'consumable', label:'Consumable'},
		{value:'scroll', label:'Scroll'},
		{value: 'potion', label:'Potion'},
	]

	const handleType = (option) => {
		const tempArr = []
		option.forEach((type) => {
			tempArr.push(type.value)
		})
		if (option) {
				setFilterType(tempArr)
		} else {
			setFilterType([])
		}
	}
	const typeFilter = (magicItem) => {
		if (filterType.length === 0) {
			return magicItem
		} else if (filterType.indexOf(magicItem.itemCategory.toLowerCase()) !== -1) {
			return magicItem
		}
	}

	const statusOptions = [
		{value:'owned', label:'Owned'},
		{value:'destroyed', label:'Destroyed'},
		{value:'traded', label:'Traded'},
		{value:'consumed', label:'Used up'},
	]

	const handleStatus = (option) => {
		const tempArr = []
		option.forEach((status) => {
			tempArr.push(status.value)
		})
		if (option) {
			setFilterStatus(tempArr)
		} else {
			setFilterStatus([])
		}
	}
	const statusFilter = (magicItem) => {
		if (filterStatus.length === 0) {
			return magicItem
		} else if (filterStatus.indexOf(magicItem.status) !== -1) {
			return magicItem
		}
	}


	const toggleShowFilters = () => {
		setShowFilters(!showFilters)
	}



	return (
		<>
			<div className={styles.filterDrawer}>
			<button className={styles.filterButton} onClick={toggleShowFilters}>{showFilters === true ? "Hide Filters": "Show Filters"}</button>
			{
				<div className={`${showFilters === true ? styles.active : styles.inactive} ${styles.filterContainer}`}>
					<div className={styles.dropdownWrapper}>
						<label>Attunement</label>
						<Select
							onChange={handleAttunement}
							options={attunementOptions}
							isClearable
							className={`${styles.attunement} ${styles.dropdown}`}
						/>
					</div>
					<div className={styles.dropdownWrapper}>
						<label>Rarity</label>
						<Select
							onChange={handleRarity}
							options={rarityOptions}
							isClearable
							isMulti
							className={`${styles.rarity} ${styles.dropdown}`}
						/>
					</div>
					<div className={styles.dropdownWrapper}>
						<label>Item Type</label>
						<Select
							onChange={handleType}
							options={typeOptions}
							isClearable
							isMulti
							className={`${styles.type} ${styles.dropdown}`}
						/>
					</div>
					<div className={styles.dropdownWrapper}>
						<label>Owned, destroyed, etc?</label>
						<Select
							onChange={handleStatus}
							options={statusOptions}
							isClearable
							isMulti
							className={`${styles.options} ${styles.dropdown}`}
						/>
					</div>
				</div>
			}
			</div>
			<table cellSpacing="0" cellPadding="0">
				<thead>
					<tr>
						<th className="pointer" scope="col" onClick={() => {handleMagicSort('name')}}>Magic Item {sortType === 'name' && sortOrder ===true ? ' ▲' : sortType === 'name' ? ' ▼' : "" }</th>
						<th className="pointer" scope="col" onClick={() => {handleMagicSort('type')}}>Type {sortType === 'type' && sortOrder ===true ? ' ▲' : sortType === 'type' ? ' ▼' : ""}</th>
						<th className="pointer" scope="col" onClick={() => {handleMagicSort('rarity')}}>Rarity {sortType === 'rarity' && sortOrder ===true ? ' ▲' : sortType === 'rarity' ? ' ▼' : ""}</th>
						<th className="pointer" scope="col" onClick={() => {handleMagicSort('attunement')}}>Attunement {sortType === 'attunement' && sortOrder ===true ? ' ▲' : sortType === 'attunement' ? ' ▼' : ""}</th>
						<th className="pointer" scope="col" onClick={() => {handleMagicSort('source')}}>Source {sortType === 'source' && sortOrder ===true ? ' ▲' : sortType === 'source' ? ' ▼' : ""}</th>
						<th scope="col" className="center">Quicklinks</th>
					</tr>
				</thead>
				<tbody>
					{
						magicItems.filter(attunementFilter).filter(rarityFilter).filter(typeFilter).filter(statusFilter).sort(sortMagic).map((magicItem) => (
							<tr key={`${magicItem._id}`} className={`table-row ${magicItem.status === "owned" ? '' : 'strikethrough' }` }>
								<td>
									<Link to={`${charLink}/magicitem/${magicItem._id}`}>{magicItem.name}</Link>
								</td>
								<td>
									<Link to={`${charLink}/magicitem/${magicItem._id}`}>{magicItem.itemCategory}</Link>
								</td>
								<td>
									<Link to={`${charLink}/magicitem/${magicItem._id}`}>{magicItem.rarity}</Link>
								</td>
								<td>
									<Link to={`${charLink}/magicitem/${magicItem._id}`}>{magicItem.attunement ? 'Yes' : 'No'}</Link>
								</td>
								<td>
									{
										magicItem.adventureFound &&
										<Link to={`${charLink}/adventure/${magicItem.adventureFound._id}`}>{magicItem.adventureFound.adventureName}</Link>
									}
									{
										magicItem.downtimeActivity &&
										<Link to={`${charLink}/downtime/${magicItem.downtimeActivity._id}`}>{magicItem.downtimeActivity.activity}</Link>
									}
								</td>
								<td className="center"><Link to={`${charLink}/magicitem/${magicItem._id}`}>edit</Link>
								</td>            
							</tr>
						))
					}
				</tbody>
			</table>
			<p className="italic center">Destroyed, traded and consumed items are <span className="strikethrough">struckthrough</span></p>
		</>
	)
}