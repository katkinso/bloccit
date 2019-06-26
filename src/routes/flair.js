const express = require("express");
const router = express.Router();

const flairController = require("../controllers/flairController")

router.get("/flairs", flairController.index);
router.get("/flairs/new", flairController.new);
router.post("/flairs/create", flairController.create);
router.post("/flairs/:id/destroy", flairController.destroy);


module.exports = router;
