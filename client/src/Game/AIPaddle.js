/**
 * 
 *      AIPaddle.js
 * 
 */

import Paddle from "./Paddle"


var EventTimer = function () { 

    this.m_dCurrentTime = 0.0;
    this.m_dNextEventTime = 0.0;
    this.m_dMaxTime = 0.0;
}

class AIPaddle extends Paddle {

    // wrong dir time
    m_wrongDirTime = new EventTimer();

    // delay timer
    m_delayTimer = new EventTimer();

    // perfect timer
    m_perfectTimer = new EventTimer();
    m_bLocked = false;

    // save ball timer
    m_saveBallTimer = new EventTimer();

    m_bPracticeMode = false;

    m_bIsCollidingWithWall = false;

    // colliding, searching, wrongDirection, saveBall, perfect, DELAYED
    stateMachine = {
        szCurrentState: "",
        enterState: _szStateName => {
            if (this.szCurrentState === _szStateName)
                return;

            this.szCurrentState = _szStateName;

            switch (this.szCurrentState) { 

                case "SEARCHING":
                    this.m_bLocked = false;
                    break;
                default:

            };

        },
        updateStates: (_ballPosX, _ballPosY, _dt) => {

            console.log(this.szCurrentState);
            switch (this.szCurrentState) {
                case "PRACTICE":
                    this.stayWithBall(_ballPosY);
                    break;
                case "SEARCHING":

                    this.trackBall(_ballPosX, _ballPosY, _dt);

                    // update SAVEBALL timer
                    this.m_saveBallTimer.m_dCurrentTime += _dt;
                    if (this.m_saveBallTimer.m_dCurrentTime >= this.m_saveBallTimer.m_dNextEventTime) {
                        this.m_saveBallTimer.m_dCurrentTime = 0.0;
                        this.findNextSaveBallTime();
                        this.stateMachine.enterState("SAVEBALL");
                    }

                    // update PERFECT timer
                    this.m_perfectTimer.m_dCurrentTime += _dt;
                    if (this.m_perfectTimer.m_dCurrentTime >= this.m_perfectTimer.m_dNextEventTime) {
                        this.m_perfectTimer.m_dCurrentTime = 0.0;
                        this.findNextPerfectTime();
                        this.stateMachine.enterState("PERFECT");
                    }

                    // update wrong direction timer
                    this.m_wrongDirTime.m_dCurrentTime += _dt;
                    if (this.m_wrongDirTime.m_dCurrentTime >= this.m_wrongDirTime.m_dNextEventTime) {
                        this.m_wrongDirTime.m_dCurrentTime = 0.0;
                        this.findNextWrongDirTime();
                        this.stateMachine.enterState("WRONGDIR");
                    }

                    // update delay timer
                    this.m_delayTimer.m_dCurrentTime += _dt;
                    if (this.m_delayTimer.m_dCurrentTime >= this.m_delayTimer.m_dNextEventTime) {
                        this.m_delayTimer.m_dCurrentTime = 0.0;
                        this.findNextDelayTime();
                        this.stateMachine.enterState("DELAYED");
                    }

                    break;
                case "DELAYED":
                    this.m_delayTimer.m_dCurrentTime += _dt;
                    if (this.m_delayTimer.m_dCurrentTime >= this.m_delayTimer.m_dMaxTime) {
                        this.m_delayTimer.m_dCurrentTime = 0.0;
                        this.stateMachine.enterState("SEARCHING");
                    }

                    break;
                case "WRONGDIR":

                    // if the ball is too far then go back to searching
                    if (this.m_position.x - _ballPosX > this.m_gameWidth * .33 && Math.abs(_ballPosY - this.m_position.y) < (this.m_dimensions.height * 1.5)) {
                        this.m_wrongDirTime.m_dCurrentTime = 0.0;
                        this.stateMachine.enterState("SEARCHING");
                    }
                        
                    this.movePaddleWrongDir(_ballPosY, _dt);
                    this.m_wrongDirTime.m_dCurrentTime += _dt;
                    if (this.m_wrongDirTime.m_dCurrentTime >= this.m_wrongDirTime.m_dMaxTime) {
                        this.m_wrongDirTime.m_dCurrentTime = 0.0;
                        this.stateMachine.enterState("SEARCHING");
                    }
                    break;
                case "SAVEBALL":
                    if (this.m_position.x - _ballPosX > this.m_gameWidth * .33) {
                        this.m_saveBallTimer.m_dCurrentTime = 0.0;
                        this.stateMachine.enterState("SEARCHING");
                    }

                    // if the ball is in the middle of the paddle
                    if ((this.m_position.y + this.m_dimensions.width / 2) === _ballPosY + 16 && this.m_bLocked === false)
                        this.m_bLocked = true;
                    else
                        this.trackBall(_ballPosX, _ballPosY, _dt);

                    if (this.m_bLocked)
                        this.stayWithBall(_ballPosY);
                    
                    if (this.m_saveBallTimer.m_dCurrentTime >= this.m_saveBallTimer.m_dMaxTime) {
                        this.m_saveBallTimer.m_dCurrentTime = 0.0;
                        this.stateMachine.enterState("SEARCHING");
                    }
                        
                    break;
                case "PERFECT":
                        this.m_perfectTimer.m_dCurrentTime += _dt;
                    
                    // TODO: get the ball width not this hard coded value
                    // if the ball is in the middle of the paddle
                    if ((this.m_position.y + this.m_dimensions.width / 2) === _ballPosY + 16 && this.m_bLocked === false) 
                        this.m_bLocked = true;
                     else
                        this.trackBall(_ballPosX, _ballPosY, _dt);
                    
                    if (this.m_bLocked) 
                        this.stayWithBall(_ballPosY);
                    
                    if (this.m_perfectTimer.m_dCurrentTime >= this.m_perfectTimer.m_dMaxTime) {
                        this.m_perfectTimer.m_dCurrentTime = 0.0;
                        this.stateMachine.enterState("SEARCHING");
                    }
                    break;
                default:
                    
            };

        },
        exitState: () => {

        }
    };

