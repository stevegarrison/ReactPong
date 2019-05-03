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
    m_width = 50;
    m_height = 50;
    m_velX = 5.0;
    m_velY = 5.0;
    m_gameWidth = 0;
    m_gameHeight = 0;
    m_originX = 0;
    m_originY = 0;

    constructor(_gameWidth, _gameHeight) { 
        this.m_gameWidth = _gameWidth;
        this.m_gameHeight = _gameHeight;
        console.log("widht " + this.m_gameWidth);
        console.log("height " + this.m_gameHeight);
    }
    
    placeAtOrigin() { 
        this.m_positionX = this.m_gameWidth / 2;
        this.m_positionY = this.m_gameHeight / 2;
    }

    update(_dt, _callback) {

        this.m_positionX += this.m_velX;
        this.m_positionY += this.m_velY;


        var sideHit = "";
        if (this.m_positionX < 0) {
            this.placeAtOrigin();
            this.m_velX *= -1;
            sideHit = "left";
        }
        if (this.m_positionX + this.m_width > this.m_gameWidth) {
            this.placeAtOrigin();
            this.m_velX *= -1;
            sideHit = "right";
        }

        if (this.m_positionY < 0) {
            this.m_velY *= -1;
        }

        if (this.m_positionY + this.m_height > this.m_gameHeight) {
            this.m_velY *= -1;
        }

        _callback(sideHit);

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
        _context.drawImage(_imgRef, this.m_positionX, this.m_positionY, this.m_width, this.m_height);
        //_context.drawImage(_imgRef, this.m_positionX, this.m_positionY, this.m_width, this.m_height);

    }

};

export default Ball;