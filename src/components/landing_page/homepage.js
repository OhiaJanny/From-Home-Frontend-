import React from "react";
import { Link } from "react-router-dom";
import ScriptTag from "react-script-tag/lib/ScriptTag";
import { useLocation } from "react-router";
import TrendingCourses from "./trending_courses";
import LatestCourses from "./latest_courses";
import BackTotop from "./back_to_top";
import Navbar from "./navbar";
import Footer from "./footer";

const Homepage = () => {
  document.title = "Fromhome | Learn Today";
  let path = useLocation();

  return (
    <>
      <ScriptTag
        isHydrating={false}
        type="text/javascript"
        src="purecounter.js"
      />
      <Navbar home={path.pathname} />
      {/* Hero section starts */}
      <section
        id="hero"
        className="d-flex justify-content-center align-items-center"
      >
        <div
          className="container position-relative"
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          <h1>
            Learn Today <br /> Learn From Home
          </h1>
          <h2>We make learning convenient and teaching easy</h2>
          <Link to="/available-courses">
            <p className="btn-get-started">
              Buy a Course <i class="fal fa-arrow-right"></i>
            </p>
          </Link>
        </div>
      </section>
      {/* Hero section Ends */}

      {/* About section starts */}
      <section id="about" className="about">
        <div className="container" data-aos="fade-in">
          <div class="row">
            <div
              className="col-lg-6 order-1 order-lg-2"
              data-aos="fade-in"
              data-aos-delay="100"
            >
              <img
                src="assets/img/student.png"
                className="img-fluid"
                alt=""
                style={{ borderRadius: "7px" }}
              />
            </div>
            <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
              <h3 style={{ fontSize: "22px" }}>
                <strong> Online Learning.</strong>
              </h3>
              <p class="fst-italic">
                With our Learning Management Web application, we have made:
              </p>
              <ul>
                <li>
                  <i class="fad fa-check-square"></i> Learning easy by studying
                  right from the comfort of your home or wherever.
                </li>
                <li>
                  <i class="fad fa-check-square"></i> Teaching more fun and
                  monetary as tutors can upload there materials and millions of
                  students can access them.
                </li>
                <li>
                  <i class="fad fa-check-square"></i> Learning in general fun.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* About section Ends */}

      {/* <!-- ======= Counts Section ======= --> */}
      <section id="counts" class="counts section-bg">
        <div class="container">
          <div class="row counters">
            <div class="col-lg-3 col-6 text-center">
              <span
                data-purecounter-start="0"
                data-purecounter-end="1232"
                data-purecounter-duration="1"
                class="purecounter"
              ></span>
              <p>
                <i class="fal fa-users-class" style={{ color: "#071B4D" }}></i>{" "}
                Students
              </p>
            </div>

            <div class="col-lg-3 col-6 text-center">
              <span
                data-purecounter-start="0"
                data-purecounter-end="64"
                data-purecounter-duration="1"
                class="purecounter"
              ></span>
              <p>
                <i class="fas fa-books" style={{ color: "#071B4D" }}></i>{" "}
                Courses
              </p>
            </div>

            <div class="col-lg-3 col-6 text-center">
              <span
                data-purecounter-start="0"
                data-purecounter-end="42"
                data-purecounter-duration="1"
                class="purecounter"
              ></span>
              <p>
                <i class="fad fa-puzzle-piece" style={{ color: "#071B4D" }}></i>{" "}
                Categories
              </p>
            </div>

            <div class="col-lg-3 col-6 text-center">
              <span
                data-purecounter-start="0"
                data-purecounter-end="15"
                data-purecounter-duration="1"
                class="purecounter"
              ></span>
              <p>
                <i
                  class="fad fa-chalkboard-teacher"
                  style={{ color: "#071B4D" }}
                ></i>{" "}
                Trainers
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End Counts Section --> */}

      {/* Why us section starts */}

      <section id="why-us" class="why-us">
        <div class="container" data-aos="fade-up">
          <div class="row">
            <div class="col-lg-4 d-flex align-items-stretch">
              <div class="content" style={{ borderRadius: "10px" }}>
                <h3>Learning Made Easy</h3>
                <p>
                  With our Learning Management Application, we've made learning
                  fun and interesting as well as teaching fun.
                </p>
                <div class="text-center">
                  <p
                    class="more-btn"
                    style={{ textDecoration: "none", fontWeight: "bold" }}
                  >
                    Learn More <i class="bx bx-chevron-right"></i>
                  </p>
                </div>
              </div>
            </div>
            <div
              class="col-lg-8 d-flex align-items-stretch"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <div class="icon-boxes d-flex flex-column justify-content-center">
                <div class="row">
                  <div class="col-xl-6 d-flex align-items-stretch">
                    <div
                      class="icon-box mt-4 mt-xl-0"
                      style={{ borderRadius: "10px" }}
                    >
                      <i class="bx bx-receipt"></i>
                      <h4>Learning made easy</h4>
                      <p>
                        Your can learn with ease from the comfort of your home.
                      </p>
                    </div>
                  </div>
                  <div class="col-xl-6 d-flex align-items-stretch">
                    <div
                      class="icon-box mt-4 mt-xl-0"
                      style={{ borderRadius: "10px" }}
                    >
                      <i class="bx bx-cube-alt"></i>
                      <h4>Teaching made fun</h4>
                      <p>
                        Reach out to more numbers of students by posting your
                        courses on our platform and make money doing that.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Why us section ends */}

      {/* About section starts */}
      <section id="about" className="about">
        <div className="container" data-aos="fade-in">
          <div class="row">
            <div className="col-lg-6 order-2 order-lg-1" data-aos="fade-in">
              <img
                src="assets/img/tutor.jpg"
                className="img-fluid"
                alt=""
                style={{ borderRadius: "10px" }}
              />
            </div>
            <div className="col-lg-6 pt-4 pt-lg-0 order-1 order-lg-2 content">
              <h3 style={{ fontSize: "22px" }}>
                <strong>Become a Tutor.</strong>
              </h3>
              <p class="fst-italic">
                With our Learning Management Web application, we have made:
              </p>
              <ul>
                <li>
                  <i class="fad fa-check-square"></i> Learning easy by studying
                  right from the comfort of your home or wherever.
                </li>
                <li>
                  <i class="fad fa-check-square"></i> Teaching more fun and
                  monetary as tutors can upload there materials and millions of
                  students can access them.
                </li>
                <li>
                  <i class="fad fa-check-square"></i> Learning in general fun.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* About section Ends */}

      <TrendingCourses />
      <div className="mt-4">
        <LatestCourses />
      </div>
      <BackTotop />
      <Footer />
    </>
  );
};

export default Homepage;
