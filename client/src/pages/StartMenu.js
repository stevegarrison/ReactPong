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
          <h1 className="pong-header glow">PONG!</h1>

          {/* Start Button */}
          <Link to={"/game"}><button className="btn m-2">Start Game!</button></Link>

          {/* Otions Button */}
          <div className="text-light">
            <Link to={"/options"}><i id="cog" className="fas fa-cog fa-3x"></i></Link>
          </div>
        </div>
      </>
    );
  }
}

export default Start;
