import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

function App() {
  return (
   <div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element = {<Login />} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
   </div>
  );
}

export default App;
