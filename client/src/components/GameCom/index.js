/**
 * 
 *      Game.js
 * 
 */

import React, { Component } from "react"
import Paddle from "../../Game/Paddle"
import Ball from "../../Game/Ball"

var contextWait = null;

class GameCom extends Component {

    state = {
        context: null,
        paddle: null,
        ball: null,
        player1: {
            
            posX: 10,
            posY: 100,
        },

        player2: {
          
            posX: 700,
            posY: 100,
        },

        keys: {
            w: 0,
            s: 0
        }
    };


    componentDidMount() {
        //this.waitForContext();
        // this.update();
        const canvas = this.refs.canvas;
        this.setState({ context: canvas.getContext("2d") });



        this.state.paddle = new Paddle();
        this.state.ball = new Ball();


        document.addEventListener("keydown", this.handleInput, false);
        requestAnimationFrame(() => { this.update() });
        //console.log(canvas);

    }

    handleInput =  _event => { 

        //console.log(_event);
        switch (_event.key) { 
            case 'w':
                console.log(this.state.player1.posY);
                this.setState({ keys: {w: 1, s: 0 }});
                //this.setState({ player1: { posX: 10, posY: this.state.player1.posY - 30 } });
                console.log(this.state.player1.posY);
                break;
            case 's':
                console.log(this.state.player1.posY);
                this.setState({ keys: {w: 0, s: 1 }});
               // this.setState({ player1: { posX: 10, posY: this.state.player1.posY + 30 } });
                console.log(this.state.player1.posY);
                break;
            
                case 'i':
                console.log(this.state.player2.posY);
                    this.setState({ player2: { posX: 1000, posY: this.state.player2.posY - 30 } });
                    console.log(this.state.player2.posY);
                break;
            
                case 'k':
                console.log(this.state.player2.posY);
                    this.setState({ player2: { posX: 1000, posY: this.state.player2.posY + 30 } });
                    console.log(this.state.player2.posY);
                    break;
            default:
                break;
        };
    }

    processInput() { 

        var newKeys = { ...this.state.keys }
        if (this.state.keys.w === 1) { 
            
            newKeys.w = 0;
            this.setState({ keys: newKeys, player1: { posX: 10, posY: this.state.player1.posY - 30 } });
        }
        if (this.state.keys.s === 1) { 
            newKeys.s = 0;
            this.setState({ keys: newKeys, player1: { posX: 10, posY: this.state.player1.posY + 30 } });
        }
        if (this.state.keys.i === 1) { 
            newKeys.i = 0;
            this.setState({ keys: newKeys, player1: { posX: 10, posY: this.state.player1.posY + 30 } });
        }
        if (this.state.keys.k === 1) { 
            newKeys.k = 0;
            this.setState({ keys: newKeys, player1: { posX: 10, posY: this.state.player1.posY + 30 } });
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

    update = () => {
        // console.log("here");
        if (this.state.context) {
            this.state.context.clearRect(0, 0, 1500, 900);
        
           
            //console.log(this.refs.image);
            

            // update input
            this.processInput();

            // update objects
            this.state.ball.update(0);
            
            // render objects
            this.state.ball.render(this.state.context, this.refs.ballImg, 1400, 700);
            this.state.paddle.render(this.state.context, this.refs.image, this.state.player1.posX, this.state.player1.posY);
            this.state.paddle.render(this.state.context, this.refs.image, this.state.player2.posX, this.state.player2.posY);
        }

        // Next frame
        requestAnimationFrame(() => { this.update() });

    }


    render() {
        return (
            <>
                <canvas
                    width={1500}
                    height={900}
                    ref="canvas" >

                    

                    <img style={{ display: "none" }}
                        ref="image"
                        src="https://cdn.shopify.com/s/files/1/0784/2279/products/TraditionalPaddle400_1_-_Copy_large.jpg?v=1463152608"
                        alt="paddleImg" />
                    
                    <img style={{ display: "none" }}
                        ref="ballImg"
                        src="https://www.big5sportinggoods.com/catalogimage/img/product/rwd/large/6165_15086_0001_551_large_03.jpg"
                        alt="paddleImg" />
                    
                    

                    {/* {this.clearRect()}
                    {this.state.context ? <Paddle context={{ context: this.state.context }} initPos={{ x: 10, y: 0 }} moveUp='w' moveDown='s'></Paddle> : null}
                    {this.state.context ? <Paddle context={{ context: this.state.context }} initPos={{ x: 1000, y: 0 }} moveUp='i' moveDown='k'></Paddle> : null} */}
                </canvas>

                <p>test</p>
            </>
        );
    }

};

export default GameCom;