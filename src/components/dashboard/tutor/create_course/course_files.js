import axios from "axios";
import React, { useEffect, useState } from "react";
import { Baseurl } from "../../../baseurl";
import { useLocation } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const CourseFiles = () => {
  document.title = "Fromhome | Course Files";
  const history = useHistory();
  const path = useLocation();
  const [section, setSection] = useState([]);
  const [File, setFiles] = useState("");
  const [showloader, setShowloader] = useState(false);
  const [publish, setPublish] = useState(false);
  const [showFileError, setFileError] = useState(false);

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

  const handleFile = (e) => {
    setFiles(e.target.files[0]);
    setFileError(false);
  };

  const publishCourse = (e) => {
    setPublish(true);
    e.preventDefault();
    let token = sessionStorage.Token;
    let code = localStorage.code;
    if (token && code) {
      axios
        .post(`${Baseurl}publishcourse`, { token: token, code: code })
        .then((res) => {
          setPublish(false);

          if (res.data === "videoIncomplete") {
            toast("✋ One or more section has no video!", {
              autoClose: 2000,
            });
            setTimeout(
              () => history.push("/dashboard/create-a-course/videos"),
              2000
            );
          } else if (res.data === "published") {
            toast("👍 Course Succefully Published", {
              autoClose: 2000,
            });
            setTimeout(() => history.push("/dashboard/created-courses"), 2000);
            localStorage.removeItem("code");
          } else if (res.data === "alreadypublished") {
            toast("👍 Course Succefully Published", {
              autoClose: 2000,
            });
            setTimeout(() => history.push("/dashboard/created-courses"), 2000);
            localStorage.removeItem("code");
          } else if (res.data === "notverified") {
            toast("✋ Verify account to publish", {
              autoClose: 2000,
            });
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
                🔗<strong>Stage 3:</strong> Section File
              </p>
              <small>
                <strong>*File attachment is not compulsory</strong>
              </small>
              <br />
              <small className="text-danger">
                <strong>
                  *Supported formats (pdf, zip, txt) <br />
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
                                {item.no_of_files < 1 ? (
                                  <i class="fad fa-info-circle text-danger"></i>
                                ) : (
                                  <i class="fas fa-badge-check text-info"></i>
                                )}{" "}
                                {item.section_name}{" "}
                              </span>
                              <br />
                              <small>
                                No of File:<strong> {item.no_of_files}</strong>
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
                    <span id="login-card-inner">Section File</span>{" "}
                  </div>
                  <div class="row row-2">
                    <input
                      class="form-control form-control-sm mt-2"
                      id="formFileSm"
                      type="File"
                      onChange={handleFile}
                    />
                    {showFileError ? (
                      <small className="text-danger">
                        *Please choose a File
                      </small>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </form>
              <Formik
                initialValues={{ section: "", courseCode: "", token: "" }}
                validate={(values) => {
                  const errors = {};

                  if (!values.section) {
                    errors.section = "*Please choose a section for this File";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  if (File) {
                    setFileError(false);
                    setShowloader(true);
                    let token = sessionStorage.Token;
                    if (token) {
                      let formData = new FormData();
                      formData.append("File", File);
                      formData.append("token", token);
                      formData.append("section", values.section);

                      axios
                        .post(`${Baseurl}uploadfiles`, formData)
                        .then((res) => {
                          setShowloader(false);
                          if (res.data === "added") {
                            history.push("/dashboard/create-a-course/sections");
                            history.goBack();
                            setTimeout(
                              () =>
                                toast("👍 File added!", {
                                  autoClose: 2000,
                                }),
                              500
                            );
                          } else if (res.data === "fileFormatNotSUpported") {
                            toast("✋ File format not supported!", {
                              autoClose: 2000,
                            });
                          } else if (res.data === "nofile") {
                            toast("✋ No File!", {
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
                            toast("✋ File too large!", {
                              autoClose: 2000,
                            });
                          }
                        });
                    } else {
                      history.push("/dashboard/created-courses");
                    }
                  } else {
                    setFileError(true);
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div class="row-1">
                      <div class="row row-2">
                        {" "}
                        <span id="login-card-inner">Attach File to</span>
                      </div>

                      <div class="row row-2">
                        <Field
                          as="select"
                          name="section"
                          class="form-select form-select-sm mt-1"
                          aria-label=".form-select-sm example"
                        >
                          <option selected>This File belongs to?</option>
                          {section.map((item, index) => {
                            return (
                              <option
                                className="text-capitalize"
                                value={item.id}
                                key={index}
                              >
                                File({item.no_of_files}) {item.section_name}
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
                        <strong>Click to Add File</strong>
                      </small>
                    </button>
                  </Form>
                )}
              </Formik>
              <button class="btn d-flex mx-auto mb-2" onClick={publishCourse}>
                <b>
                  {" "}
                  {publish ? <i class="fas fa-spinner fa-spin"></i> : ""}
                  <small> Skip and Publish</small>
                </b>
              </button>
              <Link
                to="/dashboard/create-a-course/videos"
                style={{ cursor: "pointer" }}
              >
                <strong>
                  <small>
                    <i
                      class="fal fa-long-arrow-left"
                      style={{ color: "#0D826E" }}
                    ></i>{" "}
                    Edit Previous Stage{" "}
                  </small>
                </strong>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseFiles;
