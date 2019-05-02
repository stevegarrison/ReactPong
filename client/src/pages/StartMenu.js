import React, { Component } from "react";
import "../styles/startMenu.css"
import API from "../utils/API";
import { Link } from "react-router-dom";


class Start extends Component {

  handleStartGame = event => {
    event.preventDefault();
    console.log("Start Game");

  };

  handleOptions = event => {
    event.preventDefault();
    console.log("Options");

  };

  render() {
    return (
      <>
        <div className="text-center">
          <h1 className="pong-header">PONG!</h1>

          {/* Start Button */}
            <Link to={"/game"}><button className="btn m-2">Start Game!</button></Link>

          {/* Otions Button */}
            <Link to={"/options"}><button className="btn m-2">Options</button></Link>
        </div>
      </>
    );
  }
}

export default Start;
