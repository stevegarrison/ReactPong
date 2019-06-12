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
import EventManager from "../../Game/EventManager/EventManager"


class GameCom extends Component {

    m_sfxWin = new Audio(require("../../resources/audio/winner.wav"));
    m_sfxLoss = new Audio(require("../../resources/audio/loss.wav"));
    startTime = 0.0;
    m_nScoreToWin = 0;

    // winner
    m_szWinner = "";

    // music
    m_sfxSong = new Audio(require("../../resources/audio/song.mp3"));

    // event
    m_eventManager = new EventManager();

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
        events: "false",
        music: false,
        context: null,
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
        console.log("mounted");
        this.setState({ music: true });
        this.m_sfxSong.play();
        this.loadOptions(() => {

            console.log(this.state);
            const canvas = this.refs.canvas;
            this.setState({ context: canvas.getContext("2d") });

            // set game height and width
            let height = this.props.windowHeight;
            let width = this.props.windowWidth;
            console.log("DidMount height: " + height);
            console.log("DidMount width: " + width);

            this.setState({
                gameUIWidth: width * .85,
                gameUIHeight: height * .8
            });


            // Set the color of the ball and paddles
            const color = "white";
            if (!this.state.player1Color)
                this.setState({ player1Color: color });
            if (!this.state.player2Color)
                this.setState({ player2Color: color });
            if (!this.state.ballColor)
                this.setState({ ballColor: color });

            // Set the size of the ball
            const size = 130;
            if (!this.state.player1Size)
                this.setState({ player1Size: size });
            if (!this.state.player2Size)
                this.setState({ player2Size: size });

            // create player 1 paddle
            let player1 = { ...this.state.player1 };
            player1.paddle = new Paddle(this.state.gameUIWidth, this.state.gameUIHeight, this.state.player1Color, this.state.player1Size);
            this.setState({
                player1: player1
            });

            this.state.player1.paddle.setPositionX(100);

            // check which mode the game was started in
            let player2 = { ...this.state.player2 };
            if (this.props.multiPlayer) {

                player2.paddle = new Paddle(this.state.gameUIWidth, this.state.gameUIHeight, this.state.player2Color, this.state.player2Size);
                player2.paddle.setPositionX(this.state.gameUIWidth - 100);
                this.setState({
                    player2: player2
                });

            }
            else { // else its in 1 player mode
                player2.aiPaddle = new AIPaddle(this.state.gameUIWidth, this.state.gameUIHeight, this.state.player2Color, this.state.player2Size);
                player2.aiPaddle.setPositionX(this.state.gameUIWidth - 100);
                player2.aiPaddle.setNormalMode();

                if (this.props.practiceMode)
                    player2.aiPaddle.setPracticeMode();
                this.setState({
                    player2: player2
                });

            }

            // create the ball
            let ball = { ...this.state.ball };
            ball = new Ball(this.state.gameUIWidth, this.state.gameUIHeight, this.state.ballColor);
            this.setState({
                ball: ball
            });

            // add events to listen for
            document.addEventListener("keydown", this.handleInput, false);
            document.addEventListener("keyup", this.handleKeyUp, false);
            window.addEventListener("resize", this.handleResize);

            // intiialize the event manager
            console.log("eventM: " + this.m_eventManager);
            this.m_eventManager.initializeEventManager(
                this.state.ball,
                this.state.player1.paddle,
                this.state.player2.paddle,
                this.state.player2.aiPaddle,
                this.state.gameUIWidth,
                this.state.gameUIHeight,
                this.props.multiPlayer
            );

            // request the update function to be called as an animation frame
            requestAnimationFrame(() => { this.update() });
        });
    }

    handleResize = (_event) => {

        console.log("resizing");

        // update the games playing area
        let height = this.props.windowHeight;
        let width = this.props.windowWidth;
        this.setState({
            gameUIWidth: width * .85,
            gameUIHeight: height * .8
        });

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

        // update the event manager
        this.m_eventManager.updateGameDimensions(this.state.gameUIWidth, this.state.gameUIHeight);
    }


    loadOptions = (_callback) => {
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
                    imageURL: res.data[0].imageURL,

                });

                this.m_eventManager.multiBall = res.data[0].multiBall;
                this.m_eventManager.paddleShrink = res.data[0].paddleShrink;
                this.m_eventManager.fastBall = res.data[0].fastBall;

                this.m_nScoreToWin = res.data[0].value;
                console.log("bc: " + this.state.ballColor);
                console.log(this.state);
                if (this.m_eventManager.multiBall === "true" || this.m_eventManager.paddleShrink === "true" || this.m_eventManager.fastBall === "true") {
                    this.setState({ events: "true" });
                }
                console.log("LOADED OPTIONS (GamePage.js)");
                _callback();
            })
            .catch(err => console.log("GameCom error loading options", err));
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
            case 't':
                this.m_eventManager.startEvent("split-ball");
                break;
            case 'r':
                this.m_eventManager.startEvent("fast-ball");
                break;
            case 'y':
                this.m_eventManager.startEvent("tiny-paddle");
                break;
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

        this.m_sfxSong.pause();
        // remove event listeners
        document.removeEventListener("keyup", this.handleKeyUp, false);
        document.removeEventListener("keydown", this.handleInput, false);
        window.removeEventListener("resize", this.handleResize);

    }

    handleSound() {
        // console.log(this.state.music);
        if (this.state.music) {

            this.m_sfxSong.pause();

            this.setState({ music: false });

            // 
            let player1 = { ...this.state.player1 };
            player1.paddle.m_bPlaySound = false;
            this.setState({ player1: player1 });

            let player2 = { ...this.state.player2 };
            if (this.props.multiPlayer) {
                player2.paddle.m_bPlaySound = false;
            } else {
                player2.aiPaddle.m_bPlaySound = false;
            }
            this.setState({ player2: player2 });

        } else {
            this.m_sfxSong.play();
            this.setState({ music: true });


            let player1 = { ...this.state.player1 };
            player1.paddle.m_bPlaySound = true;
            this.setState({ player1: player1 });


            let player2 = { ...this.state.player2 };
            if (this.props.multiPlayer) {
                player2.paddle.m_bPlaySound = true;
            } else {
                player2.aiPaddle.m_bPlaySound = true;
            }
            this.setState({ player2: player2 });
        }

    }

    pauseGame() {

        var gamePause = true;
        if (this.state.gamePaused)
            gamePause = false;

        this.setState({
            gamePaused: gamePause
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

     /******************************************************************************/
    /*                                                                            */
    /*      Method:     resetGame                                                 */
    /*                                                                            */
    /*      Purpose:    Reset the game                                            */
    /*                                                                            */
    /******************************************************************************/
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

        newState.ball.resetBall();
        newState.keys = { w: 0, s: 0, i: 0, k: 0 };
        newState.gameStart = true;
        this.setState(newState);
    }

    /******************************************************************************/
    /*                                                                            */
    /*      Method:     checkForWins                                              */
    /*                                                                            */
    /*      Purpose:    check to see if anyone has won the game                   */
    /*                                                                            */
    /******************************************************************************/
    checkForWins() {

        if (this.state.player1.score >= this.m_nScoreToWin) {
            if (this.state.music) {
                this.m_sfxWin.play();
            }

            this.setState({ m_bWon: true });
            this.setState({ gameStart2: true });
            this.m_szWinner = "Player One"
            this.resetGame();

        } else if (this.state.player2.score >= this.m_nScoreToWin) {
            if (this.props.multiPlayer && this.state.music === true) {
                this.m_sfxWin.play();
            } else {
                if (this.state.music) {
                    this.m_sfxLoss.play();
                }
            }

            this.setState({ m_bWon: true });
            this.setState({ gameStart2: true });
            if(this.props.multiPlayer)  
                this.m_szWinner = "Player Two"
            else
                this.m_szWinner = "The Computer"
            this.resetGame();
        }
    }

    /******************************************************************************/
    /*                                                                            */
    /*      Method:     isPlaying                                                 */
    /*                                                                            */
    /*      Purpose:    Check to see if the song passed in is playing             */
    /*                                                                            */
    /******************************************************************************/
    isPlaying(_song) {
        return !_song.paused;
    }

    /******************************************************************************/
    /*                                                                            */
    /*      Method:     update                                                    */
    /*                                                                            */
    /*      Purpose:    update all game logic                                     */
    /*                                                                            */
    /******************************************************************************/
    update = () => {

        if (!this.state.gamePaused && !this.state.gameStart && !this.state.m_bWon) {

            // console.log("updating");
            // check sound
            if (this.state.music) {
                if (!this.isPlaying(this.m_sfxSong)) {
                    this.m_sfxSong.play();
                }
            }

            // find the time elapsed
            var currentTime = new Date().getTime();
            var deltaTime = (currentTime - this.startTime) / 1000;
            this.startTime = currentTime;


            // // update events
            this.m_eventManager.updateEvents(deltaTime);

            // update AI is in 1 player mode
            if (!this.props.multiPlayer) {
                this.state.player2.aiPaddle.update(this.state.ball.m_position.x, this.state.ball.m_position.y, deltaTime);
            }

            // update input
            this.processInput(deltaTime);

            // update objects
            this.state.ball.update(deltaTime, _sideHit => {

                // create an emtpy object to use to capture the player state
                let newPlayer = null;
                switch (_sideHit) {
                    case "left":
                        newPlayer = { ...this.state.player2 };
                        newPlayer.score++;
                        this.setState({ player2: newPlayer });
                        this.state.ball.resetBall();
                        if (this.state.ball.m_bInFastBallEvent) {

                            this.m_eventManager.exitFastBallEvent();

                            let ball = this.state.ball;
                            ball.m_bInFastBallEvent = false;
                            this.setState({ ball: ball });
                        }
                        let newBall = this.state.ball;
                        newBall.m_velocity.x *= -1;
                        this.setState({ ball: newBall });
                        // check for player wins
                        this.checkForWins();
                        break;

                    case "right":
                        newPlayer = { ...this.state.player1 };
                        newPlayer.score++;
                        this.setState({ player1: newPlayer });
                        this.state.ball.resetBall();
                        let ball = this.state.ball;
                        ball.m_velocity.x *= -1;
                        this.setState({ ball: ball });
                        if (this.state.ball.m_bInFastBallEvent) {

                            this.m_eventManager.exitFastBallEvent();

                            let ball = this.state.ball;
                            ball.m_bInFastBallEvent = false;
                            this.setState({ ball: ball });
                        }
                        // check for player wins
                        this.checkForWins();
                        break;
                    default:
                        break;
                };
            });

            // check for collision
            this.checkCollision();

            if (this.state.context) {
                this.state.context.clearRect(0, 0, this.state.gameUIWidth, this.state.gameUIHeight);

                // render the line in the middle
                let context = this.state.context;
                context.beginPath();
                var prevColor = this.state.context.strokeStyle;
                context.strokeStyle = this.state.gameBorderColor;
                context.moveTo(this.state.gameUIWidth / 2, 0);
                context.lineTo(this.state.gameUIWidth / 2, this.state.gameUIHeight);
                context.stroke();
                context.strokeStyle = prevColor;
                context.closePath();
                this.setState({ context: context });

                // render objects
                this.state.ball.render(this.state.context);
                this.state.player1.paddle.render(this.state.context);

                if (this.props.multiPlayer)
                    this.state.player2.paddle.render(this.state.context);
                else
                    this.state.player2.aiPaddle.render(this.state.context);

                // render events
                this.m_eventManager.renderEvents(this.state.context);

            }
        } else {
            this.startTime = new Date().getTime();
        }
        // Next frame
        requestAnimationFrame(() => { this.update() });

    }

    /******************************************************************************/
    /*                                                                            */
    /*      Method:     getPauseGameJSX                                           */
    /*                                                                            */
    /*      Purpose:    return JSX to react to be rendered on the page            */
    /*                                                                            */
    /******************************************************************************/
    getPauseGameJSX() {
        return (
            <div id="modal" className="text-center">
                <h1 id="pong-text">Paused</h1>
                <h4> Press  'P'  to resume</h4>
            </div>
        );
    }

    /******************************************************************************/
    /*                                                                            */
    /*      Method:     getStartGameJSX                                           */
    /*                                                                            */
    /*      Purpose:    return JSX to react to be rendered on the page            */
    /*                                                                            */
    /******************************************************************************/
    getStartGameJSX() {

        return (
            <>
                <div id="modal" className="text-center">
                    <h1 id="pong-text">PONG!</h1>
                    <h3 className="mb-3"> Press the SPACEBAR to play</h3>
                    <h4> NOTE: You can pause the game at any moment by pressing the 'P' key</h4>
                </div>
            </>
        );
    }

    /******************************************************************************/
    /*                                                                            */
    /*      Method:     getWonGameJSX                                             */
    /*                                                                            */
    /*      Purpose:    return JSX to react to be rendered on the page            */
    /*                                                                            */
    /******************************************************************************/
    getWonGameJSX() {
        return <>
            <div id="modal" className="text-center">
                <h1 className="mb-4 glow2" id="pong-text"> {this.m_szWinner} won!</h1>
                <h5>Press SPACEBAR to play again</h5>
            </div>
        </>;
    }

    /******************************************************************************/
    /*                                                                            */
    /*      Method:     getRegHeaderJSX                                           */
    /*                                                                            */
    /*      Purpose:    return JSX to react to be rendered on the page            */
    /*                                                                            */
    /******************************************************************************/
    getRegHeaderJSX() {

        var jsx = <p>Steve!!!!!</p>;
        if (this.state.events === "true") {
            jsx = <>
                <div className="col-md-3">
                    <h2>Player One: {this.state.player1.score}</h2>
                </div>
                <div className="col-md-6">
                    <h2>Current Event:
                        {this.m_eventManager.m_activeEvents.map(_event => (" " + _event))}
                    </h2>
                    <h2>Event in: {this.m_eventManager.m_dNextEventTimer.toFixed(0)}</h2>
                </div>
            </>
        }
        else {
            jsx = <>
                <div className="col-md-3">
                    <h2>Player One: {this.state.player1.score}</h2>
                </div>
                <div className="col-md-6"></div>
                <div className="col-md-3">
                    <h2>Player Two: {this.state.player2.score}</h2>
                </div>
            </>;
        }

        return jsx;

    }

    /******************************************************************************/
    /*                                                                            */
    /*      Method:     getSuddenDeathJSX                                         */
    /*                                                                            */
    /*      Purpose:    return JSX to react to be rendered on the page            */
    /*                                                                            */
    /******************************************************************************/
    getSuddenDeathJSX() {

        var jsx = <p>YOOOO!!!!</p>;
        if (this.state.events === "true") {
            jsx = <>
                <div className="col-md-6">
                    <h2 className="suddenDeath">Sudden Death!</h2>
                </div>
                <div className="col-md-6">
                    <h2>Current Event:
                    {this.m_eventManager.m_activeEvents.map(_event => (" " + _event))}
                    </h2>
                    <h2>Event in: {this.m_eventManager.m_dNextEventTimer.toFixed(0)}</h2>
                </div>
            </>;
        }
        else {
            jsx = <>
                <div className="col-md-12">
                    <h2 className="suddenDeath">Sudden Death!</h2>
                </div>
            </>;
        }

        return jsx;

    }

    /******************************************************************************/
    /*                                                                            */
    /*      Method:     render                                                    */
    /*                                                                            */
    /*      Purpose:    return JSX to react to be rendered on the page            */
    /*                                                                            */
    /******************************************************************************/
    render() {
        return (
            <>
                <div className="text-center">
                    <div className="row">
                        <div className="col-md-1"></div>

                        <div className="col-md-10">
                            {/* Player Scores */}
                            <div className="row player-text mt-3 mb-4">
                                {this.m_nScoreToWin === 1 ? this.getSuddenDeathJSX() : this.getRegHeaderJSX()}
                            </div>

                            {/* Game UI */}
                            <div className="row">
                                <canvas
                                    className="gameUI"
                                    style={{
                                        border: `${this.state.gameBorderWidth} solid ${this.state.gameBorderColor}`,
                                        backgroundImage: "url(" + this.state.imageURL + ")",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        marginBottom: "20px"
                                    }}
                                    width={this.state.gameUIWidth}
                                    height={this.state.gameUIHeight}
                                    ref="canvas" >
                                </canvas>

                                {this.state.m_bWon ? this.getWonGameJSX() : ""}
                                {this.state.gamePaused ? this.getPauseGameJSX() : ""}
                                {!this.state.gameStart2 && !this.state.gameStart3 ? this.getStartGameJSX() : ""}
                            </div>
                        </div>

                        <div className="col-md-1">
                            <div>
                                <Link onClick={this.resetGame} to={"/"}><i id="home-icon" className="m-3 fas fa-home fa-2x"></i></Link>
                            </div>

                            {this.state.music ?
                                <div>
                                    <div onClick={() => this.handleSound()}><i id="volume-icon" className="m-3 fas fa-volume-up fa-2x"></i></div>
                                </div>
                                :
                                <div>
                                    <div onClick={() => this.handleSound()}><i id="volume-icon" className="m-3 fas fa-volume-mute fa-2x"></i></div>
                                </div>}
                        </div>
                    </div>
                </div>

            </>
        );
    }

};

export default windowSize(GameCom);