/**
 * 
 *      Paddle.js
 * 
 */

import React, { Component } from 'react'

//const viewBox = [window.innerWidth / -2, 100 - window.innerHeight, window.innerWidth, window.innerHeight];

// class Paddle { 
//     positionX = 0;
//     positionY=  0;
//     image = "https://cdn.shopify.com/s/files/1/0784/2279/products/TraditionalPaddle400_1_-_Copy_large.jpg?v=1463152608";
//     context = null;

//     initPaddle() { 
//         document.addEventListener("keydown", this.userInput, false);
//     }

//     handleInput(_event) { 
//         if (_event.key === this.props.moveUp) {
//             if(this.state.positionY > 10)
//             this.setState({ positionY: this.state.positionY - 30.0 });
//         } else if (_event.key === this.props.moveDown) {
//             if(this.state.positionY < 790)
//                 this.setState({ positionY: this.state.positionY + 30.0 });
//         } 
//     }

//     updatePaddle() { 

//     }

//     renderPaddle() { 
//         this.context.drawImage(image, this.state.positionX, this.state.positionY, 100, 100);
//     }
// }


class Paddle extends Component {


    state = {
        positionX: 0,
        positionY: 0,
        image: "https://cdn.shopify.com/s/files/1/0784/2279/products/TraditionalPaddle400_1_-_Copy_large.jpg?v=1463152608",
        context: null
    }

    componentDidMount() {

        
        this.setState({ context: this.props.context.context, positionX: this.props.initPos.x, positionY: this.props.initPos.y });
       console.log(this.props.context);
       this.renderLevel();

        document.addEventListener("keydown", this.userInput, false);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.userInput, false);
    }

    renderContent(_renderObj) { 

    }

    renderLevel = () => {
        setInterval(() => {
            //console.log("here");
            // console.log(this.state.positionX);
            // console.log(this.state.positionY);
            //console.log(this.props.initPos.x);
            // console.log(this.props.initPos.y);
            //const canvas = this.refs.canvas;
            //const context = this.getContext2d();
            const image = this.refs.image;
            //console.log(this.state.context);
            if (this.state.context) {
                // this.state.context.clearRect(0, 0, 1500, 900);
                this.state.context.drawImage(image, this.state.positionX, this.state.positionY, 100, 100);
                // context.fillStyle = "red";
                // context.fillRect(100, this.state.positionY, 100, 50);
            }
       }, 20);
    }

    userInput = _event => {
        console.log(this.state.positionY);
        if (_event.key === this.props.moveUp) {
            if(this.state.positionY > 10)
            this.setState({ positionY: this.state.positionY - 30.0 });
        } else if (_event.key === this.props.moveDown) {
            if(this.state.positionY < 790)
                this.setState({ positionY: this.state.positionY + 30.0 });
        } 
    }

    initializeGame() {

    }

    updateGame() {

    }

    render() {
        return (
            <div>
                {this.renderLevel()}
                <img style={{ display: "none" }} ref="image"
                    src="https://cdn.shopify.com/s/files/1/0784/2279/products/TraditionalPaddle400_1_-_Copy_large.jpg?v=1463152608"
                    alt="paddleImg" />

            </div>
        );
    }
};


export default Paddle;