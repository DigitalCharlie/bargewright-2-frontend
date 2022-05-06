import { useState } from 'react';
import { useNavigate } from "react-router-dom";

// API STUFF
import * as userService from '../../utilities/users-service';
import * as userAPI from '../../utilities/users-api';

// OTHER DEPENDENCIES
import { userSchema } from '../../validations/userValidation';
import styles from '../LoginForm/LoginForm.module.css';

export default function SignUpForm({setUser, setShowForm}) {

    const navigate = useNavigate();

    const [formData, setFormData ] = useState({
        username: '',
        email: '',
        password: '',
        confirm: '',
        error: ''
    })
    
    const [ error, setError ] = useState('')

    const handleChange = (evt) => {
      setFormData({ ...formData, [evt.target.name]: evt.target.value });
      setError('');
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const usernameAlreadyExists = await userAPI.userExists(formData.username)
        if (usernameAlreadyExists) {
          setError('Username already exists')
          return
        }
        const isValid = await userSchema.isValid(formData)
        if (isValid === false) {
          setError('Invalid signup.')
          return
        }
        try {
          delete formData.error;
          delete formData.confirm;
          const user = await userService.signUp(formData)
          setUser(user)
          navigate(`/user/${formData.username}`);
        } catch (error) {
          setError(error.message)
        }
    }

    const disable = formData.password !== formData.confirm;
    return (
      <div>
        <h1>Start a new tab</h1>
        <div className={styles.formContainer}>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <label className={styles.label}>Username</label>
            <input className={styles.input} type="text" name="username" value={formData.username} onChange={handleChange} required />
            <label className={styles.label}>Email</label>
            <input className={styles.input} type="email" name="email" value={formData.email} onChange={handleChange} required />
            <label className={styles.label}>Password</label>
            <input className={styles.input} type="password" name="password" value={formData.password} onChange={handleChange} required />
            <label className={styles.label}>Confirm your password</label>
            <input className={styles.input} type="password" name="confirm" value={formData.confirm} onChange={handleChange} required />
            <button className={`${styles.button} red-button`} type="submit" disabled={disable}>SIGN UP</button>
          </form>
        </div>
        <h1 className="error-message">{error}</h1>
        <p className="center">or</p>
        <button className={styles.button} onClick={() => setShowForm('login')}>Login</button>
      </div>
        );
      }

