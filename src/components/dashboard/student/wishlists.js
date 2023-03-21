import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import axios from "axios";
import { Baseurl } from "../../baseurl";
import Skeleton from "react-loading-skeleton";

const Wishlists = () => {
  document.title = "Fromhome | Wishlists";
  const history = useHistory();
  let path = useLocation();
  const [details, setDetails] = useState([]);
  const [isFetching, setFecthing] = useState(false);

  useEffect(() => {
    setFecthing(true);
    let token = sessionStorage.Token;
    axios
      .get(`${Baseurl}wishlist`, {
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
              <strong>Wishlists</strong>
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
              {" "}
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
                          class="card p-3 mb-2 shadow"
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
                                  backgroundColor: "#339AF0",
                                }}
                              >
                                Wishlist
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
                            <div class="mt-2">
                              <small>
                                <strong>₦{item.course_cost}</strong>
                              </small>{" "}
                              <small className="text-decoration-line-through">
                                ₦{parseInt(item.course_cost) + parseInt(1500)}
                              </small>
                              <br />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <div className="col-md-6 col-sm mx-auto text-center mt-4">
                  <h5>Your have no Wishlists</h5>
                  <i class="fas fa-books text-danger fa-3x"></i>
                  <button
                    class="btn d-flex mx-auto"
                    onClick={() => history.push("/available-courses")}
                  >
                    <b>
                      <small>Buy a Course</small>
                    </b>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Wishlists;
