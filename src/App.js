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
import ContactUsPage from "./Pages/ContactUsPage";
import ResestCompletePage from "./Pages/ResestCompletePage";
import OpenRoute from "./Components/Core/Auth/OpenRoute";
import Dashboard from "./Pages/Dashboard";
import PrivateRoute from "./Components/Core/Auth/PrivateRoute";
import MyProfile from "./Components/Core/DashBoard/RightPart/MyProfile";
import EnrolledCourses from "./Components/Core/DashBoard/RightPart/EnrolledCoursesfolder/EnrolledCourses";
import PurchaseHistory from "./Components/Core/DashBoard/RightPart/PurchaseHistory";
import WishList from "./Components/Core/DashBoard/RightPart/WishList";
import Courses from "./Components/Core/DashBoard/RightPart/Courses";
import SettingIndex from "./Components/Core/DashBoard/RightPart/Settings/SettingIndex";


function App() {
  return (
    <div className=" h-screen">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactUsPage />} />

        {/* OPEN Routes */}
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="/enterOtp"
          element={
            <OpenRoute>
              <EnterOtp />
            </OpenRoute>
          }
        />
        <Route
          path="/forgotPassword"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="/resendToken"
          element={
            <OpenRoute>
              <ResendEmail />
            </OpenRoute>
          }
        />
        <Route
          path="/resetCompletePage"
          element={
            <OpenRoute>
              <ResestCompletePage />
            </OpenRoute>
          }
        />

        {/* PRIVATE ROUTE */}

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          
           <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
           <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
           <Route path="/dashboard/purchase-history" element={<PurchaseHistory/>}/>
           <Route path="/dashboard/wishlist" element={<WishList/>}/>
           <Route path="/dashboard/courses" element={<Courses/>}/>
           <Route path="/dashboard/setting" element={<SettingIndex/>}/>


        </Route>


      </Routes>
    </div>
  );
}

export default App;
