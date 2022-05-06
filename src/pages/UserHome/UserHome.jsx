import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import * as usersAPI from '../../utilities/users-api'
import * as userService from '../../utilities/users-service';

// COMPONENTS
import UserEdit from "../../components/UserEdit/UserEdit";
import UserShow from "../../components/UserShow/UserShow"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

export default function UserHome({user, setUser}){

    const [chars, setChars] = useState([])
    const navigate = useNavigate()
    const [editToggle, setEditToggle] = useState(false)
	const [submittedForm, setSubmittedForm] = useState(false)
    const [loaded, setLoaded] = useState(null)

    const flipEditToggle = () => {
		setEditToggle(!editToggle)
	}

	const flipSubmittedForm = () => {
		setSubmittedForm(!submittedForm)
	}

	useEffect(() => {
		(async () => {
			try {
				const data = await usersAPI.getAllChars(user.username)
                data.forEach((character) => {
                    let advLevels = character.adventures.reduce((acc, adv) => acc + parseInt(adv.levelGain), 0)
                    character.currentLevel = character.levelAdjust + parseInt(advLevels)
                })
				setChars(data)
                setTimeout(() => {
                    setLoaded(true)
                }, 200)
			} catch(e) {
				console.log(e)
			}
		})()
	}, [submittedForm])

    return (
        <>
        {
            editToggle ?
            <UserEdit flipEditToggle={flipEditToggle} flipSubmittedForm={flipSubmittedForm} user={user} setUser={setUser} />
            :
            <UserShow flipEditToggle={flipEditToggle} user={user} chars={chars} loaded={loaded} />
    }
    </>
    )
}