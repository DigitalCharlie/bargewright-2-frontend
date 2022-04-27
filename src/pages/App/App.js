import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import { getUser } from '../../utilities/users-service';

// COMPONENTS
import Header from '../../components/Header/Header';

// PAGES
import AuthPage from '../AuthPage/AuthPage';
import HomePage from '../HomePage/HomePage';
import UserHome from '../UserHome/UserHome';
import ErrorPage from '../ErrorPage/ErrorPage';
import CharNew from '../CharNew/CharNew';
import CharHome from '../CharHome/CharHome'
import AdvNew from '../AdvNew/AdvNew'
import AdvShow from '../AdvShow/AdvShow'
import MagicItem from '../MagicItem/MagicItem'

function App() {
  const [user, setUser ] = useState(getUser());

  return (
    <div className="App">
      <Header />

        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<AuthPage setUser={setUser}/>}/>
          {
            user ?
            <>
              <Route path={`/user/${user.username}`} element={<UserHome user={user}/>}/>
              <Route path={`/user/${user.username}/character/new`} element={<CharNew user={user}/>}/>
              <Route path={`/user/${user.username}/character/:charId`} element={<CharHome user={user}/>}/>
              <Route path={`/user/${user.username}/character/:charId/adventure/new`} element={<AdvNew user={user}/>}/>
              <Route path={`/user/${user.username}/character/:charId/adventure/:advId/`} element={<AdvShow user={user}/>}/>
              <Route path={`/user/${user.username}/character/:charId/magicitem/:magicItemId/`} element={<MagicItem user={user}/>}/>

            </>
            :
            ''
          }
          <Route path="*" element={<ErrorPage/>}/>
        </Routes>

    </div>
  );
}

export default App;