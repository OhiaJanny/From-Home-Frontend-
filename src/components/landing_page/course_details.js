import React, { useEffect, useState } from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import { useParams } from "react-router";
import axios from "axios";
import { Baseurl } from "../baseurl";
import { useLocation } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RelatedCourses from "./related_courses";
import Skeleton from "react-loading-skeleton";
import CourseReview from "./course_review";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const CourseDetails = () => {
  document.title = "Fromhome | Course Details";
  let path = useLocation();
  const history = useHistory();
  const { code } = useParams();
  const [details, setDetails] = useState({});
  const [sections, setSections] = useState([]);
  const [lname, setLname] = useState("");
  const [number, setNumber] = useState("");
  const [access, setAccess] = useState(false);

  useEffect(() => {
    if (!localStorage.cart) {
      let cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    axios
      .get(`${Baseurl}coursedetails`, {
        params: { code: code },
      })
      .then((res) => {
        if (res.data) {
          setDetails(res.data.details);
          setSections(res.data.sections);
          setLname(res.data.lname);
          setNumber(res.data.no);
        }
      });
  }, [code]);

  useEffect(() => {
    let token = sessionStorage.Token;
    if (token) {
      axios
        .get(`${Baseurl}courseaccess`, {
          headers: {
            Authorization: "Bearer" + token,
          },
          params: {
            code: code,
          },
        })
        .then((res) => {
          if (res.data === "paid") {
            setAccess(true);
          }
        });
    }
  }, [code]);

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (
      details.course_title &&
      details.course_code &&
      details.course_cost &&
      details.category &&
      lname
    ) {
      if (cart) {
        let courseDetails = {
          title: details.course_title,
          code: details.course_code,
          cost: details.course_cost,
          category: details.category,
          tutor: lname,
        };
        cart.push(courseDetails);
        localStorage.setItem("cart", JSON.stringify(cart));
        toast("👍 Added to Cart!", {
          autoClose: 2000,
        });
      }
    }
  };

  const addwishlist = () => {
    let token = sessionStorage.Token;
    if (token) {
      axios
        .post(
          `${Baseurl}addwishlist`,
          { code: code },
          {
            headers: {
              Authorization: "Bearer" + token,
            },
          }
        )
        .then((res) => {
          if (res.data === "added") {
            toast("👍 Added to wishlists!", {
              autoClose: 2000,
            });
          } else if (res.data === "alreadyAdded") {
            toast("✋ Already Added!", {
              autoClose: 2000,
            });
          }
        })
        .catch((error) => {
          if (error.response.status === 500) {
            sessionStorage.setItem("Path", path.pathname);
          }
        });
    } else {
      toast("✋ Login to Wishlist!", {
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <Navbar />
      <section id="course-details" class="course-details">
        <small>
          <ToastContainer />
        </small>
        <div class="container" data-aos="fade-in">
          <div class="row">
            <div class="col-lg-8">
              <img
                src="assets/img/course-details.jpg"
                class="img-fluid"
                alt=""
              />
              <h3 className="text-capitalize">
                {details.course_title ? (
                  details.course_title
                ) : (
                  <Skeleton count={1} />
                )}
              </h3>
              <p>
                {details.description ? (
                  details.description
                ) : (
                  <p>
                    <Skeleton count={4} />
                  </p>
                )}
              </p>
              <div className="mt-3">
                {access ? (
                  ""
                ) : (
                  <>
                    {details.course_title ? (
                      <small
                        onClick={addwishlist}
                        style={{ color: "#071B4D", cursor: "pointer" }}
                        className="px-2"
                      >
                        <i class="fas fa-bookmark"></i>
                        <strong> Wishlist</strong>
                      </small>
                    ) : (
                      <small className="px-2">
                        <i
                          class="fas fa-spinner fa-spin"
                          style={{ color: "#0D826E" }}
                        ></i>
                      </small>
                    )}
                  </>
                )}
                <small style={{ color: "#071B4D" }} className="px-2">
                  <i class="fad fa-user-alt"></i>
                  <strong> {number ? number : 0} Enrolled</strong>
                </small>

                <section
                  id="cource-details-tabs"
                  class="cource-details-tabs mt-5"
                >
                  <ul class="nav nav-tabs flex-column">
                    <li class="nav-item">
                      <Link>📚 Course Sections</Link>
                    </li>
                  </ul>
                  <div class="p-2 learn">
                    <div class="row">
                      {sections.length ? (
                        sections.map((item, index) => {
                          return (
                            <div class="col-md-6 p-2" key={index}>
                              <small className="text-capitalize">
                                <i
                                  class="fa fa-check-circle me-2"
                                  style={{ color: "#0D826E" }}
                                ></i>
                                {item.section_name}
                              </small>
                            </div>
                          );
                        })
                      ) : (
                        <li class="nav-item mt-2">
                          <Skeleton count={3} />
                        </li>
                      )}
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <div class="col-lg-4 mt-auto">
              <div
                class="course-info d-flex justify-content-between align-items-center"
                style={{ borderRadius: "8px" }}
              >
                <small>Tutor</small>
                <small>
                  <strong>
                    {lname ? (
                      lname
                    ) : (
                      <small>
                        <i
                          class="fas fa-spinner fa-spin"
                          style={{ color: "#0D826E" }}
                        ></i>
                      </small>
                    )}
                  </strong>
                </small>
              </div>

              <div
                class="course-info d-flex justify-content-between align-items-center"
                style={{ borderRadius: "8px" }}
              >
                <small>Cost</small>
                <small>
                  <strong>
                    {details.course_cost ? (
                      `₦${details.course_cost}`
                    ) : (
                      <small>
                        <i
                          class="fas fa-spinner fa-spin"
                          style={{ color: "#0D826E" }}
                        ></i>
                      </small>
                    )}
                  </strong>
                </small>
              </div>

              <div
                class="course-info d-flex justify-content-between align-items-center"
                style={{ borderRadius: "8px" }}
              >
                <small>Category</small>
                <small>
                  <strong>
                    {details.category ? (
                      details.category
                    ) : (
                      <small>
                        <i
                          class="fas fa-spinner fa-spin"
                          style={{ color: "#0D826E" }}
                        ></i>
                      </small>
                    )}
                  </strong>
                </small>
              </div>

              <div
                class="course-info d-flex justify-content-between align-items-center"
                style={{ borderRadius: "8px" }}
              >
                <small>Attendance</small>
                <small>
                  <strong>{number ? number : <small>0</small>}</strong>
                </small>
              </div>

              {details.course_title ? (
                <div
                  class="course-info d-flex justify-content-between align-items-center"
                  style={{ borderRadius: "8px" }}
                >
                  {access ? (
                    <button
                      onClick={() => history.push(`/preview-course/${code}`)}
                      class="btn d-flex mx-auto mb-2"
                      type="submit"
                      disabled={!details.course_title}
                    >
                      <b>
                        <small>Preview Course</small>
                      </b>
                    </button>
                  ) : (
                    <button
                      class="btn d-flex mx-auto mb-2"
                      type="submit"
                      disabled={!details.course_title}
                      onClick={addToCart}
                    >
                      <b>
                        <small>
                          <i class="fad fa-shopping-cart"></i> Add to Cart
                        </small>
                      </b>
                    </button>
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </section>

      <CourseReview code={code} />
      <RelatedCourses code={code} />
      <Footer />
    </>
  );
};

export default CourseDetails;
