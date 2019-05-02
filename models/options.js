const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const optionsSchema = new Schema({
    player1Color: { type: String, default: "white"},
    player2Color: { type: String, default: "white"},
    ballColor: { type: String, default: "white"},
    imageURL: { type: String}
});

const Options = mongoose.model("Options", optionsSchema);

module.exports = Options;
