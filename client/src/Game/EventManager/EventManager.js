/**
 * 
 *          EventManager.js
 * 
 */

class EventManager { 

    // 
    m_szCurrentEvent = "";
    m_splitBalls = [];

    startEvent(_eventName) { 

        m_szCurrentEvent = _eventName;
        switch (m_szCurrentEvent) { 
            case "fast ball":
                break;
            case "tinypaddle":
                break;
            case "multiball":
                break;
            case "noevent":
                break;
            default:
        };
    }

    update(_dt) { 

        switch (m_szCurrentEvent) { 
            case "fast ball":
                break;
            case "tinypaddle":
                break;
            case "multiball":
                break;
            case "noevent":
                break;
            default:
        };
    }
    endEvent(_eventName) { 

        m_szCurrentEvent = _eventName;
        switch (m_szCurrentEvent) { 
            case "fast ball":
                break;
            case "tinypaddle":
                break;
            case "multiball":
                break;
            case "noevent":
                break;
            default:
        };
    }

    render() { 

        switch (m_szCurrentEvent) { 
            case "fast ball":
                break;
            case "tinypaddle":
                break;
            case "multiball":
                break;
            case "noevent":
                break;
            default:
        };
    }
};