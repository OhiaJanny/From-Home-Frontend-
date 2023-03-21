import axios from "axios";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { Baseurl } from "../baseurl";

const CourseReview = ({ code }) => {
  const [review, setReview] = useState([]);
  const [isFetching, setFecthing] = useState(false);
  useEffect(() => {
    setFecthing(true);
    axios
      .get(`${Baseurl}coursereview`, {
        params: { code: code },
      })
      .then((res) => {
        setFecthing(false);
        if (res.data) {
          setReview(res.data);
        }
      });
  }, [code]);
  return (
    <>
      <div class="container mb-5">
        <div class="row">
          <div class="col-md">
            <div class="rvcard">
              {review.length ? (
                <div class="rvcard-body">
                  <small class="rvcard-subtitle" style={{ color: "#071B4D" }}>
                    <strong>Latest Reviews by students</strong>
                  </small>
                </div>
              ) : (
                ""
              )}
              {isFetching ? (
                <Skeleton count={3} />
              ) : (
                <>
                  {review.length ? (
                    review
                      .filter((item, index) => index < 6)
                      .map((item, index) => {
                        return (
                          <>
                            <div class="comment-widgets" key={index}>
                              <div class="d-flex flex-row comment-row">
                                <div class="p-2">
                                  <span class="round">
                                    <img
                                      src="https://img.icons8.com/bubbles/100/000000/user.png"
                                      class="img-radius"
                                      alt="User"
                                    />{" "}
                                  </span>
                                </div>
                                <div class="comment-text">
                                  <p>
                                    <strong>{item.lastname}</strong>
                                  </p>
                                  <small class="comment-footer">
                                    {" "}
                                    <span class="date">
                                      <Moment fromNow>{item.created_at}</Moment>
                                    </span>{" "}
                                    <span class="action-icons">
                                      {" "}
                                      <Link>
                                        <i class="fa fa-heart"></i>
                                      </Link>{" "}
                                    </span>{" "}
                                  </small>
                                  <br />
                                  <small className="justify-content-center">
                                    {item.review}
                                  </small>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })
                      .reverse()
                  ) : (
                    <div class="comment-text">
                      <small style={{ color: "#0D826E" }}>
                        <strong>No Review</strong>
                      </small>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseReview;
