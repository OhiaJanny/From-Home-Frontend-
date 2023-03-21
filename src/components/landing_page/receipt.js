import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./footer";
import Navbar from "./navbar";
import { useParams } from "react-router";
import axios from "axios";
import { Baseurl } from "../baseurl";
import { useLocation } from "react-router";
import { useHistory } from "react-router";
import Skeleton from "react-loading-skeleton";

const Receipt = () => {
  document.title = "Fromhome | Payment Receipt";
  const { id } = useParams();
  const path = useLocation();
  const history = useHistory();
  const [details, setDetails] = useState([]);
  useEffect(() => {
    let token = sessionStorage.Token;
    axios
      .get(`${Baseurl}receipt`, {
        params: { id: id, token: token },
      })
      .then((res) => {
        if (res.data) {
          setDetails(res.data);
        }
      })
      .catch((error) => {
        if (error.response.status === 500) {
          sessionStorage.setItem("Path", path.pathname);
          history.push("/login");
        }
      });
  }, [history, id, path.pathname]);
  return (
    <>
      <Navbar />
      <section className="about container-fluid mt-4" id="about">
        <div className="row">
          <div className="col-md-8 col-sm mx-auto">
            <div class="container  px-2">
              <small style={{ color: "#0D826E" }}>
                <strong>Transaction Receipt</strong>
              </small>
              <div class="table-responsive mt-2">
                <table class="table table-responsive table-borderless">
                  <thead>
                    <tr class="bg-light">
                      <th scope="col" width="5%">
                        #
                      </th>
                      <th scope="col" width="20%">
                        <small>Category</small>
                      </th>
                      <th scope="col" width="10%">
                        <small>Course</small>
                      </th>
                      <th scope="col" width="20%">
                        <small>Amount</small>
                      </th>
                      <th scope="col" width="20%">
                        <small>Status</small>
                      </th>
                    </tr>
                  </thead>
                  {details.length ? (
                    details.map((item, index) => {
                      return (
                        <>
                          <tbody key={index}>
                            <tr>
                              <td>
                                <small>{index + 1}</small>
                              </td>
                              <td>
                                <small>{item.category}</small>
                              </td>
                              <td>
                                <small>{item.course_title}</small>
                              </td>
                              <td>
                                <small>{item.amount}</small>
                              </td>
                              <td className="text-capitalize text-primary">
                                <small>
                                  <strong>{item.state}</strong>
                                </small>
                              </td>
                            </tr>
                          </tbody>
                        </>
                      );
                    })
                  ) : (
                    <tbody>
                      <tr>
                        <td>
                          <small>
                            <Skeleton count={1} />
                          </small>
                        </td>
                        <td>
                          <small>
                            <Skeleton count={1} />
                          </small>
                        </td>
                        <td>
                          <small>
                            <Skeleton count={1} />
                          </small>
                        </td>
                        <td>
                          <small>
                            <Skeleton count={1} />
                          </small>
                        </td>
                        <td>
                          <small>
                            <Skeleton count={1} />
                          </small>
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>
                {details.length ? (
                  <Link to="/dashboard/my-courses">
                    <button class="btn d-flex mx-auto" type="submit">
                      <b>
                        <small>My Courses</small>
                      </b>
                    </button>
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Receipt;
