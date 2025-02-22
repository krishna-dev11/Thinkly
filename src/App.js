import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";

function App() {
  return (
   <div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
   </div>
  );
}

export default App;
