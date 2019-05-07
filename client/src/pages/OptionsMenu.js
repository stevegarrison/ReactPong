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
    return (
      <>
        <div className="text-center text-light container">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <h1 className="header mt-2">Options</h1>
              <p className="mt-2">(Default style set to white on black)</p>
              <hr></hr>


              {/* Options */}
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
                      <button className={`player1-color1 m-1 ${"red" === this.state.player1Color ? "active" : ""}`} data-color="red" onClick={this.handlePlayerOneColor}></button>
                      <button className={`player1-color2 m-1 ${"blue" === this.state.player1Color ? "active" : ""}`} data-color="blue" onClick={this.handlePlayerOneColor}></button>
                      <button className={`player1-color3 m-1 ${"lime" === this.state.player1Color ? "active" : ""}`} data-color="lime" onClick={this.handlePlayerOneColor}></button>
                      <button className={`player1-color4 m-1 ${"yellow" === this.state.player1Color ? "active" : ""}`} data-color="yellow" onClick={this.handlePlayerOneColor}></button>
                      <button className={`player1-color5 m-1 ${"#FF3399" === this.state.player1Color ? "active" : ""}`} data-color="#FF3399" onClick={this.handlePlayerOneColor}></button>
                      <button className={`player1-color6 m-1 ${"purple" === this.state.player1Color ? "active" : ""}`} data-color="purple" onClick={this.handlePlayerOneColor}></button>
                      <button className={`player1-color7 m-1 ${"orange" === this.state.player1Color ? "active" : ""}`} data-color="orange" onClick={this.handlePlayerOneColor}></button>
                      <button className={`player1-color8 m-1 ${"mediumspringgreen" === this.state.player1Color ? "active" : ""}`} data-color="mediumspringgreen" onClick={this.handlePlayerOneColor}></button>
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
                      <button className={`player2-color1 m-1 ${"red" === this.state.player2Color ? "active" : ""}`} data-color="red" onClick={this.handlePlayerTwoColor}></button>
                      <button className={`player2-color2 m-1 ${"blue" === this.state.player2Color ? "active" : ""}`} data-color="blue" onClick={this.handlePlayerTwoColor}></button>
                      <button className={`player2-color3 m-1 ${"lime" === this.state.player2Color ? "active" : ""}`} data-color="lime" onClick={this.handlePlayerTwoColor}></button>
                      <button className={`player2-color4 m-1 ${"yellow" === this.state.player2Color ? "active" : ""}`} data-color="yellow" onClick={this.handlePlayerTwoColor}></button>
                      <button className={`player2-color5 m-1 ${"#FF3399" === this.state.player2Color ? "active" : ""}`} data-color="#FF3399" onClick={this.handlePlayerTwoColor}></button>
                      <button className={`player2-color6 m-1 ${"purple" === this.state.player2Color ? "active" : ""}`} data-color="purple" onClick={this.handlePlayerTwoColor}></button>
                      <button className={`player2-color7 m-1 ${"orange" === this.state.player2Color ? "active" : ""}`} data-color="orange" onClick={this.handlePlayerTwoColor}></button>
                      <button className={`player2-color8 m-1 ${"mediumspringgreen" === this.state.player2Color ? "active" : ""}`} data-color="mediumspringgreen" onClick={this.handlePlayerTwoColor}></button>
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
                      <p className="options-text1 mt-3">(OR choose a preset) </p>
                    </div>
                    <div className="col-md-8">
                        <button className={`btn player-background m-1 ${"https://cdn.pixabay.com/photo/2017/08/15/08/23/galaxy-2643089_1280.jpg" === this.state.imageURL ? "active2" : ""}`} data-image="https://cdn.pixabay.com/photo/2017/08/15/08/23/galaxy-2643089_1280.jpg" onClick={this.handleImageURL}>Space</button>
                        <button className={`btn player-background m-1 ${"https://cdn.pixabay.com/photo/2015/07/02/10/19/bamboo-828703_1280.jpg" === this.state.imageURL ? "active2" : ""}`} data-image="https://cdn.pixabay.com/photo/2015/07/02/10/19/bamboo-828703_1280.jpg" onClick={this.handleImageURL}>Jungle</button>
                        <button className={`btn player-background m-1 ${"https://cdn.pixabay.com/photo/2015/03/26/09/47/sky-690293_1280.jpg" === this.state.imageURL ? "active2" : ""}`} data-image="https://cdn.pixabay.com/photo/2015/03/26/09/47/sky-690293_1280.jpg" onClick={this.handleImageURL}>Clouds</button>
                        <button className={`btn player-background m-1 ${"https://cdn.pixabay.com/photo/2012/03/04/00/02/animal-21731_1280.jpg" === this.state.imageURL ? "active2" : ""}`} data-image="https://cdn.pixabay.com/photo/2012/03/04/00/02/animal-21731_1280.jpg" onClick={this.handleImageURL}>Ocean</button>
                        <button className={`btn player-background m-1 ${"https://cdn.pixabay.com/photo/2016/09/07/11/37/tropical-1651426_1280.jpg" === this.state.imageURL ? "active2" : ""}`} data-image="https://cdn.pixabay.com/photo/2016/09/07/11/37/tropical-1651426_1280.jpg" onClick={this.handleImageURL}>Beach</button>
                        <button className={`btn player-background m-1 ${"https://media3.giphy.com/media/Fh3ezinVpi4yk/giphy.gif?cid=790b76115cd1cbbb47556e436b4fdaaa&rid=giphy.gif" === this.state.imageURL ? "active2" : ""}`} data-image="https://media3.giphy.com/media/Fh3ezinVpi4yk/giphy.gif?cid=790b76115cd1cbbb47556e436b4fdaaa&rid=giphy.gif" onClick={this.handleImageURL}>Winter</button>
                        <button className={`btn player-background m-1 ${"https://cdn.pixabay.com/photo/2015/03/03/01/51/lava-656827_1280.jpg" === this.state.imageURL ? "active2" : ""}`} data-image="https://cdn.pixabay.com/photo/2015/03/03/01/51/lava-656827_1280.jpg" onClick={this.handleImageURL}>Lava</button>
                        <button className={`btn player-background m-1 ${"https://cdn.pixabay.com/photo/2016/08/09/21/54/yellowstone-national-park-1581879_1280.jpg" === this.state.imageURL ? "active2" : ""}`} data-image="https://cdn.pixabay.com/photo/2016/08/09/21/54/yellowstone-national-park-1581879_1280.jpg" onClick={this.handleImageURL}>Snow</button>
                    </div>
                  </div>
                </div>
              </div>
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
