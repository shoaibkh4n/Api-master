import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Cookies from "js-cookie";

function Profile() {
  const [profileData, setProfileData] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [name, setName] = useState([]);
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    axios.post("http://97.74.90.132:8082/profileData", {
      "email": Cookies.get("email")
    }, {
      headers: {
        "Acces-Control-Allow-Origin": "*",
        "Client_ID": "MVOZ7rblFHsvdzk25vsQpQ==",
        "Authorization": `${Cookies.get('token')}`
      }
    }).then((response) => {
      if (response.status === 200) {
        setProfileData(response.data.Data)
        setName(response.data.Data)
      }
    })
  }, [])

  useEffect(() => {
    axios.post("http://97.74.90.132:8082/df/coursesAndTopics", {
      "courseId": "1"
    }, {
      headers: {
        "Acces-Control-Allow-Origin": "*",
        "Client_ID": "MVOZ7rblFHsvdzk25vsQpQ==",
      }
    }).then((response) => {
      if (response.status === 200) {
          setSubjects(response.data.Data)
      }
    })
  }, [])

  const handleFileInput = (e) => {
    setProfilePhoto(e.target.files[0])

  }

  const onSubmit = () => {
    if (profilePhoto !== null) {
      let formData = new FormData();
      formData.append("uploadPhotoImage", profilePhoto)
      axios.post(`http://97.74.90.132:8082/uploadPhoto?userName=${Cookies.get("email")}`, formData, {
        headers: {
          "Acces-Control-Allow-Origin": "*",
          "Client_ID": "MVOZ7rblFHsvdzk25vsQpQ==",
          "Authorization": `${Cookies.get('token')}`
        }
      }).then((response) => {
        if (response.status === 200) {
          setProfileData({...profileData,image:response.data.Data.UploadPathUrl})
          axios.post(`http://97.74.90.132:8082/userUpdateProfileDetails`,
            profileData
          , {
            headers: {
              "Acces-Control-Allow-Origin": "*",
              "Client_ID": "MVOZ7rblFHsvdzk25vsQpQ==",
              "Authorization": `${Cookies.get('token')}`
            }
          })
        }
      })
    }
    else {
      console.log(profileData)
      axios.post(`http://97.74.90.132:8082/userUpdateProfileDetails`,
        profileData
      , {
        headers: {
          "Acces-Control-Allow-Origin": "*",
          "Client_ID": "MVOZ7rblFHsvdzk25vsQpQ==",
          "Authorization": `${Cookies.get('token')}`
        }
      })
    }
  }
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
                <img id="output" height="130px" width="auto" src={profileData.image} />
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
              Upload Image
            </label>
            <br />
            <br />

            <ul className="list-group">
              <li
                className="list-group-item main-color-bg white"
                aria-current="true"
              >
                Applied Subjects
              </li>
              <li className="list-group-item">Maths</li>
              <li className="list-group-item">Physics</li>
              <li className="list-group-item">Chemistry</li>
              <li className="list-group-item">Biology</li>
            </ul>
          </div>
          <div className="col-4 p-3">
            <label>Name</label>{" "}
            <input
              type="Text"
              className="form-control"
              id="nameProfile"
              value={profileData.firstName}
              onChange={(e) => setProfileData({ firstName: e.target.value })}
            />
            <br />
            <label>className</label>{" "}
            <input
              type="text"
              className="form-control"
              id="classNameProfile"
              value={profileData.qualification}
              onChange={(e) => setProfileData({ ...profileData, qualification: e.target.value })}
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
              onChange={(e) => setProfileData({ ...profileData, whatsappMob: e.target.value })}
            />
            <br />
            <label>Email</label>{" "}
            <input
              type="text"
              className="form-control"
              id="nameProfile"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
            />
            <br />
            <label>Location</label>{" "}
            <input
              type="text"
              className="form-control"
              id="stateProfile"
              value={profileData.city}
              onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
            />
          </div>

          <div className="col-4 p-3">
            <label>School Name</label>{" "}
            <input
              type="text"
              className="form-control"
              id="schoolProfile"
              value={profileData.schoolName}
              onChange={(e) => setProfileData({ ...profileData, schoolName: e.target.value })}
            />
            <br />
            <label>Address</label>{" "}
            <input
              type="Text"
              className="form-control"
              id="addressProfile"
              value={profileData.address}
              onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
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
            <select className="form-select" aria-label="Default select example">
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
              <br />
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="englishCB"
              />
              <label className="form-check-label">English</label>
              <br />
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="mathsCB"
              />
              <label className="form-check-label">Maths</label>
              <br />
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="scienceCB"
              />
              <label className="form-check-label">Science</label>
            </div>
            <button className="btn main-btn float-end " onClick={() => onSubmit()}> Submit </button>
          </div>
        </div>
      </div>
      <br />

      <footer className="footer mt-auto py-3 main-color-bg border-top">
        <div className="container text-center">
          <span className="white">
            Copyrights &#169; 2022 BESSTBrahmaputra Exam Success Support Team{" "}
          </span>
        </div>
      </footer>
    </>
  );
}

export default Profile;
