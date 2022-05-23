import React from "react";
import Logo from "../../Assets/images/logo.png";
import { Link } from "react-router-dom";
import useRemoveModal from "../../Components/useRemoveModal";

function FAQ() {
  useRemoveModal();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light px-5 py-1 fixed-top white-bg">
        <Link className="navbar-brand" to="/">
          <img
            src={Logo}
            alt=""
            width="70"
            height="auto"
            className="d-inline-block align-text-top"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mr-2">
            <li className="nav-item px-3">
              <Link className="nav-link " aria-current="page" to="/">
                Home
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container" style={{ maxWidth: "80%" }}>
        <br />
        <br />
        <br />
        <br />
        <div className="row mt-5 p-5 faq-row">
          <h2 className="text-center">FAQ</h2>
          <div className="col-md-12 pt-4 pb-4">
            <h4 className="main-color">Is there any free demo classNamees?</h4>
            <p>Yes, there will be free practice papers. </p>

            <h4 className="main-color mt-5">
              For which standard the courses are available?{" "}
            </h4>
            <p>We provide guidance for CUET (UG) 2022. </p>

            <h4 className="main-color">Do I need to subscribe? </h4>
            <p>Yes , you need to subscribe for it. </p>

            <h4 className="main-color mt-5">
              How can we contact and report an error, if found?{" "}
            </h4>
            <p>
              BA student can contact to the team by the provided whatsapp number
              and also via email.
            </p>

            <h4 className="main-color mt-5">
              Is regional language available?{" "}
            </h4>
            <p>
              Yes, regional language paper like Bengali and Assamese are
              available.{" "}
            </p>

            <h4 className="main-color mt-5">
              Can the practice papers and video after the live classNamees be
              downloaded?
            </h4>
            <p>
              No. the practice paper cannot be downloaded. It can only be
              viewed.
              <br />
              Yes. It can be downloaded.{" "}
            </p>

            <h4 className="main-color mt-5">
              Can the subscription once made be cancelled?{" "}
            </h4>
            <p>No. Once the subscription is done it cannot be cancelled.</p>
          </div>
        </div>
      </div>

      <br />
      <footer className="footer mt-auto py-3 main-color-bg border-top">
        <div className="container text-center">
          <span className="white">
            Copyrights &#169; 2022 BESST(Brahmaputra Exam Success Support Team){" "}
          </span>
        </div>
      </footer>
    </>
  );
}

export default FAQ;
