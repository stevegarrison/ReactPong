const db = require("../models");

// Defining methods for the booksController
module.exports = {
  update: function(req, res) {
    console.log(req.body);
    let newPlayer1Color = req.player1Color;
    let newPlayer2Color = req.player2Color;
    let newBallColor = req.ballColor;
    let newImageURL = req.imageURL;

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
      .then(dbModel => { console.log("The model" + dbModel); res.json(dbModel)})
      .catch(err => res.status(422).json(err));
  },

  findAll: function(req, res) {
    db.options
    .find(req)
    .then(dbModel => { console.log("SETTINGS (optionsController.js): " + dbModel); res.json(dbModel)})
    .catch(err => res.status(422).json(err));
  }
};
