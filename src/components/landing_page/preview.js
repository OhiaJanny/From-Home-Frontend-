import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import { useParams } from "react-router";
import axios from "axios";
import { Baseurl, Mediaurl } from "../baseurl";
import Skeleton from "react-loading-skeleton";
import Footer from "./footer";
import { useHistory } from "react-router";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router";
import { CircleProgress } from "react-gradient-progress";
import ReactPlayer from "react-player";

const Preview = () => {
  document.title = "Fromhome | Course Preview";
  const path = useLocation();
  const history = useHistory();
  const { code } = useParams();
  const [sections, setSections] = useState([]);
  const [videoUrl, setvideoUrl] = useState("");
  const [note, setNote] = useState();
  const [show, setShow] = useState(false);
  const [showNote, setShowNote] = useState("");
  const [review, setReview] = useState("");
  const [title, setTitle] = useState("");
  const [courseProgress, setCourseProgress] = useState("");

  useEffect(() => {
    let token = sessionStorage.Token;
    if (token) {
      axios
        .get(`${Baseurl}coursepreview`, {
          params: { code: code, token: token },
        })
        .then((res) => {
          if (res.data.section) {
            setSections(res.data.section.sections);
            setTitle(res.data.section.title);
            setCourseProgress(res.data.section.progress);
          } else if (res.data.access) {
            history.push(`/course-details/${code}`);
          }
        })
        .catch((error) => {
          if (error.response.status === 500) {
            sessionStorage.setItem("Path", path.pathname);
            history.push("/");
          }
        });
    }
  }, [code, history, path.pathname]);

  useEffect(() => {
    let token = sessionStorage.Token;
    axios
      .get(`${Baseurl}getnote`, {
        params: { code: code },
        headers: {
          Authorization: "Bearer" + token,
        },
      })
      .then((res) => {
        if (res.data) {
          setShowNote(res.data);
        }
      });
  }, [code]);

  const playVideo = (video) => {
    console.log(video);
    setvideoUrl(video);

    //update progress
    let token = sessionStorage.Token;
    axios
      .post(
        `${Baseurl}progress`,
        { code: code, video: video },
        {
          headers: {
            Authorization: "Bearer" + token,
          },
        }
      )
      .then((res) => {});
  };

  const saveNote = () => {
    if (note) {
      let token = sessionStorage.Token;
      setShow(true);
      axios
        .post(
          `${Baseurl}savenote`,
          { note: note, code: code },
          {
            headers: {
              Authorization: "Bearer" + token,
            },
          }
        )
        .then((res) => {
          if (res.data === "saved") {
            setShow(false);
            toast("👍 Note Saved", {
              autoClose: 2000,
            });
          }
        });
    } else {
      toast("✋ Note Empty", {
        autoClose: 2000,
      });
    }
  };

  const clearNote = () => {
    let token = sessionStorage.Token;
    setShowNote("");
    axios.post(
      `${Baseurl}clearnote`,
      { code: code },
      {
        headers: {
          Authorization: "Bearer" + token,
        },
      }
    );
  };

  const dropReview = (e) => {
    setReview(e.target.value);
  };

  const sendReview = (e) => {
    e.preventDefault();
    if (review) {
      setShow(true);
      let token = sessionStorage.Token;
      axios
        .post(
          `${Baseurl}sendreview`,
          { code: code, review: review },
          {
            headers: {
              Authorization: "Bearer" + token,
            },
          }
        )
        .then((res) => {
          setShow(false);
          if (res.data === "sent") {
            toast("👍 Review Sent", {
              autoClose: 2000,
            });
          } else {
            toast("👍 Review Sent", {
              autoClose: 2000,
            });
          }
        });
    } else {
      setShow(false);
      toast("✋ Type your review", {
        autoClose: 2000,
      });
    }
  };

  const download = (url) => {
    const link = document.createElement("a");
    link.href = Mediaurl + url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Navbar />
      <section class="container-fluid mt-2">
        <small>
          <ToastContainer />
        </small>
        <small className="text-capitalize">
          <strong>
            📺{" "}
            {title ? (
              title
            ) : (
              <i
                class="fas fa-spinner fa-spin"
                style={{ color: "#0D826E" }}
              ></i>
            )}
          </strong>
        </small>
        <div class="row mx-auto">
          <div
            class="col-md-8 align-items-center vid-cont mt-2"
            data-aos="fade-in"
          >
            <ReactPlayer
              className="react-player"
              url={videoUrl}
              width="100%"
              height="100%"
              controls={true}
              playing={true}
              playsinline={true}
            />
          </div>

          <div class="col-md-4  mt-3 px-0 accord-section" data-aos="fade-in">
            <small>
              <strong>📚 Course Preview</strong>
            </small>
            <ul
              class="nav nav-pills p-2  justify-content-center"
              id="pills-tab"
              role="tablist"
            >
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  <small>
                    <strong>Sections</strong>
                  </small>
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  <small>
                    <strong>Note</strong>
                  </small>
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-review"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  <small>
                    <strong>Review</strong>
                  </small>
                </button>
              </li>
            </ul>

            <div class="tab-content" id="pills-tabContent">
              <div
                class="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                {sections.length ? (
                  sections.map((item, index) => {
                    return (
                      <>
                        <div
                          class="accordion"
                          id="accordionExample"
                          key={index}
                        >
                          <div class="accordion-item">
                            <h2 class="accordion-header" id="headingOne">
                              <button
                                class="accordion-button fw-bold text-white border-0 rounded-0"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#${item.section_name
                                  .split(" ")
                                  .join("")}`}
                                aria-expanded="true"
                                aria-controls="collapseOne"
                              >
                                <small className="text-capitalize">
                                  {item.section_name}
                                </small>
                              </button>
                            </h2>
                            <div
                              id={item.section_name.split(" ").join("")}
                              class="accordion-collapse  collapse"
                              aria-labelledby="headingOne"
                              data-bs-parent="#accordionExample"
                            >
                              <div class="accordion-body bg-secondary py-0">
                                {/* videos */}
                                <div class="row align-items-center course-part py-2">
                                  {item.no_of_videos.map((video, index) => {
                                    return (
                                      <>
                                        <div
                                          class="col-2"
                                          onClick={() =>
                                            playVideo(video.video_url)
                                          }
                                        >
                                          <i
                                            class="fad fa-play"
                                            style={{ color: "#071B4D" }}
                                          ></i>
                                        </div>
                                        <div
                                          class="col-7 text-wrap"
                                          key={index}
                                        >
                                          <small className="text-capitalize">
                                            {video.video_name}
                                          </small>
                                        </div>
                                        <div class="col-3">
                                          <small>
                                            <strong>{video.play_time}m</strong>
                                          </small>
                                        </div>
                                      </>
                                    );
                                  })}
                                </div>
                                {/* attachements */}
                                {item.no_of_files.length ? (
                                  <div class="row align-items-center course-part py-2">
                                    <small style={{ color: "#0D826E" }}>
                                      <strong>
                                        <i class="fad fa-link"></i> Attachments
                                      </strong>
                                    </small>
                                    {item.no_of_files.map((file, index) => {
                                      return (
                                        <>
                                          <div
                                            class="col-7 text-wrap"
                                            key={index}
                                            onClick={() =>
                                              download(file.file_url)
                                            }
                                          >
                                            <small className="text-capitalize">
                                              <i
                                                class="fad fa-download"
                                                style={{ color: "#071B4D" }}
                                              ></i>{" "}
                                              Download Attachment
                                            </small>
                                          </div>
                                        </>
                                      );
                                    })}
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })
                ) : (
                  <div class="accordion mt-2">
                    <Skeleton count={3} />
                  </div>
                )}
              </div>
              <div
                class="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                <CKEditor
                  editor={ClassicEditor}
                  data={showNote}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setNote(data);
                  }}
                />

                <small
                  onClick={clearNote}
                  className="text-danger"
                  style={{ fontSize: "12px", cursor: "pointer" }}
                >
                  <i class="fad fa-trash"></i>
                  <strong> Clear Note</strong>
                </small>

                <button
                  class="btn d-flex mx-auto"
                  onClick={saveNote}
                  disabled={show}
                >
                  <b>
                    <small>
                      {show ? <i class="fas fa-spinner fa-spin"></i> : ""} Save
                      Note
                    </small>
                  </b>
                </button>
              </div>

              <div
                class="tab-pane fade"
                id="pills-review"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                <form onSubmit={sendReview}>
                  <div class="row-1">
                    <div class="row row-2">
                      {" "}
                      <span id="login-card-inner">Drop a Review</span>{" "}
                    </div>
                    <div class="row row-2">
                      <textarea onChange={dropReview} />
                    </div>
                  </div>
                  <button
                    class="btn d-flex mx-auto"
                    type="submit"
                    disabled={show}
                  >
                    <b>
                      <small>
                        {show ? <i class="fas fa-spinner fa-spin"></i> : ""}{" "}
                        Send Review
                      </small>
                    </b>
                  </button>
                </form>
              </div>
              <div className="text-center mt-3">
                <CircleProgress
                  percentage={courseProgress}
                  strokeWidth={8}
                  width={100}
                />
                <small style={{ color: "#071B4D" }}>
                  <strong>Your Progress, Welldone!</strong>
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Preview;
