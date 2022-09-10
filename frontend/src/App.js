import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import Activate from "./pages/home/Activate";
import Reset from "./pages/reset";
import CreatePostPopup from "./components/createPostPopup";
import { useSelector } from "react-redux";
function App() {
  const {user} = useSelector((state)=>({...state}))
  return (
    <div className="App">
      <CreatePostPopup user={user}/>
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/activate/:token" element={<Activate />} />
          <Route exact path="/profile" element={<Profile />} />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route exact path="/login" element={<Login />} />
        </Route>
        <Route exact path="/reset" element={<Reset />} />

      </Routes>
    </div>
  );
}

export default App;
