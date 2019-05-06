import React, { Component } from "react";
import "../styles/optionsMenu.css"
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Input, TextArea, FormBtn } from "../components/Input";

let imageURL = "";
let player1Color = "";
let player1Size = "";
let player2Color = "";
let player2Size = "";
let ballColor = "";


class Options extends Component {

  state = {
    player1Color: "",
    player2Color: "",
    ballColor: "",
    imageURL: "",
    player1Size: 0,
    player2Size: 0
  };

  handleSave = event => {
    // Save Options to DB
    API.saveOptions({
      player1Color: this.state.player1Color,
      player1Size: this.state.player1Size,
      player2Color: this.state.player2Color,
      player2Size: this.state.player2Size,
      ballColor: this.state.ballColor,
      imageURL: this.state.imageURL
    })

  };

  handleInputChange = event => {
    this.setState({ imageURL: event.target.value });
  }

  handlePlayerOneColor = event => {
    event.preventDefault();
    player1Color = event.target.getAttribute("data-color");
    this.setState({ player1Color: player1Color });
    console.log("Player one color: " + player1Color);
  }

  handlePlayerOneSize = event => {
    event.preventDefault();
    player1Size = parseInt(event.target.getAttribute("data-size"));
    this.setState({ player1Size: player1Size });
    console.log("Player one size: " + player1Size);
  }

  handlePlayerTwoSize = event => {
    event.preventDefault();
    player2Size = parseInt(event.target.getAttribute("data-size"));
    this.setState({ player2Size: player2Size });
    console.log("Player two size: " + player2Size);
  }

  handlePlayerTwoColor = event => {
    event.preventDefault();
    player2Color = event.target.getAttribute("data-color");
    this.setState({ player2Color: player2Color });
    console.log("Player two color: " + player2Color);
  }

  handleBallColor = event => {
    event.preventDefault();
    ballColor = event.target.getAttribute("data-color");
    this.setState({ ballColor: ballColor });
    console.log("Ball color: " + ballColor);
  }

