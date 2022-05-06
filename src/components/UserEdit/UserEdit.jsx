import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import * as usersAPI from '../../utilities/users-api'
import * as userService from '../../utilities/users-service';
import styles from '../LoginForm/LoginForm.module.css';


export default function UserEdit({user, flipEditToggle, flipSubmittedForm, setUser}) {

	const navigate = useNavigate()

	const [formData, setFormData ] = useState({
        email: '',
		welcomeMessage:'',
    })
    
    const [ error, setError ] = useState('')

	useEffect(() => {
		(async () => {
			try {
				setFormData({...user})
			} catch(e) {
				console.log(e)
			}
		})()
	}, [])

    const handleChange = (evt) => {
      setFormData({ ...formData, [evt.target.name]: evt.target.value });
      setError('');
    }

	const handleDelete = async () => {
		try {
			let confirm = window.confirm(`Are you sure you want to delete your whole account? This cannot be undone.`)
			if(confirm === true) {
				const deletedUser = await usersAPI.deleteUser(user.username)
				userService.logout()
				navigate(`/`)
			}
		} catch(err) {
			console.log(err)
		}
	}

	const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
          const editedUser = await usersAPI.editUser(user.username, formData)
		  flipEditToggle()
		  flipSubmittedForm()
		  setUser({
			  ...user,
			  welcomeMessage:formData.welcomeMessage
		  })
        } catch (error) {
          setError(error.message)
        }
    }

	const resetWelcome = () => {
		setFormData({
			...formData,
			welcomeMessage:"Click on any of your characters to view their details, or use the quicklinks to go directly to log a new adventure or downtime activity for them. \r\n \r\nClicking on any of the table headings will sort your characters by that category, and clicking it a second time will reverse the sort. The same is true on your character's individual pages."
		})
	}


	return (
		<main className="main-narrow home">
			<h1>Looking to change it up, are we?</h1>
			<div className={styles.formContainer}>
				<form>
				<label className={styles.label}>Email</label>
					<input className={styles.input} type="email" name="email" value={formData.email} onChange={handleChange} required />
					<label className={styles.label}>Welcome Message - </label>
					<label className={`${styles.label} pointer`} onClick={resetWelcome}>Reset to default</label>
					<textarea className={styles.textarea} name="welcomeMessage" value={formData.welcomeMessage} onChange={handleChange} rows="12"/>
					<button className={`${styles.button} red-button`} onClick={handleSubmit} type="submit" >Update user</button>
				</form>
				<p className="center">or</p>
				<button className={styles.button} onClick={flipEditToggle}>Discard Changes</button>
			</div>
			<hr />
			<h2 className="center">DANGER ZONE</h2>
            <button className={styles.button} onClick={handleDelete}>delete user</button>
		</main>
	)
}