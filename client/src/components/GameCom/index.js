/**
 * 
 *      Game.js
 * 
 */

import React, { Component } from "react"
import Paddle from "../../Game/Paddle"
import Ball from "../../Game/Ball"
import { Link } from "react-router-dom";
import "../../styles/game.css"
import API from "../../utils/API";


var contextWait = null;


class GameCom extends Component {

    startTime = 0.0;
    m_nScoreToWin = 20;

    state = {
        //Settings
        player1Color: "white",
        player2Color: "white",
        ballColor: "white",
        imageURL: "",
        gamePaused: false,
        gameStart: false,

        context: null,
        // paddle: null,
        ball: null,
        gameUIWidth: 0,
        gameUIHeight: 0,

        player1: {
            paddle: null,
            score: 0

        },

        player2: {
            paddle: null,
            score: 0
        },

        keys: {
            w: 0,
            s: 0,
            i: 0,
            k: 0
        }
    };


    componentDidMount() {
        //this.waitForContext();
        // this.update();
        console.log("mounted");
        this.loadOptions(() => {

            console.log(this.state);
            const canvas = this.refs.canvas;
            this.setState({ context: canvas.getContext("2d") });

            // set game height and width
            this.state.gameUIWidth = 1400;
            this.state.gameUIHeight = 700;

            const color = "white";

            if (!this.state.player1Color)
                this.setState({ player1Color: color });
            if (!this.state.player2Color)
                this.setState({ player2Color: color });
            if (!this.state.ballColor)
                this.setState({ ballColor: color });

            this.state.player1.paddle = new Paddle(this.state.gameUIWidth, this.state.gameUIHeight, this.state.player1Color);
            this.state.player2.paddle = new Paddle(this.state.gameUIWidth, this.state.gameUIHeight, this.state.player2Color);
            this.state.player1.paddle.setPositionX(100);
            this.state.player2.paddle.setPositionX(1260);
            //this.state.player2.paddle.setPositionX(1360);
            this.state.ball = new Ball(this.state.gameUIWidth, this.state.gameUIHeight, this.state.ballColor);

            document.addEventListener("keydown", this.handleInput, false);
            document.addEventListener("keyup", this.handleKeyUp, false);
            requestAnimationFrame(() => { this.update() });
        });
        //console.log(canvas);
    }

    loadOptions = (_callback) => {
        console.log("LOADED OPTIONS (GamePage.js)");
        API.getOptions()
            .then(res => {
                // I DON'T THINK I'M GETTING HERE
                console.log("res (GamePage.js): ", res.data);
                this.setState({ player1Color: res.data[0].player1Color, player2Color: res.data[0].player2Color, ballColor: res.data[0].ballColor, imageURL: res.data[0].imageURL });
                console.log("bc: " + this.state.ballColor);
                console.log(this.state);
                _callback();
            })
            .catch(err => console.log("GameCon console", err));
    };

    setKey(_key, _value) {

        var newKeys = { ...this.state.keys };
        switch (_key) {
            case 'w':
                newKeys.w = _value;
                break;
            case 's':
                newKeys.s = _value;
                break;
            case 'i':
                newKeys.i = _value;
                break;
            case 'k':
                newKeys.k = _value;
                break;
            default:
                break;

        };

        this.setState({ keys: newKeys });
    }

    checkCollision() {

        this.state.player1.paddle.checkForCollision(this.state.ball);
        this.state.player2.paddle.checkForCollision(this.state.ball);
    }

    handleInput = _event => {

        if (this.state.gameStart)
            this.setState({gameStart: false});

        //console.log(_event);
        switch (_event.key) {
            case 'w':
                this.setKey('w', 1);
                break;
            case 's':
                this.setKey('s', 1);
                break;
            case 'i':
                this.setKey('i', 1);
                break;
            case 'k':
                this.setKey('k', 1);
                break;
            case 'p':
                this.pauseGame();
                break;
                case 'u':
                this.unPauseGame();
                break;
            default:
                break;
        };
    }

    handleKeyUp = _event => { 
        switch (_event.key) {
            case 'w':
                this.setKey('w', 0);
                break;
            case 's':
                this.setKey('s', 0);
                break;
            case 'i':
                this.setKey('i', 0);
                break;
            case 'k':
                this.setKey('k', 0);
                break;
            default:
                break;
        };
    }

