const express = require("express");

const authController = require("../controllers/auth");
const router = express.Router();
const isLogged = require("../middlewares/authorization").userLoggedIn;
const isAdmin = require("../middlewares/authorization").authorizeAdmin;

// /api/auth/register
router.post('/register', authController.registerUser)

router.post('/login', authController.loginUser)

router.get('/user/me', isLogged, authController.getUserInfo)

router.get('/admin/users', isAdmin, authController.findAllUsers)

router.delete('/admin/delete/:id', isAdmin, authController.deleteUser)

module.exports = router;


