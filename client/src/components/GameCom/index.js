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

var contextWait = null;

class GameCom extends Component {

    state = {
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
        const canvas = this.refs.canvas;
        this.setState({ context: canvas.getContext("2d") });

        // set game height and width
        this.state.gameUIWidth = 1400;
        this.state.gameUIHeight = 700;

        this.state.player1.paddle = new Paddle(this.state.gameUIWidth, this.state.gameUIHeight, "red");
        this.state.player2.paddle = new Paddle(this.state.gameUIWidth, this.state.gameUIHeight, "green");
        this.state.player1.paddle.setPositionX(100);
        this.state.player2.paddle.setPositionX(1260);
        //this.state.player2.paddle.setPositionX(1360);
        this.state.ball = new Ball(this.state.gameUIWidth, this.state.gameUIHeight);

        document.addEventListener("keydown", this.handleInput, false);
        requestAnimationFrame(() => { this.update() });
        //console.log(canvas);

    }

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
            default:
                break;
        };
    }

    processInput() {

        var newKeys = { ...this.state.keys }
        if (this.state.keys.w === 1) {

            this.setKey('w', 0);
            // newKeys.w = 0;
            this.state.player1.paddle.movePaddle(0, -30);
            // this.setState({ keys: newKeys });
        }
        if (this.state.keys.s === 1) {

            this.setKey('s', 0);
            // newKeys.s = 0;
            this.state.player1.paddle.movePaddle(0, 30);
            // this.setState({ keys: newKeys});
        }
        if (this.state.keys.i === 1) {

            this.setKey('i', 0);
            //newKeys.i = 0;
            this.state.player2.paddle.movePaddle(0, -30);
            // this.setState({ keys: newKeys});
        }
        if (this.state.keys.k === 1) {

            this.setKey('k', 0);
            // newKeys.k = 0;
            this.state.player2.paddle.movePaddle(0, 30);
            // this.setState({ keys: newKeys});
        }

    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleInput, false);

    }

    // waitForContext() { 
    //     console.log("waiting on context...");
    //    contextWait =  setInterval(() => { 
    //         const canvas = this.refs.canvas;
    //        if (canvas.getContext("2d")) { 
    //         console.log("waiting on found!");
    //         console.log("context: " +canvas.getContext("2d"));
    //            this.setState({ context: canvas.getContext("2d") });
    //            console.log("mycontext" + this.state.context);
    //             clearInterval(contextWait);
    //         }
    //     });
    // }

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
        this.setState(newState);
    }

    checkForWins() {

        if (this.state.player1.score >= 3) {
            console.log("Player 1 Wins!!!");
            this.resetGame();
        } else if (this.state.player2.score >= 3) {
            console.log("Player 2 Wins!!!");
            this.resetGame();
        }
    }

    update = () => {
        //console.log("here");
        if (this.state.context) {
            this.state.context.clearRect(0, 0, this.state.gameUIWidth, this.state.gameUIHeight);


            //console.log(this.refs.image);


            // update input
            this.processInput();

            // update objects
            this.state.ball.update(0, _sideHit => {
                switch (_sideHit) {
                    case "left":
                        var newPlayer = { ...this.state.player2 };
                        newPlayer.score++;
                        this.setState({ player2: newPlayer });
                        console.log("Player 2 score: " + newPlayer.score);
                        break;
                    case "right":
                        var newPlayer = { ...this.state.player1 };
                        newPlayer.score++;
                        this.setState({ player1: newPlayer });
                        console.log("Player 1 score: " + newPlayer.score);
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
            this.state.ball.render(this.state.context, this.refs.ballImg, 1400, 700);
            this.state.player1.paddle.render(this.state.context, this.refs.image, this.state.player1.posX, this.state.player1.posY);
            this.state.player2.paddle.render(this.state.context, this.refs.image, this.state.player1.posX, this.state.player1.posY);

            //this.state.paddle.render(this.state.context, this.refs.image, this.state.player2.posX, this.state.player2.posY);
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
                                    width={this.state.gameUIWidth}
                                    height={this.state.gameUIHeight}
                                    ref="canvas" >

                                    <img style={{ display: "none" }}
                                        ref="image"
                                        src="https://cdn.shopify.com/s/files/1/0784/2279/products/TraditionalPaddle400_1_-_Copy_large.jpg?v=1463152608"
                                        alt="paddleImg" />

                                    <img style={{ display: "none" }}
                                        ref="ballImg"
                                        src="https://www.big5sportinggoods.com/catalogimage/img/product/rwd/large/6165_15086_0001_551_large_03.jpg"
                                        alt="paddleImg" />

                                  </canvas>

                                <p>test</p>

                            </div>
                        </div>

                    </div>
                    <div className="col-md-1">
                        <div>
                            <Link to={"/"}><i id="home-icon" className="m-3 fas fa-home fa-2x"></i></Link>
                        </div>
                    </div>
                </div>

            </>
        );
    }

};

export default GameCom;