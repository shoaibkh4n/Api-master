import React from "react";
import Logo from "../Assets/images/logo.png";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function Header(props) {
  // const history = useNavigate();
  const onLogout = () => {
    Cookies.remove("token");
    Cookies.remove("email");
    Cookies.remove("userId");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light px-5 py-1 fixed-top white-bg shadow-sm">
        <a className="navbar-brand" href="/">
          <img
            src={Logo}
            alt=""
            width="70"
            height="auto"
            className="d-inline-block align-text-top"
          />
        </a>

        <ul className="navbar-nav ms-auto mr-2">
          <li className="nav-item">
            <div className="dropdown" style={{ float: "right" }}>
              <button className="dropbtn">{props.profileData.firstName ? props.profileData.firstName.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase(): " "}</button> 
              <div className="dropdown-content">
                <Link to="/">Home</Link>
                <Link to="/studentDashboard">Dashboard</Link>
                <Link to="/" onClick={onLogout}>Logout</Link>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
