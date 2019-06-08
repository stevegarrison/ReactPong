import React, { Component } from "react";
import "../styles/optionsMenu.css";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Input } from "../components/Input";
import Slider from 'react-rangeslider';


let imageURL = "";
let player1Color = "";
let player1Size = "";
let player2Color = "";
let player2Size = "";
let ballColor = "";
let value1 = 0;
let multiBall = "";
let paddleShrink = "";
let fastBall = "";

class Options extends Component {

  state = {
    player1Color: "",
    player2Color: "",
    ballColor: "",
    imageURL: "",
    player1Size: 130,
    player2Size: 130,
    value: 5,
    multiBall: "false",
    paddleShrink: "false",
    fastBall: "false"
  };

  handleScoreChange = value => {
    value1 = value;
    console.log(value1);
    // value = event.target.getAttribute("value");
    this.setState({
      value: value1
    })
  };

  handleMultiBall = event => {
    event.preventDefault();
    multiBall = event.target.getAttribute("data-multiBall");
    console.log(multiBall);
    // value = event.target.getAttribute("value");
    this.setState({
      multiBall: multiBall
    })
  };

  handlePaddleShrink = event => {
    event.preventDefault();
    paddleShrink = event.target.getAttribute("data-paddleShrink");
    console.log(paddleShrink);
    // value = event.target.getAttribute("value");
    this.setState({
      paddleShrink: paddleShrink
    })
  };

  handleFastBall = event => {
    event.preventDefault();
    fastBall = event.target.getAttribute("data-fastBall");
    console.log(fastBall);
    // value = event.target.getAttribute("value");
    this.setState({
      fastBall: fastBall
    })
  };

