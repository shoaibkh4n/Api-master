import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import {
  nextPrev,
  refer,
  QuizLoad,
  navigate,
} from "../../Components/quizWorking";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import baseUrl from "../../Components/baseUrl";
import moment from "moment";

const MCQ = () => {
  const location = useLocation();
  const { quizId, courseId, name, quizCode, level, negativeMarks, topicId } =
    location.state;
  const [profileData, setProfileData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mcqDatas, setMcqDatas] = useState([]);
  const [time, setTime] = React.useState(0);
  const [timerOn, setTimerOn] = React.useState(false);

  const [list, setlist] = useState([]);

  useEffect(() => {
    let interval = null;
    setTimerOn(true);
    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!timerOn) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);
  useEffect(() => {
    document.body.style.overflow = "visible";
    setLoading(true);
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
          setLoading(false);
        }
      });
  }, []);

  useEffect(() => {
    axios
      .post(
        baseUrl() + "/df/mcq",
        {
          quizId: quizId,
        },
        {
          headers: {
            "Acces-Control-Allow-Origin": "*",
            Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
            Authorization: Cookies.get("token"),
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
    // setlist({ ...list });
    let res = mcqDatas.map((e1) => {
      e1?.quesmasters.map((e2) => {
<<<<<<< HEAD
        e2?.optionBeans.map((el) => {
          if (el.selected === null) {
            el.selected = 0;
          }

          if (event.target.value === el.optionValue) {
            el.selected = 1;
          }
          return el;
        });
=======
        if (
          e2.optionBeans.find((key) => key.optionValue === event.target.value)
        ) {
          e2?.optionBeans.map((el) => {
            if (event.target.value === el.optionValue) {
              el.selected = 1;
              return el;
            } else {
              el.selected = 0;
              return el;
            }
          });
        }
>>>>>>> d8d669878ebd94ad5272098bdb24096701d7794d
        return e2;
      });
      return e1;
    });
<<<<<<< HEAD
    console.log("res", res);

=======
    console.log(res);
>>>>>>> d8d669878ebd94ad5272098bdb24096701d7794d
    setlist(res);
  };

  const submitQuiz = (e) => {
    let seconds = Math.floor(time / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  // 👇️ if seconds are greater than 30, round minutes up (optional)
  minutes = seconds >= 30 ? minutes + 1 : minutes;

  minutes = minutes % 60;

  // 👇️ If you don't want to roll hours over, e.g. 24 to 00
  // 👇️ comment (or remove) the line below
  // commenting next line gets you `24:00:00` instead of `00:00:00`
  // or `36:15:31` instead of `12:15:31`, etc.
  hours = hours % 24;
    let result  = `${hours} : ${minutes} : ${ seconds}`;
    console.log("result",hours,seconds,minutes,result)
    let res;
    if (list.length > 0) {
      console.log("1");
      res = list.map((e1) => {
        e1?.quesmasters.map((e2) => {
          e2?.optionBeans.map((el) => {
            if (el.selected === null) {
              el.selected = 0;
              return el;
            } else return el;
          });
          return e2;
        });
        return e1;
      });
      // console.log("res",res)
      setlist(res);
      console.log("res", list);
    } else {
      console.log("3");
      res = mcqDatas.map((e1) => {
        e1?.quesmasters.map((e2) => {
          e2?.optionBeans.map((el) => {
            if (el.selected === null) {
              el.selected = 0;
              return el;
            } else return el;
          });
          return e2;
        });
        return e1;
      });
    }
    axios
      .post(
        baseUrl() + "/df/saveMcqQuizData",
        {
          quizId: quizId,
          courseId: courseId,
          userId: Cookies.get("userId"),
          quizSectionWises: list.length > 0 ? list : res,
          timeTaken: result,
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
        <div id="display">
          <label>Taken Time : &nbsp;</label>{" "}
          <span>{("0" + Math.floor((time / 600000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
          {/* <span>{("0" + ((time / 10) % 100)).slice(-2)}</span> */}
        </div>
      </div>
      {/* ) : (
        ""
      )} */}

      <div href="#" className="float3">
        <label>Quiz Code : &nbsp;</label>{" "}
        <label className="fw-bold">{quizCode}</label>
        <br />
        <label>Complexity : &nbsp;</label>{" "}
        <label className="fw-bold">{level}</label>
        <br />
        <label>Nagetive Marks : &nbsp;</label>{" "}
        <label className="fw-bold">{negativeMarks}</label>
      </div>
      {/* ) : (
        ""
      )} */}
      {/* {name === "Test" ? ( */}
      <div
        href="#"
        className="float2"
        style={{ overflow: "auto", height: "200px", width: "270px" }}
      >
        <div className="row" id="progress">
          {mcqDatas.map((items, index) => (
            <>
              <div>Section : {index + 1}</div>
              {items.quesmasters.map((answer, key) => (
                <div className="col-2" id="track1">
                  <button
                    className="btn btn-que"
                    // href={`data/1`}
                    onClick={() => {
                      refer(index);
                      const questionStart = document.querySelectorAll(
                        ".m" + key
                      )[index];
                      const headerOffset = 125;
                      const elementPosition =
                        questionStart.getBoundingClientRect().top;
                      const offsetPosition =
                        elementPosition + window.pageYOffset - headerOffset;

                      window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                      });
                    }}
                  >
                    {key + 1}
                  </button>
                </div>
              ))}
            </>
          ))}
        </div>
      </div>
      {/* ) : (
        " "
      )} */}
      <br />
      <br />
      <br />
      <br />
      {/* {name === "Test" ? ( */}
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        {mcqDatas.map((item) => (
          <span className="step" id={`data/${item.topicId}`}></span>
        ))}
      </div>
      {/* ) : (
        ""
      )} */}

      <form
        id="regForm"
        onSubmit={(e) => {
          e.preventDefault();
          submitQuiz();
        }}
      >
        {/* {console.log(mcqDatas)} */}
        {/* {name === Test} */}
        {mcqDatas.length > 0
          ? mcqDatas.map((item) => (
              <div className="tab" id={`data/${item.topicId}`}>
                {item.paragraphFlag === 1 ? (
                  <div>
                    <h2>{item.topicName ? item.topicName : ""}</h2>
                    <br />
                    <div style={{ fontSize: "x-large", color: "black" }}>
                      {item.specialInstruction}
                    </div>
                    <span
                      dangerouslySetInnerHTML={{ __html: item.paragraph_desc }}
                    ></span>
<<<<<<< HEAD
                  </label>
                  <br />
                  {items.optionBeans.map((answer, key) => (
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="check1"
                        name={items.quesId + `${item.topicName}`}
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
=======
                    <br />
                    <br />
                    {item.quesmasters.map((items, i) => (
                      <div>
                        <label className={"m" + i}>
                          Q{i + 1}.&nbsp;&nbsp; &nbsp;
                          <span
                            dangerouslySetInnerHTML={{ __html: items.question }}
                          ></span>
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
                ) : (
                  <div>
                    <h2>{item.topicName}</h2>
                    {item.quesmasters.map((items, i) => (
                      <div>
                        <label className={"m" + i}>
                          Q{i + 1}.&nbsp;&nbsp; &nbsp;
                          <span
                            dangerouslySetInnerHTML={{ __html: items.question }}
                          ></span>
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
                )}
              </div>
            ))
          : ""}
>>>>>>> d8d669878ebd94ad5272098bdb24096701d7794d
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
              onClick={() => setTimerOn(false)}
            >
              Submit
            </button>
            {/* ) : (
              ""
            )} */}
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
