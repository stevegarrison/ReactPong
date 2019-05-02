/**
 * 
 *      Paddle.js
 * 
 */


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