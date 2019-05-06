/**
 * 
 *      AIPaddle.js
 * 
 */

import Paddle from "./Paddle"



class AIPaddle extends Paddle { 

    m_dNextDelayTime = 0.0;
    m_dDdelayTime = 0.0;
    m_dCurDelayTime = 0.0;
    m_bIsDelayed = false;

    constructor(_gameWidth, _gameHeight, _color) { 
        console.log(_color);
        super(_gameWidth, _gameHeight, _color);

        
    }

    findNextDelayTime() { 
        this.m_dNextDelayTime = (Math.random() * 10) + 1;
    }

    trackBall(_posY) { 

        if (!this.m_bIsDelayed)
            if (this.m_positionY - 5 > 0 && this.m_positionY + 5 < this.m_gameHeight) {
                console.log("tracking");
                this.m_positionY = _posY;
            }
   
}

    update(_dt) { 
        super.update(_dt);
        this.m_dCurDelayTime += _dt;

        if (this.m_bIsDelayed) {

        }
        else { 
            if (this.m_dCurDelayTime >= this.m_dNextDelayTime)
                var g = 0;
        }

    }
    render(_context, _imgRef) { 
       
        super.render(_context, _imgRef);
    }

}

export default AIPaddle;