  render() {
    return (
      <>
        <div className="text-center text-light container">
          <h1 className="header">Options</h1>
          {/* Home Button */}
          <Link to={"/"}><button className="btn mb-2 mt-2" id="button" onClick={this.handleReturnHome}>Home</button></Link>
          <p className="mt-2">(Default values set to white)</p>
          <hr></hr>

          {/* Options */}
          <div className="mb-4">
            <h1 className="options-text mb-4">Player One</h1>
            <div>
              <p className="options-text1"> Color</p>
              <button className={`player1-color1 m-1 ${"red" === this.state.player1Color ? "active" : ""}`} data-color="red" onClick={this.handlePlayerOneColor}></button>
              <button className={`player1-color2 m-1 ${"blue" === this.state.player1Color ? "active" : ""}`} data-color="blue" onClick={this.handlePlayerOneColor}></button>
              <button className={`player1-color3 m-1 ${"lime" === this.state.player1Color ? "active" : ""}`} data-color="lime" onClick={this.handlePlayerOneColor}></button>
              <button className={`player1-color4 m-1 ${"yellow" === this.state.player1Color ? "active" : ""}`} data-color="yellow" onClick={this.handlePlayerOneColor}></button>
              <button className={`player1-color5 m-1 ${"#FF3399" === this.state.player1Color ? "active" : ""}`} data-color="#FF3399" onClick={this.handlePlayerOneColor}></button>
              <button className={`player1-color6 m-1 ${"purple" === this.state.player1Color ? "active" : ""}`} data-color="purple" onClick={this.handlePlayerOneColor}></button>
              <button className={`player1-color7 m-1 ${"orange" === this.state.player1Color ? "active" : ""}`} data-color="orange" onClick={this.handlePlayerOneColor}></button>
              <button className={`player1-color8 m-1 ${"mediumspringgreen" === this.state.player1Color ? "active" : ""}`} data-color="mediumspringgreen" onClick={this.handlePlayerOneColor}></button>
              <p className="options-text1 mt-3">Paddle size</p>
              <button className={`btn player-size m-1 ${90 === this.state.player1Size ? "active2" : ""}`} data-size="90" onClick={this.handlePlayerOneSize}>Small</button>
              <button className={`btn player-size m-1 ${130 === this.state.player1Size ? "active2" : ""}`} data-size="130" onClick={this.handlePlayerOneSize}>Medium</button>
              <button className={`btn player-size m-1 ${210 === this.state.player1Size ? "active2" : ""}`} data-size="210" onClick={this.handlePlayerOneSize}>Large</button>
            </div>
          </div>
          <hr></hr>

          {/* PLAYER TWO OPTIONS */}
          <div className="mb-4">
            <h1 className="options-text mb-4">Player Two</h1>
            <div>
              <p className="options-text1"> Color</p>
              <button className={`player2-color1 m-1 ${"red" === this.state.player2Color ? "active" : ""}`} data-color="red" onClick={this.handlePlayerTwoColor}></button>
              <button className={`player2-color2 m-1 ${"blue" === this.state.player2Color ? "active" : ""}`} data-color="blue" onClick={this.handlePlayerTwoColor}></button>
              <button className={`player2-color3 m-1 ${"lime" === this.state.player2Color ? "active" : ""}`} data-color="lime" onClick={this.handlePlayerTwoColor}></button>
              <button className={`player2-color4 m-1 ${"yellow" === this.state.player2Color ? "active" : ""}`} data-color="yellow" onClick={this.handlePlayerTwoColor}></button>
              <button className={`player2-color5 m-1 ${"#FF3399" === this.state.player2Color ? "active" : ""}`} data-color="#FF3399" onClick={this.handlePlayerTwoColor}></button>
              <button className={`player2-color6 m-1 ${"purple" === this.state.player2Color ? "active" : ""}`} data-color="purple" onClick={this.handlePlayerTwoColor}></button>
              <button className={`player2-color7 m-1 ${"orange" === this.state.player2Color ? "active" : ""}`} data-color="orange" onClick={this.handlePlayerTwoColor}></button>
              <button className={`player2-color8 m-1 ${"mediumspringgreen" === this.state.player2Color ? "active" : ""}`} data-color="mediumspringgreen" onClick={this.handlePlayerTwoColor}></button>
              <p className="options-text1 mt-3">Paddle size</p>
              <button className={`btn player-size m-1 ${90 === this.state.player2Size ? "active2" : ""}`} data-size="90" onClick={this.handlePlayerTwoSize}>Small</button>
              <button className={`btn player-size m-1 ${130 === this.state.player2Size ? "active2" : ""}`} data-size="130" onClick={this.handlePlayerTwoSize}>Medium</button>
              <button className={`btn player-size m-1 ${210 === this.state.player2Size ? "active2" : ""}`} data-size="210" onClick={this.handlePlayerTwoSize}>Large</button>
            </div>
          </div>
          <hr></hr>

          {/* BALL OPTIONS */}
          <div className="mb-4">
            <h1 className="options-text mb-4">Ball</h1>
            <div>
              <p className="options-text1"> Color</p>
              <button className={`ball-color1 m-1 ${"red" === this.state.ballColor ? "active" : ""}`} data-color="red" onClick={this.handleBallColor}></button>
              <button className={`ball-color2 m-1 ${"blue" === this.state.ballColor ? "active" : ""}`} data-color="blue" onClick={this.handleBallColor}></button>
              <button className={`ball-color3 m-1 ${"lime" === this.state.ballColor ? "active" : ""}`} data-color="lime" onClick={this.handleBallColor}></button>
              <button className={`ball-color4 m-1 ${"yellow" === this.state.ballColor ? "active" : ""}`} data-color="yellow" onClick={this.handleBallColor}></button>
              <button className={`ball-color5 m-1 ${"#FF3399" === this.state.ballColor ? "active" : ""}`} data-color="#FF3399" onClick={this.handleBallColor}></button>
              <button className={`ball-color6 m-1 ${"purple" === this.state.ballColor ? "active" : ""}`} data-color="purple" onClick={this.handleBallColor}></button>
              <button className={`ball-color7 m-1 ${"orange" === this.state.ballColor ? "active" : ""}`} data-color="orange" onClick={this.handleBallColor}></button>
              <button className={`ball-color8 m-1 ${"mediumspringgreen" === this.state.ballColor ? "active" : ""}`} data-color="mediumspringgreen" onClick={this.handleBallColor}></button>
            </div>
          </div>
          <hr></hr>

          {/* BACKGROUND */}
          <div className="mb-4">
            <h1 className="options-text mb-3">Background Image</h1>
            <form className="form">
              <Input
                value={this.state.imageURL}
                onChange={this.handleInputChange}
                name="imageURL"
                placeholder="Image URL"
                id="form"
              />
            </form>
          </div>

          {/* Save Button */}
          <Link to={"/"}><button className="btn mt-4 mb-4" onClick={this.handleSave}>Save</button></Link>
        </div>
      </>
    );
  }
}

export default Options;
