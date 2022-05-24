import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";
import { nextPrev, refer, QuizLoad } from "../../Components/quizWorking";
import Cookies from "js-cookie";
import axios from "axios";
import { useLocation } from "react-router-dom";
import useRemoveModal from "../../Components/useRemoveModal";
import baseUrl from "../../Components/baseUrl";

function ReviewTest() {
  const location = useLocation();
  const { quizId } = location.state;
  const [profileData, setProfileData] = useState([]);
  const [quizResult, setQuizResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [answerView, setAnswerView] = useState("");
  const [explanation, setExplanation] = useState("");
  useRemoveModal();
  useEffect(() => {
    profileDataApi();
    previewApi();
    // return () => {
    //   profileData([]);
    //   quizResult([]);
    // }
  }, []);

  const profileDataApi = () => {
    document.body.style.overflow = "visible";
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
  };
  const previewApi = () => {
    axios
      .post(
        baseUrl() + "/PreviewQuiz",
        {
          userId: Cookies.get("userId"),
          quizResultId: quizId,
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
          setQuizResult(response.data.Data);

          QuizLoad();
          console.log(quizResult);
        }
      });
  };
  const checkedStatus = (option) => {
    if (option.selected === 1) return true;
    else return false;
  };
  return (
    <>
      {/* {console.log("quizResult", quizResult)} */}
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
        {quizResult.map(() => (
          <span className="step"></span>
        ))}
      </div>
      <form id="regForm">
        {quizResult.map((item) => (
          <div className="tab">
            <div>
              {/* <h2>{item.}</h2> */}
              {item.questionsBeans.map((items) => (
                <div>
                  <label>
                    Q{items.quesId}&nbsp;&nbsp; &nbsp;{items.question}
                  </label>
                  <br />
                  {items.optionBeans.map((answer) => (
                    <div>
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          id="check1"
                          name={answer.quesId}
                          value={answer.optionValue}
                          checked={answer.selected === 0 ? false : true}
                        />

                        <div>
                          {answer.optionValue}
                          &nbsp;
                          <label className="form-check-label">
                            {answer.isCorrect === 1 && (
                              <i
                                class="fa fa-check-circle"
                                style={{ color: "green" }}
                              ></i>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* <br /> */}
                  <a className="p-3">
                    {" "}
                    <i className="fa fa-thumbs-up" aria-hidden="true"></i>{" "}
                    &nbsp;10
                  </a>
                  <a className="p-3">
                    {" "}
                    <i
                      className="fa fa-thumbs-down"
                      style={{ color: "red" }}
                      aria-hidden="true"
                    ></i>
                    &nbsp; 5
                  </a>
                  <a className="p-3">
                    <i className="fa fa-eye" aria-hidden="true"></i>
                  </a>
                  <br />
                  <br />
                  <p>
                    <a
                      className="p-2"
                      data-toggle="collapse"
                      href={`#collapseAnswer/${items.quesId}`}
                      role="button"
                      aria-expanded="false"
                      aria-controls={`collapseAnswer/${items.quesId}`}
                      // onClick={() => AnswerCheck()}
                    >
                      Answer
                    </a>
                    <a
                      className="p-2"
                      data-toggle="collapse"
                      href={`#collapseExample/${items.quesId}`}
                      role="button"
                      aria-expanded="false"
                      aria-controls={`collapseExample/${items.quesId}`}
                    >
                      Explanation
                    </a>

                    <a className="p-2" href="">
                      Report
                    </a>

                    <a className="p-2" href="">
                      Video
                    </a>
                    <a className="p-2" href="">
                      Help
                    </a>
                  </p>
                  <div
                    className="collapse"
                    id={`#collapseAnswer/${items.quesId}`}
                  >
                    <div className="card card-body">
                      {items.optionBeans.map((item) => {
                        if (item.isCorrect === 1) return item.optionValue;
                      })}
                    </div>
                  </div>
                  <div
                    className="collapse"
                    id={`collapseExample/${items.quesId}`}
                  >
                    <div className="card card-body">
                      {items.title !== null ? items.title : "No Explanation"}
                    </div>
                  </div>

                  <br />
                </div>
              ))}
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
}

export default ReviewTest;
