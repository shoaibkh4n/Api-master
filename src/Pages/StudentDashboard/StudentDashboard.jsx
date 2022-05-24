import { useEffect, React, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/Header";
import Cookies from "js-cookie";
import axios from "axios";
import moment from "moment";
import baseUrl from "../../Components/baseUrl";

function StudentDashboard() {
  const [profileData, setProfileData] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [testData, setTestData] = useState([]);

  useEffect(() => {
    document.body.style.overflow = "visible";
    const modal = document.querySelector(".modal-backdrop");
    const courseModalbtn = document.querySelector(".courseModalbtn");
    const modalCourseSelect = document.querySelector(".modalCourseSelect");

    courseModalbtn.addEventListener("click", () => {
      modalCourseSelect.classList.remove("show");
      modalCourseSelect.removeAttribute("style");
      document.body.removeAttribute("class");
      document.body.style.overflow = "visible";
      modal.remove();
    });
  }, []);

  useEffect(() => {
    axios
      .post(
        baseUrl() + "/profileData",
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
        console.log("response", response.status);
        if (response.status === 200) {
          setProfileData(response.data.Data);
        }
      });
  }, []);
  useEffect(() => {
    if (!Cookies.get("token")) {
      window.location.reload();
    }
    axios
      .post(
        baseUrl() + "/df/fetchVideoClassesDtls",
        {
          username: Cookies.get("email"),
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
        console.log("response", response.status);
        if (response.status === 200) {
          console.log("videoData", response.data.Data);
          setVideoData(response.data.Data);
        }
      });
  }, []);

  // const TestAvailable = () => {
  //   axios
  //     .post(
  //       baseUrl() + "/df/getCoursesByCandidate",
  //       {
  //         email: Cookies.get("email"),
  //         userId: Cookies.get("userId"),
  //       },
  //       {
  //         headers: {
  //           "Acces-Control-Allow-Origin": "*",
  //           Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
  //           Authorization: `${Cookies.get("token")}`,
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log("response", response.status);
  //       if (response.status === 200) {
  //         console.log("videoData", response.data.Data);
  //         setTestData(response.data.Data);
  //       }
  //     });
  // };

  const TestTaken = () => {
    axios
      .post(
        baseUrl() + "/getAllSubmittedQuizByUserId",
        {
          userId: Cookies.get("userId"),
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
        console.log("response", response.status);
        if (response.status === 200) {
          console.log("videoData", response.data.Data);
          setTestData(response.data.Data);
        }
      });
  };

  const onDownload = () => {
    axios
      .post(
        baseUrl() + "/df/downloadCourseMaterial",
        {
          courseId: "1",
        },
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
          console.log("videoData", response.data.Data);
          setTestData(response.data.Data);
        }
      });
  };

  return (
    <>
      <Header profileData={profileData} />

      <div className="container border  rounded">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col-md-6 col-sm-12 p-3 border-end text-center">
            <h3 className="fw-bold">
              {profileData.firstName + " " + profileData.lastName}{" "}
            </h3>
            <h5>{profileData.qualification}</h5>
            <p>Profile 30% completed</p>
            <br />
            <Link className="btn main-btn" to="/studentprofile">
              Update Profile
            </Link>
          </div>

          <div className="col-md-6 col-sm-12 px-3">
            <div className="text-center my-auto">
              <h5>Upcoming className</h5>
              <hr />
            </div>
            <br />
            {videoData.map((item) => (
              <div className="row">
                <div className="col-md-9 col-sm-9">
                  <h5 className="fw-bold">{item.meetingDate}</h5>
                  <h5>{item.meetingDesc}</h5>
                  {/* <p>Ram Sir (IIT Delhi)</p> */}
                </div>
                <div className="col-md-3 col-sm-3 my-auto mx-auto p-2">
                  <a
                    target="_blank"
                    className="btn main-btn "
                    href={item.meetingUrl}
                  >
                    <i class="fas fa-users" style={{ fontSize: "12px" }}></i>
                    &nbsp; Join
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <br />

      <div className="text-center p-1">
        <h5 className="tip">Tip of the day - "Work smart, not hard"</h5>
      </div>

      <div className="container">
        <div className="row ">
          <div className="col-md-2 col-sm-6 p-4">
            <a
              href="#"
              className="text-decoration-none"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#takenModal"
              onClick={() => TestTaken()}
            >
              <div className="card glass-bg rounded text-center d-cards">
                <i className="fa-solid fa-circle-check main-color display-5"></i>
                <h5 className="mb-2 white mt-3 font-15">Tests Taken</h5>
                {/* <h3 className="white fw-bolder">100</h3> */}
              </div>
            </a>
          </div>

          <div className="col-md-2 col-sm-6 p-4">
            <a
              href="#"
              className="text-decoration-none"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#availableModal"
              // onClick={() => TestAvailable()}
            >
              <div className="card glass-bg-green rounded text-center d-cards">
                <i className="fa-solid fa-list-check light-green display-5"></i>
                <h5 className="mb-2 white mt-3 font-15 ">Tests Available</h5>
                {/* <h3 className="white fw-bolder">100</h3> */}
              </div>
            </a>
          </div>

          <div className="col-md-2 col-sm-6 p-4">
            <a
              href="#"
              className="text-decoration-none"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#scoreModal"
            >
              <div className="card glass-bg-blue rounded text-center d-cards">
                <i className="fa-solid fa-circle-pause display-5 light-blue"></i>
                <h5
                  className="mb-2 white mt-3 font-15"
                  // onClick={() => TestAvailable()}
                >
                  Practise Test
                </h5>
                {/* <h3 className="white fw-bolder">100</h3> */}
              </div>
            </a>
          </div>

          <div className="col-md-2 col-sm-6 p-4">
            <a
              href="#"
              className="text-decoration-none"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#classNameModal"
            >
              <div className="card glass-bg-cherry rounded text-center d-cards">
                <i className="fa-solid fa-users-rectangle display-5 light-cherry"></i>
                <h5 className="mb-2 white mt-3 font-15 ">Classes Attended</h5>
                {/* <h3 className="white fw-bolder">100</h3> */}
              </div>
            </a>
          </div>

          <div className="col-md-2 col-sm-6 p-4">
            <a
              className="text-decoration-none"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#downloadModal"
              onClick={() => onDownload()}
            >
              <div className="card glass-bg-red rounded text-center d-cards">
                <i className="fa-solid fa-cloud-arrow-down display-5 light-red"></i>
                <h5 className="mb-2 white mt-3 font-15">Download Material</h5>
              </div>
            </a>
          </div>

          <div className="col-md-2 col-sm-6 p-4">
            <a
              className="text-decoration-none"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#syllabusModal"
            >
              <div className="card glass-bg-green rounded text-center d-cards">
                <i className="fa-solid fa-book  display-5 light-green"></i>
                <h5 className="mb-2 white mt-3 font-15">
                  Select Your Syllabus
                </h5>
              </div>
            </a>
          </div>
        </div>
      </div>

      <br />
      <br />

      <div
        className="modal fade"
        id="downloadModal"
        tabindex="-1"
        aria-labelledby="downloadModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable downloadModal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title main-color" id="downloadModalLabel">
                Download Material
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {testData.map((item) => (
                <div className="row mb-2">
                  <div className="col-md-9">{item.documentName}</div>
                  <div className="col-md-3">
                    <a download href="" className="btn main-btn ">
                      Download
                    </a>
                  </div>
                </div>
              ))}
              <hr />
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="takenModal"
        tabindex="-1"
        aria-labelledby="takenModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable downloadModal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title main-color" id="takenModalLabel">
                Test Taken Before
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {testData.map((item) => (
                <div className="row mb-2">
                  <div className="col-md-9">
                    <h5>{item.quizTitle}</h5>
                    <label>{item.timeTaken}</label>{" "}
                    <label>&nbsp; &nbsp; &nbsp;</label>{" "}
                    <label>
                      {moment(item.submittedDate).format("DD-MM-YYYY")}
                    </label>
                  </div>
                  <div className="col-md-3">
                    <Link
                      className="btn main-btn "
                      to="/reviewTest"
                      state={{ quizId: item.quizResultId }}
                    >
                      Review
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="availableModal"
        tabindex="-1"
        aria-labelledby="availableModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable downloadModal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title main-color" id="availableModalLabel">
                Aavilable Test
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {profileData.courseBeans
                ? profileData.courseBeans.map((item) => (
                    <div>
                      <div className="col-md-9">{item.courseName}</div>
                      <br />
                      {item.topicBeans.map((items) => (
                        <div className="row mb-2">
                          <div className="col-md-9">{items.topicName}</div>
                          <div className="col-md-3">
                            <Link
                              to="/viewTest"
                              state={{
                                courseId: item.courseId,
                                topicId: items.topicId,
                                name: "Test",
                              }}
                              className="btn main-btn"
                            >
                              View
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="scoreModal"
        tabindex="-1"
        aria-labelledby="scoreModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable downloadModal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title main-color" id="scoreModalLabel">
                Last Test Score
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {profileData.courseBeans
                ? profileData.courseBeans.map((item) => (
                    <div>
                      <div className="col-md-9">{item.courseName}</div>
                      <br />
                      {item.topicBeans.map((items) => (
                        <div className="row mb-2">
                          <div className="col-md-9">{items.topicName}</div>
                          <div className="col-md-3">
                            <Link
                              to="/viewTest"
                              state={{
                                courseId: item.courseId,
                                topicId: items.topicId,
                                name: "Test",
                              }}
                              className="btn main-btn"
                            >
                              Resume
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="classNameModal"
        tabindex="-1"
        aria-labelledby="classNameModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable downloadModal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title main-color" id="classNameModalLabel">
                Classes Attended
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row mb-2">
                <div className="col-md-8">Science (Physics)</div>
                <div className="col-md-4">
                  <Link to="/" className="btn main-btn ">
                    View Recording
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade show modalCourseSelect"
        id="courseModal"
        tabindex="-1"
        aria-labelledby="courseModalLabel"
        aria-hidden="true"
        style={{ display: "block", background: "#00000078" }}
      >
        <div className="modal-dialog modal-dialog-scrollable downloadModal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title main-color" id="courseModalLabel">
                Select the course
              </h5>
              <button
                type="button"
                className="btn-close courseModalbtn"
                data-bs-dismiss="modal"
                data-mdb-dismiss="modal"
                data-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body mx-auto">
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option selected>Course</option>
                <option value="1">Maths</option>
                <option value="2">Science</option>
                <option value="3">English</option>
              </select>
              <br />

              <button className="btn main-btn float-end">Submit</button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="syllabusModal"
        tabindex="-1"
        aria-labelledby="syllabusModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable downloadModal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title main-color" id="syllabusModalLabel">
                Select Syllabus
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-5 mx-auto">
              <label className="p-2">Course Name:</label>
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option value="1" selected>
                  X th Board
                </option>
                <option value="2">XII th Board</option>
              </select>

              <br />
              <label className="p-2">Available Subjects:</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="hindiCB"
                />
                <label className="form-check-label">Hindi</label>
                <a
                  style={{ textDecoration: "none", color: "brown;" }}
                  target="_blank"
                  href="https://cdnasb.samarth.ac.in/site/Syllabus%20of%20CUET%20%28UG%29%20-%202022/319_Mathematics.pdf"
                >
                  &nbsp;&nbsp;<i className="fa-solid fa-cloud-arrow-down"></i>
                </a>
                <br />
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="englishCB"
                />
                <label className="form-check-label">English</label>
                <a
                  style={{ textDecoration: "none", color: "brown;" }}
                  target="_blank"
                  href="https://cdnasb.samarth.ac.in/site/Syllabus%20of%20CUET%20%28UG%29%20-%202022/319_Mathematics.pdf"
                >
                  &nbsp;&nbsp;<i className="fa-solid fa-cloud-arrow-down"></i>
                </a>
                <br />
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="mathsCB"
                />
                <label className="form-check-label">Maths</label>
                <a
                  style={{ textDecoration: "none", color: "brown;" }}
                  target="_blank"
                  href="https://cdnasb.samarth.ac.in/site/Syllabus%20of%20CUET%20%28UG%29%20-%202022/319_Mathematics.pdf"
                >
                  &nbsp;&nbsp;<i className="fa-solid fa-cloud-arrow-down"></i>
                </a>
                <br />
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="scienceCB"
                />
                <label className="form-check-label">Science</label>
                <a
                  style={{ textDecoration: "none", color: "brown;" }}
                  target="_blank"
                  href="https://cdnasb.samarth.ac.in/site/Syllabus%20of%20CUET%20%28UG%29%20-%202022/319_Mathematics.pdf"
                >
                  &nbsp;&nbsp;<i className="fa-solid fa-cloud-arrow-down"></i>
                </a>
              </div>
              <br />
              <button className="btn main-btn">Submit</button>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer mt-auto py-3 main-color-bg border-top fixed-footer">
        <div className="container text-center">
          <span className="white">
            Copyrights &#169; 2022 BESST(Brahmaputra Exam Success Support Team){" "}
          </span>
        </div>
      </footer>
    </>
  );
}

export default StudentDashboard;
