import React from "react";
import { useHistory } from "react-router";

const CreateAcourse = ({ profile }) => {
  document.title = "Fromhome | Create a Course";
  const history = useHistory();
  return (
    <>
      <section className="about container-fluid" id="about">
        <div class="row">
          <div className="col-md-6 mt-5 col-sm mx-auto text-center">
            <h6>Hi Tutor, Thank your for your interest in teaching with us!</h6>
            <h5 className="mt-3">Create a Course</h5>
            <i class="fad fa-books text-danger fa-3x"></i>
            <button
              onClick={() =>
                history.push("/dashboard/create-a-course/basic-details")
              }
              class="btn d-flex mx-auto mb-2"
              type="submit"
              disabled={profile.email_verified_at === null}
            >
              <b>
                <small>Proceed</small>
              </b>
            </button>
            <small
              style={{ cursor: "pointer" }}
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              <strong>
                Read more about creating a course{" "}
                <i
                  class="fal fa-long-arrow-right"
                  style={{ color: "#071B4D" }}
                ></i>
              </strong>
            </small>
          </div>
        </div>
      </section>

      {/* Details about creating a course */}
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog  modal-dialog-centered modal-dialog-scrollable modal-fullscreen">
          <div class="modal-content border-0" style={{ borderRadius: "20px" }}>
            <div class="modal-header border-0">
              <i
                class="fad fa-times-square"
                style={{ color: "#0D826E", fontSize: "25px" }}
                data-bs-dismiss="modal"
                aria-label="Close"
              ></i>
            </div>
            <div class="modal-body">
              <div className="container">
                <div className="row">
                  <div className="col mx-auto justify-content-center">
                    <p style={{ color: "#071B4D" }}>
                      <strong>
                        There are 4 stages it takes to successfully publish a
                        course.
                      </strong>
                    </p>
                    <p>
                      <strong>
                        <i
                          class="fa fa-check-circle me-2"
                          style={{ color: "#0D826E" }}
                        ></i>{" "}
                        STAGE 1: BASIC DETAILS
                      </strong>{" "}
                      <br />
                      <span>
                        <small>
                          These are the basic information about the course you
                          want to post, i.e the category it belongs to, the
                          title etc. <br />
                          <strong>*This stage is compulsory</strong>
                        </small>
                      </span>
                    </p>

                    <p>
                      <strong>
                        <i
                          class="fa fa-check-circle me-2"
                          style={{ color: "#0D826E" }}
                        ></i>{" "}
                        STAGE 2: COURSE SECTIONS
                      </strong>{" "}
                      <br />
                      <span>
                        <small>
                          At this stage, you provide all necessary sections the
                          course has for easy understanding of students. i.e
                          Course Title : How to Eat <br />
                          Course sections: Section 1. Basic Hygiene <br />
                          Section 2: Table manners etc. <br />
                          Your course must have at least a section <br />
                          <strong>*This stage is compulsory </strong>
                        </small>
                      </span>
                    </p>

                    <p>
                      <strong>
                        <i
                          class="fa fa-check-circle me-2"
                          style={{ color: "#0D826E" }}
                        ></i>{" "}
                        STAGE 3: COURSE VIDEOS
                      </strong>{" "}
                      <br />
                      <span>
                        <small>
                          This stage, you upload videos for each sections you’ve
                          created. You can upload as much as many videos you
                          want for easier understanding of students.
                          <br />
                          *N.B: -Provide a very clear and detailed video to make
                          your course stand out. <br />
                          - Each video should not be more than 40mb in size.{" "}
                          <br />
                          - We only support (mp4, mov) video formats. <br />
                          - Each section must have at least a video. <br />
                          - Your course will be published at on completion of
                          this stage as the next stage is not compulsory. <br />
                          <strong>*This stage is compulsory</strong>
                        </small>
                      </span>
                    </p>

                    <p>
                      <strong>
                        <i
                          class="fa fa-check-circle me-2"
                          style={{ color: "#0D826E" }}
                        ></i>{" "}
                        STAGE 4: COURSE FILES
                      </strong>{" "}
                      <br />
                      <span>
                        <small>
                          You can upload downloadable files for your course that
                          serves as attachments, i.e articles, important
                          informations etc.
                          <br />
                          *N.B: - We support (pdf, txt, zip) file format <br />
                          - Each file must not be more than 20mb in size. <br />
                          <strong>
                            *This stage is not compulsory, you can skip and
                            publish your course at this point.
                          </strong>
                        </small>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAcourse;
