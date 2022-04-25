import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as charAPI from '../../utilities/char-api'

export default function NewCharPage({ user }) {

	const {charId} = useParams()
	const [char, setChar] = useState({})

	const navigate = useNavigate()

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
				const data = await charAPI.getById(user.username, charId)
				setFormData({
					// player:data.player,
					// name:data.name,
					// class:data.class,
					// race:data.race,
					// image:data.image,
					// sheet:data.sheet,
					// notes:data.notes,
					// levelAdjust:data.levelAdjust,
					// healthPotionAdjust:data.healthPotionAdjust
					...data
				})
				setChar(data) // this kind of method wasn't working so....
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
          navigate(`/user/${user.username}/character/${charId}`);
        } catch (error) {
          setError(error.message)
        }
    }

	return (
		<main>
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
				<button type="submit" onClick={handleSubmit}>Edit character</button>
			</form>
			<hr />
			<Link to={`/user/${user.username}`}>home</Link>
			<h1 className="error-message">&nbsp;{error}</h1>
		</main>
	)
}