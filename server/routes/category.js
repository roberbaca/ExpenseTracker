const express = require("express");
const categoryController = require("../controllers/category");
const isAdmin = require("../middlewares/authorization").authorizeAdmin;

const router = express.Router();

//  /api/category/add/
router.post("/add", isAdmin, categoryController.create);

// /api/category/all/
router.get("/all", categoryController.findAll);

module.exports = router;