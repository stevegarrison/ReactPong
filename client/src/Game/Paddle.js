/**
 * 
 *      Paddle.js
 * 
 */

class Paddle  {


    eventLogic = {
        m_prevSize: 0
    };
    m_positionX = 10.0;
    m_positionY = 10.0;
    m_velocityX = 300.0;
    m_velocityY = 720.0;
    m_width = 30;
    m_height = 130;
    m_paddleColor = "red";
    m_gameWidth = 0;
    m_gameHeight = 0;
    m_bIsMovingUp = false;
    m_bIsMovingDown = false;
    m_sfxPositive = new Audio("./audio/ping.wav");

    // sfx = {
    //     handle: null,
    //     file: "../../public/audio/positive.mp3",
    // };

    collision = false;
    collisionRect = {
        topLeft: 0.0,
        topRight: 0.0,
        bottomLeft: 0.0,
        bottomRight: 0.0

    }

    constructor(_gameWidth, _gameHeight, _color, _paddleHeight) { 
        this.m_gameWidth = _gameWidth;
        this.m_gameHeight = _gameHeight;
        this.m_height = _paddleHeight;
        this.m_positionY = _gameHeight / 2 - this.m_height / 2;
        this.m_paddleColor = _color;

       // this.sfx.handle = new Audio(this.sfx.file);
        // console.log("sfx" + this.m_sfxPositive);
        // this.m_sfxPositive.play();
       // console.log("sfx" + this.sfx.handle);

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

    enterTinyPaddleEvent() { 
        this.eventLogic.m_prevSize = this.m_height;
        this.m_height = 65;

    }
    exitTinyPaddleEvent() { 

        this.m_height = this.eventLogic.m_prevSize;
    }

    clearMovingFlags() { 
        this.m_bIsMovingUp = false;
        this.m_bIsMovingDown = false;
    }

    movePaddle( _direction, _deltaTime) { 

        switch (_direction) { 

            case "up":
            //     console.log(this.m_positionY);
                this.m_bIsMovingUp = true;
                // - (this.m_velocityY * _deltaTime) 
              if (this.m_positionY+1 > 0)
                this.m_positionY = this.m_positionY - (this.m_velocityY * _deltaTime);
               // console.log(this.m_positionY);
                break;
            case "down":
           //if (this.m_positionY + (this.m_velocityY * _deltaTime) > 0 && ((this.m_positionY + this.m_velocityY) * _deltaTime + this.m_height) < this.m_gameHeight)
                this.m_bIsMovingDown = true;
                //+ (this.m_velocityY * _deltaTime)
           if((this.m_positionY  + this.m_height)-1 < this.m_gameHeight)
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

        _context.fillStyle = "black";
        _context.strokeRect(this.m_positionX, this.m_positionY, this.m_width, this.m_height);

        if (this.collision) { 
            console.log(this.collisionRect);
            _context.fillStyle = "red";
            _context.fillRect(this.collisionRect.topLeft, this.collisionRect.topLeft, this.collisionRect.topRight - this.collisionRect.topLeft, this.collisionRect.bottomRight - this.collisionRect.topLeft);
        }
          // _context.drawImage(_imgRef, _posX, _posY, this.m_width, this.m_height);

    }

    checkForCollision = (_ball) =>{ 

        // check to see if there has been a collision
        if (this.m_positionX + this.m_width > _ball.m_positionX // paddle right >= balls left
            && this.m_positionY < _ball.m_positionY + _ball.m_height // paddle top <= balls bottom
            && this.m_positionY + this.m_height > _ball.m_positionY // paddles botton >= balls top
            && this.m_positionX < _ball.m_positionX + _ball.m_width) { // paddles left <= balls right

                this.m_sfxPositive.play();
            
                // console.log("sfx" + this.m_sfxPositive);
                // this.m_sfxPositive.play();

            var thirdOfPaddle = this.m_height / 3;
            if (_ball.m_positionY >= this.m_positionY + thirdOfPaddle && _ball.m_positionY <= (this.m_positionY + this.m_height - thirdOfPaddle)) {
                _ball.m_currentVelY = _ball.m_currentVelY - (_ball.m_currentVelY * .9);
            } else {
         
                _ball.addVelY();
            }
           
            // left
            if (_ball.m_positionX > this.m_positionX
                && _ball.m_positionY > this.m_positionY
                && _ball.m_positionY < this.m_positionY + this.m_height) {
                
                // find where on the paddle the ball hit
                // find the length of the paddle
                // find the range in the middle

                   if (this.m_bIsMovingUp) {
                    if (_ball.m_currentVelY > 0) {// if the ball is moving down
                        _ball.m_currentVelY *= -1;   
                    }
                } else if(this.m_bIsMovingDown){ 
                    console.log("moving down and hit");
                    if (_ball.m_currentVelY < 0) {// if the ball is moving up
                           console.log("moving down and hit");
                        _ball.m_currentVelY *= -1;   
                    }
                }
                console.log("left");
                _ball.m_velX *= -1;    
                _ball.m_positionX += ((this.m_positionX + this.m_width) - _ball.m_positionX);
            }
            
            // right
            else if (_ball.m_positionX < this.m_positionX + this.m_width
                && _ball.m_positionY > this.m_positionY
                && _ball.m_positionY < this.m_positionY + this.m_height) {
        
                    if (this.m_bIsMovingUp) {
                        if (_ball.m_currentVelY > 0) {// if the ball is moving down
                            _ball.m_currentVelY *= -1;   
                        }
                    } else if(this.m_bIsMovingDown){ 
                        if (_ball.m_currentVelY < 0) {// if the ball is moving up
                            _ball.m_currentVelY *= -1;   
                        }
                    }
                console.log("right");
                _ball.m_velX *= -1;    
                _ball.m_positionX -= (_ball.m_positionX + _ball.m_width) - this.m_positionX;
            }
     
            // // top
            else if (_ball.m_positionY - _ball.m_height < this.m_positionY) {


                if(_ball.m_currentVelY > 0)
                    _ball.m_currentVelY *= -1;   
                console.log("top");
                console.log("ball y" + _ball.m_positionY);
                console.log("ball height" + _ball.m_height);
                console.log("paddle y "  + this.m_positionY);

                // _ball.m_positionY = _ball.m_positionY - (_ball.m_positionY + _ball.m_height) - this.m_positionY;
                console.log("ball y" + _ball.m_positionY);
                _ball.m_positionY -= (_ball.m_positionY + _ball.m_height) - this.m_positionY;
            }
           
            // // bottom
             else if (_ball.m_positionY < this.m_positionY + this.m_height) {
                if(_ball.m_currentVelY < 0)
                _ball.m_currentVelY *= -1;   
                console.log("bottom");
                _ball.m_positionY += (this.m_positionY + this.m_height) - _ball.m_positionY;
            }
            
        }
        else {
            this.collision = false;
        }
        // console.log("ball position type" + typeof( _ball.m_positionY));
        // console.log("ball height type" + typeof (_ball.m_height));
        // var t = _ball.m_positionY + _ball.m_height;
        // console.log("ball height + position" + t);

    }
    updateGameSize(_gameWidth, _gameHeight) { 
        this.m_gameWidth = _gameWidth;
        this.m_gameHeight = _gameHeight;
    }

    closePaddle() {
        

    }
};

export default Paddle;