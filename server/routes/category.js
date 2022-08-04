const express = require("express");
const categoryController = require("../controllers/category");
const isAdmin = require("../middlewares/authorization").authorizeAdmin;

const router = express.Router();

//  /api/category/add/
router.post("/add", isAdmin, categoryController.create);

// /api/category/all/
router.get("/all", categoryController.findAll);

// /api/category/edit/
router.patch("/edit/:id", isAdmin,categoryController.updateCategory);

// /api/category/delete/
router.delete("/delete/:id", isAdmin, categoryController.deleteCategory);

module.exports = router;