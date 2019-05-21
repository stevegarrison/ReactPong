/**
 * 
 *      Ball.js
 * 
 */

import GameObject from "./GameObject"

class Ball extends GameObject {

    m_minVelY = 100.0;
    m_maxVelY = 950.0;
    m_startingVel = 350.0;

    m_gameWidth = 0;
    m_gameHeight = 0;
    m_originX = 0.0;
    m_originY = 0.0;
    m_ballColor = "red";
    m_friction = 100.0;
    m_bExitingFastBallEvent = false;
    m_bInFastBallEvent = false;

    delayLogic = {
        m_dCurrentDelayTime: 0.0,
        m_dMaxDelayTime: 1.0
    };


    constructor(_gameWidth, _gameHeight, _ballColor) {
        super();

        this.m_position.x = 400.0;
        this.m_position.y = 500.0;
        this.m_velocity.x = 750.0;
        this.m_velocity.y = 350.0;
        this.m_dimensions.width = 25;
        this.m_dimensions.height = 25;

        this.m_gameWidth = _gameWidth;
        this.m_gameHeight = _gameHeight;
        this.m_ballColor = _ballColor;
        this.placeAtOrigin();
    }

    placeAtOrigin() {
        this.delayLogic.m_dCurrentDelayTime = 0;
        this.m_position.x = this.m_gameWidth / 2 - this.m_dimensions.width / 2;
        this.m_position.y = this.m_gameHeight / 2;
    }

    enterFastBallEvent() {

        this.m_bInFastBallEvent = true;
        if (this.m_velocity.x > 0)
            this.m_velocity.x = 1700.0;
        else
            this.m_velocity.x = -1700.0;

    }

    exitFastBallEvent() {
        this.m_bExitingFastBallEvent = true;
        if (this.m_velocity.x > 0)
            this.m_velocity.x = 750.0;
        else
            this.m_velocity.x = -750.0;

    }

    resetBall() {
        this.m_velocity.y = this.m_startingVel;

        this.m_velocity.y = Math.floor(Math.random() * this.m_startingVel) + 100.0;

        if (Math.floor(Math.random() * 3) === 0) {
            this.m_velocity.y *= -1;
        }
        if (Math.floor(Math.random() * 3) === 0)
            this.m_velocity.x *= -1;
        this.placeAtOrigin();
    }

    addVelY() {

        var amtToAdd = 350;
        if (this.m_velocity.y < 0) {

            if (this.m_velocity.y >= -this.m_maxVelY)
                this.m_velocity.y -= amtToAdd;
        }
        else if (this.m_velocity.y > 0) {
            if (this.m_velocity.y <= this.m_maxVelY)
                this.m_velocity.y += amtToAdd;
        }
        else {
            this.m_velocity.y += amtToAdd;
        }
    }

    updateGameSize(_gameWidth, _gameHeight) {
        this.m_gameWidth = _gameWidth;
        this.m_gameHeight = _gameHeight;
    }

    decelerateVelY(_dt) {

        if (this.m_velocity.y < 0) {

            this.m_velocity.y += this.m_friction * _dt;

            if (this.m_velocity.y > -(this.m_minVelY)) {
                this.m_velocity.y = -(this.m_minVelY);
            }
        }
        else {
            this.m_velocity.y -= this.m_friction * _dt;

            if (this.m_velocity.y < this.m_minVelY) {
                this.m_velocity.y = this.m_minVelY;
            }
        }

    }


    update(_dt, _callback) {

        this.delayLogic.m_dCurrentDelayTime += _dt;
        if (this.delayLogic.m_dCurrentDelayTime < this.delayLogic.m_dMaxDelayTime)
            return;

        this.decelerateVelY(_dt);

        this.m_position.x += this.m_velocity.x * _dt;
        //console.log("velyU: " + this.m_velocity.y);
        this.m_position.y += this.m_velocity.y * _dt;


        var sideHit = "";
        if (this.m_position.x < 0) {
            sideHit = "left";
        }
        if (this.m_position.x + this.m_dimensions.width > this.m_gameWidth) {
            sideHit = "right";
        }

        if (this.m_position.y < 0) {
            this.m_position.y = 0;
            this.m_velocity.y *= -1;
        }

        if (this.m_position.y + this.m_dimensions.height > this.m_gameHeight) {
            // console.log("position: " + this.m_dimensions.height);
            //console.log("amt: " + ((this.m_position.y + this.m_dimensions.height) - this.m_gameHeight));

            this.m_position.y -= ((this.m_position.y + this.m_dimensions.height) - this.m_gameHeight);
            this.m_velocity.y *= -1;
        }

        _callback(sideHit);

        //GamePlayer.prototype.update(_dt)
    }

    flipVelX() {
        this.m_velocity.x *= -1;
    }

    flipVelY() {
        this.m_velocity.y *= -1;
    }

    renderCollisionRect(_context) {

        _context.fillRect(this.m_position.x, this.m_position.y, this.m_dimensions.width, this.m_dimensions.height);
    }

    render(_context) {
        _context.fillStyle = this.m_ballColor;

        _context.beginPath();
        _context.arc(this.m_position.x + this.m_dimensions.width / 2, this.m_position.y + this.m_dimensions.height / 2, this.m_dimensions.width / 2, 0, Math.PI * 2);
        _context.fill();
        _context.fillStyle = "black";
        _context.lineWidth = 3;
        _context.arc(this.m_position.x + this.m_dimensions.width / 2, this.m_position.y + this.m_dimensions.height / 2, this.m_dimensions.width / 2, 0, Math.PI * 2);
        _context.stroke();
        _context.closePath();
    }

};

export default Ball;