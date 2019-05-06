/**
 * 
 *      Timer.js
 * 
 */

class Timer { 

    m_startTime = 0.0;
    m_elapsedTime = 0.0;

    startTime() { 
        this.m_startTime = new Date().getTime();
    }

    updateTime() { 
        var currentTime = new Date().getTime();
        this.m_elapsedTime = (currentTime - this.startTime) / 1000;
        this.m_startTime = currentTime;
    }


}

export default Timer;