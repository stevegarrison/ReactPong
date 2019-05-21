/**
 * 
 *      Paddle.js
 * 
 */

import GameObject from "./GameObject"

class Paddle extends GameObject  {
    m_bPlaySound = true;

    eventLogic = {
        m_prevSize: 0
    };

    m_paddleColor = "red";
    m_gameWidth = 0;
    m_gameHeight = 0;
    m_bIsMovingUp = false;
    m_bIsMovingDown = false;
    m_sfxPositive = new Audio("./audio/ping.wav");

    collision = false;
    collisionRect = {
        topLeft: 0.0,
        topRight: 0.0,
        bottomLeft: 0.0,
        bottomRight: 0.0

    }

    constructor(_gameWidth, _gameHeight, _color, _paddleHeight) { 
        super();
        this.m_position.x = 10.0;
        this.m_position.y = 10.0;
        this.m_velocity.x = 300.0;
        this.m_velocity.y = 720.0;
        this.m_dimensions.width = 30;
        this.m_dimensions.height = 130;
       
        this.m_gameWidth = _gameWidth;
        this.m_gameHeight = _gameHeight;
        this.m_dimensions.height = _paddleHeight;
        this.m_position.y = _gameHeight / 2 - this.m_dimensions.height / 2;
        this.m_paddleColor = _color;

    }
    setPosition(_posX, _posY) { 
        this.m_position.x = _posX;
        this.m_position.y = _posY;
    }

    setPositionX(_posX) { 
        this.m_position.x = _posX;
    }

    setPositionY(_posY) { 
        this.m_position.y = _posY;
    }

    getPositionX() { 
        return this.m_position.x;
    }

    getPositionY() { 
        return this.m_position.x;
    }

    placeAtOrigin() { 
        this.m_position.y = this.m_gameHeight / 2 - this.m_dimensions.height / 2;
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
        this.eventLogic.m_prevSize = this.m_dimensions.height;
        this.m_dimensions.height = 65;

    }
    exitTinyPaddleEvent() { 

        this.m_dimensions.height = this.eventLogic.m_prevSize;
    }

    clearMovingFlags() { 
        this.m_bIsMovingUp = false;
        this.m_bIsMovingDown = false;
    }

    movePaddle( _direction, _deltaTime) { 

        switch (_direction) { 

            case "up":
            //     console.log(this.m_position.y);
                this.m_bIsMovingUp = true;
                // - (this.m_velocity.y * _deltaTime) 
              if (this.m_position.y+1 > 0)
                this.m_position.y = this.m_position.y - (this.m_velocity.y * _deltaTime);
               // console.log(this.m_position.y);
                break;
            case "down":
           //if (this.m_position.y + (this.m_velocity.y * _deltaTime) > 0 && ((this.m_position.y + this.m_velocity.y) * _deltaTime + this.m_dimensions.height) < this.m_gameHeight)
                this.m_bIsMovingDown = true;
                //+ (this.m_velocity.y * _deltaTime)
           if((this.m_position.y  + this.m_dimensions.height)-1 < this.m_gameHeight)
                    this.m_position.y = this.m_position.y + (this.m_velocity.y * _deltaTime);
                break;

            case "right":
                //  if ((this.m_position.y + this.m_velocity.y) * _deltaTime > 0 && ((this.m_position.y + this.m_velocity.y) * _deltaTime + this.m_dimensions.height) < this.m_gameHeight)
                this.m_position.x = this.m_position.x - (this.m_velocity.x * _deltaTime);
                break;

            case "left":
            //  if ((this.m_position.y + this.m_velocity.y) * _deltaTime > 0 && ((this.m_position.y + this.m_velocity.y) * _deltaTime + this.m_dimensions.height) < this.m_gameHeight)
                this.m_position.x = this.m_position.x + (this.m_velocity.x * _deltaTime);
                break;
            default:
                break;
        };

        // if((this.m_position.x + this.m_velocity.x) * _deltaTime > 0 && (this.m_position.x + this.m_velocity.x) * _deltaTime < this.m_gameWidth)
        // this.m_position.x = (this.m_position.x + this.m_velocity.x) * _deltaTime;

        // if((this.m_position.y + this.m_velocity.y) * _deltaTime > 0 && ((this.m_position.y + this.m_velocity.y) * _deltaTime + this.m_dimensions.height) < this.m_gameHeight)   
        //      this.m_position.y = (this.m_position.y + this.m_velocity.y) * _deltaTime;
    }

    update(_dt) {
        //GamePlayer.prototype.update(_dt)
    }

