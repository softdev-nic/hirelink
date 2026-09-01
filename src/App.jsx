 import React from "react";
import Registration from "./pages/reg/Registration";
import Login from "./pages/reg/Login";
import ForgotPassword from "./pages/reg/ForgotPassword";
import ResetPassword from "./pages/reg/ReserPassword";
import Home from "./pages/Home";
import AddCompanyEmail from "./pages/AddCompanyEmail";
import { Navigate, Route, Routes } from "react-router-dom";
import AddTemplate from "./pages/AddTemplate";
import OtpVerification from "./pages/OtpVerification";
import ModeratorDesk from "./pages/ModeratorDesk";
import { publicAPI } from "./Services/API";
import useModeratorStore from "./store/moderatorStore";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [moderator,setModerator] = React.useState(false)
  const getLoggedIn = () => {
    const loggedIn = localStorage.getItem("loggenIn");
    setIsLoggedIn(loggedIn === "true");
  };
  const checkModerator = useModeratorStore(
    (state) => state.checkModerator
  );

  React.useEffect(() => {
    checkModerator();
  }, [checkModerator]);


  React.useEffect(() => {
    getLoggedIn();
    

  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn
            ? <Navigate to="/home" replace />
            : <Navigate to="/login" replace />
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
       <Route path="/post-email" element={<AddCompanyEmail/>}/>
      <Route path="/home" element={<Home />} />
      <Route path="/add-template" element={<AddTemplate/>}/>
      <Route path="/otp/verify" element={<OtpVerification/>} />
      <Route path="/moderator-desk" element={<ModeratorDesk />} />
      
    </Routes>
  );
}

export default App;