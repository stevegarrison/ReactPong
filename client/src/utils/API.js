import axios from "axios";

export default {
  //Load Options
  getOptions: function () {
    console.log("OPTIONS (API.js)");
    return axios.get("/api/options");
  },
  // Update options
  saveOptions: function (optionsData) {
    console.log(optionsData)
    return axios.put("/api/options", optionsData);
  }
};
