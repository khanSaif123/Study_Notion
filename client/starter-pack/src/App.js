import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import OpenRoute from "./components/core/Auth/OpenRoute";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPasswordComplete from "./pages/ResetPasswordComplete";
import About from "./pages/About";
import MyProfile from "../src/components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error"
import Contact from "./pages/Contact";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import Instructor from "./components/core/Dashboard/Instructor";
import MyCourses from "./components/core/Dashboard/MyCourses";
import AddCourse from "./components/core/Dashboard/AddCourse";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Settings from "./components/core/Dashboard/Settings";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";

function App() {

  const {user} = useSelector((state) => state.profile)

  return (
    <div className="w-screen min-h-screen bg-richblack-900">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element = {<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/catalog/:catalogName" element={<Catalog/>}/>
        <Route path="courses/:courseId" element={<CourseDetails />} />

        {/* open route for only non logged in user */}
        <Route
          path="signup"
          element={
          <OpenRoute>
              <Signup />
          </OpenRoute>
            }
        />

        <Route
          path="login"
          element={
          <OpenRoute>
            <Login/>
          </OpenRoute>
         }
        />  

        <Route
          path="/forgot-password"
          element = {
            <OpenRoute>
              <ForgotPassword/>
            </OpenRoute>
          }
        />

      <Route
          path="/update-password/:id"
          element = {
            <OpenRoute>
              <UpdatePassword/>
            </OpenRoute>
          }
        />

      <Route
          path="/verify-email"
          element = {
            <OpenRoute>
              <VerifyEmail/>
            </OpenRoute>
          }
        />

        <Route
          path="/restepass-complete"
          element = {
            <OpenRoute>
              <ResetPasswordComplete/>
            </OpenRoute>
          }
        />

      

  {/* private routes only access when u are logged in */}
        <Route
       
          element = {
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
          <Route path="dashboard/Settings" element={<Settings />} />
          

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
                <Route path="/dashboard/cart" element={<Cart/>}/>
              </>
            )
          }

          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="/dashboard/instructor" element={<Instructor />} />
                <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
                <Route path="/dashboard/my-courses" element={<MyCourses />} />
                <Route path="/dashboard/add-course" element={<AddCourse/>}/>
                <Route path="dashboard/edit-course/:courseId" element={<EditCourse />}/>
              </>
            )
          }

           {/* For the watching course lectures */}
            <Route
              element={
                <PrivateRoute>
                  <ViewCourse />
                </PrivateRoute>
              }
            >
              {user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                  <Route
                    path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                    element={<VideoDetails />}
                  />
                </>
              )}
            </Route>

        </Route>


        {/* add contact-us route here */}

        
       


        <Route path="*" element={<Error />} />
      </Routes> 

      
    </div>
  
  );
}

export default App;
