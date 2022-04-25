import {Link} from 'react-router-dom'

export default function HomePage(){
    return (
            <main>
                <h1>Home</h1>
                <Link to='/login'>Login</Link>
            </main>
        )
   }