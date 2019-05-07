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
import AIPaddle from "../../Game/AIPaddle";
import windowSize from "react-window-size";

var contextWait = null;
let winner = "";
let width = 0;
let height = 0;

class GameCom extends Component {

    startTime = 0.0;
    m_nScoreToWin = 0;

    state = {
        //Settings
        player1Color: "white",
        player1Size: 130,
        player2Color: "white",
        player2Size: 130,
        ballColor: "white",
        imageURL: "",
        gamePaused: false,
        gameStart: true,
        gameStart2: false,
        gameStart3: false,
        m_bWon: false,
        gameBorderColor: "white",
        gameBorderWidth: "1px",

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
            aiPaddle: null,
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
            height = this.props.windowHeight;
            width = this.props.windowWidth;
            console.log("DidMount height: " + height);
            console.log("DidMount width: " + width);
            this.state.gameUIWidth = width * .85;
            this.state.gameUIHeight = height * .8;

            const color = "white";
            if (!this.state.player1Color)
                this.setState({ player1Color: color });
            if (!this.state.player2Color)
                this.setState({ player2Color: color });
            if (!this.state.ballColor)
                this.setState({ ballColor: color });

            const size = 130;
            if (!this.state.player1Size)
                this.setState({ player1Size: size });
            if (!this.state.player2Size)
                this.setState({ player2Size: size });

            // create player 1 paddle
            this.state.player1.paddle = new Paddle(this.state.gameUIWidth, this.state.gameUIHeight, this.state.player1Color, this.state.player1Size);
            this.state.player1.paddle.setPositionX(100);

            // check which mode the game was started in
            if (this.props.multiPlayer) {
                this.state.player2.paddle = new Paddle(this.state.gameUIWidth, this.state.gameUIHeight, this.state.player2Color, this.state.player2Size);
                this.state.player2.paddle.setPositionX(this.state.gameUIWidth - 100);
            }
            else { // else its in 1 player mode
                this.state.player2.aiPaddle = new AIPaddle(this.state.gameUIWidth, this.state.gameUIHeight, this.state.player2Color, this.state.player2Size);
                this.state.player2.aiPaddle.setPositionX(this.state.gameUIWidth - 100);

            }

            // create the ball
            this.state.ball = new Ball(this.state.gameUIWidth, this.state.gameUIHeight, this.state.ballColor);

            // add events to listen for
            document.addEventListener("keydown", this.handleInput, false);
            document.addEventListener("keyup", this.handleKeyUp, false);
            window.addEventListener("resize", this.handleResize);

            // request the update function to be called as an animation frame
            requestAnimationFrame(() => { this.update() });
        });
    }



    handleResize = (_event) => {

        console.log("resizing");

        // update the games playing area
        height = this.props.windowHeight;
        width = this.props.windowWidth;
        this.state.gameUIWidth = width * .85;
        this.state.gameUIHeight = height * .8;

        // update the first player
        this.state.player1.paddle.setPositionX(100);
        this.state.player1.paddle.updateGameSize(this.state.gameUIWidth, this.state.gameUIHeight);

        // update the second player or the AI
        if (this.props.multiPlayer) {
            this.state.player2.paddle.setPositionX(this.state.gameUIWidth - 100);
            this.state.player2.paddle.updateGameSize(this.state.gameUIWidth, this.state.gameUIHeight);

        }
        else { // AI
            this.state.player2.aiPaddle.setPositionX(this.state.gameUIWidth - 100);
            this.state.player2.aiPaddle.updateGameSize(this.state.gameUIWidth, this.state.gameUIHeight);
        }

        // update the ball
        this.state.ball.updateGameSize(this.state.gameUIWidth, this.state.gameUIHeight);
    }


    loadOptions = (_callback) => {
        console.log("LOADED OPTIONS (GamePage.js)");
        API.getOptions()
            .then(res => {
                // I DON'T THINK I'M GETTING HERE
                console.log("res (GamePage.js): ", res.data);
                this.setState({
                    player1Color: res.data[0].player1Color,
                    player1Size: res.data[0].player1Size,
                    player2Color: res.data[0].player2Color,
                    player2Size: res.data[0].player2Size,
                    ballColor: res.data[0].ballColor,
                    imageURL: res.data[0].imageURL
                });
                this.m_nScoreToWin = res.data[0].value;
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

        // check first players collision against the ball
        this.state.player1.paddle.checkForCollision(this.state.ball);

        // check the second player or the AIs collision against the ball
        if (this.props.multiPlayer) {
            this.state.player2.paddle.checkForCollision(this.state.ball);
        }
        else { // AI
            this.state.player2.aiPaddle.checkForCollision(this.state.ball);

        }
    }

    handleInput = _event => {

        if (this.state.m_bWon === true) {
            if (_event.keyCode === 32) {  // 32 is the keycode for the space bad
                this.setState({ m_bWon: false });
            }
        }

        if (this.state.gameStart) {
            this.startGame();
            if (_event.keyCode === 32) {
                this.setState({ gameStart: false });
                this.setState({ gameStart3: true });
            }
        }

        // console.log(_event);
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
            // case 'what ever letter or keyboard button you want to check':
            // put whatever you want to happen here
            // break;
            default:
                break;
        };
    }

    handleKeyUp = _event => {

        console.log("here");
        this.state.player1.paddle.clearMovingFlags();
        if (this.props.multiPlayer)
            this.state.player2.paddle.clearMovingFlags();
        else
            this.state.player2.aiPaddle.clearMovingFlags();
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

            // this.state.player1.paddle.movePaddle("right", _deltaTime);
            if (this.props.multiPlayer)
                this.state.player2.paddle.movePaddle("up", _deltaTime);
        }
        if (this.state.keys.k === 1) {

            // this.state.player1.paddle.movePaddle("left", _deltaTime);
            if (this.props.multiPlayer)
                this.state.player2.paddle.movePaddle("down", _deltaTime);
        }

    }

    // when the game closes
    componentWillUnmount() {

        // remove event listeners
        document.removeEventListener("keyup", this.handleKeyUp, false);
        document.removeEventListener("keydown", this.handleInput, false);
        window.removeEventListener("resize", this.handleResize);

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

    pauseGame2() {
        return (
            <div id="modal" className="text-center">
                <h1 id="pong-text">Paused</h1>
                <h4> Press  'U'  to resume</h4>
            </div>
        );
    }

    startGame() {
        return (
            <div id="modal" className="text-center">
                <h1 id="pong-text">PONG!</h1>
                <h3 className="mb-3"> Press the SPACEBAR to play</h3>
                <h7> NOTE: You can pause the game at any moment by pressing the 'P' key</h7>
            </div>
        );
    }

    wonGameLogic() {
        return (
            <div id="modal" className="text-center">
                <h1 className="mb-4 glow2" id="pong-text"> {winner} won!</h1>
                <h5>Press SPACEBAR to play again</h5>
            </div>
        )
    }

    resetGame() {
        var newState = { ...this.state };
        newState.player1.score = 0;
        newState.player1.paddle.placeAtOrigin();
        newState.player2.score = 0;

        if (this.props.multiPlayer) {
            newState.player2.paddle.placeAtOrigin();
        }
        else {
            newState.player2.aiPaddle.placeAtOrigin();
        }

        newState.ball.placeAtOrigin();
        newState.keys = { w: 0, s: 0, i: 0, k: 0 };
        newState.gameStart = true;
        this.setState(newState);
    }

    checkForWins() {
        if (this.state.player1.score >= this.m_nScoreToWin) {
            console.log("Player 1 Wins!!!");
            this.setState({ m_bWon: true });
            this.setState({ gameStart2: true });
            winner = "Player One"
            this.resetGame();
        } else if (this.state.player2.score >= this.m_nScoreToWin) {
            console.log("Player 2 Wins!!!");
            this.setState({ m_bWon: true });
            this.setState({ gameStart2: true });
            winner = "Player Two"
            this.resetGame();
        }
    }

    update = () => {

        if (!this.state.gamePaused && !this.state.gameStart && !this.state.m_bWon) {

            // console.log("updating");

            // find the time elapsed
            var currentTime = new Date().getTime();
            var deltaTime = (currentTime - this.startTime) / 1000;
            this.startTime = currentTime;

            if (this.props.multiPlayer) {

            }
            else {
                this.state.player2.aiPaddle.update(deltaTime);
                this.state.player2.aiPaddle.trackBall(this.state.ball.m_positionX, this.state.ball.m_positionY, deltaTime);

            }


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

            if (this.state.context) {
                this.state.context.clearRect(0, 0, this.state.gameUIWidth, this.state.gameUIHeight);

                // render the line in the middle
                this.state.context.beginPath();
                var prevColor = this.state.context.strokeStyle;
                this.state.context.strokeStyle = this.state.gameBorderColor;
                this.state.context.moveTo(this.state.gameUIWidth / 2, 0);
                this.state.context.lineTo(this.state.gameUIWidth / 2, this.state.gameUIHeight);
                this.state.context.stroke();
                this.state.context.strokeStyle = prevColor;
                this.state.context.closePath();

                // render objects
                this.state.ball.render(this.state.context, this.refs.ballImg, this.state.gameUIWidth, this.state.gameUIHeight);
                this.state.player1.paddle.render(this.state.context, this.refs.image);

                if (this.props.multiPlayer)
                    this.state.player2.paddle.render(this.state.context, this.refs.image);
                else
                    this.state.player2.aiPaddle.render(this.state.context, this.refs.image);
                //   this.state.player2.paddle.render(this.state.context, this.refs.image, this.state.player1.posX, this.state.player1.posY);

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
                                {this.m_nScoreToWin === 1 ? 
                                    <div className="col-md-12">
                                        <h2 className="suddenDeath">Sudden Death!</h2>
                                    </div> : <>
                                    <div className="col-md-6">
                                        <h2>Player One: {this.state.player1.score}</h2>
                                    </div>
                                    <div className="col-md-6">
                                        <h2>Player Two: {this.state.player2.score}</h2>
                                </div></> }

                            </div>

                            {/* Game UI */}
                            <div className="row">
                                <canvas
                                    className="gameUI"
                                        style={{
                                            border: `${this.state.gameBorderWidth} solid ${this.state.gameBorderColor}`,
                                            backgroundImage: "url(" + this.state.imageURL + ")",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center"
                                        }}
                                        width={this.state.gameUIWidth}
                                        height={this.state.gameUIHeight}
                                        ref="canvas" >



                                    </canvas>
                                    {this.state.m_bWon ? this.wonGameLogic() : ""}
                                    {this.state.gamePaused ? this.pauseGame2() : ""}
                                    {!this.state.gameStart2 && !this.state.gameStart3 ? this.startGame() : ""}
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
        
export default windowSize(GameCom);