import { useEffect } from 'react'
import {LiveVideo} from './svg'
import axios from 'axios'
import {
  
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
function App() {

  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/profile' element={<Profile/>}/>
      </Routes>
    </div>
  );
}

export default App;
