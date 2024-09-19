import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import './App.css';
import LogIn from "./pages/LogIn";
import { UserContext } from './pages/UserContext';
import Home from "./pages/Home";
import { useContext } from "react";
import LogOut from "./pages/LogOut";
import Profile from "./pages/Profile";

// import LogOut from "./pages/LogOut";
function App() {
  const { isAuth } = useContext(UserContext);

  return (
    <div>
      {isAuth && <Home />}
      <Routes>
        <Route path="/" element={<LogIn />} />
        {isAuth && <Route path="/profile" element={<Profile />} />}
        {isAuth && <Route path="/logout" element={<LogOut />} />}

      </Routes>
    </div >
  );
}


export default App;


