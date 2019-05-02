/**
 * 
 *      Ball.js
 * 
 */

 /**
 * 
 *      Paddle.js
 * 
 */


class Ball  {

    m_positionX = 400;
    m_positionY = 500;
    m_width = 100;
    m_height = 100;
    m_velX = 5.0;
    m_velY = 5.0;

    constructor() { 

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
        
        this.m_positionX += this.m_velX;
        this.m_positionY += this.m_velY;


        if (this.m_positionX < 0) { 
            this.m_velX *= -1;
        }
        if (this.m_positionX + this.m_width > 1400) { 
            this.m_velX *= -1;
        }

        if (this.m_positionY  < 0) { 
            this.m_velY *= -1;
        }

        if (this.m_positionY + this.m_height > 700) { 
            this.m_velY *= -1;
        }

        
        //GamePlayer.prototype.update(_dt)
    }

    render(_context, _imgRef, _levelWidth, _levelHeight) {
        // console.log(_imgRef);
        // GamePlayer.prototype.render(_context, _imgRef);
       _context.drawImage(_imgRef, this.m_positionX, this.m_positionY,100, 100);
       //_context.drawImage(_imgRef, this.m_positionX, this.m_positionY, this.m_width, this.m_height);

    }

};

export default Ball;