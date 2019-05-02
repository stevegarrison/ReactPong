/**
 * 
 *      GameInput.js
 *  
 */

class GameInput { 

    keys = [{
        key = "",
        callback = null
    }];

    addKey() { 
        
    }

    updateKeys() { 

        for (let i = 0; keys.length; ++i) { 
            keys[i].callback();
        }
    }

    removeKeys() { 
        keys = [];
    }
};