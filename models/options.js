const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const optionsSchema = new Schema({
    player1Color: { type: String, default: "white"},
    player1Size:{ type: Number, default: 130},
    player2Color: { type: String, default: "white"},
    player2Size:{ type: Number, default: 130},
    ballColor: { type: String, default: "white"},
    imageURL: { type: String},
    value: { type: Number, default: 5},
    multiBall: { type: String, default: "false"},
    paddleShrink: { type: String, default: "false"},
    fastBall: { type: String, default: "false"}

});

const Options = mongoose.model("Options", optionsSchema);

module.exports = Options;
