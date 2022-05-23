import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import { nextPrev, refer, QuizLoad } from "../../Components/quizWorking";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const MCQ = () => {
  const location = useLocation();
  const { quizId, courseId, name } = location.state;
  const [profileData, setProfileData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mcqDatas, setMcqDatas] = useState([]);
  const [list, setlist] = useState([]);

  // useEffect(() => {
  //   window.location.reload();

  // },[loading])
  useEffect(() => {
    document.body.style.overflow = "visible";
    setLoading(true);
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
          setLoading(false);
        }
      });
  }, []);

  useEffect(() => {
    name === "Test"
      ? axios
          .post(
            "http://97.74.90.132:8082/df/mcq",
            {
              quizId: quizId,
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
              setMcqDatas(response.data.Data);
              QuizLoad();
            }
          })
      : axios
          .post(
            "http://97.74.90.132:8082/df/getPracticeSetByCourseAndTopic",
            {
              quizId: quizId,
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
              setMcqDatas(response.data.Data);
              QuizLoad();
            }
          });
  }, []);
  const navigate = useNavigate();

  const AnswerSet = (event) => {
    let res = mcqDatas.map((e1) => {
      e1?.quesmasters.map((e2) => {
        e2?.optionBeans.map((el) => {
          if (event.target.value === el.optionValue) {
            el.selected = 1;
            return el;
          } else {
            el.selected = 0;
            return el;
          }
        });
        return e2;
      });
      return e1;
    });
    // console.log("res",res)
    setlist(res);
  };

  const submitQuiz = (e) => {
    axios
      .post(
        "http://97.74.90.132:8082/df/saveMcqQuizData",
        {
          quizId: quizId,
          courseId: courseId,
          userId: Cookies.get("userId"),
          quizSectionWises: list,
        },
        {
          headers: {
            "Acces-Control-Allow-Origin": "*",
            Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
            // "Authorization": `${Cookies.get('token')}`
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          // setProfileData(response.data.Data)
          console.log("data", response.data.Data);
          navigate("/testsubmit", { state: { data: response.data.Data } });

          setLoading(false);
        }
      });
    // console.log("submitted");
  };

  return (
    <>
      <Header profileData={profileData} />
      <div href="#" className="float">
        <label>Given Time : &nbsp;</label>{" "}
        <label className="fw-bold">01:30:00</label>
        <br />
        <label>Taken Time : &nbsp;</label>{" "}
        <label className="fw-bold">01:35:07</label>
      </div>
      <div href="#" className="float3">
        <label>Quiz Code : &nbsp;</label>{" "}
        <label className="fw-bold">MA001</label>
        <br />
        <label>Complexity : &nbsp;</label>{" "}
        <label className="fw-bold">Medium</label>
        <br />
        <label>Nagetive Marks : &nbsp;</label>{" "}
        <label className="fw-bold">2</label>
      </div>
      <div href="#" className="float2">
        <div className="row" id="progress">
          <div className="col-2" id="track1">
            <button className="btn btn-que" onClick={() => refer(0)}>
              1
            </button>
          </div>
          <div className="col-2" id="track1">
            <button className="btn btn-que" onClick={() => refer(0)}>
              2
            </button>
          </div>
          <div className="col-2" id="track1">
            <button className="btn btn-que" onClick={() => refer(0)}>
              3
            </button>
          </div>
          <div className="col-2" id="track1">
            <button className="btn btn-que" onClick={() => refer(0)}>
              4
            </button>
          </div>
          <div className="col-2" id="track1">
            <button className="btn btn-que" onClick={() => refer(0)}>
              5
            </button>
          </div>

          <div className="col-2" id="track1">
            <button className="btn btn-que" onClick={() => refer(1)}>
              6
            </button>
          </div>
          <div className="col-2" id="track1">
            <button className="btn btn-que" onClick={() => refer(1)}>
              7
            </button>
          </div>
          <div className="col-2" id="track1">
            <button className="btn btn-que" onClick={() => refer(1)}>
              8
            </button>
          </div>
          <div className="col-2" id="track1">
            <button className="btn btn-que" onClick={() => refer(1)}>
              9
            </button>
          </div>
          <div className="col-2" id="track1">
            <button className="btn btn-que" onClick={() => refer(1)}>
              10
            </button>
          </div>

          <div className="col-2" id="track1">
            <button className="btn btn-que" onClick={() => refer(2)}>
              11
            </button>
          </div>
          <div className="col-2" id="track1">
            <button className="btn btn-que" onClick={() => refer(2)}>
              12
            </button>
          </div>
          <div className="col-2" id="track1">
            <button className="btn btn-que" onClick={() => refer(2)}>
              13
            </button>
          </div>
          <div className="col-2" id="track1">
            <button className="btn btn-que" onClick={() => refer(2)}>
              14
            </button>
          </div>
          <div className="col-2" id="track1">
            <button className="btn btn-que" onClick={() => refer(2)}>
              15
            </button>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />

      <div style={{ textAlign: "center", marginTop: "40px" }}>
        {mcqDatas.map(() => (
          <span className="step"></span>
        ))}
      </div>

      <form
        id="regForm"
        onSubmit={(e) => {
          e.preventDefault();
          submitQuiz();
        }}
      >
        {/* {console.log(mcqDatas)} */}
        {mcqDatas.map((item) => (
          <div className="tab">
            <div>
              <h2>{item.topicName}</h2>
              {item.quesmasters.map((items, i) => (
                <div>
                  <label>
                    Q{items.quesId}.&nbsp;&nbsp; &nbsp;{items.question}
                  </label>
                  <br />
                  {items.optionBeans.map((answer, key) => (
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="check1"
                        name={items.quesId}
                        value={answer.optionValue}
                        onChange={(e) => AnswerSet(e)}
                      />
                      <label className="form-check-label">
                        {answer.optionValue}
                      </label>
                    </div>
                  ))}
                </div>
              ))}
              <br />
              <br />
            </div>
          </div>
        ))}
        <div style={{ overflow: "auto" }}>
          <div style={{ float: "right" }}>
            <button
              className="btn-mcq"
              type="button"
              id="prevBtn"
              onClick={() => nextPrev(-1)}
            >
              Previous
            </button>
            <button
              className="btn-mcq"
              type="button"
              id="nextBtn"
              onClick={() => nextPrev(1)}
            >
              Next
            </button>
            <button
              className="btn-mcq"
              type="submit"
              style={{ display: "none" }}
              id="submitbtn"
            >
              Submit
            </button>
          </div>
        </div>
      </form>

      <br />
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
};

export default MCQ;
