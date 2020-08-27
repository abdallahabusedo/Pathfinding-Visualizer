import React, { Component } from "react";
import "./welcome.css";
import Logo from "./../../assets/images/Logo.png";
class welcome extends Component {
  render() {
    return (
      <div>
        <div className="welcome__Logo">
          <img src={Logo} className="welcome__Logo" alt="logo" />
        </div>
        <h5 className="welcome__MyName">MADE WITH LOVE BY ABDALLAH ABU SEDO</h5>
      </div>
    );
  }
}

export default welcome;
