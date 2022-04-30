import { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom'
import * as charAPI from '../../utilities/char-api'

import BreadcrumbNav from "../../components/BreadcrumbNav/BreadcrumbNav"

export default function NewCharPage({ user }) {

	const navigate = useNavigate()

	const [formData, setFormData ] = useState({
		player: '',
        name: '',
        class: '',
        race: '',
        image: '',
        sheet: '',
		notes: '',
		levelAdjust: 0,
		healthPotionAdjust:0
    })
    const [ error, setError ] = useState('')
	const [detailsToggle, setDetailsToggle] = useState(false)

	useEffect(() => {

	}, [detailsToggle])

    const handleChange = (evt) => {
      setFormData({ ...formData, [evt.target.name]: evt.target.value });
      setError('');
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
			formData.player = user.username
          const createdChar = await charAPI.createNew(user.username, formData)
		  console.log(createdChar)
          navigate(`/user/${user.username}`);
        } catch (error) {
          setError(error.message)
        }
    }

	const toggleDetails = () => {
		setDetailsToggle(!detailsToggle)
	}

	return (
		<main className="main-narrow">
			<h1>New Character</h1>
			<hr />
			<form className="narrow-formContainer">
				<label>Name (required)</label>
				<input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Flowers" />
				<label>Race</label>
				<input type="text" name="race" value={formData.race} onChange={handleChange} placeholder="Half-orc" />
				<label>Class</label>
				<input type="text" name="class" value={formData.class} onChange={handleChange} placeholder="Fighter" />
				{
					detailsToggle ?
					<>
						<label>Image URL</label>
						<input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Ideally ending in .png or .jpeg" />
						<label>Link to character sheet</label>
						<input type="text" name="sheet" value={formData.sheet} onChange={handleChange} placeholder="dndbeyond.com, for example" />
						<label>Level adjustment (if not starting at 1)</label>
						<input type="number" name="levelAdjust" value={formData.levelAdjust} onChange={handleChange}/>
						<label>Health potion adjustment (for those not logged in adventures)</label>
						<input type="number" name="healthPotionAdjust" value={formData.healthPotionAdjust} onChange={handleChange} />
						<label>Additional character notes</label>
						<textarea name="notes" value={formData.notes} onChange={handleChange} />
					</>
					:
					''
				}
				<button className="button-fixed-width button-center red-button" type="submit" onClick={handleSubmit}>Create character</button>
				<p className="center">or</p>
			</form>
			<button className="button-fixed-width button-center" onClick={toggleDetails}>{!detailsToggle ? 'Add additional details' : 'Hide additional details'}</button>
			<h1 className="error-message">{error}</h1>
			<BreadcrumbNav user={user} />
		</main>
	)
}