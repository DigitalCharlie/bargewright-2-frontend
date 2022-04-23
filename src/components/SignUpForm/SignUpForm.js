import { useState } from 'react';
import * as userService from '../../utilities/users-service';
import { useNavigate } from "react-router-dom";

export default function SignUpForm({setUser}) {

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
        try {
          delete formData.error;
          delete formData.confirm;
          const user = await userService.signUp(formData)
          console.log(user)
          setUser(user)
          navigate(`/user/${formData.username}`);
        } catch (error) {
          setError(error.message)
        }
    }

        const disable = formData.password !== formData.confirm;
        return (
          <div>
            <div className="form-container">
              <form autoComplete="off" onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                <label>Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                <label>Confirm</label>
                <input type="password" name="confirm" value={formData.confirm} onChange={handleChange} required />
                <button type="submit" disabled={disable}>SIGN UP</button>
              </form>
            </div>
            <h1 className="error-message">&nbsp;{error}</h1>
          </div>
        );
      }

