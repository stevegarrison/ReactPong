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
          <button className="btn m-2" >
            <Link to={"/game"}>Start Game!</Link>
          </button>

          {/* Otions Button */}
          <button className="btn m-2" onClick={this.handleOptions}>
            <Link to={"/options"}>Options</Link>
          </button>
        </div>
      </>
    );
  }
}

export default Start;
