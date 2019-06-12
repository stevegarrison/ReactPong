/**
 * 
 *      AIPaddle.js
 * 
 */

import Paddle from "./Paddle"



class AIPaddle extends Paddle {

    m_dCurWrongDirTime = 0.0;
    m_dMaxWrongDirTime = 0.0;
    m_dNextWrongDirTime = 0.0;

    m_dNextDelayTime = 0.0;
    m_dMaxDelayTime = 0.0;
    m_dCurDelayTime = 0.0;

    m_bPracticeMode = false;

    m_bIsCollidingWithWall = false;

    // colliding, searching, wrongDirection, saveBall, perfect, DELAYED
    stateMachine = {
        szCurrentState: "",
        enterState: _szStateName => {
            if (this.szCurrentState === _szStateName)
                return;

            this.szCurrentState = _szStateName;

        },
        updateStates: (_ballPosX, _ballPosY, _dt) => {

            console.log(this.szCurrentState);
            switch (this.szCurrentState) {
                case "PRACTICE":
                    this.stayWithBall(_ballPosY);
                    break;
                case "COLLIDING":
                    break;
                case "SEARCHING":


                    this.trackBall(_ballPosX, _ballPosY, _dt);

                    // update wrong direction timer
                    this.m_dCurWrongDirTime += _dt;
                    if (this.m_dCurWrongDirTime >= this.m_dNextWrongDirTime) {
                        this.m_dCurWrongDirTime = 0.0;
                        this.findNextWrongDirTime();
                        this.stateMachine.enterState("WRONGDIR");
                    }

                    // update delay timer
                    this.m_dCurDelayTime += _dt;
                    if (this.m_dCurDelayTime >= this.m_dNextDelayTime) {
                        this.m_dCurDelayTime = 0.0;
                        this.findNextDelayTime();
                        this.stateMachine.enterState("DELAYED");
                    }

                    break;
                case "DELAYED":
                    this.m_dCurDelayTime += _dt;
                    if (this.m_dCurDelayTime >= this.m_dMaxDelayTime) {
                        this.m_dCurDelayTime = 0.0;
                        this.stateMachine.enterState("SEARCHING");
                    }

                    break;
                case "WRONGDIR":
                    if (this.m_position.x - _ballPosX > this.m_gameWidth * .33) {
                        this.m_dCurWrongDirTime = 0.0;
                        this.findNextWrongDirTime();
                        this.stateMachine.enterState("SEARCHING");
                    }
                        
                    this.movePaddleWrongDir(_ballPosY, _dt);
                    this.m_dCurWrongDirTime += _dt;
                    if (this.m_dCurWrongDirTime >= this.m_dMaxWrongDirTime) {
                        this.m_dCurWrongDirTime = 0.0;
                        this.findNextWrongDirTime();
                        this.stateMachine.enterState("SEARCHING");
                    }
                    break;
                case "SAVEBALL":
                    break;
                case "PERFECT":
                    break;
                default:
                    
            };

        },
        exitState: () => {

        }
    };

    constructor(_gameWidth, _gameHeight, _color, _paddleHeight) {

        super(_gameWidth, _gameHeight, _color, _paddleHeight);
        this.findNextDelayTime();

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
        this.m_dNextDelayTime = (Math.random() * 5) + 1;
        this.m_dMaxDelayTime = ((Math.random() * 100) + 1) / 100;
    }
    findNextWrongDirTime() {
        this.m_dNextWrongDirTime = (Math.random() * 5) + 1;
        this.m_dMaxWrongDirTime = ((Math.random() * 100) + 1) / 100;
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