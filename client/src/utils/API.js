import axios from "axios";

export default {
  // Update options
  saveOptions: function(optionsData) {
    console.log(optionsData)
    return axios.put("/api/options", optionsData);
  },

  getOptions: function () {
    return axios.get("api/options");
  }
  
};
