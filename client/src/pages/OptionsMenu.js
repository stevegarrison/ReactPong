import React, { Component } from "react";
import "../styles/optionsMenu.css"
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Input, TextArea, FormBtn } from "../components/Input";

let imageURL = "";
let player1Color = "";
let player2Color = "";
let ballColor = "";


class Options extends Component {

  state = {
    player1Color: "",
    player2Color: "",
    ballColor: "",
    imageURL: ""
  };

  handleSave = event => {
    // Save Options to DB
    API.saveOptions({
      player1Color: this.state.player1Color,
      player2Color: this.state.player2Color,
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
          <Link to={"/"}><button className="btn mb-2 mt-2" onClick={this.handleReturnHome}>Home</button></Link>
          <p className="mt-2">(Default values set to white)</p>
          <hr></hr>

          {/* Options */}
          <div className="mb-4">
            <h1 className="options-text mb-2">Player One Skin</h1>
            <button className={`player1-color1 m-1 ${"red" === this.state.player1Color ? "active" : ""}`} data-color="red" onClick={this.handlePlayerOneColor}></button>
            <button className={`player1-color2 m-1 ${"blue" === this.state.player1Color ? "active" : ""}`} data-color="blue" onClick={this.handlePlayerOneColor}></button>
            <button className={`player1-color3 m-1 ${"lime" === this.state.player1Color ? "active" : ""}`} data-color="lime" onClick={this.handlePlayerOneColor}></button>
            <button className={`player1-color4 m-1 ${"yellow" === this.state.player1Color ? "active" : ""}`} data-color="yellow" onClick={this.handlePlayerOneColor}></button>
            <button className={`player1-color5 m-1 ${"#FF3399" === this.state.player1Color ? "active" : ""}`} data-color="#FF3399" onClick={this.handlePlayerOneColor}></button>
            <button className={`player1-color6 m-1 ${"purple" === this.state.player1Color ? "active" : ""}`} data-color="purple" onClick={this.handlePlayerOneColor}></button>
            <button className={`player1-color7 m-1 ${"orange" === this.state.player1Color ? "active" : ""}`} data-color="orange" onClick={this.handlePlayerOneColor}></button>
            <button className={`player1-color8 m-1 ${"silver" === this.state.player1Color ? "active" : ""}`} data-color="silver" onClick={this.handlePlayerOneColor}></button>
          </div>
          <div className="mb-4">
            <h1 className="options-text mb-2">Player Two Skin</h1>
            <button className={`player2-color1 m-1 ${"red" === this.state.player2Color ? "active" : ""}`} data-color="red" onClick={this.handlePlayerTwoColor}></button>
            <button className={`player2-color2 m-1 ${"blue" === this.state.player2Color ? "active" : ""}`} data-color="blue" onClick={this.handlePlayerTwoColor}></button>
            <button className={`player2-color3 m-1 ${"lime" === this.state.player2Color ? "active" : ""}`} data-color="lime" onClick={this.handlePlayerTwoColor}></button>
            <button className={`player2-color4 m-1 ${"yellow" === this.state.player2Color ? "active" : ""}`} data-color="yellow" onClick={this.handlePlayerTwoColor}></button>
            <button className={`player2-color5 m-1 ${"#FF3399" === this.state.player2Color ? "active" : ""}`} data-color="#FF3399" onClick={this.handlePlayerTwoColor}></button>
            <button className={`player2-color6 m-1 ${"purple" === this.state.player2Color ? "active" : ""}`} data-color="purple" onClick={this.handlePlayerTwoColor}></button>
            <button className={`player2-color7 m-1 ${"orange" === this.state.player2Color ? "active" : ""}`} data-color="orange" onClick={this.handlePlayerTwoColor}></button>
            <button className={`player2-color8 m-1 ${"silver" === this.state.player2Color ? "active" : ""}`} data-color="silver" onClick={this.handlePlayerTwoColor}></button>
          </div>
          <div className="mb-4">
            <h1 className="options-text mb-2">Ball Color</h1>
            <button className={`ball-color1 m-1 ${"red" === this.state.ballColor ? "active" : ""}`} data-color="red" onClick={this.handleBallColor}></button>
            <button className={`ball-color2 m-1 ${"blue" === this.state.ballColor ? "active" : ""}`} data-color="blue" onClick={this.handleBallColor}></button>
            <button className={`ball-color3 m-1 ${"lime" === this.state.ballColor ? "active" : ""}`} data-color="lime" onClick={this.handleBallColor}></button>
            <button className={`ball-color4 m-1 ${"yellow" === this.state.ballColor ? "active" : ""}`} data-color="yellow" onClick={this.handleBallColor}></button>
            <button className={`ball-color5 m-1 ${"#FF3399" === this.state.ballColor ? "active" : ""}`} data-color="#FF3399" onClick={this.handleBallColor}></button>
            <button className={`ball-color6 m-1 ${"purple" === this.state.ballColor ? "active" : ""}`} data-color="purple" onClick={this.handleBallColor}></button>
            <button className={`ball-color7 m-1 ${"orange" === this.state.ballColor ? "active" : ""}`} data-color="orange" onClick={this.handleBallColor}></button>
            <button className={`ball-color8 m-1 ${"silver" === this.state.ballColor ? "active" : ""}`} data-color="silver" onClick={this.handleBallColor}></button>
          </div>
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
