import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/App.css';
import './styles/Navbar.css';
import './styles/Homepage.css';
import './styles/Footer.css';
import './styles/Trending.css';
import './styles/forms.css';
import './styles/available_course.css';
import './styles/cart.css';
import './styles/dashboard.css';
import './styles/profile.css';
import './styles/course_details.css';
import './styles/preview.css';
import './styles/review.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Homepage from './components/landing_page/homepage';
import Login from './components/landing_page/login';
import Register from './components/landing_page/register';
import PasswordReset from './components/landing_page/password-reset';
import AccountVerify from './components/landing_page/account_verification';
import Cart from './components/landing_page/cart';
import Payment from './components/landing_page/payment';
import Dashboard from './components/dashboard/dashboard';
import { useSelector } from "react-redux";
import DashboardGuard from './components/guard/dashboard_guard'
import CourseDetails from './components/landing_page/course_details';
import AvailableCourses from './components/landing_page/available_courses';
import ScrollToTop from './components/landing_page/scroll_to_top';
import Receipt from './components/landing_page/receipt';
import Erropage from './components/landing_page/erropage';
import Preview from './components/landing_page/preview';



AOS.init({
  duration: 1000,
  easing: 'ease-in-out',
  once: true,
  mirror: false
});

function App() {
  const auth = useSelector(state => state.auth)

  return (
    <>
      <Router>
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={Homepage} />



            <Route exact path="/login" component={Login} />



            <Route exact path="/register" component={Register} />



            <Route exact path="/password-reset" component={PasswordReset} />



            <Route exact path="/account-verification/:email" component={AccountVerify} />



            <Route exact path="/available-courses" component={AvailableCourses} />



            <Route exact path="/cart" component={Cart} />



            <Route exact path="/payment/:id" component={Payment} />

            <Route exact path="/receipt/:id" component={Receipt} />


            <Route exact path="/course-details/:code" component={CourseDetails} />

            <Route exact path="/preview-course/:code" component={Preview} />


            <DashboardGuard path="/dashboard" component={Dashboard} auth={auth} />

            <Route  path="/*" component={Erropage} />

          </Switch>

        </ScrollToTop>



      </Router>

    </>
  );
}

export default App;
