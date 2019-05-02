import React, { Component } from "react";
import "../styles/game.css"
import API from "../utils/API";
import { Link } from "react-router-dom";
import GameLevel from "../components/GameLevel";

let playerOneScore = 0;
let playerTwoScore = 0;

class Game extends Component {

    

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
                                <div className="gameUI">

                                {/* GAME COMPONENT GOES HERE */}

                                    {/* Paddle one */}
                                    <div className="paddleOne" style={{background: "lime"}}>
                                    </div>

                                    {/* Paddle two */}
                                    <div className="paddleTwo" style={{background: "red"}}>
                                    </div>

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

export default Game;
