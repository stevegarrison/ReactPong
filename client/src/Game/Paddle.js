/**
 * 
 *      Paddle.js
 * 
 */

class GameObject {

    m_positionX = 0;
    m_positionY = 0;
    m_width = 100;
    m_height = 100;
    m_image = "https://cdn.shopify.com/s/files/1/0784/2279/products/TraditionalPaddle400_1_-_Copy_large.jpg?v=1463152608";

    update(_dt) {

    }

    render(_context, _imgRef) {
        console.log(_imgRef);
        _context.fillStyle = "green";
        _context.fillRect(0, 0, 100, 100);
       _context.drawImage(_imgRef, this.m_positionX, this.m_positionY, this.m_width, this.m_height);
    }

};

class GamePlayer extends GameObject {


    constructor() { 
        super();
    }
    initInput() {
        document.addEventListener("keydown", this.userInput, false);
    }

    userInput(_event) {

    }

    update(_dt) {

        GameObject.prototype.update(_dt);
    }

    render(_context, _imgRef) {

       // GameObject.prototype.render(_context, _imgRef);


        _context.fillStyle = "green";
        _context.fillRect(0, 0, 100, 100);
       
        _context.drawImage(_imgRef, this.m_positionX, this.m_positionY, this.m_width, this.m_height);
 
        console.log("wh" + super.m_width + " " + super.m_height);
    }

    closePlayer() {
        document.removeEventListener("keydown", this.userInput, false);
    }

};

class Paddle  {

    m_positionX = 10;
    m_positionY = 0;
    m_width = 100;
    m_height = 100;

    constructor() { 

}

    initPaddle() {
       
    }

    // handleInput(_event) { 
    //     if (_event.key === this.props.moveUp) {
    //         if(this.state.positionY > 10)
    //         this.setState({ positionY: this.state.positionY - 30.0 });
    //     } else if (_event.key === this.props.moveDown) {
    //         if(this.state.positionY < 790)
    //             this.setState({ positionY: this.state.positionY + 30.0 });
    //     } 
    // }

    update(_dt) {
        //GamePlayer.prototype.update(_dt)
    }

    render(_context, _imgRef, _posX, _posY) {
        // console.log(_imgRef);
        // GamePlayer.prototype.render(_context, _imgRef);
       _context.drawImage(_imgRef, _posX, _posY, this.m_width, this.m_height);

    }

    closePaddle() {
        

    }
};

export default Paddle;