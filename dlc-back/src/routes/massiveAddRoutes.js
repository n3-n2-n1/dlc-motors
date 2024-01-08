const express = require('express');
const router = express.Router();
const massiveAddController = require('../controllers/massiveAddController');

router.post("/uploadExcel", (req, res) => {
    massiveAddController.massiveAdd(req, res)
  });

  
module.exports = router;