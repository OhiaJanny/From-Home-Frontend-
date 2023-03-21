import axios from "axios";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { Baseurl } from "../../baseurl";
import { useLocation } from "react-router";
import { Line } from "rc-progress";

const MyCourses = () => {
  document.title = "Fromhome | My Courses";
  let path = useLocation();
  const [details, setDetails] = useState([]);
  const [isFetching, setFecthing] = useState(false);
  useEffect(() => {
    setFecthing(true);
    let token = sessionStorage.Token;
    axios
      .get(`${Baseurl}purchasedcourse`, {
        headers: {
          Authorization: "Bearer" + token,
        },
      })
      .then((res) => {
        setFecthing(false);
        if (res.data) {
          setDetails(res.data);
        }
      })
      .catch((error) => {
        setFecthing(false);
        if (error.response.status === 500) {
          sessionStorage.setItem("Path", path.pathname);
        }
      });
  }, [path.pathname]);

  return (
    <>
      <section className="about container-fluid mt-4 mx-auto" id="about">
        <div class="row">
          {details.length ? (
            <small style={{ color: "#071B4D" }}>
              <strong>Purhcased Courses</strong>
            </small>
          ) : (
            ""
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
              {details.length ? (
                details.map((item, index) => {
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
                            <div class="badge">
                              {" "}
                              <span
                                style={{
                                  color: "#FFFFFF",
                                  backgroundColor: "#F75B00",
                                }}
                              >
                                Bought
                              </span>{" "}
                            </div>
                          </div>
                          <div class="mt-2">
                            <Link to={`/course-details/${item.course_code}`}>
                              {" "}
                              <small class="heading text-capitalize">
                                <strong>{item.course_title}</strong>
                              </small>
                            </Link>
                            <div class="mt-3">
                              <small>
                                <Line
                                  percent={item.progress}
                                  strokeWidth="2"
                                  strokeColor="#0D826E"
                                />
                                <strong>{item.progress}% progress</strong>
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <div className="col-md-6 col-sm mx-auto text-center mt-4">
                  <h5>Your have no Course</h5>
                  <i class="fas fa-books text-danger fa-3x"></i>
                  <Link to="/available-courses">
                    <button class="btn d-flex mx-auto" type="submit">
                      <b>
                        <small>Buy a Course</small>
                      </b>
                    </button>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default MyCourses;
