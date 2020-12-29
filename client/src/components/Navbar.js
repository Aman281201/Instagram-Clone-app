import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { UserContext } from "../App";

const NavBar = () => {
  const { state, dispatch } = useContext(UserContext);
  const renderlist = () => {
    if (state) {
      return [
        <ul>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/Create">Create Post</Link>
          </li>
        </ul>,
      ];
    } else {
      return [
        <ul>
          <li>
            <Link to="/signin">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>,
      ];
    }
  };
  return (
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper #ff8a80 red accent-1">
          <Link to={state ? "/" : "signin"} className="brand-logo left">
            InstaKilogram
          </Link>
          <ul id="nav-mobile" className="right ">
            {renderlist()}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
