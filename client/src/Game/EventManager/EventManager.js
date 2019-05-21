/**
 * 
 *          EventManager.js
 * 
 */
import Ball from "../Ball"

class EventManager {

    m_handleToBall = null;
    m_handleToPlayer1Paddle = null;
    m_handleToPlayer2Paddle = null;
    m_handleToAIPaddle = null;

    fastBall = "false";
    paddleShrink = "false";
    multiBall = "false";

    m_multiPlayer = false;

    m_splitBalls = [];
    m_nMaxTinyPaddleTime = 10;
    m_dCurTime = 0.0;
    m_dMaxEventTimer = 10.0;
    m_dMaxSplitBallTime = 10.0;
    m_dSplitBallWaveMaxTime = 0.1;
    m_dSplitBallWaveCurTime = 0.0;
    m_nNumSplitBallCurWave = 0;
    m_nNumSplitBallMaxWaves = 10;

    m_gameUIWidth = 0;
    m_gameUIHeight = 0;
    m_activeEvents = [];
    m_dNextEventTimer = 10.0
    m_szCurrentEvent = "no-event";


    initializeEventManager(_ball, _player1paddle, _player2paddle, _aiPaddle, _gameUIWidth, _gameUIHeight, _multiPlayer) {
        this.m_handleToBall = _ball;
        this.m_handleToPlayer1Paddle = _player1paddle;
        this.m_handleToPlayer2Paddle = _player2paddle;
        this.m_handleToAIPaddle = _aiPaddle;
        this.m_gameUIWidth = _gameUIWidth;
        this.m_gameUIHeight = _gameUIHeight;
        this.m_multiPlayer = _multiPlayer;
    }

    updateGameDimensions(_gameUIWidth, _gameUIHeight) {
        this.m_gameUIWidth = _gameUIWidth;
        this.m_gameUIHeight = _gameUIHeight;
    }

    addEventActiveEvent(_name) {

        this.m_activeEvents.push(_name);
    }

    findNextEvent() {
        console.log("enter findNextEvent");
        var events = [];
        console.log(this.multiBall);
        console.log(this.paddleShrink);
        console.log(this.fastBall);

        //if (this.state.multiBall === "true" || this.state.paddleShrink === "true" || this.state.fastBall === "true") {
        if (this.multiBall === "true") {
            console.log("options split-ball on");
            events.push("split-ball");
        }
        if (this.paddleShrink === "true") {
            console.log("options tiny-paddle on");
            events.push("tiny-paddle");
        }
        if (this.fastBall === "true") {
            console.log("options fast-ball on");
            events.push("fast-ball");
        }

        if (events.length !== 0) {

            var eventToChoose = Math.floor(Math.random() * events.length);

            var first = events[eventToChoose].split("-");

            for (let i = 0; i < this.m_activeEvents.length; ++i) {

                var second = this.m_activeEvents[i].split("-");

                // find an event that isnt the current one
                while (first[0] === second[0]) {
                    eventToChoose = Math.floor(Math.random() * events.length);
                    first = events[eventToChoose].split("-");
                }
            }

            this.startEvent(events[eventToChoose]);

        }

        console.log("exit findNextEvent");

    }

    updateSplitBalls(_dt) {

        if (this.m_nNumSplitBallCurWave !== this.m_nNumSplitBallMaxWaves) {

            this.m_dSplitBallWaveCurTime += _dt;
            if (this.m_dSplitBallWaveCurTime >= this.m_dSplitBallWaveMaxTime) {
                // spawn a new wave
                for (let i = 0; i < 3; ++i) {
                    var splitBall = new Ball(this.m_gameUIWidth, this.m_gameUIHeight, "white");
                    splitBall.resetBall();
                    this.m_splitBalls.push(splitBall);
                    this.m_dSplitBallWaveCurTime = 0.0;
                }
                this.m_nNumSplitBallCurWave++;

            }

        }

        // update the balls 
        for (let i = 0; i < this.m_splitBalls.length; ++i) {
            this.m_splitBalls[i].update(_dt, _sideHit => {

                switch (_sideHit) {
                    case "left":
                        this.m_splitBalls[i].m_position.x = 0.0;
                        this.m_splitBalls[i].m_velocity.x *= -1;
                        break;
                    case "right":
                        this.m_splitBalls[i].m_position.x = this.m_gameUIWidth - this.m_splitBalls[i].m_dimensions.width;
                        this.m_splitBalls[i].m_velocity.x *= -1;
                        break;
                    default:
                };
            });
        }

    }

