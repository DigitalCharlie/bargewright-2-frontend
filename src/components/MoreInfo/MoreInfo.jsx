import { Link } from "react-router-dom"
import {useState, useEffect} from 'react'

export default function MoreInfoTab ({charLink, advs, downtimes, charName}) {

	const [storyAwardArray, setStoryAwardArray] = useState([])
	const [allDowntime, setAllDowntime] = useState([])
	const [allTrades, setAllTrades] = useState([])

	useEffect(() => {
		(async () => {
		const tempStoryArr = []
		await advs.forEach((adv) => {
			if(adv.storyAwards.length > 0) tempStoryArr.push(...adv.storyAwards)
		})
		const filteredArr = await tempStoryArr.filter(x=>x).filter(x=>x.type).filter(x=>x.type === "Story Award")
		setStoryAwardArray(filteredArr)
		setAllTrades(downtimes.filter(downtime=>downtime.activity === "Trading Magic Item"))
		setAllDowntime(downtimes.filter(downtime=>downtime.activity !== "Trading Magic Item"))
		})()
	}, [])

console.log(allTrades)

	return (
		<>
			<article>
				<h3 className="center">Story Awards</h3>
				{
					storyAwardArray.length === 0 ? <p className="center">{charName} doesn't have any story awards yet.</p> :
					storyAwardArray && storyAwardArray.length > 0 &&
					<table  cellSpacing="0" cellPadding="0">
						<thead>
							<tr>
								<th className="left">Title</th>
								<th className="left">Description</th>
								<th className="left">Adventure</th>
							</tr>
						</thead>
						<tbody>
							{
								storyAwardArray.map((award) => (
									<tr key={award._id}>
										<td>
											<Link to={`${charLink}/adventure/${award.advId}`}>{award.title}</Link>
										</td>
										<td>
											<Link to={`${charLink}/adventure/${award.advId}`}>{award.description}</Link>
										</td>
										<td>
											<Link to={`${charLink}/adventure/${award.advId}`}>{award.advName}</Link>
										</td>
									</tr>
								))
							}
						</tbody>
					</table>
				}
			</article>
			<br />
			<article>
				<h3 className="center">Trade Logs</h3>
				{
					allTrades.length === 0 ? <p className="center">{charName} hasn't made any trades yet.</p> :					
					<table  cellSpacing="0" cellPadding="0">
						<thead>
							<tr>
								<th className="left">Date</th>
								<th className="left">Item Received</th>
								<th className="left">Item Traded Away</th>
							</tr>
						</thead>
							{
								allTrades.map((trade) => (
									<tr key={trade._id}>
										<td>
											<Link to={`${charLink}/magicitem/${trade._id}`}>{trade.date.slice(0,10)}</Link>
										</td>
										{
											trade.magicItemGained ?
											<td>
												<Link to={`${charLink}/magicitem/${trade.magicItemGained._id}`}>{trade.magicItemGained.name}</Link>
											</td>
										: <td></td>
										}
										{ trade.magicItemLost ?
											<td>
												<Link to={`${charLink}/magicitem/${trade.magicItemLost.name}`}>{trade.magicItemLost.name}</Link>
											</td>
										: <td></td>
										}
									</tr>
								))
							}
					</table>
				}
			</article>
			<br />
			<article>
				<h3 className="center">Downtime Logs</h3>
				{					
					allDowntime.length === 0 ? <p className="center">{charName} hasn't spent any downtime yet.</p> :					
					<table  cellSpacing="0" cellPadding="0">
					<thead>
						<tr>
							<th className="left">Date</th>
							<th className="left">Activity</th>
							<th className="left">Notes</th>
						</tr>
					</thead>
						{
							allDowntime.map((activity) => (
								<tr>
									<td>
										<Link to={`${charLink}/downtime/${activity._id}`}>{activity.date.slice(0,10)}</Link>
									</td>
									<td>
										<Link to={`${charLink}/downtime/${activity._id}`}>{activity.activity}</Link>
									</td>
									<td>
										<Link to={`${charLink}/downtime/${activity._id}`}>{activity.notes}</Link>
									</td>
								</tr>
							))
						}
				</table>

				}
			</article>	
		</>
	)
}