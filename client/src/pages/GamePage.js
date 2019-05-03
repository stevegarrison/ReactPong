import React, { Component } from "react";
import "../styles/game.css"
import API from "../utils/API";
import { Link } from "react-router-dom";
import GameCom from "../components/GameCom"

let playerOneScore = 0;
let playerTwoScore = 0;

class GamePage extends Component {

    state = {
        player1Color: "",
        player2Color: "",
        ballColor: "",
        imageURL: ""
      };
  
    componentDidMount() {
        this.loadOptions();
      }
    
      loadOptions = () => {
        console.log("LOADED OPTIONS (GamePage.js)");
        API.getOptions()
          .then(res => {
            console.log("res (GamePage.js): " + res);
            console.log(this.state);
            this.setState({ player1Color: res.player1Color,  player2Color: res.player2Color, ballColor: res.ballColor, imageURL: res.imageURL});
            console.log("Made it")}
          )
          .catch(err => console.log(err));
      };

    m_nGameUIWidth = 1400;
    m_nGameUIHeight = 700;

    
    render() {
        return (
            <>
                <div className="text-center">
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-10">
                            {/* Player Scores */}
                            <div className="row player-text mt-3 mb-4">
                                <div className="col-md-6">
                                    <h2>Player One: {playerOneScore}</h2>
                                </div>
                                <div className="col-md-6">
                                    <h2>Player Two: {playerTwoScore}</h2>
                                </div>
                            </div>
                            {/* Game UI */}
                            <div className="row">
                                <div className="gameUI" style={{width:this.m_nGameUIWidth, height:this.m_nGameUIHeight}}>
                                    <GameCom gameUIWidth={this.m_nGameUIWidth} gameUIHeight={this.m_nGameUIHeight}></GameCom>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-1">
                            <div>
                                <Link to={"/"}><i id="home-icon" className="m-3 fas fa-home fa-2x"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default GamePage;