    findAndRemoveActiveEvent(_name) {

        console.log("removing " + _name);
        console.log("active events length: " + this.m_activeEvents.length);
        for (let i = 0; i < this.m_activeEvents.length; ++i) {
            var first = this.m_activeEvents[i].split("-");
            var second = _name.split("-");
            if (first[0] === second[0]) {
                console.log("active events length: " + this.m_activeEvents.length);
                console.log("removing " + _name);
                this.m_activeEvents.splice(i, 1);
                console.log("active events length: " + this.m_activeEvents.length);
                break;
            }
        }
    }

    startEvent = _eventName => {

        var first = _eventName.split("-");

        // check to see if the event is no event
        if (first !== "no") {
            this.findAndRemoveActiveEvent("no-event");
        }

        // make sure the same event isnt entered twice
        for (let i = 0; i < this.m_activeEvents.length; ++i) {
            var second = this.m_activeEvents[i].split("-");
            console.log("first: " + first + ". second: " + second);
            if (first[0] === second[0])
                return;
        }

        console.log("startEvent");
        this.m_dCurTime = 0.0;
        this.addEventActiveEvent(_eventName);

        switch (_eventName) {
            case "fast-ball":
                this.m_handleToBall.enterFastBallEvent();
                break;
            case "tiny-paddle":
                this.m_handleToPlayer1Paddle.enterTinyPaddleEvent();

                if (this.m_multiPlayer)
                    this.m_handleToPlayer2Paddle.enterTinyPaddleEvent();
                else
                    this.m_handleToAIPaddle.enterTinyPaddleEvent();
                break;
            case "split-ball":
                for (let i = 0; i < 3; ++i) {
                    var splitBall = new Ball(this.m_gameUIWidth, this.m_gameUIHeight, "white");
                    splitBall.resetBall();
                    this.m_splitBalls.push(splitBall);
                }
                break;
            case "no-event":
                break;
            default:
        };
    }

    exitFastBallEvent() {

        this.m_handleToBall.exitFastBallEvent();
        this.findAndRemoveActiveEvent("fast-ball");
        if (this.m_activeEvents.length === 0)
            this.startEvent("no-event");
    }

    updateEvents = _dt => {

        // check time till next event
        if (this.m_dNextEventTimer <= 0.0) {

            this.findNextEvent();

            this.m_dNextEventTimer = this.m_dMaxEventTimer;
        }
        else {
            this.m_dNextEventTimer = this.m_dNextEventTimer - _dt;
        }


        for (let x = 0; x < this.m_activeEvents.length; ++x) {
            switch (this.m_activeEvents[x]) {
                case "split-ball":

                    console.log("updating split balls");

                    this.updateSplitBalls(_dt);

                    this.m_dCurTime += _dt;
                    if (this.m_dCurTime >= this.m_dMaxSplitBallTime) {

                        this.m_splitBalls = [];
                        console.log("spb len" + this.m_splitBalls.length);
                        this.m_dCurTime = 0.0;
                    }

                    if (this.m_splitBalls.length === 0) {
                        this.findAndRemoveActiveEvent("split-ball");
                        if (this.m_activeEvents.length === 0)
                            this.startEvent("no-event");
                        this.m_nNumSplitBallCurWave = 0;
                        this.m_dSplitBallWaveCurTime = 0.0;
                    }
                    break;
                case "tiny-paddle":
                    this.m_dCurTime += _dt;
                    if (this.m_dCurTime >= this.m_nMaxTinyPaddleTime) {
                        this.m_dCurTime = 0.0;

                        this.m_handleToPlayer1Paddle.exitTinyPaddleEvent();

                        if (this.m_multiPlayer)
                            this.m_handleToPlayer2Paddle.exitTinyPaddleEvent();
                        else
                            this.m_handleToAIPaddle.exitTinyPaddleEvent();

                        this.findAndRemoveActiveEvent("tiny-paddle");
                        if (this.m_activeEvents.length === 0)
                            this.startEvent("no-event");
                    }

                    break;
                case "no-event":
                    break;
                default:
            };
        }
    }

    renderEvents(_context) {
        //console.log("rendering events");

        for (let x = 0; x < this.m_activeEvents.length; ++x) {
            switch (this.m_activeEvents[x]) {
                case "split-ball":
                    //console.log("rendering splitballs");
                    console.log(this.m_splitBalls);
                    for (let i = 0; i < this.m_splitBalls.length; ++i) {
                        this.m_splitBalls[i].render(_context);
                    }
                    break;
                case "no-event":
                    break;
                default:
            };
        }
    }

};

export default EventManager;