import { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom'
import * as charAPI from '../../utilities/char-api'

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
		<main>
			<h1>New Character</h1>
			<p>New character for {user.username}</p>
			<hr />
			<form>
				<input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="name (required)" />
				<input type="text" name="race" value={formData.race} onChange={handleChange} placeholder="race" />
				<input type="text" name="class" value={formData.class} onChange={handleChange} placeholder="class" />
				{
					detailsToggle ?
					<>
						<input type="text" name="image" value={formData.image} onChange={handleChange} />
						<input type="text" name="sheet" value={formData.sheet} onChange={handleChange} />
						<input type="text" name="levelAdjust" value={formData.levelAdjust} onChange={handleChange} />
						<input type="text" name="healthPotionAdjust" value={formData.healthPotionAdjust} onChange={handleChange} />
						<input type="text" name="notes" value={formData.notes} onChange={handleChange} />
					</>
					:
					''
				}
				<button type="submit" onClick={handleSubmit}>Create character</button>
			</form>
			<button onClick={toggleDetails}>{!detailsToggle ? 'Add details at character creation' : 'Hide Detail fields'}</button>
			<hr />
			<Link to={`/user/${user.username}`}>home</Link>
			<h1 className="error-message">&nbsp;{error}</h1>
		</main>
	)
}