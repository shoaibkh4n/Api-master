import React, { useEffect, useState } from "react";
import Logo from "../../Assets/images/logo.png";
import carousel1 from "../../Assets/images/hero-carousel-2.png";
import about from "../../Assets/images/about.png";
import exam from "../../Assets/images/exam.png";
import tenth from "../../Assets/images/10th.png";
import counselling from "../../Assets/images/counselling.png";
import twelvth from "../../Assets/images/12th.png";
import student from "../../Assets/images/students.png";
import classname1 from "../../Assets/images/class.png";
import map from "../../Assets/images/map.png";
import courses from "../../Assets/images/course.png";
import teacher from "../../Assets/images/teachers.png";
import mcq from "../../Assets/images/mcq.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "../../Components/Header";

function Landing() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [course, setCourse] = useState("");
  const [statistics, setStatistics] = useState([]);
  const [studentSpeak, setStudentSpeak] = useState([]);
  const [courseDetails, setCourseDetails] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState("");

  useEffect(() => {
    axios
      .post(
        "http://97.74.90.132:8082/df/statistics",
        {},
        {
          headers: {
            "Acces-Control-Allow-Origin": "*",
            Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
          },
        }
      )
      .then((response) => {
        console.log("response", response.status);
        if (response.status === 200) {
          setStatistics(response.data.Data);
        }
      });
  }, []);

  useEffect(() => {
    axios
      .post(
        "http://97.74.90.132:8082/df/studentSpeak",
        {},
        {
          headers: {
            "Acces-Control-Allow-Origin": "*",
            Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
          },
        }
      )
      .then((response) => {
        console.log("response", response.data.ResultCode);
        if (response.status === 200) {
          setStudentSpeak(response.data.Data);
        }
      });
  }, []);

  const onRegister = () => {
    setLoading(true);
    axios
      .post(
        "http://97.74.90.132:8082/df/userRegDetails",
        {
          "title": "Registration",
          "firstName": firstName,
          "lastName": lastName,
          "email": email,
          "password": password,
          "number": mobile,
          "whatsappNumber": whatsappNumber,
          "course": JSON.parse(course),
        },
        {
          headers: {
            "Acces-Control-Allow-Origin": "*",
            Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
          },
        }
      )
      .then((response) => {
        setLoading(false);
        setRegisterSuccess("green");
        if (response.data.ResultCode != 200) {
          setRegisterSuccess("red");
        } else {
          setRegisterSuccess("green");
        }
        if (response.data.ResultCode === 200) {
          alert(response.data.ResultMessage);

          document.getElementById("registerModal").classList.remove("show");
          // window.location.reload()
        } else {
          alert(response.data.ResultMessage);
        }
      })
      .catch((e) => {
        alert(e);
        setLoading(false);
      });
  };

  const onRegisterClick = () => {
    setLoading(true);
    axios
      .post(
        "http://97.74.90.132:8082/df/coursesAndTopics/",{
          "courseId" : "1"
        },
        {
          headers: {
            "Acces-Control-Allow-Origin": "*",
            Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
          },
        }
      )
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          console.log("items",response.data)
          setCourseDetails(response.data.Data)
          // window.location.reload()
        } else {
          setCourseDetails([]);
        }
      })
      .catch((e) => {
        setCourseDetails([]);
        setLoading(false);
      });
  };
  useEffect(() => {
    if (Cookies.get("token") !== null) {
      axios
        .post(
          "http://97.74.90.132:8082/profileData",
          {
            email: Cookies.get("email"),
          },
          {
            headers: {
              "Acces-Control-Allow-Origin": "*",
              Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
              Authorization: `${Cookies.get("token")}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            setProfileData(response.data.Data);
          }
        });
    }
  }, []);

  const onLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://97.74.90.132:8082/wl/loginDtls", {
        username: email,
        password: password,
      })
      .then((response) => {
        console.log(response.status);
        console.log(response.data.status);
        console.log("response", response.data.result.userLoginResBean.email);
        if (response.status == 200) {
          Cookies.set("token", `Bearer ${response.data.result.token}`);
          Cookies.set("email", response.data.result.userLoginResBean.email);
          Cookies.set("userId", response.data.result.userLoginResBean.userId);
          // alert(response.data.message);
          setLoading(false);
          history("/studentDashboard");
        }
      })
      .catch((e) => {
        alert(e);
        setLoading(false);
      });
  };

  return (
    <>
      {Cookies.get("token") ? (
        <Header profileData={profileData} />
      ) : (
        <nav className="navbar navbar-expand-lg navbar-light px-5 py-1 fixed-top white-bg">
          <a className="navbar-brand" href="#">
            <img
              src={Logo}
              alt=""
              width="70"
              height="auto"
              className="d-inline-block align-text-top"
            />
          </a>
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
                <a className="nav-link " aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item px-3">
                <a className="nav-link" href="#about">
                  About Us
                </a>
              </li>
              <li className="nav-item px-3">
                <a className="nav-link" href="#services">
                  Services
                </a>
              </li>
              <li className="nav-item px-3">
                <a className="nav-link" href="#news">
                  News
                </a>
              </li>
              <li className="nav-item px-3">
                <a className="nav-link" href="#student">
                  Student Speak
                </a>
              </li>
              <li className="nav-item px-3">
                <a className="nav-link" href="#student">
                  Data
                </a>
              </li>
              <li className="nav-item px-3">
                <a className="nav-link" href="#contact">
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  className="btn main-btn px-3 ml-4"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#loginModal"
                  href="#"
                >
                  {loading ? "Please Wait.." : "Login"}
                </a>
              </li>
            </ul>
          </div>
        </nav>
      )}
      <div className="container">
        <br />
        <div className="row flex-lg-row-reverse align-items-center g-5 pt-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              // hero carousel
              src={carousel1}
              className="d-block mx-lg-auto img-fluid"
              alt="Bootstrap Themes"
              loading="lazy"
              width="700"
              height="500"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-normal lh-1 mb-3 dark-grey ">
              Welcome to,{" "}
            </h1>
            <h3>Brahmaputra Exam Success Support Team</h3>
            <h4 className="main-color">LAUNCHING SOON... </h4>
            <p>
              {" "}
              Click below to explore more or register yourself to be a part of
              BESST family.{" "}
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <button
                type="button"
                className="btn main-btn  px-4 me-md-2"
                data-bs-toggle="modal"
                data-bs-target="#registerModal"
                onClick={() => onRegisterClick()}
              >
                Register
              </button>
              <a
                type="button"
                className="btn btn-outline-secondary  px-4"
                href="#about"
              >
                Explore
              </a>
            </div>
          </div>
        </div>
      </div>

      <section id="about">
        <br />
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col-md-12 ">
            {" "}
            <h4 className="m-5 underline">A B O U T &nbsp;&nbsp; U S</h4>
          </div>
          <div className="col-md-6 col-sm-12">
            <img
              // about svg
              src={about}
              className="d-block mx-lg-auto img-fluid p-5"
              alt="Bootstrap Themes"
              loading="lazy"
              width="700"
              height="500"
            />
          </div>
          <div className="col-md-6 col-sm-12 pt-5">
            <h3 className="main-color">What is BESST?</h3>
            <h5>
              BESST (BRAHMAPUTRA EXAM SUCCESS SUPPORT TEAM) It is an educational
              / online platform consisting of experienced teachers all over the
              country for helping students to have hands on online test starting
              with CUET(UG) 2022.It will provide mock test/ practice test and
              live classes. This platform will help students to excel in
              competitive exams.
            </h5>

            <h3 className="main-color mt-5">How does BESST help students?</h3>
            <h5>
              BESST partners with teachers and faculties having better
              experience of helping students score to their fullest. It has a
              simulation platform wherein students can access notes by
              specialised teachers, guidance of previous year's toppers,
              practice sessions.{" "}
            </h5>
          </div>
        </div>
      </section>

      <section id="services">
        <br />
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col-md-12">
            {" "}
            <h4 className="m-5 underline">S E R V I C E S</h4>
          </div>
          <div className="col-md-4 col-sm-12 p-4">
            <div className="card">
              <img src={exam} height="60px" width="60px" />
              <h5 className="mb-2 dark-grey">CUET Entrance</h5>
              <p>Central University Entrance Test Support</p>
            </div>
          </div>
          <div className="col-md-4 col-sm-12 p-4">
            <div className="card">
              <img src={counselling} height="60px" width="60px" />
              <h5 className="mb-2 dark-grey">Online counselling</h5>
              <p> Counselling for admissions</p>
            </div>
          </div>
          <div className="col-md-4 col-sm-12 p-4">
            <div className="card">
              <img src={tenth} height="60px" width="65px" />
              <h5 className="mb-2 dark-grey">SEBA Board</h5>
              <p> 10th Board Exam</p>
            </div>
          </div>
          <div className="col-md-4 col-sm-12 p-4">
            <div className="card">
              <img src={twelvth} height="60px" width="90px" />
              <h5 className="mb-2 dark-grey">AHSEC Board</h5>
              <p> 12th Board Exam</p>
            </div>
          </div>
          <div className="col-md-4 col-sm-12 p-4">
            <div className="card">
              <img src={classname1} height="60px" width="60px" />
              <h5 className="mb-2 dark-grey">Online classNamees</h5>
              <p> classNamees for all subject</p>
            </div>
          </div>
          <div className="col-md-4 col-sm-12 p-4">
            <div className="card">
              <img src={student} height="60px" width="60px" />
              <h5 className="mb-2 dark-grey">Other Competitive Exams</h5>
              <p>Competitive Exams</p>
            </div>
          </div>
        </div>
      </section>

      {/* <section id="news">
        <br />
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col-md-12 ">
            {" "}
            <h4 className="m-5 underline">
              N E W S &nbsp; &nbsp;
              <span className="badge bg-danger">Latest</span>
            </h4>
          </div>
          <div className="row faq-row">
            <ul className="p-4">
              <li className="pb-2">
                News number one.{" "}
                <a data-bs-toggle="modal" data-bs-target="#newsModal" href="">
                  Show
                </a>
              </li>
              <li className="pb-2">
                News number two <a href="#">Show</a>
              </li>
              <li>
                News number three <a href="#">Show</a>
              </li>
            </ul>
          </div>
        </div>
      </section> */}

      <section id="student">
        <br />
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col-md-6">
            {" "}
            <h4 className="m-5 underline">
              S T U D E N T S &nbsp;&nbsp; S P E A K
            </h4>
          </div>
          {console.log("student", studentSpeak)}
          <div className="col-md-6">
            <div id="demo" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                {studentSpeak.map((item, i) => {
                  return (
                    <div className="carousel-item active" key={i}>
                      <div className="card d-block card-write " key={item.id}>
                        <div className="card-body opct-dark">
                          <h5 className="card-title">{item.name}</h5>
                          <p className="card-text">{item.textContent}</p>
                          <button
                            type="button"
                            className="btn border border-secondary "
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            View Video
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                className="carousel-control-prev main-color-bg"
                type="button"
                data-bs-target="#demo"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon"></span>
              </button>
              <button
                className="carousel-control-next main-color-bg"
                type="button"
                data-bs-target="#demo"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon"></span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="data">
        <div className="col-md-12">
          {" "}
          <h4 className="m-5 underline">D A T A</h4>
        </div>
        <div className="row">
          <div className="col-md-3 col-sm-6 p-5">
            <div className="card glass-bg rounded text-center fixed-height-card">
              {/* <!-- <i className="fa-solid fa-bezier-curve fs-1 text mb-2 main-color"></i> --> */}
              <img
                src={teacher}
                height="40px"
                width="40px"
                className="mx-auto"
              />
              <h5 className="mb-2 white mt-3">Total Teachers</h5>
              <h3 className="white fw-bolder">{statistics.totalTeacher}</h3>
            </div>
          </div>

          <div className="col-md-3 col-sm-6 p-5">
            <div className="card glass-bg rounded text-center fixed-height-card">
              {/* <!-- <i className="fa-solid fa-bezier-curve fs-1 text mb-2 main-color"></i> --> */}
              <img
                src={student}
                height="40px"
                width="40px"
                className="mx-auto"
              />
              <h5 className="mb-2 white mt-3">Total Students</h5>
              <h3 className="white fw-bolder">{statistics.totalStudent}</h3>
            </div>
          </div>

          <div className="col-md-3 col-sm-6 p-5">
            <div className="card glass-bg rounded text-center fixed-height-card">
              {/* <!-- <i className="fa-solid fa-bezier-curve fs-1 text mb-2 main-color"></i> --> */}
              <img
                src={courses}
                height="40px"
                width="40px"
                className="mx-auto"
              />
              <h5 className="mb-2 white mt-3">Total Courses</h5>
              <h3 className="white fw-bolder">{statistics.totalCourses}</h3>
            </div>
          </div>

          <div className="col-md-3 col-sm-6 p-5">
            <div className="card glass-bg rounded text-center fixed-height-card">
              {/* <!-- <i className="fa-solid fa-bezier-curve fs-1 text mb-2 main-color"></i> --> */}
              <img src={mcq} height="40px" width="40px" className="mx-auto" />
              <h5 className="mb-2 white mt-3">Total MCQ's</h5>
              <h3 className="white fw-bolder">{statistics.totalMCQ}</h3>
            </div>
          </div>
        </div>
      </section>

      <div className="row">
        <div className="col-md-12">
          {" "}
          <h4 className="m-5 underline">C O N T A C T &nbsp;&nbsp; U S</h4>
        </div>
      </div>
      <div className="container" style={{ maxWidth: "100%" }}>
        <section id="contact">
          <div className="row">
            <div className="col-md-4 col-sm-12 img-bg">
              <img className="img-map" src={map} />
            </div>

            <div className="col-md-4 col-sm-12 my-auto p-3 text-center">
              <p>WhatsApp no: 9310054646</p>
              <br />
              <p>Email : info@besst.in</p>
              <br />
              <p>
                Website :{" "}
                <a
                  href="http://www.besst.in"
                  style={{ color: "#7b1fa2", textDecoration: "underline" }}
                >
                  www.besst.in
                </a>{" "}
              </p>
              <br />
            </div>
            <div className="col-md-4 col-sm-12 main-color-bg">
              <h2 className="white text-center m-3">FAQ</h2>

              <div className="row p-4">
                <a
                  data-bs-toggle="collapse"
                  data-bs-target="#demo1"
                  className="text-decoration-none white"
                  style={{ color: "#decaec" }}
                >
                  Is there any free demo classes?
                </a>
                <div id="demo1" className="collapse" style={{ color: "white" }}>
                  Yes, there will be free practice papers.
                </div>
              </div>

              <div className="row p-4">
                <a
                  data-bs-toggle="collapse"
                  data-bs-target="#demo2"
                  className="text-decoration-none white"
                  style={{ color: "#decaec" }}
                >
                  For which standard the courses are available?
                </a>
                <div id="demo2" className="collapse" style={{ color: "white" }}>
                  We provide guidance for CUET (UG) 2022.
                </div>
              </div>

              <div className="row p-4">
                <a
                  data-bs-toggle="collapse"
                  data-bs-target="#demo3"
                  className="text-decoration-none white"
                  style={{ color: "#decaec" }}
                >
                  Do I need to subscribe?
                </a>
                <div id="demo3" className="collapse" style={{ color: "white" }}>
                  Yes , you need to subscribe for it.
                </div>
              </div>
              <div className="row p-4">
                <a
                  data-bs-toggle="collapse"
                  data-bs-target="#demo4"
                  className="text-decoration-none white"
                  style={{ color: "#decaec" }}
                >
                  How can we contact and report an error, if found?
                </a>
                <div id="demo4" className="collapse" style={{ color: "white" }}>
                  A student can contact to the team by the provided whatsapp
                  number and also via email.
                </div>
              </div>
              <div className="row p-4">
                <a
                  data-bs-toggle="collapse"
                  data-bs-target="#demo5"
                  className="text-decoration-none white"
                  style={{ color: "#decaec" }}
                >
                  Is regional language available?
                </a>
                <div id="demo5" className="collapse" style={{ color: "white" }}>
                  Yes, regional language paper like Bengali and Assamese are
                  available.
                </div>
              </div>

              <div className="row px-5">
                <Link to="/FAQ" type="button" className="btn  white">
                  More...
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div
        className="modal fade "
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Video
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body mx-auto">
              <video id="" width="auto" height="400px" controls>
                <source src="example.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade "
        id="videoModalYT"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Video
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body mx-auto">
              <iframe
                width="420"
                height="315"
                src="httpss://www.youtube.com/embed/tgbNymZ7vqY"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="loginModal"
        tabindex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">
                Login
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body mx-auto">
              <form>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-at main-color"></i>
                    </span>
                  </div>
                  <input
                    id="email"
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-key main-color"></i>
                    </span>
                  </div>
                  <input
                    id="lastName"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className=" mb-3 text-center">
                  <p>or </p>
                  <a className="btn border">
                    <i className="fa-brands fa-google main-color"></i>{" "}
                    &nbsp;Gmail
                  </a>
                </div>

                {/* <div className="mb-3">
                  <label id="success" className="form-label noti-success">
                    <i className="fa-solid fa-face-grin-stars"></i> Request Sent
                    Successfully
                  </label>
                </div>

                <div className="mb-3">
                  <label id="error" className="form-label noti-error">
                    <i className="fa-solid fa-face-dizzy"></i> Error occured
                  </label>
                </div> */}
                <button
                  type="submit"
                  className="btn main-btn "
                  data-mdb-dismiss="modal"
                  onClick={onLogin}
                  // to="/studentDashboard"
                >
                  {loading ? "Please Wait.." : "Login"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="registerModal"
        tabindex="-1"
        aria-labelledby="registerModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="registerModalLabel">
                Hi! Student, &nbsp;
              </h4>{" "}
              <h4 className="modal-title main-color" id="registerModalLabel">
                Register Here
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body mx-auto">
              <form>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-user main-color"></i>
                    </span>
                  </div>
                  <input
                    id="firstName"
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-user main-color"></i>
                    </span>
                  </div>
                  <input
                    id="lastName"
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-at main-color"></i>
                    </span>
                  </div>
                  <input
                    id="email"
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-key main-color"></i>
                    </span>
                  </div>
                  <input
                    id="Password"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-key main-color"></i>
                    </span>
                  </div>
                  <input
                    id="confirmPassword"
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-phone main-color"></i>{" "}
                    </span>
                  </div>{" "}
                  <br />
                  <input
                    id="whatsappNumber"
                    type="text"
                    className="form-control"
                    placeholder="Mobile Number"
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    onChange={() => {
                      setWhatsappNumber(mobile);
                    }}
                  />
                  <label className="check-text">Same as Whatsapp Number</label>
                </div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-brands fa-whatsapp main-color"></i>{" "}
                    </span>
                  </div>{" "}
                  <br />
                  <input
                    id="whatsappNumber"
                    type="text"
                    className="form-control"
                    placeholder="Whatsapp Number"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Course</label>
                  <select
                    id="streamSelect"
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setCourse(e.target.value)}
                  >
                    <option selected>Select your course</option>
                    {console.log("item",courseDetails)}
                    {courseDetails.map((item) => 
                    <option value={item.courseId}>{item.courseName}</option>
                    )}
                  </select>
                </div>
                {registerSuccess == "green" ? (
                  <div className="mb-3">
                    <label id="success" className="form-label noti-success">
                      <i className="fa-solid fa-face-grin-stars"></i> Request
                      Sent Successfully
                    </label>
                  </div>
                ) : null}
                {registerSuccess == "red" ? (
                  <div className="mb-3">
                    <label id="error" className="form-label noti-error">
                      <i className="fa-solid fa-face-dizzy"></i> Error occured
                    </label>
                  </div>
                ) : null}

                <button
                  type="button"
                  className="btn main-btn "
                  onClick={() => onRegister()}
                >
                  {loading ? "Please wait..." : "Register"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade "
        id="newsModal"
        tabindex="-1"
        aria-labelledby="newsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="newsModalLabel">
                News
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body mx-auto">
              <p></p>
            </div>
          </div>
        </div>
      </div>

      <a href="#" className="float-insta" target="_blank">
        <i className="fa-brands fa-instagram my-float"></i>
      </a>

      <a href="#" className="float-youtube" target="_blank">
        <i className="fa-brands fa-youtube my-float"></i>
      </a>

      <a
        href="https://www.facebook.com/Brahmaputra-Exam-Success-Support-Team-BESST-110677481604226/"
        className="float-facebook"
        target="_blank"
      >
        <i className="fa-brands fa-facebook-f my-float"></i>
      </a>
      <a href="#" className="float-twitter" target="_blank">
        <i className="fa-brands fa-twitter my-float"></i>
      </a>

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

export default Landing;
