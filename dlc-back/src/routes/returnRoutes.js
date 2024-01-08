// usuariosRoutes.js
const express = require("express");
const router = express.Router();
const returnProductControllers = require("../controllers/returnProductControllers");



router.get("/devoluciones", (req, res) => {
    returnProductControllers.getReturns(req, res);
  });


router.post("/devoluciones", (req, res) => {
    returnProductControllers.createReturn(req, res)
})



module.exports = router
  