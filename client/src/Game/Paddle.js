/**
 * 
 *      Paddle.js
 * 
 */
class Paddle  {

    m_positionX = 10;
    m_positionY = 10;
    m_width = 30;
    m_height = 130;
    m_paddleColor = "red";
    m_gameWidth = 0;
    m_gameHeight = 0;

    constructor(_gameWidth, _gameHeight, _color) { 
        this.m_gameWidth = _gameWidth;
        this.m_gameHeight = _gameHeight;
        this.m_positionY = _gameHeight / 2 - this.m_height / 2;
        this.m_paddleColor = _color;

        
    }
    setPosition(_posX, _posY) { 
        this.m_positionX = _posX;
        this.m_positionY = _posY;
    }

    setPositionX(_posX) { 
        this.m_positionX = _posX;
    }

    setPositionY(_posY) { 
        this.m_positionY = _posY;
    }

    getPositionX() { 
        return this.m_positionX;
    }

    getPositionY() { 
        return this.m_positionX;
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

    movePaddle(_amountX, _amountY) { 

        if(this.m_positionX + _amountX > 0 && this.m_positionX + _amountX < this.m_gameWidth)
            this.m_positionX += _amountX;

            if(this.m_positionY + _amountY > 0 && (this.m_positionY + _amountY + this.m_height) < this.m_gameHeight)   
                 this.m_positionY += _amountY;
    }

    update(_dt) {
        //GamePlayer.prototype.update(_dt)
    }

    render(_context, _imgRef) {
        // console.log(_imgRef);
        // GamePlayer.prototype.render(_context, _imgRef);

        _context.fillStyle = this.m_paddleColor;
        _context.fillRect(this.m_positionX, this.m_positionY, this.m_width, this.m_height);

          // _context.drawImage(_imgRef, _posX, _posY, this.m_width, this.m_height);

    }

    checkForCollision(_ball) { 

        var collideTop = false;
        var collideLeft = false;
        var collideBottom = false;
        var collideRight = false;
        
        // check top side of ball
        // if (this.m_positionY < _paddleObj.bottom) { 
        //     this.m_velY *= -1;
        // }

        // check left side of ball
        
        if (this.m_positionX + this.m_width > _ball.m_positionX
            && this.m_positionY < _ball.m_positionY
            && this.m_positionY + this.m_height > _ball.m_positionY) { 
                // console.log(_ball.m_velY);
                // console.log(_ball.m_velX);
            _ball.m_velX *= -1;
        //     console.log(_ball.m_velY);
        // console.log(_ball.m_velX);
        }

        // check bottom side of ball
        // if (this.m_positionY < _paddleObj.bottom) { 
        //     this.m_velY *= -1;
        // }

        // // check right side of ball
        // if (this.m_positionY < _paddleObj.bottom) { 
        //     this.m_velY *= -1;
        // }

    }

    closePaddle() {
        

    }
};

export default Paddle;