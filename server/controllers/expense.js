const expense = require("../models/expense");
const user = require("../controllers/auth");

// para testeo:
const helloWorld = async (req, res) => {
    try {
        res.send("Hello World!");       

    } catch(error){
        console.log(error);
        res.statusCode = 500;
        res.send(error.message);
    }
}

// Se agrega un nuevo gasto
const addExpense = async (req, res) => {
    try {       
        const date = new Date(req.body.date);        
        const title = req.body.title;
        const amount = req.body.amount;
        const category = req.body.category;
        const user = req.user;             
        const newExpense = await expense.create( date,title, amount, category, user.id );
        res.send(newExpense);
    } catch(error) {
        console.log(error);
        res.statusCode = 500;
        res.send(error.message);
    }
}

// Se busca todos los gastos por categoria
const searchByCategory = async (req, res) => {
    try {
        const category = req.body.category;
        const user = req.user; 
        const getExpenses = await expense.getExpensesByCategory(category, user.id);
        res.send(getExpenses);
    } catch(error) {
        console.log(error);
        res.statusCode = 500;
        res.send(error.message);
    }
}

// Se busca monto total por categoria
const getBalanceByCategory = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const user = req.user; 
        const categoryBalance = await expense.getTotalAmountByCategory(id, user.id);
        res.status(200).send("$ " + (Math.round(categoryBalance*100)/100).toFixed(2));
    } catch(error) {
        console.log(error);
        res.statusCode = 500;
        res.send(error.message);
    }
}



// mostrar todo el listado de gastos
const showAll = async (req, res) => {
    try {     
        const user = req.user;    
        const allExpenses = await expense.getAllExpenses(user.id);
        res.send(allExpenses);
    } catch(error) {
        console.log(error);
        res.statusCode = 500;
        res.send(error.message);
    }
}

// Muestra la suma total de gastos
const getBalance = async (req, res) => {
    try {    
        const user = req.user;       
        const total = await expense.getTotalAmount(user.id);
        res.status(200).send("$ " + (Math.round(total*100)/100).toFixed(2));
    } catch(error) {
        console.log(error);
        res.statusCode = 500;
        res.send(error.message);
    }
}

// borra un gasto
const deleteExpense = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const user = req.user;
        const deletedExpense = await expense.deleteExpense(id, user.id);
        res.send(deletedExpense);
    } catch(error) {
        console.log(error);
        res.statusCode = 500;
        res.send(error.message);
    }
}

// actualiza un gasto
const updateExpense = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const date = new Date(req.body.date);        
        const title = req.body.title;
        const amount = req.body.amount;
        const category = req.body.category;
        const user = req.user; 

        const updatedExpense = await expense.editExpense(id, date, title, amount, category, user.id);
        res.send(updatedExpense);
    } catch(error) {
        console.log(error);
        res.statusCode = 500;
        res.send(error.message);
    }
}


module.exports = { helloWorld, addExpense, searchByCategory, getBalance, showAll, getBalanceByCategory, deleteExpense, updateExpense };


