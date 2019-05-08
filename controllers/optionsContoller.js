const db = require("../models");

// Defining methods for the booksController
module.exports = {
  update: function (_settings, _callback) {
    console.log(_settings);
    let newPlayer1Color = _settings.player1Color;
    let newPlayer1Size = _settings.player1Size;
    let newPlayer2Color = _settings.player2Color;
    let newPlayer2Size = _settings.player2Size;
    let newBallColor = _settings.ballColor;
    let newImageURL = _settings.imageURL;
    let newValue = _settings.value
    let multiBall1 = _settings.multiBall;
    let paddleShrink1 = _settings.paddleShrink;
    let fastBall1 = _settings.fastBall;

    db.options
      .findOneAndUpdate({}, {
        player1Color: newPlayer1Color,
        player1Size: newPlayer1Size,
        player2Color: newPlayer2Color,
        player2Size: newPlayer2Size,
        ballColor: newBallColor,
        imageURL: newImageURL,
        value: newValue,
        multiBall: multiBall1,
        paddleShrink: paddleShrink1,
        fastBall: fastBall1
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
