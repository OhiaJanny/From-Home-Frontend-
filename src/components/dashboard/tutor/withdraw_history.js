import axios from "axios";
import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { Baseurl } from "../../baseurl";
import { useLocation } from "react-router";
import Moment from "react-moment";

const WithdrawHistory = () => {
  document.title = "Fromhome | Withdraw History";
  let path = useLocation();
  const [details, setDetails] = useState([]);
  const [isFetching, setFecthing] = useState(false);

  useEffect(() => {
    setFecthing(true);
    let token = sessionStorage.Token;
    axios
      .get(`${Baseurl}withdrawhistory`, {
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
      <section className="about container-fluid mt-4" id="about">
        <div className="row">
          {isFetching ? (
            <div className="col-md-8 col-sm mx-auto pt-2">
              <Skeleton count={4} />
            </div>
          ) : (
            <>
              {" "}
              {details.length ? (
                <div className="col-md-8 col-sm mx-auto pt-2">
                  <div class="container  px-2">
                    <small style={{ color: "#071B4D" }}>
                      <strong>Withdraw History</strong>
                    </small>
                    <div class="table-responsive mt-2">
                      <table class="table table-responsive table-borderless">
                        <thead>
                          <tr class="bg-light">
                            <th scope="col" width="5%">
                              #
                            </th>
                            <th scope="col" width="20%">
                              <small>Reference</small>
                            </th>
                            <th scope="col" width="20%">
                              <small>Amount</small>
                            </th>
                            <th scope="col" width="20%">
                              <small>Status</small>
                            </th>
                            <th scope="col" width="10%">
                              <small>Date</small>
                            </th>
                          </tr>
                        </thead>
                        {details.map((item, index) => {
                          return (
                            <>
                              <tbody key={index}>
                                <tr>
                                  <td>
                                    <small>{index + 1}</small>
                                  </td>
                                  <td>
                                    <small>{item.reference}</small>
                                  </td>
                                  <td>
                                    <small>{item.amount_in_kobo / 100}</small>
                                  </td>
                                  <td>
                                    <small>{item.status}</small>
                                  </td>
                                  <td>
                                    <small>
                                      <strong>
                                        <Moment fromNow>
                                          {item.created_at}
                                        </Moment>
                                      </strong>
                                    </small>
                                  </td>
                                </tr>
                              </tbody>
                            </>
                          );
                        })}
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-md-6 col-sm mx-auto text-center">
                  <h5>You have no withdrawal history</h5>
                  <i class="fad fa-shopping-cart fa-3x text-danger"></i>
                  <Link to="/dashboard/create-a-course">
                    <button class="btn d-flex mx-auto" type="submit">
                      <b>Create a Course</b>
                    </button>
                  </Link>
                </div>
              )}{" "}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default WithdrawHistory;
