const db = require("../models");

// Defining methods for the booksController
module.exports = {
  update: function (_settings, _callback) {
    console.log(_settings);
    let newPlayer1Color = _settings.player1Color;
    let newPlayer2Color = _settings.player2Color;
    let newBallColor = _settings.ballColor;
    let newImageURL = _settings.imageURL;

    console.log("New Player1 Color: " + newPlayer1Color);
    console.log("New Player2 Color: " + newPlayer2Color);
    console.log("New Ball Color: " + newBallColor);
    console.log("New Image: " + newImageURL);


    db.options
      .findOneAndUpdate({}, {
        player1Color: newPlayer1Color,
        player2Color: newPlayer2Color,
        ballColor: newBallColor,
        imageURL: newImageURL
      })
      .then(dbModel => { console.log("The model" + dbModel); _callback(dbModel) })
      .catch(err => console.log(err));
  },

  findAll: function (_callback) {
   
    db.options
      .find()
      .then(_settings => {
        console.log("SETTINGS (optionsController.js): " + _settings);
        _callback(_settings);
      }).catch(_err => console.log(_err));
      
  }
};
