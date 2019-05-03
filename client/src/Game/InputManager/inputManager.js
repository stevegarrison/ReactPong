/***
 * 
 *      inputManager.js
 * 
 */

class InputManager { 

    m_keys = [];

    addKey = _keyToAdd => { 

        if (_keyToAdd !== "") {
            this.m_keys.unshift(_keyToAdd);
         }

    }

    processKeys(_callback) { 

        _callback(this.m_keys);
    }

  
    // returns the key it removed
    removeKey = () => { 
        return this.m_keys.shift();
    }

    removeAllKeys = () => { 

    }
};

export default InputManager;