    processInput(_deltaTime) {
  
        if (this.state.keys.w === 1) {

            this.state.player1.paddle.movePaddle("up", _deltaTime);
        }
        if (this.state.keys.s === 1) {

            this.state.player1.paddle.movePaddle("down", _deltaTime);
        }
        if (this.state.keys.i === 1) {

            //this.state.player1.paddle.movePaddle("right", _deltaTime);
            
            this.state.player2.paddle.movePaddle("up", _deltaTime);
        }
        if (this.state.keys.k === 1) {

           // this.state.player1.paddle.movePaddle("left", _deltaTime);
             this.state.player2.paddle.movePaddle("down", _deltaTime);
        }

    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleInput, false);

    }

    pauseGame() { 
        console.log("game paused");
        this.setState({
            gamePaused: true
        });
    }

    unPauseGame() { 
        console.log("game un-paused");
        this.setState({
            gamePaused: false
        });
    }

    toggleGamePause() { 
        this.setState({
            gamePaused: !this.state.gamePaused
        });
    }

    startGame() {

    }

    resetGame() {
        var newState = { ...this.state };
        newState.player1.score = 0;
        newState.player1.paddle.placeAtOrigin();
        newState.player2.score = 0;
        newState.player2.paddle.placeAtOrigin();
        newState.ball.placeAtOrigin();
        newState.keys = { w: 0, s: 0, i: 0, k: 0 };
        newState.gameStart = true;
        this.setState(newState);
    }

    checkForWins() {

        if (this.state.player1.score >= this.m_nScoreToWin) {
            console.log("Player 1 Wins!!!");
            this.resetGame();
        } else if (this.state.player2.score >= this.m_nScoreToWin) {
            console.log("Player 2 Wins!!!");
            this.resetGame();
        }
    }

    update = () => {
   
       // console.log("game paused: " + this.state.gamePaused);
        // console.log("game start: " + this.state.gameStart);
        if (!this.state.gamePaused && !this.state.gameStart) {
            
            // console.log("updating");

            // find the time elapsed
            var currentTime = new Date().getTime();
            var deltaTime = (currentTime - this.startTime) / 1000;
            this.startTime = currentTime;

        
            if (this.state.context) {
                this.state.context.clearRect(0, 0, this.state.gameUIWidth, this.state.gameUIHeight);

                // update input
                this.processInput(deltaTime);

                // update objects
                this.state.ball.update(deltaTime, _sideHit => {
                    switch (_sideHit) {
                        case "left":
                            var newPlayer = { ...this.state.player2 };
                            newPlayer.score++;
                            this.setState({ player2: newPlayer });
                            // console.log("Player 2 score: " + newPlayer.score);
                            break;
                        case "right":
                            var newPlayer = { ...this.state.player1 };
                            newPlayer.score++;
                            this.setState({ player1: newPlayer });
                            // console.log("Player 1 score: " + newPlayer.score);
                            break;
                        default:
                            break;
                    };
                });

                // check for collision
                this.checkCollision();

                // check for player wins
                this.checkForWins();

                // render objects
                this.state.ball.render(this.state.context, this.refs.ballImg, this.state.gameUIWidth, this.state.gameUIHeight);
                this.state.player1.paddle.render(this.state.context, this.refs.image, this.state.player1.posX, this.state.player1.posY);
                this.state.player2.paddle.render(this.state.context, this.refs.image, this.state.player1.posX, this.state.player1.posY);

                //this.state.paddle.render(this.state.context, this.refs.image, this.state.player2.posX, this.state.player2.posY);
            }
        } else { 
            this.startTime = new Date().getTime();
        }
        // Next frame
        requestAnimationFrame(() => { this.update() });

    }


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
                                    <h2>Player One: {this.state.player1.score}</h2>
                                </div>
                                <div className="col-md-6">
                                    <h2>Player Two: {this.state.player2.score}</h2>
                                </div>
                            </div>

                            {/* Game UI */}
                            <div className="row">
                                <canvas
                                    className="gameUI"
                                    style={{ 
                                        backgroundImage: "url(" + this.state.imageURL + ")",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center"
                                    }}
                                    width={this.state.gameUIWidth}
                                    height={this.state.gameUIHeight}
                                    ref="canvas" >

                                    {/* <img style={{ display: "none" }}
                                        ref="image"
                                        src="https://cdn.shopify.com/s/files/1/0784/2279/products/TraditionalPaddle400_1_-_Copy_large.jpg?v=1463152608"
                                        alt="paddleImg" />

                                    <img style={{ display: "none" }}
                                        ref="ballImg"
                                        src="https://www.big5sportinggoods.com/catalogimage/img/product/rwd/large/6165_15086_0001_551_large_03.jpg"
                                        alt="paddleImg" /> */}

                                </canvas>
                                <p>Press Any Key To Begin</p>
                            </div>     
                        </div>

                        <div className="col-md-1">
                            <div>
                                <Link onClick={this.resetGame} to={"/"}><i id="home-icon" className="m-3 fas fa-home fa-2x"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        );
    }

};

export default GameCom;