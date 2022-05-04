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
  // const [currentPhoto, setCurrentPhoto] = useState('../../../public/images/yawning-portal.jpeg')

  // const photoArray = [
  //   '../../../public/images/classic.jpeg',
  //   '../../../public/images/default-image.jpg',
  //   '../../../public/images/icewind.jpeg',
  //   '../../../public/images/mm-cover.jpeg',
  //   '../../../public/images/phb-cover.jpeg',
  //   '../../../public/images/startset-cover.jpeg',
  //   '../../../public/images/tod-cover.jpg',
  //   '../../../public/images/yawning-portal.jpeg'
  // ]

  // useEffect(() => {
  // }, [currentPhoto])

  // const handlePhotoClick = () => {
  //   const tempArray = photoArray.filter(url => url !== currentPhoto)
  //   let newIndex = Math.floor(Math.random()*tempArray.length)
  //   console.log(tempArray[newIndex])
  //   setCurrentPhoto(tempArray[newIndex])
  // }
  // STYLE I WAS USING style={{backgroundImage:`url(${currentPhoto})`}}
  // button i was using         <button onClick={handlePhotoClick}>Rotate image</button>
  
  return (
    <div className="App" >
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
      <Footer />
    </div>
  );
}

export default App;