import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'

// COMPONENTS
import Header from '../../components/Header/Header';

// PAGES
import AuthPage from '../AuthPage/AuthPage';
import HomePage from '../HomePage/HomePage';
import UserHome from '../UserHome/UserHome';



function App() {
  const [user, setUser ] = useState(null);

  return (
    <main className="App">
      <Header />
      
      {/* {
        user ?
        <Routes>
          <Route path="/" element={<HomePage/>}/>
        </Routes>
        :
        <AuthPage setUser={setUser}/>
      } */}

        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<AuthPage setUser={setUser}/>}/>
          {
              user ?
              <Route path="/user/:username" element={<UserHome user={user}/>}/>
              :
              <Route path="/login" element={<AuthPage setUser={setUser}/>}/>
            }
        </Routes>

    </main>
  );
}

export default App;
