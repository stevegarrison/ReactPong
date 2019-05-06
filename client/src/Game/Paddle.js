/**
 * 
 *      Paddle.js
 * 
 */
class Paddle  {

    m_positionX = 10.0;
    m_positionY = 10.0;
    m_velocityX = 300.0;
    m_velocityY = 720.0;
    m_width = 30;
    m_height = 130;
    m_paddleColor = "red";
    m_gameWidth = 0;
    m_gameHeight = 0;

    collision = false;
    collisionRect = {
        topLeft: 0.0,
        topRight: 0.0,
        bottomLeft: 0.0,
        bottomRight: 0.0

    }

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

    placeAtOrigin() { 
        this.m_positionY = this.m_gameHeight / 2 - this.m_height / 2;
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

    movePaddle( _direction, _deltaTime) { 

        switch (_direction) { 

            case "up":
            //     console.log(this.m_positionY);
            //     console.log(_deltaTime);
            //   if (this.m_positionY + (this.m_velocityY * _deltaTime) > 0 && (this.m_positionY + (this.m_velocityY * _deltaTime) + this.m_height) < this.m_gameHeight)
                this.m_positionY = this.m_positionY - (this.m_velocityY * _deltaTime);
               // console.log(this.m_positionY);
                break;
            case "down":
          //  if ((this.m_positionY + this.m_velocityY) * _deltaTime > 0 && ((this.m_positionY + this.m_velocityY) * _deltaTime + this.m_height) < this.m_gameHeight)
                this.m_positionY = this.m_positionY + (this.m_velocityY * _deltaTime);
                break;

            case "right":
                //  if ((this.m_positionY + this.m_velocityY) * _deltaTime > 0 && ((this.m_positionY + this.m_velocityY) * _deltaTime + this.m_height) < this.m_gameHeight)
                this.m_positionX = this.m_positionX - (this.m_velocityX * _deltaTime);
                break;

            case "left":
            //  if ((this.m_positionY + this.m_velocityY) * _deltaTime > 0 && ((this.m_positionY + this.m_velocityY) * _deltaTime + this.m_height) < this.m_gameHeight)
                this.m_positionX = this.m_positionX + (this.m_velocityX * _deltaTime);
                break;
            default:
                break;
        };

        // if((this.m_positionX + this.m_velocityX) * _deltaTime > 0 && (this.m_positionX + this.m_velocityX) * _deltaTime < this.m_gameWidth)
        // this.m_positionX = (this.m_positionX + this.m_velocityX) * _deltaTime;

        // if((this.m_positionY + this.m_velocityY) * _deltaTime > 0 && ((this.m_positionY + this.m_velocityY) * _deltaTime + this.m_height) < this.m_gameHeight)   
        //      this.m_positionY = (this.m_positionY + this.m_velocityY) * _deltaTime;
    }

    update(_dt) {
        //GamePlayer.prototype.update(_dt)
    }

    render(_context, _imgRef) {
        // console.log(_imgRef);
        // GamePlayer.prototype.render(_context, _imgRef);
       

        _context.fillStyle = this.m_paddleColor;
        _context.fillRect(this.m_positionX, this.m_positionY, this.m_width, this.m_height);

        if (this.collision) { 
            console.log(this.collisionRect);
            _context.fillStyle = "red";
            _context.fillRect(this.collisionRect.topLeft, this.collisionRect.topLeft, this.collisionRect.topRight - this.collisionRect.topLeft, this.collisionRect.bottomRight - this.collisionRect.topLeft);
        }
          // _context.drawImage(_imgRef, _posX, _posY, this.m_width, this.m_height);

    }

    checkForCollision(_ball) { 

        // check to see if there has been a collision
        if (this.m_positionX + this.m_width > _ball.m_positionX // paddle right >= balls left
            && this.m_positionY < _ball.m_positionY + _ball.m_height // paddle top <= balls bottom
            && this.m_positionY + this.m_height > _ball.m_positionY // paddles botton >= balls top
            && this.m_positionX < _ball.m_positionX + _ball.m_width) { // paddles left <= balls right

           
            // left
            if (_ball.m_positionX > this.m_positionX
                && _ball.m_positionY > this.m_positionY
                && _ball.m_positionY < this.m_positionY + this.m_height) {
                    console.log("left");
                    _ball.m_velX *= -1;    
                _ball.m_positionX += ((this.m_positionX + this.m_width) - _ball.m_positionX);
            }
            
            // right
            else if (_ball.m_positionX < this.m_positionX + this.m_width
                && _ball.m_positionY > this.m_positionY
                && _ball.m_positionY < this.m_positionY + this.m_height) {
                console.log("right");
                _ball.m_velX *= -1;    
                    _ball.m_positionX -= (_ball.m_positionX + _ball.m_width) - this.m_positionX;
            }
     
            // // top
            // else if (_ball.m_positionY < this.m_positionY) {
            //     console.log("top");
            //     if (_ball.m_velY < 0)
            //         _ball.m_velY *= -1;
            //     _ball.m_positionY -= (_ball.m_positionY + _ball.m_width) - this.m_positionY;
            // }
           
            // // bottom
            //  if (_ball.m_positionY < this.m_positionY + this.m_height) {
            //     console.log("bottom");
            //     if (_ball.m_velY > 0)
            //     _ball.m_velY *= -1;
            //     _ball.m_positionY += (this.m_positionY + this.m_height) - _ball.m_positionY;
            // }
         
            
            _ball.m_velY *= -1;
        }
        else {
            this.collision = false;
        }

    }

    closePaddle() {
        

    }
};

export default Paddle;