import { useState, useEffect } from "react"
import { Link, useParams } from 'react-router-dom'
import * as charAPI from '../../utilities/char-api'

export default function NewCharPage({ user, flipEditToggle, char, flipSubmittedForm }) {

	const {charId} = useParams()

	const [formData, setFormData ] = useState({
		player: '',
        name: '',
        class: '',
        race: '',
        image: '',
        sheet: '',
		notes: '',
		levelAdjust: '',
		healthPotionAdjust:''
    })
    const [ error, setError ] = useState('')

	useEffect(() => {
		(async () => {
			try {
				setFormData({...char})
			} catch(e) {
				console.log(e)
			}
		})()
	}, [])

    const handleChange = (evt) => {
      setFormData({ ...formData, [evt.target.name]: evt.target.value });
      setError('');
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
		formData.player = user.username
          const editedChar = await charAPI.editChar(user.username, charId, formData)
		  flipEditToggle()
		  flipSubmittedForm()
        } catch (error) {
          setError(error.message)
        }
    }

	return (
		<section>
			<h1>Edit Character</h1>
			<form className="wide-formContainer">
				<div>
					<label>Name (required)</label>
					<input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Flowers" />
				</div>
				<div>
					<label>Race</label>
					<input type="text" name="race" value={formData.race} onChange={handleChange} placeholder="Half-orc" />
				</div>
				<div>
					<label>Class</label>
					<input type="text" name="class" value={formData.class} onChange={handleChange} placeholder="Fighter" />
				</div>
				<div>
					<label>Image URL</label>
					<input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Ideally ending in .png or .jpeg" />
				</div>
				<div>
					<label>Link to character sheet - include https://</label>
					<input type="text" name="sheet" value={formData.sheet} onChange={handleChange} placeholder="https://dndbeyond.com, for example" />
				</div>
				<div>
					<label>Starting level / level adjustment</label>
					<input type="number" name="levelAdjust" value={formData.levelAdjust} onChange={handleChange}/>
				</div>
				<div>
					<label>Health potion adjustment (for those not logged in adventures)</label>
					<input type="number" name="healthPotionAdjust" value={formData.healthPotionAdjust} onChange={handleChange} />
				</div>
				<div className="textarea">
					<label>Additional character notes</label>
					<textarea name="notes" value={formData.notes} onChange={handleChange} />
				</div>
					<button type="submit" onClick={handleSubmit} className="button-fixed-width button-center red-button">Save changes</button>
			</form>
				<button className="button-fixed-width button-center" onClick={flipEditToggle}>Discard changes</button>
			<h1 className="error-message">{error}</h1>
		</section>
	)
}