  handleSave = event => {
    // Save Options to DB
    API.saveOptions({
      player1Color: this.state.player1Color,
      player1Size: this.state.player1Size,
      player2Color: this.state.player2Color,
      player2Size: this.state.player2Size,
      ballColor: this.state.ballColor,
      imageURL: this.state.imageURL,
      value: this.state.value,
      multiBall: this.state.multiBall,
      paddleShrink: this.state.paddleShrink,
      fastBall: this.state.fastBall
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

  handleImageURL = event => {
    event.preventDefault();
    imageURL = event.target.getAttribute("data-image");
    this.setState({ imageURL: imageURL });
    console.log("Theme: " + imageURL);
  }

  handleBallColor = event => {
    event.preventDefault();
    ballColor = event.target.getAttribute("data-color");
    this.setState({ ballColor: ballColor });
    console.log("Ball color: " + ballColor);
  }

  render() {

    const { value } = this.state;

    return (
      <>
        <div className="text-center text-light container">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <h1 className="header mt-2">Options</h1>
              <p className="mt-2">(Default style set to white on black)</p>
              <hr></hr>

              {/* Set score limit */}
              <div className="row mb-4">
                <div className="col-md-4" id="flex">
                  <h1 className="options-text">Score Limit</h1>
                </div>
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-8">
                      <div className='slider'>
                        <Slider
                          min={1}
                          max={15}
                          value={value}
                          onChange={this.handleScoreChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="value">{value === 1 ? <p id="suddenDeath">SUDDEN DEATH!</p> : value}</div>
                    </div>
                  </div>
                </div>
              </div>
              <hr></hr>

              {/* EVENTS */}
              <div className="row mb-4">
                <div className="col-md-4" id="flex">
                  <h1 className="options-text">Events</h1>
                </div>
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-4">
                      <p className="options-text1">Multi-ball: </p>
                    </div>
                    <div className="col-md-8">
                    <button className={`btn multiBall m-1 ${"true" === this.state.multiBall ? "active4" : ""}`} data-multiBall="true" onClick={this.handleMultiBall}>On</button>
                      <button className={`btn multiBall m-1 ${"false" === this.state.multiBall ? "active4" : ""}`} data-multiBall="false" onClick={this.handleMultiBall}>Off</button>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <p className="options-text1">Paddle Shrinker: </p>
                    </div>
                    <div className="col-md-8">
                    <button className={`btn paddleShrink m-1 ${"true" === this.state.paddleShrink ? "active4" : ""}`} data-paddleShrink="true" onClick={this.handlePaddleShrink}>On</button>
                      <button className={`btn paddleShrink m-1 ${"false" === this.state.paddleShrink ? "active4" : ""}`} data-paddleShrink="false" onClick={this.handlePaddleShrink}>Off</button>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <p className="options-text1">Fast Ball: </p>
                    </div>
                    <div className="col-md-8">
                    <button className={`btn fastBall m-1 ${"true" === this.state.fastBall ? "active4" : ""}`} data-fastBall="true" onClick={this.handleFastBall}>On</button>
                      <button className={`btn fastBall m-1 ${"false" === this.state.fastBall ? "active4" : ""}`} data-fastBall="false" onClick={this.handleFastBall}>Off</button>
                    </div>
                  </div>
                </div>
              </div>
              <hr></hr>

              {/* Player one Options */}
              <div className="row mb-4">
                <div className="col-md-4" id="flex">
                  <h1 className="options-text">Player One</h1>
                </div>
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-4">
                      <p className="options-text1">Color: </p>
                    </div>
                    <div className="col-md-8">
                      <button id="color-btn" className={`player1-color1 m-1 ${"red" === this.state.player1Color ? "active" : ""}`} data-color="red" onClick={this.handlePlayerOneColor}></button>
                      <button id="color-btn" className={`player1-color2 m-1 ${"blue" === this.state.player1Color ? "active" : ""}`} data-color="blue" onClick={this.handlePlayerOneColor}></button>
                      <button id="color-btn" className={`player1-color3 m-1 ${"lime" === this.state.player1Color ? "active" : ""}`} data-color="lime" onClick={this.handlePlayerOneColor}></button>
                      <button id="color-btn" className={`player1-color4 m-1 ${"yellow" === this.state.player1Color ? "active" : ""}`} data-color="yellow" onClick={this.handlePlayerOneColor}></button>
                      <button id="color-btn" className={`player1-color5 m-1 ${"#FF3399" === this.state.player1Color ? "active" : ""}`} data-color="#FF3399" onClick={this.handlePlayerOneColor}></button>
                      <button id="color-btn" className={`player1-color6 m-1 ${"purple" === this.state.player1Color ? "active" : ""}`} data-color="purple" onClick={this.handlePlayerOneColor}></button>
                      <button id="color-btn" className={`player1-color7 m-1 ${"orange" === this.state.player1Color ? "active" : ""}`} data-color="orange" onClick={this.handlePlayerOneColor}></button>
                      <button id="color-btn" className={`player1-color8 m-1 ${"mediumspringgreen" === this.state.player1Color ? "active" : ""}`} data-color="mediumspringgreen" onClick={this.handlePlayerOneColor}></button>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <p className="options-text1 mt-3" id="flex">Paddle size: </p>
                    </div>
                    <div className="col-md-8 mt-3">
                      <button className={`btn player-size m-1 ${90 === this.state.player1Size ? "active2" : ""}`} data-size="90" onClick={this.handlePlayerOneSize}>Small</button>
                      <button className={`btn player-size m-1 ${130 === this.state.player1Size ? "active2" : ""}`} data-size="130" onClick={this.handlePlayerOneSize}>Medium</button>
                      <button className={`btn player-size m-1 ${210 === this.state.player1Size ? "active2" : ""}`} data-size="210" onClick={this.handlePlayerOneSize}>Large</button>
                    </div>
                  </div>
                </div>
              </div>
              <hr></hr>

              {/* PLAYER TWO OPTIONS */}
              <div className="row mb-4">
                <div className="col-md-4" id="flex">
                  <h1 className="options-text">Player Two</h1>
                </div>
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-4">
                      <p className="options-text1 mt-4">Color: </p>
                    </div>
                    <div className="col-md-8 mt-4">
                      <button id="color-btn" className={`player2-color1 m-1 ${"red" === this.state.player2Color ? "active" : ""}`} data-color="red" onClick={this.handlePlayerTwoColor}></button>
                      <button id="color-btn" className={`player2-color2 m-1 ${"blue" === this.state.player2Color ? "active" : ""}`} data-color="blue" onClick={this.handlePlayerTwoColor}></button>
                      <button id="color-btn" className={`player2-color3 m-1 ${"lime" === this.state.player2Color ? "active" : ""}`} data-color="lime" onClick={this.handlePlayerTwoColor}></button>
                      <button id="color-btn" className={`player2-color4 m-1 ${"yellow" === this.state.player2Color ? "active" : ""}`} data-color="yellow" onClick={this.handlePlayerTwoColor}></button>
                      <button id="color-btn" className={`player2-color5 m-1 ${"#FF3399" === this.state.player2Color ? "active" : ""}`} data-color="#FF3399" onClick={this.handlePlayerTwoColor}></button>
                      <button id="color-btn" className={`player2-color6 m-1 ${"purple" === this.state.player2Color ? "active" : ""}`} data-color="purple" onClick={this.handlePlayerTwoColor}></button>
                      <button id="color-btn" className={`player2-color7 m-1 ${"orange" === this.state.player2Color ? "active" : ""}`} data-color="orange" onClick={this.handlePlayerTwoColor}></button>
                      <button id="color-btn" className={`player2-color8 m-1 ${"mediumspringgreen" === this.state.player2Color ? "active" : ""}`} data-color="mediumspringgreen" onClick={this.handlePlayerTwoColor}></button>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <p className="options-text1 mt-3">Paddle size: </p>
                    </div>
                    <div className="col-md-8 mt-3">
                      <button className={`btn player-size m-1 ${90 === this.state.player2Size ? "active2" : ""}`} data-size="90" onClick={this.handlePlayerTwoSize}>Small</button>
                      <button className={`btn player-size m-1 ${130 === this.state.player2Size ? "active2" : ""}`} data-size="130" onClick={this.handlePlayerTwoSize}>Medium</button>
                      <button className={`btn player-size m-1 ${210 === this.state.player2Size ? "active2" : ""}`} data-size="210" onClick={this.handlePlayerTwoSize}>Large</button>
                    </div>
                  </div>
                </div>
              </div>
              <hr></hr>

              {/* BALL OPTIONS */}
              <div className="row mb-4">
                <div className="col-md-4" id="flex">
                  <h1 className="options-text">Ball</h1>
                </div>
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-4">
                      <p className="options-text1 mt-3">Color: </p>
                    </div>
                    <div className="col-md-8 mt-3">
                      <button id="color-btn" className={`ball-color1 m-1 ${"red" === this.state.ballColor ? "active" : ""}`} data-color="red" onClick={this.handleBallColor}></button>
                      <button id="color-btn" className={`ball-color2 m-1 ${"blue" === this.state.ballColor ? "active" : ""}`} data-color="blue" onClick={this.handleBallColor}></button>
                      <button id="color-btn" className={`ball-color3 m-1 ${"lime" === this.state.ballColor ? "active" : ""}`} data-color="lime" onClick={this.handleBallColor}></button>
                      <button id="color-btn" className={`ball-color4 m-1 ${"yellow" === this.state.ballColor ? "active" : ""}`} data-color="yellow" onClick={this.handleBallColor}></button>
                      <button id="color-btn" className={`ball-color5 m-1 ${"#FF3399" === this.state.ballColor ? "active" : ""}`} data-color="#FF3399" onClick={this.handleBallColor}></button>
                      <button id="color-btn" className={`ball-color6 m-1 ${"purple" === this.state.ballColor ? "active" : ""}`} data-color="purple" onClick={this.handleBallColor}></button>
                      <button id="color-btn" className={`ball-color7 m-1 ${"orange" === this.state.ballColor ? "active" : ""}`} data-color="orange" onClick={this.handleBallColor}></button>
                      <button id="color-btn" className={`ball-color8 m-1 ${"mediumspringgreen" === this.state.ballColor ? "active" : ""}`} data-color="mediumspringgreen" onClick={this.handleBallColor}></button>
                    </div>
                  </div>
                </div>
              </div>
              <hr></hr>

              {/* BACKGROUND */}
              <div className="row mb-4">
                <div className="col-md-4" id="flex">
                  <h1 className="options-text">Background</h1>
                </div>
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-4">
                      <p className="options-text1 mt-3">Image Adress: </p>
                    </div>
                    <div className="col-md-8">
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
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <p className="options-text1 mt-3">Presets:</p>
                    </div>
                    <div className="col-md-8">
                      <button className={`btn player-background m-1 ${"../resources/images/space.jpg" === this.state.imageURL ? "active2" : ""}`} data-image={require("../resources/images/space.jpg")} onClick={this.handleImageURL}>Space</button>
                      <button className={`btn player-background m-1 ${"../resources/images/jungle.jpg" === this.state.imageURL ? "active2" : ""}`} data-image={require("../resources//images/jungle.jpg")} onClick={this.handleImageURL}>Jungle</button>
                      <button className={`btn player-background m-1 ${"../resources/images/clouds.jpg" === this.state.imageURL ? "active2" : ""}`} data-image={require("../resources/images/clouds.jpg")} onClick={this.handleImageURL}>Clouds</button>
                      <button className={`btn player-background m-1 ${"../resources/images/ocean.jpg" === this.state.imageURL ? "active2" : ""}`} data-image={require("../resources/images/ocean.jpg")} onClick={this.handleImageURL}>Ocean</button>
                      <button className={`btn player-background m-1 ${"../resources/images/beach.jpg" === this.state.imageURL ? "active2" : ""}`} data-image={require("../resources/images/beach.jpg")} onClick={this.handleImageURL}>Beach</button>
                      <button className={`btn player-background m-1 ${"../resources/imagess/winter.jpg" === this.state.imageURL ? "active2" : ""}`} data-image={require("../resources/images/winter.jpg")} onClick={this.handleImageURL}>Winter</button>
                      <button className={`btn player-background m-1 ${"../resources/images/lava.jpg" === this.state.imageURL ? "active2" : ""}`} data-image={require("../resources/images/lava.jpg")} onClick={this.handleImageURL}>Lava</button>
                      <button className={`btn player-background m-1 ${"../resources/images/snow.jpg" === this.state.imageURL ? "active2" : ""}`} data-image={require("../resources/images/snow.jpg")} onClick={this.handleImageURL}>Snow</button>
                    </div>
                  </div>
                </div>
              </div>
              <hr></hr>
              {/* Save Button */}
              <Link to={"/"}><button className="save-btn mt-4 mb-4" onClick={this.handleSave}>Save</button></Link>
            </div>

            <div className="col-md-1">
            </div>
            <Link onClick={this.resetGame} to={"/"}><i id="home-icon" className="m-3 fas fa-home fa-3x"></i></Link>
          </div>
        </div>

      </>
    );
  }
}

export default Options;
