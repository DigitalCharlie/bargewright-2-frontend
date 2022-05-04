import SignUpForm from "../../components/SignUpForm/SignUpForm"
import LoginForm from "../../components/LoginForm/LoginForm"
import { useState } from "react"

import styles from './HomePage.module.css'

export default function HomePage({setUser}){

    const [showForm, setShowForm] = useState(null)

    return (
            <main className="main-narrow home">
                {
                    !showForm
                    ?
                    <>
                        <h1>Welcome to The Bargewright Inn, adventurer!</h1>
                        <p className="center">We look forward to hearing tales of your deeds and promise to keep accurate records of them.</p>
                        <p className="center">If you're a first timer, take a minute to register — otherwise take a seat at your usual table.</p>
                        <div className={styles.buttonContainer}>
                            <button className={styles.button} onClick={() => setShowForm('login')}>Login</button>
                            <button className={styles.button} onClick={() => setShowForm('signup')}>Sign Up</button>
                        </div>
                    </>
                    : showForm === 'login'
                    ?
                    <>
                        <LoginForm setUser={setUser} setShowForm={setShowForm} />
                    </>
                    :
                    <>
                        <SignUpForm setUser={setUser} setShowForm={setShowForm} />
                    </>
                }

            </main>
        )
   }