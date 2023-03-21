import axios from "axios";
import React, { useEffect, useState } from "react";
import { Baseurl } from "../../../baseurl";
import { useLocation } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Skeleton from "react-loading-skeleton";
import { useHistory } from "react-router";

const CourseVideos = () => {
  document.title = "Fromhome | Course Videos";
  const history = useHistory();
  const path = useLocation();
  const [section, setSection] = useState([]);
  const [video, setVideo] = useState("");
  const [showloader, setShowloader] = useState(false);
  const [publish, setPublish] = useState(false);
  const [showVideoError, setVideoError] = useState(false);

  useEffect(() => {
    localStorage.removeItem("course");
    if (localStorage.code) {
      if (sessionStorage.Token) {
        axios
          .get(`${Baseurl}getsections`, {
            params: {
              code: localStorage.code,
              token: sessionStorage.Token,
            },
          })
          .then((res) => {
            if (res.data === "noCourseFound") {
              localStorage.removeItem("code");
              toast("✋ Course not found", {
                autoClose: 2000,
              });
              setTimeout(() => history.goBack(), 2000);
            } else {
              setSection(res.data);
            }
          })
          .catch((error) => {
            if (error) {
              if (error.response.status === 500) {
                sessionStorage.setItem("Path", path.pathname);
                history.push("/login");
              }
            }
          });
      } else {
        history.push("/login");
        sessionStorage.setItem("Path", path.pathname);
      }
    } else {
      history.push("/dashboard/created-courses");
    }
  }, [history, path.pathname]);

  const handleVideo = (e) => {
    setVideo(e.target.files[0]);
    setVideoError(false);
  };

  const saveVideos = (e) => {
    setPublish(true);
    e.preventDefault();
    let token = sessionStorage.Token;
    let code = localStorage.code;
    if (token && code) {
      axios
        .post(`${Baseurl}savevideos`, { token: token, code: code })
        .then((res) => {
          setPublish(false);
          if (res.data === "videoIncomplete") {
            toast("✋ One or more section has no video!", {
              autoClose: 2000,
            });
          } else if (res.data === "videocomplete") {
            toast("👍 Videos succefully uploaded", {
              autoClose: 2000,
            });
            setTimeout(
              () => history.push("/dashboard/create-a-course/files"),
              2000
            );
          }
        });
    }
  };

  return (
    <>
      <section className="about container-fluid mt-3" id="about">
        <small>
          <ToastContainer />
        </small>
        <div className="row">
          <div
            className="col-lg-9 col-sm mx-auto"
            data-aos="fade-in"
            data-aos-delay="100"
          >
            <div class="login-card" style={{ borderRadius: "10px" }}>
              <img src="assets/img/logo.png" alt="" /> <br />
              <p>
                🔗<strong>Stage 3:</strong> Section Videos
              </p>
              <small>
                <strong>*Add at least a video to each section</strong>
              </small>
              <br />
              <small className="text-danger">
                <strong>
                  *Supported formats (mp4, mov) <br />
                  *Size should be 40MB or less.
                </strong>
              </small>
              {section.length ? (
                <div class="row-1 mt-3">
                  <div class="row row-2">
                    {" "}
                    <span id="login-card-inner">
                      <i
                        class="fad fa-info-circle"
                        style={{ color: "#0D826E" }}
                      ></i>{" "}
                      All Sections ({section.length})
                    </span>{" "}
                  </div>
                  <div className="row">
                    {section.map((item, index) => {
                      return (
                        <div
                          className="col-md-6 col-sm-5 mx-auto py-2 text-center"
                          key={index}
                        >
                          <small>
                            <strong>Section {index + 1}</strong>
                          </small>
                          <div className="mb-2 py-1 text-light section-loop">
                            <small className="pt-2">
                              <span className="text-capitalize">
                                {item.no_of_videos < 1 ? (
                                  <i class="fad fa-info-circle text-danger"></i>
                                ) : (
                                  <i class="fas fa-badge-check text-info"></i>
                                )}{" "}
                                {item.section_name}{" "}
                              </span>
                              <br />
                              <small>
                                No of Videos:
                                <strong> {item.no_of_videos}</strong>
                              </small>
                            </small>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div class="row-1">
                  <div className="row">
                    <div className="col-md-6 col-sm-5 mx-auto py-2 text-center">
                      <Skeleton count={1} />
                    </div>
                    <div className="col-md-6 col-sm-5 mx-auto py-2 text-center">
                      <Skeleton count={1} />
                    </div>
                  </div>
                </div>
              )}
              <form>
                <div class="row-1">
                  <div class="row row-2">
                    {" "}
                    <span id="login-card-inner">Section Video</span>{" "}
                  </div>
                  <div class="row row-2">
                    <input
                      class="form-control form-control-sm mt-2"
                      id="formFileSm"
                      type="file"
                      onChange={handleVideo}
                    />
                    {showVideoError ? (
                      <small className="text-danger">
                        *Please choose a file
                      </small>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </form>
              <Formik
                initialValues={{
                  videoName: "",
                  section: "",
                  courseCode: "",
                  token: "",
                }}
                validate={(values) => {
                  const errors = {};

                  if (!values.videoName) {
                    errors.videoName = "*Add a Video Name ";
                  } else if (!values.section) {
                    errors.section = "*Please choose a section for this file";
                  }

                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  if (video) {
                    setVideoError(false);
                    setShowloader(true);
                    let token = sessionStorage.Token;
                    if (token) {
                      let formData = new FormData();
                      formData.append("video", video);
                      formData.append("token", token);
                      formData.append("section", values.section);
                      formData.append("videoName", values.videoName);

                      axios
                        .post(`${Baseurl}uploadvideos`, formData)
                        .then((res) => {
                          setShowloader(false);
                          if (res.data === "added") {
                            history.push("/dashboard/create-a-course/files");
                            history.goBack();
                            setTimeout(
                              () =>
                                toast("👍 Video added!", {
                                  autoClose: 2000,
                                }),
                              500
                            );
                          } else if (res.data === "videoFormatNotSUpported") {
                            toast("✋ Video format not supported!", {
                              autoClose: 2000,
                            });
                          } else if (res.data === "novideo") {
                            toast("✋ No Video!", {
                              autoClose: 2000,
                            });
                          }
                        })
                        .catch((error) => {
                          setShowloader(false);
                          if (error.response.status === 500) {
                            sessionStorage.setItem("Path", path.pathname);
                            history.push("/login");
                          } else if (error.response.status === 413) {
                            toast("✋ Video too large!", {
                              autoClose: 2000,
                            });
                          }
                        });
                    } else {
                      history.push("/dashboard/created-courses");
                    }
                  } else {
                    setVideoError(true);
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div class="row-1">
                      <div class="row row-2">
                        {" "}
                        <span id="login-card-inner">Video Name</span>{" "}
                      </div>
                      <div class="row row-2">
                        {" "}
                        <Field
                          type="text"
                          placeholder="Video Name"
                          name="videoName"
                        />
                        <ErrorMessage
                          name="videoName"
                          component="small"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div class="row-1">
                      <div class="row row-2">
                        {" "}
                        <span id="login-card-inner">Attach video to</span>
                      </div>

                      <div class="row row-2">
                        <Field
                          as="select"
                          name="section"
                          class="form-select form-select-sm mt-1"
                          aria-label=".form-select-sm example"
                        >
                          <option selected>This Video belongs to?</option>
                          {section.map((item, index) => {
                            return (
                              <option
                                className="text-capitalize"
                                value={item.id}
                                key={index}
                              >
                                videos({item.no_of_videos}) {item.section_name}
                              </option>
                            );
                          })}
                        </Field>
                        <ErrorMessage
                          name="section"
                          component="small"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <button
                      className="border-0 bg-transparent outline-0"
                      style={{ color: "#0D826E", cursor: "pointer" }}
                      type="submit"
                    >
                      {" "}
                      {showloader ? (
                        <i
                          class="fas fa-spinner fa-spin"
                          style={{ color: "#071B4D" }}
                        ></i>
                      ) : (
                        <i
                          class="fad fa-plus-square"
                          style={{ color: "#071B4D" }}
                        ></i>
                      )}{" "}
                      <small>
                        <strong>Click to Add Video</strong>
                      </small>
                    </button>
                  </Form>
                )}
              </Formik>
              <button class="btn d-flex mx-auto mb-2" onClick={saveVideos}>
                <b>
                  {" "}
                  {publish ? <i class="fas fa-spinner fa-spin"></i> : ""}
                  <small> Save and Continue</small>
                </b>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseVideos;
