/**
 * 
 *      Game.js
 * 
 */

import React, { Component } from "react"
import Paddle from "../Paddle"
import ClearRect from "../ClearRect"
var contextWait = null;

class Game extends Component {

    state = { context: null };
    

    componentDidMount() {
        this.waitForContext();
        this.update();
        // const canvas = this.refs.canvas;
        // this.setState({ context: canvas.getContext("2d") });
        //console.log(canvas);
       
    }

    waitForContext() { 
        console.log("waiting on context...");
       contextWait =  setInterval(() => { 
            const canvas = this.refs.canvas;
           if (canvas.getContext("2d")) { 
            console.log("waiting on found!");
            console.log("context: " +canvas.getContext("2d"));
               this.setState({ context: canvas.getContext("2d") });
               console.log("mycontext" + this.state.context);
                clearInterval(contextWait);
            }
        });
    }

    update = () => { 
        setInterval(() => {
            console.log("here");
           if (this.state.context)
               this.state.context.clearRect(0, 0, 1500, 900);
        }, 20);
        
    }

    clearRect() { 
        console.log("here");
        this.state.context.clearRect(0, 0, 1500, 900);
    }
   
    render() {
        return (
            <>
                 <canvas
                    width={1500}
                    height={900}
                    ref="canvas" >
                      
                    {this.state.context ? <Paddle context={{ context: this.state.context }} initPos={{ x: 10, y: 0 }} moveUp='w' moveDown='s'></Paddle> : null}
                    {this.state.context ? <Paddle context={{ context: this.state.context }} initPos={{ x: 1000, y: 0 }} moveUp='i' moveDown='k'></Paddle> : null}
                </canvas>
    
                <p>test</p>
            </>
        );
    }

};

export default Game;