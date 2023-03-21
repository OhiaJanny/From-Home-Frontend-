import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Navbar from "./navbar";
import Footer from "./footer";
import axios from "axios";
import { Baseurl } from "../baseurl";
import { useParams } from "react-router";
import { useLocation } from "react-router";
import { useHistory } from "react-router";
import ScriptTag from "react-script-tag/lib/ScriptTag";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Payment = () => {
  document.title = "Fromhome | Payment Page";
  const path = useLocation();
  const { id } = useParams();
  const history = useHistory();
  const [amount, setAmount] = useState("");

  useEffect(() => {
    let token = sessionStorage.Token;
    if (token) {
      axios
        .get(`${Baseurl}payment`, {
          params: { id: id, token: token },
        })
        .then((res) => {
          if (res.data) {
            if (res.data.status) {
              history.push("/cart");
            } else {
              setAmount(res.data);
            }
          }
        })
        .catch((error) => {
          if (error.response.status === 500) {
            sessionStorage.setItem("Path", path.pathname);
            history.push("/login");
          }
        });
    }
  }, [history, id, path.pathname]);
  return (
    <>
      <Navbar />
      <small>
        <ToastContainer />
      </small>
      <ScriptTag
        isHydrating={false}
        type="text/javascript"
        src="https://js.paystack.co/v1/inline.js"
      />
      <section className="about container-fluid mt-4" id="about">
        <div className="row">
          <div
            className="col-md-9 col-sm mx-auto"
            data-aos="fade-in"
            data-aos-delay="100"
          >
            <div class="login-card" style={{ borderRadius: "10px" }}>
              <img
                class="img-fluid"
                src="https://img.icons8.com/color/48/000000/mastercard-logo.png"
                alt="s"
              />
              <img
                class="img-fluid"
                src="https://img.icons8.com/color/48/000000/visa.png"
                alt="s"
              />{" "}
              <br />
              <small>
                <strong>Payment Page</strong>
              </small>
              <br />
              <small>
                <strong>
                  Do not bother to put your card details, just click pay.
                </strong>
              </small>
              <Formik
                initialValues={{ card: "", cvv: "", exp: "" }}
                validate={(values) => {
                  // const errors = {};
                  // if (!values.card) {
                  //   errors.card = '*Card number Required';
                  // } else if (!values.cvv) {
                  //   errors.cvv = '*CVV Required';
                  // } else if (!values.exp) {
                  //   errors.exp = '*Expiring Date Required';
                  // }
                  // return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    let handler = window.PaystackPop.setup({
                      key: "pk_test_2cae9d8b7a6ddd86baeeee57e44b2c8e2761da66", // Replace with your public key
                      amount: amount.amount * 100,
                      email: amount.email,
                      ref: id, // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
                      label: "course purchase",
                      onClose: function () {
                        history.push(path.pathname);
                      },
                      callback: function (response) {
                        axios({
                          method: "get",
                          url: `${Baseurl}verifypayment?reference=${response.reference}`,
                          responseType: "stream",
                        }).then(function (response) {
                          if (response.data === "success") {
                            setSubmitting(false);
                            toast("👍 Purchased", {
                              autoClose: 2000,
                            });
                            setTimeout(
                              () => history.push(`/receipt/${id}`),
                              2000
                            );
                            localStorage.removeItem("cart");
                          } else if (response.data === "failed") {
                            toast("✋ Transaction Failed", {
                              autoClose: 2000,
                            });
                          } else if (response.data === "error") {
                            toast("✋ Error", {
                              autoClose: 2000,
                            });
                          }
                        });
                      },
                    });
                    handler.openIframe();
                  }, 400);
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div class="row-1">
                      <div class="row row-2">
                        {" "}
                        <span id="login-card-inner">Card Number</span>{" "}
                      </div>
                      <div class="row row-2">
                        {" "}
                        <Field
                          type="number"
                          placeholder="Debit/Credit Card Number"
                          name="card"
                        />
                        <ErrorMessage
                          name="card"
                          component="small"
                          className="text-danger"
                        />
                      </div>
                    </div>

                    <div class="row-1">
                      <div class="row row-2">
                        {" "}
                        <span id="login-card-inner">CVV</span>{" "}
                      </div>
                      <div class="row row-2">
                        {" "}
                        <Field type="number" placeholder="CVV" name="cvv" />
                        <ErrorMessage
                          name="cvv"
                          component="small"
                          className="text-danger"
                        />
                      </div>
                    </div>

                    <div class="row-1">
                      <div class="row row-2">
                        {" "}
                        <span id="login-card-inner">Expiring Date</span>{" "}
                      </div>
                      <div class="row row-2">
                        {" "}
                        <Field type="date" placeholder="CVV" name="exp" />
                        <ErrorMessage
                          name="exp"
                          component="small"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <button
                      class="btn d-flex mx-auto mb-2"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      <strong>
                        {isSubmitting ? (
                          <i class="fas fa-spinner fa-spin"></i>
                        ) : (
                          ""
                        )}{" "}
                        Pay Now: ₦
                        {amount.amount ? (
                          amount.amount
                        ) : (
                          <i
                            class="fas fa-spinner fa-spin"
                            style={{ color: "#ffff" }}
                          ></i>
                        )}
                      </strong>
                    </button>
                    <small style={{ color: "#071B4D" }}>
                      <strong>Please note:</strong> This is a test payment, real
                      money will not be deducted from your account.
                    </small>
                  </Form>
                )}
              </Formik>
              <div className="mt-3 text-center">
                <small style={{ color: "#071B4D" }}>
                  <strong>Secured by:</strong>{" "}
                  <img
                    class="img-fluid"
                    src="/assets/img/paystack.png"
                    style={{ width: "18%" }}
                    alt="payment"
                  />
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

export default Payment;
