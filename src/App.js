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
// import EnrolledCourses from "./Components/Core/DashBoard/RightPart/EnrolledCoursesfolder/EnrolledCourses";
import PurchaseHistory from "./Components/Core/DashBoard/RightPart/PurchaseHistory";
import WishList from "./Components/Core/DashBoard/RightPart/WishList";
import SettingIndex from "./Components/Core/DashBoard/RightPart/Settings/SettingIndex";
import AddNewCourse from "./Components/Core/DashBoard/RightPart/AddCourse/AddNewCourse";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./Utilities/Constaints";
import DisplayMyCourses from "./Components/Core/DashBoard/RightPart/MyCourses/DisplayMyCourses";
import EditPreviousCourse from "./Components/Core/DashBoard/RightPart/EditCourse/EditPreviousCourse";
import NotFound from "./Components/Common/NotFound";
import DisplayCatagoryWiseCourses from "./Pages/DisplayCatagoryWiseCourses";
import ONECourseDetail from "./Pages/ONECourseDetail";
import EnrolledCourses from "./Pages/EnrolledCourses";
import ActiveCourseList from "./Components/Core/EnrolledCourses/Right/ActiveCourseList";
import Bookmarks from "./Components/Core/EnrolledCourses/Right/Bookmarks";
import Community from "./Components/Core/EnrolledCourses/Right/Community";
import ViewCourse from "./Pages/ViewCourse";
import ViewLectureVideo from "./Components/Core/ViewCourse/Right/ViewLectureVideo";
import StudentCourses from "./Components/Core/DashBoard/RightPart/StudentCourses";
import InstructorDashboard from "./Components/Core/DashBoard/RightPart/InstructorDasboard/InstructorDashboard";
import EnterRoom from "./Pages/EnterRoom";
import LiveClass from "./Pages/LiveClass";
import StartLive from "./Components/Core/DashBoard/RightPart/StartLive";
import GoLive from "./Components/Core/DashBoard/RightPart/GoLive";

function App() {

  const { user } = useSelector((state) => state.profile);
  // console.log(user.accountType)

  return (
    <div className="h-screen bg-richblack-900">
      <NavBar />
      
      <Routes >
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/CourseDetails/:CourseId" element={<ONECourseDetail />}/>




      


        <Route path="/catalog/:categoryName/:categoryId" element={<DisplayCatagoryWiseCourses />} />

        {/* OPEN Routes */}
        <Route
          path="/login"
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
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/setting" element={<SettingIndex />} />

          { 
             user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="/dashboard/purchase-history"
                element={<PurchaseHistory />}
              />
              <Route path="/dashboard/wishlist" element={<WishList />} />
              <Route path="/dashboard/courses" element={<StudentCourses/>} />
            </>
          )}

          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="/dashboard/add-course" element={<AddNewCourse />} />
              <Route
                path="/dashboard/my-courses"
                element={<DisplayMyCourses />}
              />
              <Route path="/dashboard/edit-course" element={<EditPreviousCourse />} />
              <Route path="/dashboard/instructor" element={<InstructorDashboard/>}/>
              <Route path="/dashboard/StartLive/:CourseId" element={<StartLive />} />
              <Route path="/dashboard/:RoomId" element={<GoLive/>}/>

              
            </>
          )}

        </Route>


        <Route
          element={
            <PrivateRoute>
              <EnrolledCourses />
            </PrivateRoute>
          }
        >
          <Route path="/EnrolledCourses/active-Courses" element={<ActiveCourseList/>} />
          <Route path="/EnrolledCourses/book-marks" element={<Bookmarks/>} />
          <Route path="/EnrolledCourses/community" element={<Community/>} />

          <Route path="/EnrolledCourses/EnterRoom" element={<EnterRoom/>}/>
          <Route path="/EnrolledCourses/:RoomId" element={<LiveClass/>}/>


        </Route>


        <Route
          element={
            <PrivateRoute>
              <ViewCourse/>
            </PrivateRoute>
          }
        >
          <Route path="/course/:CourseId/section/:SectionId/subSection/:SubSectionId" element={<ViewLectureVideo/>} />

        </Route>


      </Routes>

    </div>
  );
}

export default App;
