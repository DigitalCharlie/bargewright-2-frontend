import { useState } from 'react';
import * as userService from '../../utilities/users-service';
import { useNavigate } from "react-router-dom";

// CSS
import styles from './LoginForm.module.css';

export default function LoginForm ({ setUser, setShowForm }) {
    
    const navigate = useNavigate();
    
    const [credentials, setCredentials ] = useState({
        email: '',
        password: ''
    })
    const [ error, setError ] = useState('')

    const handleChange = (evt) => {
        setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
        setError('');
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        try{
            const user = await userService.login(credentials);
            setUser(user)
            navigate(`/user/${user.username}`);
        }catch(error){
            setError(error.message)
        }
    }

return (
    <div>
        <h1>Sign In to the Inn</h1>
        <div className={styles.formContainer}>
        <form autoComplete="off" onSubmit={handleSubmit}>
            <label className={styles.label}>Email</label>
            <input className={styles.input} type="email" name="email" value={credentials.email} onChange={handleChange} required />
            <label className={styles.label}>Password</label>
            <input className={styles.input} type="password" name="password" value={credentials.password} onChange={handleChange} required />
            <button className={`${styles.button} red-button`} type="submit">LOG IN</button>
        </form>
        </div>
        <h1 className="error-message">{error}</h1>
        <p className="center">or</p>
        <button className={styles.button} onClick={() => setShowForm('signup')}>Sign Up</button>
    </div>
)
    
}