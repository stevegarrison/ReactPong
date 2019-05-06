const router = require("express").Router();
const optionsController = require("../../controllers/optionsContoller");

// Matches with "/api/options"
router.put("/options", function (req, res) {
   
  console.log(req.body);
  optionsController.update(req.body, function (_data) { 
    res.json(_data);
  }); 

});

router.get("/options", function (req, res) {
  optionsController.findAll(function (_settings) { 

    res.json(_settings);
  });
  console.log("called find all in optionsController (routes/index.js)");
  
});

module.exports = router;


router.get("/options", function (req, res) {
  optionsController.findAll(req, res);
  console.log("called find all in optionsController (routes/index.js)");
});