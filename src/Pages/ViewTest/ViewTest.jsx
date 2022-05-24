import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";
import useRemoveModal from "../../Components/useRemoveModal";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import baseUrl from "../../Components/baseUrl";

const ViewTest = (props) => {
  const location = useLocation();
  const { courseId, topicId, name } = location.state;
  console.log("CourseId", courseId, topicId);
  const [profileData, setProfileData] = useState([]);
  const [testData, setTestData] = useState([]);

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
        if (response.status === 200) {
          setProfileData(response.data.Data);
        }
      });
  }, []);
  useEffect(() => {
    axios
      .post(
        baseUrl() + "/df/getAllActiveQuizByCourseAndTopic",
        {
          courseId: courseId,
          topicId: topicId,
        },
        {
          headers: {
            "Acces-Control-Allow-Origin": "*",
            Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setTestData(response.data.Data);
          console.log("testData", testData);
        }
      });
  }, []);
  useRemoveModal();
  return (
    <>
      <Header profileData={profileData} />
      <div className="container" style={{ maxWidth: "80%" }}>
        <br />
        <br />
        <br />
        <br />
        {testData.map((item) => (
          <div className="row mt-5 p-5 faq-row">
            <h2 className="text-center">{item.title}</h2>
            <div className="col-md-12 pt-4 pb-4">
              <div className="row">
                <div className="col-md-10">
                  <h5>{item.courseName}</h5>
                  <label>Time :</label>
                  <label>&nbsp; &nbsp;</label>
                  <label className="fw-bold">{item.maxTime}</label>
                  <label>&nbsp; &nbsp;&nbsp; &nbsp;</label>
                  <label>Questions :</label>
                  <label>&nbsp; &nbsp;</label>
                  <label className="fw-bold"> {item.maxNOQ}</label>
                  <label>&nbsp; &nbsp;&nbsp; &nbsp;</label>
                  <label>Marks :</label>
                  <label>&nbsp; &nbsp;</label>
                  <label className="fw-bold">{item.passingScore}</label>
                </div>

                <div className="col-md-2 my-auto">
                  <Link
                    type="button"
                    to="/studentMCQ"
                    state={{
                      quizId: item.quizId,
                      courseId: courseId,
                      name: name,
                    }}
                    className="btn main-btn"
                  >
                    Start Test
                  </Link>
                </div>
              </div>

              <hr />
            </div>
          </div>
        ))}
      </div>

      <br />
      <footer className="footer mt-auto py-3 main-color-bg border-top fixed-footer">
        <div className="container text-center">
          <span className="white">
            Copyrights &#169; 2022 BESST(Brahmaputra Exam Success Support Team){" "}
          </span>
        </div>
      </footer>
    </>
  );
};

export default ViewTest;
