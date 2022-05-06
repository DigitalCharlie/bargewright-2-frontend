import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { getUser } from '../../utilities/users-service';

// COMPONENTS
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer'

// PAGES
import HomePage from '../HomePage/HomePage';
import AuthPage from '../AuthPage/AuthPage';
import UserHome from '../UserHome/UserHome';
import ErrorPage from '../ErrorPage/ErrorPage';
import CharNew from '../CharNew/CharNew';
import CharHome from '../CharHome/CharHome'
import AdvNew from '../AdvNew/AdvNew'
import AdvShow from '../AdvShow/AdvShow'
import MagicItem from '../MagicItem/MagicItem'
import DowntimeNew from '../DowntimeNew/DowntimeNew'
import DowntimePage from '../DowntimePage/DowntimePage'

function App() {
  const [user, setUser ] = useState(getUser());
  const [currentPhoto, setCurrentPhoto] = useState(`${process.env.PUBLIC_URL}/images/yawning-portal.jpeg`)

  const photoArray = [
    `${process.env.PUBLIC_URL}/images/classic.jpeg`,
    `${process.env.PUBLIC_URL}/images/icewind.jpeg`,
    `${process.env.PUBLIC_URL}/images/mm-cover.jpeg`,
    `${process.env.PUBLIC_URL}/images/phb-cover.jpeg`,
    `${process.env.PUBLIC_URL}/images/startset-cover.jpeg`,
    `${process.env.PUBLIC_URL}/images/tod-cover.jpg`,
    `${process.env.PUBLIC_URL}/images/bridge-fight.jpg`,
    `${process.env.PUBLIC_URL}/images/yawning-portal.jpeg`
  ]

  useEffect(() => {
  }, [currentPhoto])

  const handlePhotoClick = () => {
    const tempArray = photoArray.filter(url => url !== currentPhoto)
    let newIndex = Math.floor(Math.random()*tempArray.length)
    setCurrentPhoto(tempArray[newIndex])
  }
  
  return (
    <div className="App" style={{backgroundImage:`url(${currentPhoto})`}} >
      <Header user={user} setUser={setUser} />
        <div className="spacemaker">
          <Routes>
            {
              user ?
              <>
                <Route path="/" element={<Navigate to={`/user/${user.username}`} replace />} />
                <Route path={`/user/${user.username}`} element={<UserHome user={user} setUser={setUser}/>}/>
                <Route path={`/user/${user.username}/character/new`} element={<CharNew user={user}/>}/>
                <Route path={`/user/${user.username}/character/:charId`} element={<CharHome user={user}/>}/>
                <Route path={`/user/${user.username}/character/:charId/adventure/new`} element={<AdvNew user={user}/>}/>
                <Route path={`/user/${user.username}/character/:charId/adventure/:advId`} element={<AdvShow user={user}/>}/>
                <Route path={`/user/${user.username}/character/:charId/magicitem/:magicItemId`} element={<MagicItem user={user}/>}/>
                <Route path={`/user/${user.username}/character/:charId/downtime/new`} element={<DowntimeNew user={user}/>}/>
                <Route path={`/user/${user.username}/character/:charId/downtime/:downtimeId`} element={<DowntimePage user={user}/>}/>
              </>
              :
              <Route path="/" element={<HomePage  setUser={setUser}/>}/>
            }
            <Route path="*" element={<ErrorPage/>}/>
          </Routes>
        </div>
        <button onClick={handlePhotoClick} className="bg-rotate-btn">🎲</button>
      <Footer />
    </div>
  );
}

export default App;