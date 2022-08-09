const prisma = require("../utils/client");

// crear un gasto
const create = async (date, title, amount, categoryId, userId) => {   

    try {        
        const newExpense = await prisma.expense.create(
            {
            data: {      
                date: date,                
                title: title,                
                amount: amount,         
                category: {
                    connect: {
                        id: categoryId
                    }
                },
                user: {
                    connect: {
                        id: userId
                    }
                }                       
            },           
        })        
      
        return (newExpense);        
        
    } catch(error) {
        console.log(error);
        throw new Error(error);
    }
}

// obtenemos todos los gastos por categoria
const getExpensesByCategory = async (category, user) => { 

    try {
        const expenses = await prisma.expense.findMany({           
              where: {
                categoryId: category,  
                userId: user             
              },
              select: {
                title: true,
                amount: true,
                date: true
              },
        })            
       
        return (expenses);
        
    } catch(error) {
        console.log(error);
        throw new Error(error);
    }
}


// obtenemos monto por categoria
const getTotalAmountByCategory = async (category, user) => {

    let subTotal = 0;    
    
    try {
        const filteredExpenses = await prisma.expense.findMany({
            where: {   
                categoryId: category,   
                userId: user       // verificar si esta bien
                           
              },
              select: {
                title: true,
                amount: true,
                date: true
              },
        });
       
        for (let i = 0; i < filteredExpenses.length; i++) {
            subTotal += filteredExpenses[i].amount;           ;
        }     

       return (subTotal);
        
    } catch(error) {
        console.log(error);
        throw new Error(error);
    }
}

// obtenemos el listado completo de gastos
const getAllExpenses = async (user) => {
    try {
        const allExpenses = await prisma.expense.findMany({
            where: {                
                userId: user  
              },
        });
        return allExpenses;
        
    } catch(error) {
        console.log(error);
        throw new Error(error);
    }
}

// obtenemos el monto total gastado
const getTotalAmount = async (user) => {
    
    let totalAmount = 0;
    
    try {
        const totalExpenses = await prisma.expense.findMany({
            where: {                
                userId: user  
              },
        });
       
        for (let i = 0; i < totalExpenses.length; i++) {
            totalAmount += totalExpenses[i].amount;           ;
        }     

       return (totalAmount);
        
    } catch(error) {
        console.log(error);
        throw new Error(error);
    }
}

// para actualizar un gasto
const editExpense = async (id, date, title, amount, categoryId, userId ) => {
    try {
        const expense = await prisma.expense.update({
            where: {
                id: id
            },
            data: {     
                date: date,               
                title: title,
                amount: amount,
                category: {
                    connect: {
                        id: categoryId
                    }
                },
                user: {
                    connect: {
                        id: userId
                    }
                }                       
            }
        })
        return expense;
    } catch(error) {
        console.log(error);
        throw new Error(error);
    }
}

// para eliminar un gasto
const deleteExpense = async (id) => {
    try {
        const expense = await prisma.expense.delete({
            where: {
                id: id                 
            }
        })
        return expense;
    } catch(error) {
        console.log(error);
        throw new Error(error);
    }
}

module.exports = { create, getExpensesByCategory, getTotalAmount, getAllExpenses, getTotalAmountByCategory, editExpense, deleteExpense };