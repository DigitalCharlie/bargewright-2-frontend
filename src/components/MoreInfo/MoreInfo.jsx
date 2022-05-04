import { Link } from "react-router-dom"
import {useState, useEffect} from 'react'

export default function MoreInfoTab ({charLink, advs, downtimes}) {

	const [storyAwardArray, setStoryAwardArray] = useState([])

	useEffect(() => {
		advs.forEach((item) => {
			if(!item.adventureFound) item.adventureFound = ''
			if(!item.downtimeActivity) item.downtimeActivity = ''
		})
	}, [])

	return (
		<>
			<h2>Story Awards</h2>
			{
			}
		</>
	)
}