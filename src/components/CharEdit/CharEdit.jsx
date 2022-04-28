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
			<p>Edit character: {char.name}</p>
			<hr />
			<form>
				<input type="text" name="name" value={formData.name} onChange={handleChange} defaultValue={char.name} placeholder="name (required)" />
				<input type="text" name="race" value={formData.race} onChange={handleChange} placeholder="race" />
				<input type="text" name="class" value={formData.class} onChange={handleChange} placeholder="class" />
				<input type="text" name="image" value={formData.image} onChange={handleChange} />
				<input type="text" name="sheet" value={formData.sheet} onChange={handleChange} />
				<input type="text" name="levelAdjust" value={formData.levelAdjust} onChange={handleChange} />
				<input type="text" name="healthPotionAdjust" value={formData.healthPotionAdjust} onChange={handleChange} />
				<input type="text" name="notes" value={formData.notes} onChange={handleChange} />
				<button type="submit" onClick={handleSubmit}>Save changes character</button>
			</form>
			<h1 className="error-message">&nbsp;{error}</h1>
		</section>
	)
}