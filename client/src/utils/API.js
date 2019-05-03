import axios from "axios";

export default {
  // Update options
  saveOptions: function(optionsData) {
    console.log(optionsData)
    return axios.put("/api/options", optionsData);
  },

  getOptions: function () {
    console.log("OPTIONS (API.js)");
    return axios.get("api/options");
  }
  
};
