/**
 * 
 *      AIPaddle.js
 * 
 */

import Paddle from "./Paddle"



class AIPaddle extends Paddle { 

    m_dNextDelayTime = 0.0;
    m_dDelayTime = 0.0;
    m_dCurDelayTime = 0.0;
    m_bIsDelayed = false;
    m_prevBallPosition = 0.0;
    m_changeInPosition = 0.0;

    constructor(_gameWidth, _gameHeight, _color, _paddleHeight) { 

        super(_gameWidth, _gameHeight, _color, _paddleHeight);
        this.findNextDelayTime();

        
    }

    findNextDelayTime() { 
        this.m_dNextDelayTime = (Math.random() * 5) + 1;
        this.m_dDelayTime = ((Math.random() * 100) + 1)/ 100;
    }

    moveToBall(_targetPosY, _dt) { 

        if (this.m_positionY <= 10) {
            this.m_positionY = 11;
            return;
        }

        if (this.m_positionY + this.m_height >= this.m_gameHeight) { 
            this.m_positionY = this.m_positionY - this.m_height;
            return;
        }

        if (_dt >= 0.1)
            _dt = 0.16;
        if (_targetPosY < this.m_positionY + this.m_height/2) { // moving up
            this.m_bIsMovingUp = true;
            this.m_positionY = this.m_positionY - (this.m_velocityY * _dt);
        }
        else if (_targetPosY > this.m_positionY - this.m_height/2) { // moving down
            this.m_bIsMovingDown = true;
            this.m_positionY = this.m_positionY + (this.m_velocityY * _dt);            
        }
    }

    trackBall(_posX, _posY, _dt) {

        // if (_posY >= this.m_positionY && _posY <= this.m_positionY + this.m_height) { 
        //     return;
        // }

        this.m_changeInPosition = Math.abs(_posY - this.m_prevBallPosition);
        if (this.m_changeInPosition >= 15 || this.m_positionX - _posX <= 100) {
            
            this.m_prevBallPosition = _posY;
            
            if (!this.m_bIsDelayed) {

                    //console.log("tracking");
                    // this.m_positionY = _posY;
                    this.moveToBall(_posY, _dt);
    
            }

        } 

    }

    update(_dt) { 
        super.update(_dt);
        this.m_dCurDelayTime += _dt;

        

        if (this.m_bIsDelayed) {
            console.log("is delayed for :" + this.m_dDelayTime);
            if (this.m_dCurDelayTime >= this.m_dDelayTime) { 
                this.m_dCurDelayTime = 0.0;
                this.m_bIsDelayed = false;
            }
        }
        else { 
            if (this.m_dCurDelayTime >= this.m_dNextDelayTime) { 
                this.m_dCurDelayTime = 0.0;
                this.findNextDelayTime();
                this.m_bIsDelayed = true;
            }
                
        }

    }
    render(_context, _imgRef) { 
       
        super.render(_context, _imgRef);
    }

}

export default AIPaddle;