/**
 * 
 *      GameLevel.js
 * 
 */

import React, { Component } from 'react';

const canvasStyle = {
    width: 1000,
    height: 1000,
    backgroundColor: "green"
};
//const viewBox = [window.innerWidth / -2, 100 - window.innerHeight, window.innerWidth, window.innerHeight];

class GameLevel extends Component {



    state = {
        positionX: 0.0,
        positionY: 0.0,
        image: "https://cdn.shopify.com/s/files/1/0784/2279/products/TraditionalPaddle400_1_-_Copy_large.jpg?v=1463152608"
    }

    componentDidMount() {

        this.renderLevel();

        document.addEventListener("keydown", this.userInput, false);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.userInput, false);
    }


    renderLevel = () => {
        setInterval(() => {
            console.log("here");
            console.log(this.state.positionY);
            const canvas = this.refs.canvas;
            const context = canvas.getContext("2d");
            const image = this.refs.image;
            context.clearRect(0, 0, canvasStyle.width, canvasStyle.height);
            context.drawImage(image, 10, this.state.positionY + 100, 100, 100);
            // context.fillStyle = "red";
            // context.fillRect(100, this.state.positionY, 100, 50);
        });
    }

    userInput = _event => {
        console.log(this.state.positionY);
        if (_event.key === 's') {
            if (this.state.positionY < 390)
                this.setState({ positionY: this.state.positionY + 30.0 });
        } else if (_event.key === 'w') {
            if (this.state.positionY > 10)
                this.setState({ positionY: this.state.positionY - 30.0 });
        }
    }

    initializeGame() {

    }

    updateGame() {

    }

    render() {
        return (
            <div>
                <canvas
                    ref="canvas"
                    width={1500}
                    height={1500}
                //viewBox={viewBox}
                />
                <img style={{ display: "none" }} ref="image" src={this.state.image} alt="paddleImg" />

            </div>
        );
    }
};


export default GameLevel;