import axios from "axios";
import React, { useEffect, useState } from "react";
import ProfilePic from "../../Assets/images/profilePic.jpg";
import Header from "../../Components/Header";
import Cookies from "js-cookie";
import baseUrl from "../../Components/baseUrl";
// import { Buffer } from "buffer";

function Profile() {
  let userId = Cookies.get("userId");
  console.log(JSON.parse(userId), userId);
  const [profileData, setProfileData] = useState([]);
  const [list, setlist] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  // const [selectedCheckbox2, setSelectedCheckbox2] = useState([]);

  const [name, setName] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [courseName, setCourseName] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imgLoad, setImgLoad] = useState(false);
  const [checked, setChecked] = useState(subjects);

  useEffect(() => {
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
        // console.log(response.data.Data);
        if (response.status === 200) {
          console.log(response.data.Data);
          setProfileData(response.data.Data);
          setCourseName(response.data.Data.courseBeans);
          setName(response.data.Data);
          setProfileImg(
            baseUrl() + `/df/showProfilePic/${response.data.Data.image}`
          );
        }
      });
  }, [loading]);

  useEffect(() => {
    axios
      .post(
        baseUrl() + "/df/coursesAndTopics",
        {
          courseId: "1",
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
          //  let apiData = response.data.Data[0].topicBeans.map((item) => {
          //     return {
          //       ...item,
          //       is_checked: courseName[0].topicBeans.map((items) => {
          //         if (items.topicId === item.topicId) {
          //           return true;
          //         } else return false;
          //       }),
          //     };

          //   })
          //   console.log("data api" ,apiData)
          setSubjects(response.data.Data);
          // console.log("asbc",subjects)
        }
      });
  }, [loading]);

  const handleFileInput = (e) => {
    setProfilePhoto(e.target.files[0]);
    setImgLoad(true);
  };

  const onSubmit = () => {
    {
      console.log("submit list", list);
    }
    setLoading(true);
    if (profilePhoto !== null) {
      let formData = new FormData();
      formData.append("uploadPhotoImage", profilePhoto);
      axios
        .post(
          baseUrl() + `/uploadPhoto?userName=${Cookies.get("email")}`,
          formData,
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
            // setProfileImg(response.data.Data.UploadPhotoName);
            // setProfileData({
            //   ...profileData,
            //   image: response.data.Data.UploadPathUrl,
            // });
            setLoading(false);
            setImgLoad(false);
            if (list.length > 0) {
              axios
                .post(
                  baseUrl() + `/df/addUpdateCourse`,
                  {
                    userId: JSON.parse(userId),
                    emailId: Cookies.get("email"),
                    courseId: checked.courseId,
                    topicBeans: list,
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
                  if (response.status == 200) {
                    setLoading(false);
                    setImgLoad(false);
                  }
                });
            }
          }
        })
        .catch((e) => {
          alert(e);
          setLoading(false);
          setImgLoad(false);
        });
    } else if (list.length > 0) {
      console.log("checked", checked.courseId);
      axios
        .post(
          baseUrl() + `/df/addUpdateCourse`,
          {
            userId: JSON.parse(userId),
            emailId: Cookies.get("email"),
            courseId: checked.courseId ? checked.courseId : 1,
            topicBeans: list,
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
          if (response.status == 200) {
            setLoading(false);
            setImgLoad(false);
          }
        });
    } else {
      axios
        .post(baseUrl() + `/userUpdateProfileDetails`, profileData, {
          headers: {
            "Acces-Control-Allow-Origin": "*",
            Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
            Authorization: `${Cookies.get("token")}`,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            setLoading(false);
            setImgLoad(false);
            if (list.length > 0) {
              axios
                .post(
                  baseUrl() + `/df/addUpdateCourse`,
                  {
                    userId: JSON.parse(userId),
                    emailId: Cookies.get("email"),
                    courseId: checked.courseId,
                    topicBeans: list,
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
                  if (response.status == 200) {
                    setLoading(false);
                    setImgLoad(false);
                  }
                });
            }
          }
        });
    }
  };

  const checkedResponse = (items, index) => {
    console.log("abcd", items);
    let app = 0;
    if (courseName.length > 0) {
      courseName[index].topicBeans.map((e2) => {
        if (items.topicId === e2.topicId) app = 1;
      });
    }
    console.log("return", app);
    if (app === 1) return true;
    else return false;
  };

  const oncheckBox = (event, selectedCard) => {
    // console.log("event", index);
    if (event === true) {
      selectedCard = {
        ...selectedCard,
        is_checked: true,
      };
      let tempUserList;
      {
        courseName.length > 0
          ? (tempUserList = [...courseName[0].topicBeans, selectedCard])
          : (tempUserList = [...list, selectedCard]);
      }
      setlist(tempUserList);
      for (let i = 0; i < checked.length; i++) {
        if (checked[i].topicId === selectedCard.topicId) {
          checked[i]["is_checked"] = event;
        }
      }
    } else if (event === false) {
      // console.log(courseName[index].topicBeans);
      // let tempUserList = []
      setlist(list.filter((item) => item.topicId !== selectedCard.topicId));

      for (let i = 0; i < checked.length; i++) {
        if (checked[i].topicId === selectedCard.topicId) {
          checked[i]["is_checked"] = event;
        }
      }
    }
    console.log("list", list);
  };

  const onSelectClick = (data, index) => {
    console.log("datas", data);
    let courseName2 = data.topicBeans.map((item) => {
      return {
        ...item,
        is_checked: checkedResponse(item, index),
      };
    });
    console.log("items", courseName2);
    setChecked(courseName2);
    setlist(courseName[index].topicBeans);
  };

  return !loading ? (
    <>
      <Header profileData={name} />
      <div className="container" style={{ maxWidth: "80%" }}>
        <br />
        <br />
        <br />
        <br />
        <div className="row mt-4 p-2 faq-row">
          <div className="col-4 p-3">
            <div style={{ height: "130px", width: "140px" }} className="border">
              <p>
                <img
                  id="displayData"
                  height="130px"
                  width="140px"
                  // value={profileImg}
                  src={profileImg ? profileImg : ProfilePic}
                />
              </p>
            </div>
            {console.log()}
            <p>
              <input
                type="file"
                accept="image/*"
                name="image"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => handleFileInput(e)}
              />
            </p>

            <label
              className="btn main-btn"
              for="file"
              style={{ cursor: "pointer" }}
            >
              {imgLoad ? "Submit to see changes ..." : "Upload Image"}
            </label>
            <br />
            <br />

            {/* <ul className="list-group">
              <li
                className="list-group-item main-color-bg white"
                aria-current="true"
              >
                Applied Subjects
              </li>
              {profileData.courseBeans &&
                profileData.courseBeans.map((item) => (
                  <li className="list-group-item">{item.courseName}</li>
                ))}
            </ul> */}
          </div>
          <div className="col-4 p-3">
            <label>Name</label>{" "}
            <input
              type="Text"
              className="form-control"
              id="nameProfile"
              value={profileData.firstName}
              onChange={(e) =>
                setProfileData({ ...profileData, firstName: e.target.value })
              }
            />
            <br />
            <label>className</label>{" "}
            <input
              type="text"
              className="form-control"
              id="classNameProfile"
              value={profileData.qualification}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  qualification: e.target.value,
                })
              }
            />
            <br />
            {/* <label>Age</label>{" "}
            <input
              type="number"
              className="form-control"
              id="ageProfile"
              value="24"
            />
            <br /> */}
            <label>Whatsapp Number</label>{" "}
            <input
              type="text"
              className="form-control"
              id="numberProfile"
              value={profileData.whatsappMob}
              onChange={(e) =>
                setProfileData({ ...profileData, whatsappMob: e.target.value })
              }
            />
            <br />
            <label>Email</label>{" "}
            <input
              type="text"
              className="form-control"
              id="nameProfile"
              value={profileData.email}
              onChange={(e) =>
                setProfileData({ ...profileData, email: e.target.value })
              }
            />
            <br />
            <label>Location</label>{" "}
            <input
              type="text"
              className="form-control"
              id="stateProfile"
              value={profileData.city}
              onChange={(e) =>
                setProfileData({ ...profileData, city: e.target.value })
              }
            />
          </div>

          <div className="col-4 p-3">
            <label>School Name</label>{" "}
            <input
              type="text"
              className="form-control"
              id="schoolProfile"
              value={profileData.schoolName}
              onChange={(e) =>
                setProfileData({ ...profileData, schoolName: e.target.value })
              }
            />
            <br />
            <label>Address</label>{" "}
            <input
              type="Text"
              className="form-control"
              id="addressProfile"
              value={profileData.address}
              onChange={(e) =>
                setProfileData({ ...profileData, address: e.target.value })
              }
            />
            <br />
            {/* <label>Xth Marks (if any)</label>{" "}
            <input
              type="number"
              className="form-control"
              id="xProfile"
              value=""
              placeholder="eg - 7cgpa / 70%"
            />
            <br /> */}
            <label className="p-2">Course Name:</label>
            {subjects.length > 0
              ? subjects.map((items, index) => (
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={() => onSelectClick(items, index)}
                  >
                    <option selected>Select Course</option>
                    <option value={items.courseId}>{items.courseName}</option>
                  </select>
                ))
              : ""}
            <br />
            <label className="p-2">Available Subjects:</label>
            {console.log("checked", subjects)}
            {checked.length !== 0 ? (
              <div className="form-check">
                <label className="form-check-label">{checked.courseName}</label>
                {checked.map((item) => (
                  <div>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="hindiCB"
                      checked={item.is_checked}
                      onChange={(event) =>
                        oncheckBox(event.target.checked, item)
                      }
                    />
                    <label className="form-check-label">{item.topicName}</label>
                  </div>
                ))}
                <br />
              </div>
            ) : (
              " "
            )}
            {/*subjects.length > 0 ? (
              <div className="form-check">
                <label className="form-check-label">
                  {subjects[0].courseName}
                </label>
                {subjects[0].topicBeans.map((item) => (
                  <div>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="hindiCB"
                      // checked={checkedResponse(item.topicName)}
                      // onChange={(event) => }
                      onChange={(event) => AnswerSet(item,0)}
                    />
                    <label className="form-check-label">{item.topicName}</label>
                  </div>
                ))}
                <br />
              </div>
            ) : (
              ""
            )} */}
            <button
              className="btn main-btn float-end "
              onClick={() => onSubmit()}
            >
              {loading ? "Please wait.. " : "Submit"}
            </button>
          </div>
        </div>
      </div>
      <br />

      <footer className="footer mt-auto py-3 main-color-bg border-top">
        <div className="container text-center">
          <span className="white">
            Copyrights &#169; 2022 BESST (Brahmaputra Exam Success Support Team)
          </span>
        </div>
      </footer>
    </>
  ) : (
    ""
  );
}

export default Profile;
