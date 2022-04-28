
export default function AdvShow({ user, adv }) {

	return (
		<section>
			<h1>Adventure Log: {adv.adventureName}</h1>
			<hr />
			<p>Adventure details</p>
			<p>Date played: {adv.datePlayed}</p>
		</section>
	)
}