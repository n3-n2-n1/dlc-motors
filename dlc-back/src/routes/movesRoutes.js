const express = require("express");
const router = express.Router();
const movesController = require("../controllers/movesControllers");



router.get("/moves", (req, res) => {
    movesController.getMoves(req, res);
});


router.post("/moves", (req, res) => {
    movesController.createMoves(req, res);
});

module.exports = router;