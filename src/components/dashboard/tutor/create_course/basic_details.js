import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Persist } from "formik-persist";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router";

const BasicDetails = () => {
  document.title = "Fromhome | Course Basic Details";
  const history = useHistory();
  const [isSubmitting, setSubmitting] = useState(false);
  const CustomInputComponent = (props) => (
    <textarea className="my-custom-input" type="text" {...props} />
  );

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
              <p>
                📚<strong>Stage 1:</strong> Course Basic Details
              </p>
              <small>
                <strong>*Fill in all course basic details</strong>
              </small>
              <Formik
                initialValues={{
                  category: "",
                  title: "",
                  cost: 0,
                  desc: "",
                  sections: [],
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.category) {
                    errors.category = "*Category Required";
                  } else if (!values.title) {
                    errors.title = "*Course Titile Required";
                  } else if (values.cost === "") {
                    values.cost = 0;
                  } else if (!values.desc) {
                    errors.desc = "*Course Description Required";
                  } else if (values.desc.length < 10) {
                    errors.desc = "*Characters should be  10 long";
                  }

                  return errors;
                }}
                onSubmit={(values) => {
                  setSubmitting(true);
                  setTimeout(() => {
                    toast("👍 Course Details Saved!", {
                      autoClose: 2000,
                    });
                    setTimeout(
                      () => history.push("/dashboard/create-a-course/sections"),
                      2000
                    );
                  }, 400);
                }}
              >
                {() => (
                  <Form>
                    <div class="row-1">
                      <div class="row row-2">
                        {" "}
                        <span id="login-card-inner">Category</span>{" "}
                      </div>
                      <div class="row row-2">
                        <Field
                          as="select"
                          name="category"
                          class="form-select form-select-sm mt-1"
                          aria-label=".form-select-sm example"
                        >
                          <option selected>Choose a category</option>
                          <option value="Design">Design</option>
                          <option value="Marketing">Marketing</option>
                          <option value="IT and Software">
                            IT and Software
                          </option>
                          <option value="Photography">Photography</option>
                          <option value="Engineering">Engineering</option>
                          <option value="Agriculture">Agriculture</option>
                          <option value="Cryptocurrency">Cryptocurrency</option>
                        </Field>
                        <ErrorMessage
                          name="category"
                          component="small"
                          className="text-danger"
                        />
                      </div>
                    </div>

                    <div class="row-1">
                      <div class="row row-2">
                        {" "}
                        <span id="login-card-inner">Course Title</span>{" "}
                      </div>
                      <div class="row row-2">
                        {" "}
                        <Field
                          type="text"
                          placeholder="Course Title"
                          name="title"
                        />
                        <ErrorMessage
                          name="title"
                          component="small"
                          className="text-danger"
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
                        <Field
                          type="number"
                          placeholder="Course Cost"
                          name="cost"
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
                        <Field
                          as={CustomInputComponent}
                          placeholder="Course Description"
                          name="desc"
                        />
                        <ErrorMessage
                          name="desc"
                          component="small"
                          className="text-danger"
                        />
                      </div>
                    </div>

                    <button
                      class="btn d-flex mx-auto"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      <b>
                        {isSubmitting ? (
                          <i class="fas fa-spinner fa-spin"></i>
                        ) : (
                          ""
                        )}
                        <small> Save Details and Proceed</small>
                      </b>
                    </button>
                    <Persist name="course" />
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BasicDetails;
