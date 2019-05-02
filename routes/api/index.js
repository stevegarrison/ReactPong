const router = require("express").Router();
const optionsController = require("../../controllers/optionsContoller");

// Matches with "/api/options"
router.put("/options", function(req, res) {
  console.log(req.body);
  optionsController.update(req.body)
});

module.exports = router;
