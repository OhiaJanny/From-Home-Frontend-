import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router";
import axios from "axios";
import { Baseurl } from "../../../baseurl";
import { useParams } from "react-router";
import { useRef } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const ManageBasicDetails = () => {
  const history = useHistory();
  const { code } = useParams();
  const [isSubmitting, setSubmitting] = useState(false);
  const [details, setDetails] = useState({});
  const [section, setSection] = useState([]);
  const [showError, setShowError] = useState(false);
  const path = useLocation();

  useEffect(() => {
    axios
      .get(`${Baseurl}coursedetails`, {
        params: { code: code },
      })
      .then((res) => {
        if (res.data) {
          setDetails(res.data.details);
          setSection(res.data.sections);
        }
      })
      .catch((error) => {
        if (error.response.status === 500) {
          sessionStorage.setItem("Path", path.pathname);
          history.push("/login");
        }
      });
  }, [code, history, path.pathname]);

  const title = useRef();
  const cost = useRef();
  const desc = useRef();

  const editDetails = (e) => {
    e.preventDefault();
    setSubmitting(true);
    let token = sessionStorage.Token;
    if (desc.current.value.length > 224) {
      details.course_title = title.current.value;
      details.course_cost = cost.current.value;
      details.description = desc.current.value;
      axios
        .post(`${Baseurl}editbasicdetails`, details, {
          headers: {
            Authorization: "Bearer" + token,
          },
        })
        .then((res) => {
          setSubmitting(false);
          if (res.data === "updated") {
            history.push("/dashboard/created-courses");
            history.goBack();
            setTimeout(
              () =>
                toast("👍 Course Updated!", {
                  autoClose: 2000,
                }),
              500
            );
          }
        })
        .catch((error) => {
          setSubmitting(false);
          if (error.response.status === 500) {
            sessionStorage.setItem("Path", path.pathname);
            history.push("/login");
          }
        });
    } else {
      setSubmitting(false);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const editSections = () => {
    localStorage.setItem("sections", JSON.stringify(section));
    history.push(`/dashboard/created-courses/manage/edit-sections/${code}`);
    axios.post(`${Baseurl}coursestatus`, { code: code }).then((res) => {});
  };

  return (
    <>
      <section className="about container-fluid mt-3" id="about">
        <small>
          <ToastContainer />
        </small>
        <div className="row">
          <div
            className="col-md-9 col-sm mx-auto"
            data-aos="fade-in"
            data-aos-delay="100"
          >
            <div class="login-card" style={{ borderRadius: "10px" }}>
              <Link
                to={`/dashboard/tutor-preview/${code}`}
                style={{ color: "#0D826E", cursor: "pointer" }}
              >
                <strong>
                  <small>Preview Course</small>
                </strong>
              </Link>
              <p className="mt-2">📚 Course Manager</p>
              <small>
                <strong>
                  <i class="fad fa-edit" style={{ color: "#071B4D" }}></i>*Edit
                  course basic details
                </strong>
              </small>
              <form onSubmit={editDetails}>
                <div class="row-1">
                  <div class="row row-2">
                    {" "}
                    <span id="login-card-inner">Category</span>{" "}
                  </div>
                  <div class="row row-2">
                    <select
                      name="category"
                      class="form-select form-select-sm mt-1"
                      aria-label=".form-select-sm example"
                      value={details.category}
                      disabled
                    >
                      <option selected>Choose a category</option>
                      <option value="Design">Design</option>
                      <option value="Marketing">Marketing</option>
                      <option value="IT and Software">IT and Software</option>
                      <option value="Photography">Photography</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Agriculture">Agriculture</option>
                      <option value="Cryptocurrency">Cryptocurrency</option>
                    </select>
                    <small className="text-danger">
                      <i class="fad fa-info-circle"></i>You can't change this
                    </small>
                  </div>
                </div>

                <div class="row-1">
                  <div class="row row-2">
                    {" "}
                    <span id="login-card-inner">Course Title</span>{" "}
                  </div>
                  <div class="row row-2">
                    <input
                      type="text"
                      placeholder="Course Title"
                      name="title"
                      defaultValue={details.course_title}
                      ref={title}
                    />
                  </div>
                </div>

                <div class="row-1">
                  <div class="row row-2">
                    {" "}
                    <span id="login-card-inner">Course Cost</span>{" "}
                  </div>
                  <div class="row row-2">
                    {" "}
                    <input
                      type="number"
                      placeholder="Course Cost"
                      name="cost"
                      defaultValue={details.course_cost}
                      ref={cost}
                    />
                    <small style={{ color: "#0D826E" }}>
                      <strong>*Leave blank if not for profit</strong>
                    </small>
                  </div>
                </div>

                <div class="row-1">
                  <div class="row row-2">
                    {" "}
                    <span id="login-card-inner">Description</span>{" "}
                  </div>
                  <div class="row row-2">
                    <input
                      placeholder="Course Description"
                      name="desc"
                      defaultValue={details.description}
                      ref={desc}
                    />
                    {showError ? (
                      <small className="text-danger">
                        *Characters should be 224 long
                      </small>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <button
                  class="btn d-flex mx-auto"
                  type="submit"
                  disabled={isSubmitting}
                >
                  <b>
                    {isSubmitting ? <i class="fas fa-spinner fa-spin"></i> : ""}
                    <small> Update Details and Publish</small>
                  </b>
                </button>
              </form>
              <p
                onClick={editSections}
                style={{ cursor: "pointer", color: "#0D826E" }}
              >
                <strong>
                  <small>
                    <i
                      class="fal fa-long-arrow-right"
                      style={{ color: "#0D826E" }}
                    ></i>{" "}
                    Edit Course Sections, Videos, Files
                  </small>
                </strong>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ManageBasicDetails;