    constructor(_gameWidth, _gameHeight, _color, _paddleHeight) {

        super(_gameWidth, _gameHeight, _color, _paddleHeight);
        this.initEventTimers();
    }

    initEventTimers() { 
        this.findNextDelayTime();
        this.findNextWrongDirTime();
        this.findNextPerfectTime();
        this.findNextSaveBallTime();

    }

    setPracticeMode() {
        this.m_bPracticeMode = true;
        this.m_velocity.y = 1000.0;
        this.stateMachine.enterState("PRACTICE");
    }

    setNormalMode() {
        this.m_bPracticeMode = false;
        this.m_velocity.y = 720.0;
        this.stateMachine.enterState("SEARCHING");
    }

    findNextDelayTime() {
        this.m_delayTimer.m_dNextEventTime = (Math.random() * 8) + 3;
        this.m_delayTimer.m_dMaxTime = ((Math.random() * 100) + 1) / 100;
    }

    findNextWrongDirTime() {
        this.m_wrongDirTime.m_dNextEventTime = (Math.random() * 6) + 1;
        this.m_wrongDirTime.m_dMaxTime = ((Math.random() * 100) + 1) / 100;
    }

    findNextPerfectTime() {
        this.m_perfectTimer.m_dNextEventTime = (Math.random() * 10) + 5;
        this.m_perfectTimer.m_dMaxTime = ((Math.random() * 5) + 1);
    }

    findNextSaveBallTime() {
        this.m_saveBallTimer.m_dNextEventTime = (Math.random() * 6) + 1;
        this.m_saveBallTimer.m_dMaxTime = 3;
    }


    moveToBall(_targetPosY, _dt) {

        // moving up
        if (_targetPosY < this.m_position.y + this.m_dimensions.height / 2) {
            this.m_bIsMovingUp = true;
            this.m_position.y = this.m_position.y - (this.m_velocity.y * _dt);
        }
        // moving down
        else if (_targetPosY > this.m_position.y - this.m_dimensions.height / 2) {
            this.m_bIsMovingDown = true;
            this.m_position.y = this.m_position.y + (this.m_velocity.y * _dt);
        }
    }

    movePaddleWrongDir(_targetPosY, _dt) {

        // moving up
        if (_targetPosY < this.m_position.y + this.m_dimensions.height / 2) {
            this.m_bIsMovingUp = true;
            this.m_position.y = this.m_position.y + (this.m_velocity.y * _dt);
        }
        // moving down
        else if (_targetPosY > this.m_position.y - this.m_dimensions.height / 2) {
            this.m_bIsMovingDown = true;
            this.m_position.y = this.m_position.y - (this.m_velocity.y * _dt);
        }
        this.checkForMapBoundries();
    }

    checkForMapBoundries() {
        if (this.m_position.y <= 1) {
            this.m_position.y = 1;
            return;
        }

        if (this.m_position.y + this.m_dimensions.height - 1 >= this.m_gameHeight) {
            this.m_position.y = this.m_gameHeight - this.m_dimensions.height - 1;
            return;
        }
    }

    /***********************************************************************************/
    /*                                                                                 */
    /*  name:   StayWithBall                                                           */
    /*                                                                                 */
    /*  parameters:  _targetPosY                                                       */
    /*                                                                                 */
    /*  purpose:    To stay with the balls movement no matter what                     */
    /*                                                                                 */
    /***********************************************************************************/
    stayWithBall(_targetPosY) {

        this.m_position.y = _targetPosY - this.m_dimensions.height / 2;
        this.checkForMapBoundries();

    }


    /***********************************************************************************/
    /*                                                                                 */
    /*  name:   trackBall                                                              */
    /*                                                                                 */
    /*  parameters:  _posX, _posY, _dt                                                 */
    /*                                                                                 */
    /*  purpose:  follow the ball in 1 player mode                                     */
    /*                                                                                 */
    /***********************************************************************************/
    trackBall(_posX, _posY, _dt) {

        if (this.m_bPracticeMode) {
            this.stayWithBall(_posY);
            return;
        }

        // check to see if the ball is already within range of the paddle
        // if the balls position is greater than the paddle top 
        // AND
        // the balls positions is less than or equal to the paddles bottom
        // RETURN
        if (_posY >= this.m_position.y && _posY <= this.m_position.y + this.m_dimensions.height) {
            return;
        }


        if (!this.m_bIsDelayed) {
            this.moveToBall(_posY, _dt);
        }
        this.checkForMapBoundries();

    }

    /***********************************************************************************/
    /*                                                                                 */
    /*  name:   update                                                                 */
    /*                                                                                 */
    /*  parameters:  _posX, _posY, _dt                                                 */
    /*                                                                                 */
    /*  purpose:  update the AIPaddle                                                  */
    /*                                                                                 */
    /***********************************************************************************/
    update(_ballPosX, _ballPosY, _dt) {

        // if (this.m_bPracticeMode)
        //     return;


        this.stateMachine.updateStates(_ballPosX, _ballPosY, _dt);

    }

    /***********************************************************************************/
    /*                                                                                 */
    /*  name:   render                                                                 */
    /*                                                                                 */
    /*  parameters:  _context                                                          */
    /*                                                                                 */
    /*  purpose:  render the AIPaddle to the screen                                    */
    /*                                                                                 */
    /***********************************************************************************/
    render(_context) {
        super.render(_context);
    }

}

export default AIPaddle;