import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import NavBar from "./Components/Common/NavBar";
import EnterOtp from "./Pages/EnterOtp";
import ForgotPassword from "./Pages/ForgotPassword";
import ResendEmail from "./Pages/ResendEmail";
import UpdatePassword from "./Pages/UpdatePassword";
import AboutPage from "./Pages/AboutPage";


function App() {
  return (
   <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element = {<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/enterOtp" element={<EnterOtp/>} />
        <Route path="/forgotPassword" element={<ForgotPassword/>} />
        <Route path="/update-password/:id" element={<UpdatePassword/>} />
        <Route path="/resendToken" element={<ResendEmail/>} />
        <Route path="/about" element={<AboutPage/>} />
      </Routes>
   </div>
  );
}

export default App;
