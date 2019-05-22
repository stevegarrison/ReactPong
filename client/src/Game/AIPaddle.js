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
    m_bPracticeMode = false;

    constructor(_gameWidth, _gameHeight, _color, _paddleHeight) { 

        super(_gameWidth, _gameHeight, _color, _paddleHeight);
        this.findNextDelayTime();
        
    }

    setPracticeMode() {
        this.m_bPracticeMode = true;
        this.m_velocity.y = 1000.0;
     }

    setNormalMode() { 
        this.m_bPracticeMode = false;
        this.m_velocity.y = 720.0;
    }
    findNextDelayTime() { 
        this.m_dNextDelayTime = (Math.random() * 5) + 1;
        this.m_dDelayTime = ((Math.random() * 100) + 1)/ 100;
    }

    moveToBall(_targetPosY, _dt) { 

        if (this.m_position.y <= 0) {
            this.m_position.y = 1;
            return;
        }

        if (this.m_position.y + this.m_dimensions.height >= this.m_gameHeight) { 
            this.m_position.y = this.m_position.y - this.m_dimensions.height;
            return;
        }

        
        if (_targetPosY < this.m_position.y + this.m_dimensions.height/2) { // moving up
            this.m_bIsMovingUp = true;
            this.m_position.y = this.m_position.y - (this.m_velocity.y * _dt);
        }
        else if (_targetPosY > this.m_position.y - this.m_dimensions.height/2) { // moving down
            this.m_bIsMovingDown = true;
            this.m_position.y = this.m_position.y + (this.m_velocity.y * _dt);            
        }
    }

    stayWithBall(_targetPosY) { 
        
        this.m_position.y = _targetPosY - this.m_dimensions.height/2;

        if (this.m_position.y <= 0) {
            this.m_position.y = 0;
            return;
        }

        if (this.m_position.y + this.m_dimensions.height >= this.m_gameHeight) { 
            this.m_position.y = this.m_gameHeight - this.m_dimensions.height;
            return;
        }
       


    }

    trackBall(_posX, _posY, _dt) {

        if (this.m_bPracticeMode) { 
            this.stayWithBall(_posY);
            return;
        }

        if (_posY >= this.m_position.y && _posY <= this.m_position.y + this.m_dimensions.height) { 
            return;
        }

        this.m_changeInPosition = Math.abs(_posY - this.m_prevBallPosition);
        if (this.m_changeInPosition >= 10 || this.m_position.x - _posX <= 200) {
            
            this.m_prevBallPosition = _posY;
            
            if (!this.m_bIsDelayed) {

                    //console.log("tracking");
                    // this.m_position.y = _posY;
                    this.moveToBall(_posY, _dt);
    
            }

        } 

    }

    update(_dt) { 
        this.m_dCurDelayTime += _dt;

        if (this.m_bPracticeMode)
            return;
        
        if (this.m_bIsDelayed) {
           // console.log("is delayed for :" + this.m_dDelayTime);
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

    render(_context) { 
        super.render(_context);
    }

}

export default AIPaddle;