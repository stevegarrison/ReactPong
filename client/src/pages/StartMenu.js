import React, { Component } from "react";
import "../styles/startMenu.css"
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
          <Link to={"/gameOnePlayer"}><button className="btn m-2">One Player!</button></Link>

          {/* Start Button */}
          <Link to={"/gameTwoPlayer"}><button className="btn m-2">Two Player!</button></Link>

          {/* Start Button */}
          <Link to={"/practice"}><button className="btn m-2">Practice!</button></Link>

          {/* Otions Button */}
          <div className="text-light">
            <Link to={"/options"}><i id="cog" className="fas fa-cog fa-3x"></i></Link>
          </div>
        </div>
        <p className="credits">Steve Garrison | Kurtis Pace</p>
      </>
    );
  }
}

export default Start;
