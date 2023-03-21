import React from "react";
import TrendingCourses from "../../landing_page/trending_courses";
import { useHistory } from "react-router";

const Home = ({ lastname }) => {
  document.title = "Fromhome | Dashboard";
  let history = useHistory();
  return (
    <>
      <section id="about" className="about container-fluid mt-5">
        <div className="row">
          <div className="col-md-6 col-sm mx-auto text-center">
            <h6>
              Hi{" "}
              {lastname ? (
                lastname
              ) : (
                <i
                  class="fas fa-spinner fa-spin"
                  style={{ color: "#0D826E" }}
                ></i>
              )}
              , Welcome to your Dashboard
            </h6>
            <h5 className="mt-3">Start Learning</h5>
            <i class="fas fa-books text-danger fa-3x"></i>
            <button
              class="btn d-flex mx-auto"
              onClick={() => history.push("/dashboard/my-courses")}
            >
              <b>
                <small>View Your Courses</small>
              </b>
            </button>
          </div>
        </div>
      </section>

      <TrendingCourses />
    </>
  );
};

export default Home;
