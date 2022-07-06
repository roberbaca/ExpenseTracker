const express = require("express");
const expensesController = require("../controllers/expense");
const isLogged = require("../middlewares/authorization").userLoggedIn;

const router = express.Router();

router.get("/", expensesController.helloWorld); // para testeo

router.post("/add", isLogged, expensesController.addExpense);

router.get("/all", isLogged, expensesController.showAll);

router.get("/search", isLogged, expensesController.searchByCategory);

router.get("/balance-by-category", isLogged, expensesController.getBalanceByCategory);

router.get("/balance", isLogged, expensesController.getBalance);

module.exports = router;
