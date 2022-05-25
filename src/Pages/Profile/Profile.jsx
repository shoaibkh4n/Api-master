import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Cookies from "js-cookie";
import baseUrl from "../../Components/baseUrl";

function Profile() {
  const [profileData, setProfileData] = useState([]);
  const [list, setlist] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(null);
  // const [selectedCheckbox2, setSelectedCheckbox2] = useState([]);

  const [name, setName] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [courseName, setCourseName] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imgLoad, setImgLoad] = useState(false);
  const [checked, setChecked] = useState([]);
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
        console.log(response.data.Data);
        if (response.status === 200) {
          console.log(response.data.Data);
          setProfileData(response.data.Data);
          setCourseName(response.data.Data.courseBeans);
          setName(response.data.Data);
        }
      });
  }, []);

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
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setSubjects(response.data.Data);
        }
      });
  }, []);

  const handleFileInput = (e) => {
    setProfilePhoto(e.target.files[0]);
    setImgLoad(true);
  };

  const onSubmit = () => {
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
            setProfileData({
              ...profileData,
              image: response.data.Data.UploadPathUrl,
            });
            setLoading(false);
            setImgLoad(false);
            axios.post(baseUrl() + `/userUpdateProfileDetails`, profileData, {
              headers: {
                "Acces-Control-Allow-Origin": "*",
                Client_ID: "MVOZ7rblFHsvdzk25vsQpQ==",
                Authorization: `${Cookies.get("token")}`,
              },
            });
          }
        })
        .catch((e) => {
          alert(e);
          setLoading(false);
          setImgLoad(false);
        });
    } else {
      console.log(profileData);
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
          }
        });
    }
  };

  const checkedResponse = (items) => {
    let app = 0;
    if (courseName != null || courseName != []) {
      courseName.map((e1) => {
        e1.topicBeans.map((e2) => {
          if (items === e2.topicName) app++;
        });
      });
    }
    // console.log(app);
    if (app === 1) return true;
    // else return false;
  };
  const AnswerSet = (item) => {
    var arrayName = Object.assign([], list);
    arrayName.push({ item });
    setlist(arrayName);
    console.log("res", courseName);
  };
  // const oncheckBox = (event, selectedCard) => {
  //   if (event === true) {
  //     selectedCard = {
  //       ...selectedCard,
  //       is_checked: true,
  //     };
  //     const tempUserList = [...subjects, selectedCard.id];
  //     setSelectedCheckbox2(tempUserList);
  //     for (let i = 0; i < eventList.length; i++) {
  //       if (eventList[i].id === selectedCard.id) {
  //         eventList[i]["is_checked"] = event;
  //       }
  //     }
  //   } else if (event === false) {
  //     setSelectedCheckbox2(profileData.filter((item) => item.id !== selectedCard.id));

  //     for (let i = 0; i < eventList.length; i++) {
  //       if (eventList[i].id === selectedCard.id) {
  //         eventList[i]["is_checked"] = event;
  //       }
  //     }
  //   }
  // };
  return (
    <>
      <Header profileData={name} />
      <div className="container" style={{ maxWidth: "80%" }}>
        <br />
        <br />
        <br />
        <br />
        <div className="row mt-4 p-2 faq-row">
          <div className="col-4 p-3">
            <div height="130px" width="130px" className="border">
              <p>
                <img
                  id="output"
                  height="130px"
                  width="auto"
                  src={`http://97.74.90.132:8082/${profileData.image}`}
                />
              </p>
            </div>

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
            <label>Age</label>{" "}
            <input
              type="number"
              className="form-control"
              id="ageProfile"
              value="24"
            />
            <br />
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
            <label>Xth Marks (if any)</label>{" "}
            <input
              type="number"
              className="form-control"
              id="xProfile"
              value=""
              placeholder="eg - 7cgpa / 70%"
            />
            <br />
            <label className="p-2">Course Name:</label>
            {subjects.length > 0
              ? subjects.map((items) => (
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={() => setChecked(items)}
                  >
                    <option selected>Select Course</option>
                    <option value={items.courseId}>{items.courseName}</option>
                  </select>
                ))
              : ""}
            <br />
            <label className="p-2">Available Subjects:</label>
            {console.log(checked)}
            {checked.length !== 0 ? (
              <div className="form-check">
                <label className="form-check-label">{checked.courseName}</label>
                {checked.topicBeans.map((item) => (
                  <div>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="hindiCB"
                      checked={checkedResponse(item.topicName)}
                      // onChange={(event) => }
                      onChange={(event) => AnswerSet(item)}
                    />
                    <label className="form-check-label">{item.topicName}</label>
                  </div>
                ))}
                <br />
              </div>
            ) : (
              ""
            )}
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
  );
}

export default Profile;
