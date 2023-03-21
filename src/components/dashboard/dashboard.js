import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./student/home";
import MyCourses from "./student/my_courses";
import Wishlists from "./student/wishlists";
import { useLocation } from "react-router";
import axios from "axios";
import { Baseurl } from "../baseurl";
import { useDispatch } from "react-redux";
import { isLogged } from "../redux/actions";
import { useState } from "react";
import BasicDetails from "./tutor/create_course/basic_details";
import Sections from "./tutor/create_course/course_sections";
import CreateAcourse from "./tutor/create_a_course";
import CreatedCourses from "./tutor/created_courses";
import Profile from "./profile";
import Navbar from "../landing_page/navbar";
import Footer from "../landing_page/footer";
import Withdraw from "./withdraw";
import Settings from "./settings";
import WithdrawHistory from "./tutor/withdraw_history";
import Purchases from "./student/purchases";
import Erropage from "../landing_page/erropage";
import CourseVideos from "./tutor/create_course/course_videos";
import CourseFiles from "./tutor/create_course/course_files";
import ManageBasicDetails from "./tutor/manage_course/edit_basic_details";
import ManageSections from "./tutor/manage_course/edit_sections";
import TutorPreview from "./tutor/tutor_preview";

const Dashboard = () => {
  const [profile, setProfile] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("S");
    let token = sessionStorage.Token;
    if (token) {
      axios
        .post(`${Baseurl}auth/me`, { token: token })
        .then((res) => {
          if (res.data) {
            let data = res.data;
            dispatch(isLogged(true));
            setProfile(data);
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            dispatch(isLogged(false));
          } else if (error.response.status === 500) {
            dispatch(isLogged(false));
          }
        });
    } else {
      dispatch(isLogged(false));
    }
  });
  let path = useLocation();
  return (
    <>
      <Navbar dashboard={path.pathname} />
      <Switch>
        <Route exact path="/dashboard">
          <Home lastname={profile.lastname} />
        </Route>

        <Route exact path="/dashboard/my-courses">
          <MyCourses />
        </Route>

        <Route exact path="/dashboard/wishlists">
          <Wishlists />
        </Route>

        <Route exact path="/dashboard/purchases">
          <Purchases />
        </Route>

        <Route exact path="/dashboard/create-a-course">
          <CreateAcourse profile={profile} />
        </Route>

        <Route exact path="/dashboard/create-a-course/basic-details">
          <BasicDetails />
        </Route>

        <Route exact path="/dashboard/create-a-course/sections">
          <Sections />
        </Route>

        <Route exact path="/dashboard/create-a-course/videos">
          <CourseVideos />
        </Route>

        <Route exact path="/dashboard/create-a-course/files">
          <CourseFiles />
        </Route>

        <Route
          exact
          path="/dashboard/created-courses/manage/edit-basic-details/:code"
        >
          <ManageBasicDetails />
        </Route>

        <Route
          exact
          path="/dashboard/created-courses/manage/edit-sections/:code"
        >
          <ManageSections />
        </Route>

        <Route exact path="/dashboard/created-courses">
          <CreatedCourses />
        </Route>

        <Route exact path="/dashboard/tutor-preview/:code">
          <TutorPreview />
        </Route>

        <Route exact path="/dashboard/profile">
          <Profile profile={profile} />
        </Route>

        <Route exact path="/dashboard/earnings-withdraw">
          <Withdraw profile={profile} />
        </Route>

        <Route exact path="/dashboard/withdraw-history">
          <WithdrawHistory />
        </Route>

        <Route exact path="/dashboard/settings">
          <Settings profile={profile} />
        </Route>

        <Route path="/dashboard/*">
          <Erropage />
        </Route>
      </Switch>

      <Footer />
    </>
  );
};

export default Dashboard;
