import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import Activate from "./pages/home/Activate";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/activate/:token" element={<Activate />} />
          <Route exact path="/profile" element={<Profile />} />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route exact path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
