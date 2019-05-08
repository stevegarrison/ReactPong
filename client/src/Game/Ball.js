/**
 * 
 *      Ball.js
 * 
 */



class Ball {

    m_positionX = 400.0;
    m_positionY = 500.0;
    m_velX = 750.0;
    m_minVelY = 100.0;
    m_maxVelY = 950.0;
    m_currentVelY = 350.0;
    m_startingVel = 350.0;


    m_width = 25;
    m_height = 25;
    m_gameWidth = 0;
    m_gameHeight = 0;
    m_originX = 0.0;
    m_originY = 0.0;
    m_ballColor = "red";
    m_friction = 100.0;
    m_bFastBallEvent = false;

    delayLogic = {
        m_dCurrentDelayTime :  0.0,
        m_dMaxDelayTime :  1.0
    };
    

    constructor(_gameWidth, _gameHeight, _ballColor) { 
        this.m_gameWidth = _gameWidth;
        this.m_gameHeight = _gameHeight;
        this.m_ballColor = _ballColor;
    }
    
    placeAtOrigin() { 
        this.m_positionX = this.m_gameWidth / 2 - this.m_width/2;
        this.m_positionY = this.m_gameHeight / 2;
    }

    enterFastBallEvent() { 
        this.m_bFastBallEvent = true;

       // this.m_currentVelY = m_currentVelY + (m_currentVelY * 0.5);
        if (this.m_velX > 0)
            this.m_velX = 1700.0;
        else
            this.m_velX = -1700.0;

    }
    exitFastBallEvent() { 
        this.m_bFastBallEvent = false;
        if (this.m_velX > 0)
            this.m_velX = 750.0;
        else
            this.m_velX = -750.0;

    }

    resetBall() { 
        this.m_currentVelY = this.m_startingVel;

        this.m_currentVelY = Math.floor(Math.random() * this.m_startingVel) + 100.0;
        console.log("random ball vel" + this.m_currentVelY);

        if (Math.floor(Math.random() * 3) === 0) {
            console.log("flipping Y");
            this.m_currentVelY *= -1;
        }
        if (Math.floor(Math.random() * 3) === 0)
            this.m_velX *= -1;
        this.placeAtOrigin();
        this.exitFastBallEvent();
    }

    addVelY() { 

        var amtToAdd = 350;
        if (this.m_currentVelY < 0) {

            if (this.m_currentVelY >= -this.m_maxVelY)
                this.m_currentVelY -= amtToAdd;
        }
        else if (this.m_currentVelY > 0) {
            if (this.m_currentVelY <= this.m_maxVelY)
                this.m_currentVelY += amtToAdd;
        }
        else { 
            this.m_currentVelY += amtToAdd;            
        }
    }

    updateGameSize(_gameWidth, _gameHeight) { 
        this.m_gameWidth = _gameWidth;
        this.m_gameHeight = _gameHeight;
    }

    decelerateVelY(_dt) { 

        if (this.m_currentVelY < 0) {
           
            this.m_currentVelY += this.m_friction * _dt;

            if (this.m_currentVelY > -(this.m_minVelY)) {
                this.m_currentVelY = -(this.m_minVelY);
            }
        }
        else { 
            this.m_currentVelY -= this.m_friction * _dt;

            if (this.m_currentVelY < this.m_minVelY) {
                this.m_currentVelY = this.m_minVelY;
            }
        }
        
    }


    update(_dt, _callback) {

      this.decelerateVelY(_dt);

        this.m_positionX += this.m_velX * _dt;
       //console.log("velyU: " + this.m_currentVelY);
        this.m_positionY += this.m_currentVelY * _dt;


        var sideHit = "";
        if (this.m_positionX < 0) {
            this.resetBall();
            this.m_velX *= -1;
            sideHit = "left";
        }
        if (this.m_positionX + this.m_width > this.m_gameWidth) {
            this.resetBall();
            this.m_velX *= -1;
            sideHit = "right";
        }

        if (this.m_positionY < 0) {
            this.m_positionY += Math.abs(this.m_positionY);
            this.m_currentVelY *= -1;
        }

        if (this.m_positionY + this.m_height > this.m_gameHeight) {
           // console.log("position: " + this.m_height);
            //console.log("amt: " + ((this.m_positionY + this.m_height) - this.m_gameHeight));
            
            this.m_positionY -= ((this.m_positionY + this.m_height) - this.m_gameHeight);
            this.m_currentVelY *= -1;
        }

        _callback(sideHit);

        //GamePlayer.prototype.update(_dt)
    }

    flipVelX() { 
        this.m_velX *= -1;
    }

    flipVelY() { 
        this.m_currentVelY *= -1;
    }
    
    renderCollisionRect(_context) { 

        _context.fillRect(this.m_positionX, this.m_positionY, this.m_width, this.m_height);
    }

    render(_context, _imgRef, _levelWidth, _levelHeight) {
        // console.log(_imgRef);
        // GamePlayer.prototype.render(_context, _imgRef);
        // _context.fillRect(_imgRef, this.m_positionX, this.m_positionY, this.m_width, this.m_height);
        //_context.drawImage(_imgRef, this.m_positionX, this.m_positionY, this.m_width, this.m_height);
       _context.fillStyle = this.m_ballColor;
        // _context.fillRect(this.m_positionX, this.m_positionY, this.m_width, this.m_height);

        _context.beginPath();
        _context.arc(this.m_positionX + this.m_width/2, this.m_positionY + this.m_height/2, this.m_width/2, 0, Math.PI * 2);
       // _context.ellipse(this.m_positionX + this.m_width/2, this.m_positionY + this.m_height/2, this.m_width/2, this.m_height/2, Math.PI * this.m_width, 0,  Math.PI * this.m_width);
        _context.fill();


       // _context.beginPath();
        _context.fillStyle = "black";
        _context.lineWidth = 3;
       _context.arc(this.m_positionX + this.m_width/2, this.m_positionY + this.m_height/2, this.m_width/2, 0, Math.PI * 2);
       _context.stroke();
       _context.closePath();

    //    this.renderCollisionRect(_context);

    }

};

export default Ball;