import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import './App.css';
import LogIn from "./pages/LogIn";
import { UserContext } from './pages/UserContext';
import Home from "./pages/Home";
import { useContext, useState } from "react";
import LogOut from "./pages/LogOut";
import Profile from "./pages/Profile";

function App() {
  const { isAuth ,isLoading} = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  // Layout component for authenticated users
  const AuthLayout = () => (
    <>
      <Home openModal={openModal} />
      <Outlet />
    </>
  );
  if (isLoading) {
    return <div>Loading...</div>; // או כל מסך טעינה אחר שתרצה
  }


  return (
    <div>
      <Routes>
        {/* Route for signin page */}
        <Route path="/signin" element={
          isAuth ? <Navigate to="/" replace /> : <LogIn />
        } />

        {/* Routes for authenticated users */}
        <Route element={isAuth ? <AuthLayout /> : <Navigate to="/signin" replace />}>
          <Route path="/" element={<></>} /> {/* Empty element for home route */}
          <Route path="/profile" element={<Profile isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />} />
          <Route path="/logout" element={<LogOut />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to={isAuth ? "/" : "/signin"} replace />} />
      </Routes>
    </div>
  );
}

export default App;