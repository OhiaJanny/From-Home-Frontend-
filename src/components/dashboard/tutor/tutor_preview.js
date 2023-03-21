import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";
import { Baseurl, Mediaurl } from "../../baseurl";
import { useHistory } from "react-router";
import { useLocation } from "react-router";
import CourseReview from "../../landing_page/course_review";
import ReactPlayer from "react-player";

const TutorPreview = () => {
  document.title = "Fromhome | Tutor Preview";
  const { code } = useParams();
  const history = useHistory();
  const path = useLocation();
  const [section, setSection] = useState([]);
  const [title, setTitle] = useState("");
  const [stats, setStats] = useState("");
  const [videoUrl, setvideoUrl] = useState("");

  useEffect(() => {
    let token = sessionStorage.Token;
    if (token) {
      axios
        .get(`${Baseurl}tutorpreview`, {
          params: { code: code, token: token },
        })
        .then((res) => {
          if (res.data) {
            setSection(res.data.sections);
            setTitle(res.data.title);
            setStats(res.data.stats);
          }
        })
        .catch((error) => {
          if (error.response.status === 500) {
            sessionStorage.setItem("Path", path.pathname);
            history.push("/login");
          }
        });
    }
  }, [code, history, path.pathname]);

  const playVideo = (video) => {
    setvideoUrl(video);
    console.log(Mediaurl + videoUrl);
  };
  return (
    <>
      <section class="container-fluid mt-2">
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
              url={Mediaurl + videoUrl}
              width="100%"
              height="100%"
              controls={true}
              playing={true}
              playsinline={true}
            />
          </div>
          <div class="col-md-4  mt-3 px-0 accord-section" data-aos="fade-in">
            <small>
              <strong>📚 Tutor Preview</strong>
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
                    <strong>Stats</strong>
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
                    <strong>Reviews</strong>
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
                {section.length ? (
                  section.map((item, index) => {
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
                                aria-expanded="true"
                                aria-controls="collapseOne"
                                data-bs-target={`#${item.section_name
                                  .split(" ")
                                  .join("")}`}
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
                                          >
                                            <small className="text-capitalize">
                                              Attachment {index + 1}
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
                <div class="coupon p-3 bg-white">
                  <div class="row no-gutters">
                    <div class="col-md-4 border-right">
                      <div class="d-flex flex-column align-items-center">
                        🧑🏽‍🎓
                        <span class="d-block">
                          <small>Course</small>
                        </span>
                        <span class="text-black-50">
                          <small>Stats</small>
                        </span>
                      </div>
                    </div>
                    <div class="col-md-8">
                      <div>
                        <div class="d-flex flex-row justify-content-end off">
                          <h1>
                            {stats >= 1 ? <>{Math.round(100 / stats)}</> : 0}%
                          </h1>
                        </div>
                        <div class="d-flex flex-row justify-content-between off px-3 p-2">
                          <span>
                            <small>
                              <strong>No of Students:</strong>
                            </small>
                          </span>
                          <span class="border border-success px-3 rounded code">
                            <small>{stats}</small>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="tab-pane fade"
                id="pills-review"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                <CourseReview code={code} />
              </div>
              <div className="text-center mt-3">
                <Link
                  to={`/dashboard/created-courses/manage/edit-basic-details/${code}`}
                  style={{ color: "#071B4D" }}
                >
                  <small>
                    <strong>
                      <i
                        class="fad fa-tasks-alt"
                        style={{ color: "#0D826E" }}
                      ></i>{" "}
                      Manage Course
                    </strong>
                  </small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TutorPreview;