    render(_context) {
        _context.fillStyle = this.m_paddleColor;
        _context.fillRect(this.m_position.x, this.m_position.y, this.m_dimensions.width, this.m_dimensions.height);

        _context.fillStyle = "black";
        _context.strokeRect(this.m_position.x, this.m_position.y, this.m_dimensions.width, this.m_dimensions.height);

        if (this.collision) { 
            console.log(this.collisionRect);
            _context.fillStyle = "red";
            _context.fillRect(this.collisionRect.topLeft, this.collisionRect.topLeft, this.collisionRect.topRight - this.collisionRect.topLeft, this.collisionRect.bottomRight - this.collisionRect.topLeft);
        }

    }

    checkForCollision = (_ball) =>{ 

        // check to see if there has been a collision
        if (this.m_position.x + this.m_dimensions.width > _ball.m_position.x // paddle right >= balls left
            && this.m_position.y < _ball.m_position.y + _ball.m_dimensions.height // paddle top <= balls bottom
            && this.m_position.y + this.m_dimensions.height > _ball.m_position.y // paddles botton >= balls top
            && this.m_position.x < _ball.m_position.x + _ball.m_dimensions.width) { // paddles left <= balls right

                if (this.m_bPlaySound) {
                this.m_sfxPositive.play();
            }
                // console.log("sfx" + this.m_sfxPositive);
                // this.m_sfxPositive.play();

            var thirdOfPaddle = this.m_dimensions.height / 3;
            if (_ball.m_position.y >= this.m_position.y + thirdOfPaddle && _ball.m_position.y <= (this.m_position.y + this.m_dimensions.height - thirdOfPaddle)) {
                _ball.m_velocity.y = _ball.m_velocity.y - (_ball.m_velocity.y * .9);
            } else {
         
                _ball.addVelY();
            }
           
            // left
            if (_ball.m_position.x > this.m_position.x
                && _ball.m_position.y > this.m_position.y
                && _ball.m_position.y < this.m_position.y + this.m_dimensions.height) {
                
                // find where on the paddle the ball hit
                // find the length of the paddle
                // find the range in the middle

                   if (this.m_bIsMovingUp) {
                    if (_ball.m_velocity.y > 0) {// if the ball is moving down
                        _ball.m_velocity.y *= -1;   
                    }
                } else if(this.m_bIsMovingDown){ 
                    if (_ball.m_velocity.y < 0) {// if the ball is moving up
                        _ball.m_velocity.y *= -1;   
                    }
                }
                _ball.m_velocity.x *= -1;    
                _ball.m_position.x += ((this.m_position.x + this.m_dimensions.width) - _ball.m_position.x);
            }
            
            // right
            else if (_ball.m_position.x < this.m_position.x + this.m_dimensions.width
                && _ball.m_position.y > this.m_position.y
                && _ball.m_position.y < this.m_position.y + this.m_dimensions.height) {
        
                    if (this.m_bIsMovingUp) {
                        if (_ball.m_velocity.y > 0) {// if the ball is moving down
                            _ball.m_velocity.y *= -1;   
                        }
                    } else if(this.m_bIsMovingDown){ 
                        if (_ball.m_velocity.y < 0) {// if the ball is moving up
                            _ball.m_velocity.y *= -1;   
                        }
                    }
                _ball.m_velocity.x *= -1;    
                _ball.m_position.x -= (_ball.m_position.x + _ball.m_dimensions.width) - this.m_position.x;
            }
     
            // // top
            else if (_ball.m_position.y - _ball.m_dimensions.height < this.m_position.y) {


                if(_ball.m_velocity.y > 0)
                    _ball.m_velocity.y *= -1;   

                // _ball.m_position.y = _ball.m_position.y - (_ball.m_position.y + _ball.m_dimensions.height) - this.m_position.y;
                _ball.m_position.y -= (_ball.m_position.y + _ball.m_dimensions.height) - this.m_position.y;
            }
           
            // // bottom
             else if (_ball.m_position.y < this.m_position.y + this.m_dimensions.height) {
                if(_ball.m_velocity.y < 0)
                _ball.m_velocity.y *= -1;   
                _ball.m_position.y += (this.m_position.y + this.m_dimensions.height) - _ball.m_position.y;
            }
            
        }
        else {
            this.collision = false;
        }
        // console.log("ball position type" + typeof( _ball.m_position.y));
        // console.log("ball height type" + typeof (_ball.m_dimensions.height));
        // var t = _ball.m_position.y + _ball.m_dimensions.height;
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