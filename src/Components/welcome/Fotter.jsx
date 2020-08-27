import React, { Component } from "react";
import "./welcome.css";
export default class Fotter extends Component {
  render() {
    return (
      <div>
        <h5 className="welcome__MyName">
          MADE WITH <span style={{ color: "red" }}>LOVE</span> BY{" "}
          <ins>ABDALLAH ABU SEDO</ins>
          <a href="https://github.com/abdallahabusedo/Pathfinding-Visualizer">
            <i className="fab fa-github Footer__Icon"></i>
          </a>
        </h5>
      </div>
    );
  }
}
