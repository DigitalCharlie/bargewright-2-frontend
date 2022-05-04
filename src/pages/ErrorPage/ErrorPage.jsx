import { Link } from "react-router-dom"

export default function HomePage(){
    return (
		<>
		<main>
			<h1>Whatcha doin' over there?</h1>
			<p className="center">This page either doesn't exist or you don't have access to view it.</p>
			<Link to="/"><button className="button-fixed-width button-center red-button">Home</button></Link>

		</main>
		</>
		)
   }