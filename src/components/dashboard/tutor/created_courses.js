import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Baseurl } from "../../baseurl";
import { useHistory, useLocation } from "react-router";
import Skeleton from "react-loading-skeleton";

const CreatedCourses = () => {
  document.title = "Fromhome | Created Courses";
  const history = useHistory();
  const [course, setCourse] = useState([]);
  const path = useLocation();
  const [isFetching, setFecthing] = useState(false);

  useEffect(() => {
    setFecthing(true);
    let token = sessionStorage.Token;
    if (token) {
      axios
        .get(`${Baseurl}createdcourse`, {
          params: {
            token: token,
          },
        })
        .then((res) => {
          setFecthing(false);
          if (res.data) {
            setCourse(res.data);
          }
        })
        .catch((error) => {
          setFecthing(false);
          if (error.response.status === 500) {
            sessionStorage.setItem("Path", path.pathname);
          }
        });
    } else {
    }
  }, [path.pathname]);

  const courseStatus = (code) => {
    history.push(
      `/dashboard/created-courses/manage/edit-basic-details/${code}`
    );
    axios.post(`${Baseurl}coursestatus`, { code: code }).then((res) => {});
  };
  return (
    <>
      <div className="container mb-3">
        <div className="row" style={{ marginTop: "90px" }}>
          <div className="col-md-6 col-sm mx-auto text-center">
            <h5>
              Your have {course.length ? course.length : "no"} course
              {course.length > 1 ? "s" : ""}
            </h5>
            <i class="fas fa-books text-danger fa-3x"></i>
            <button
              class="btn d-flex mx-auto"
              onClick={() => history.push("/dashboard/create-a-course")}
            >
              <b>
                <small>Create a new course</small>
              </b>
            </button>
          </div>
        </div>
      </div>
      <div className="container mb-4">
        <div class="row">
          {course.length ? (
            <small style={{ color: "#071B4D" }}>
              <strong>Created Courses</strong>
            </small>
          ) : (
            <small style={{ color: "#071B4D" }}>
              <strong>No Course</strong>
            </small>
          )}
          {isFetching ? (
            <div className="row">
              <div class="col-md-4 mt-2">
                <div
                  class="card p-3 mb-2 shadow"
                  style={{ borderRadius: "20px" }}
                >
                  <Skeleton count={5} />
                </div>
              </div>
              <div class="col-md-4 mt-2">
                <div
                  class="card p-3 mb-2 shadow"
                  style={{ borderRadius: "20px" }}
                >
                  <Skeleton count={5} />
                </div>
              </div>
              <div class="col-md-4 mt-2">
                <div
                  class="card p-3 mb-2 shadow"
                  style={{ borderRadius: "20px" }}
                >
                  <Skeleton count={5} />
                </div>
              </div>
            </div>
          ) : (
            <>
              {course.length
                ? course.map((item, index) => {
                    return (
                      <>
                        <div
                          class="col-md-4 mt-2"
                          data-aos="fade-in"
                          data-aos-delay="100"
                        >
                          <div
                            class="card p-4 mb-2 shadow"
                            style={{ borderRadius: "20px" }}
                          >
                            <div class="d-flex justify-content-between">
                              <div class="d-flex flex-row align-items-center">
                                <div class="icon">
                                  <img
                                    src={
                                      item.category === "IT and Software"
                                        ? "https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/000000/external-software-hacking-flatart-icons-flat-flatarticons.png"
                                        : item.category === "Design"
                                        ? "https://img.icons8.com/external-kiranshastry-flat-kiranshastry/64/000000/external-design-industry-kiranshastry-flat-kiranshastry.png"
                                        : item.category === "Agriculture"
                                        ? "https://img.icons8.com/external-wanicon-flat-wanicon/64/000000/external-agriculture-university-courses-wanicon-flat-wanicon.png"
                                        : item.category === "Marketing"
                                        ? "https://img.icons8.com/external-itim2101-flat-itim2101/64/000000/external-marketing-business-strategy-itim2101-flat-itim2101.png"
                                        : item.category === "Photography"
                                        ? "https://img.icons8.com/external-wanicon-flat-wanicon/64/000000/external-photography-art-and-design-wanicon-flat-wanicon.png"
                                        : item.category === "Engineering"
                                        ? "https://img.icons8.com/external-wanicon-flat-wanicon/64/000000/external-engineering-university-courses-wanicon-flat-wanicon.png"
                                        : item.category === "Cryptocurrency"
                                        ? "https://img.icons8.com/external-itim2101-flat-itim2101/64/000000/external-cryptocurrency-mobile-payment-itim2101-flat-itim2101.png"
                                        : ""
                                    }
                                    alt=""
                                    style={{ width: "50%" }}
                                  />
                                </div>
                              </div>
                              <div class="badge text-capitalize">
                                {" "}
                                <span
                                  style={{
                                    color: "#FFFFFF",
                                    backgroundColor: "#F75B00",
                                  }}
                                >
                                  {item.status}
                                </span>{" "}
                              </div>
                            </div>
                            <div class="mt-2">
                              <Link
                                to={`/dashboard/tutor-preview/${item.course_code}`}
                                class="text2 text-capitalize"
                              >
                                <strong>{item.course_title}</strong>
                              </Link>
                            </div>
                            <div class="mt-2">
                              <small
                                onClick={() => courseStatus(item.course_code)}
                                class="text2"
                              >
                                <strong className="text-dark">Manage</strong>
                              </small>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })
                : ""}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CreatedCourses;
