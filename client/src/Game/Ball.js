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

    m_positionX = 400.0;
    m_positionY = 500.0;
    m_velX = 350.0;
    m_velY = 350.0;

    m_width = 25;
    m_height = 25;
    m_gameWidth = 0;
    m_gameHeight = 0;
    m_originX = 0.0;
    m_originY = 0.0;
    m_ballColor = "red";

    constructor(_gameWidth, _gameHeight, _ballColor) { 
        this.m_gameWidth = _gameWidth;
        this.m_gameHeight = _gameHeight;
        this.m_ballColor = _ballColor;
        console.log("widht " + this.m_gameWidth);
        console.log("height " + this.m_gameHeight);
    }
    
    placeAtOrigin() { 
        this.m_positionX = this.m_gameWidth / 2;
        this.m_positionY = this.m_gameHeight / 2;
    }

    update(_dt, _callback) {

        this.m_positionX += this.m_velX * _dt;
        this.m_positionY += this.m_velY * _dt;


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
        // _context.fillRect(_imgRef, this.m_positionX, this.m_positionY, this.m_width, this.m_height);
        //_context.drawImage(_imgRef, this.m_positionX, this.m_positionY, this.m_width, this.m_height);
        _context.fillStyle = this.m_ballColor;
        // _context.fillRect(this.m_positionX, this.m_positionY, this.m_width, this.m_height);

        _context.beginPath();
        _context.ellipse(this.m_positionX, this.m_positionY, this.m_width, this.m_height, 2 *  Math.PI * (this.m_width * this.m_width), 0, 2 *  Math.PI * (this.m_width * this.m_width));
        _context.fill();

    }

};

export default Ball;