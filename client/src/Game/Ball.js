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


class Ball {

    m_positionX = 400;
    m_positionY = 500;
    m_width = 100;
    m_height = 100;
    m_velX = 5.0;
    m_velY = 5.0;
    m_gameWidth = 0;
    m_gameHeight = 0;

    constructor(_gameWidth, _gameHeight) { 
        this.m_gameWidth = _gameWidth;
        this.m_gameHeight = _gameHeight;
        console.log("widht " + this.m_gameWidth);
        console.log("height " + this.m_gameHeight);
}

    update(_dt) {

        this.m_positionX += this.m_velX;
        this.m_positionY += this.m_velY;


        if (this.m_positionX < 0) {
            this.m_velX *= -1;
        }
        if (this.m_positionX + this.m_width > this.m_gameWidth) {
            this.m_velX *= -1;
        }

        if (this.m_positionY < 0) {
            this.m_velY *= -1;
        }

        if (this.m_positionY + this.m_height > this.m_gameHeight) {
            this.m_velY *= -1;
        }


        //GamePlayer.prototype.update(_dt)
    }

    flipVelX() { 
        this.m_velX *= -1;
    }

    flipVelY() { 
        this.m_velY *= -1;
    }
    

    render(_context, _imgRef, _levelWidth, _levelHeight) {
        // console.log(_imgRef);
        // GamePlayer.prototype.render(_context, _imgRef);
        _context.drawImage(_imgRef, this.m_positionX, this.m_positionY, 100, 100);
        //_context.drawImage(_imgRef, this.m_positionX, this.m_positionY, this.m_width, this.m_height);

    }

};

export default Ball;