import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from 'react-toastify';

// REDUCERS
export const expensesSlice = createSlice({
    name: "expenses",
    initialState: {
        expensesList: [],
        totalBalance: 0,
        categoryBalance: 0,  

    },
    reducers: {
        showAllExpenses: (state, action) => {
            //state.expensesList = action.payload;
            state.expensesList = action.payload.map(expense => {
                return {
                    ...expense,
                    //date: new Date(expense.date)
                }
            }
            );

        },

        addExpense: (state, action) => {
            //state.expensesList = action.payload;            
            state.expensesList.push(action.payload);                               
        },

        updateExpense: (state, action) => {
            //state.expensesList = action.payload;            
            state.expensesList = state.expensesList.map(expense => {
                if (expense._id === action.payload._id) {
                    return action.payload;
                }
               
                return expense;
                
            });
        },

        deleteExpense: (state, action) => {                      
            //state.expensesList = state.expensesList.filter(expense => expense.id !== action.payload);                    
            
            const foundIndex = state.expensesList.findIndex( expense => expense.id === action.payload);
            state.expensesList.splice(foundIndex, 1);            
        },

        getCategoryBalance: (state, action) => {
            state.categoryBalance = action.payload;            

        },

        getTotalBalance: (state, action) => {
            state.totalBalance = action.payload;           
        },

    }
});

export const { showAllExpenses, addExpense, updateExpense, deleteExpense, getCategoryBalance, getTotalBalance } = expensesSlice.actions;
export default expensesSlice.reducer;





// ACTIONS
export const showAllExpensesAction = ( token ) => async (dispatch) => {    
    try {
        if (token) {
            const response = await axiosInstance.get('/expenses/all', {
                headers: {
                    Authorization: `Bearer ${token}`
                }  
            });           

            dispatch(showAllExpenses(response.data));           
        }   

    } catch (error) {     
        console.log(error);
    }
}

export const addExpenseAction = ( token, title, amount, category ) => async (dispatch) => {    
    try {
        if (token) {
            const response = await axiosInstance.post('/expenses/add',  { title, amount, category }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
               
            });
            
            dispatch(addExpense(response.data));      
            const notify = () => toast("✔️ New expense added");
            notify();     
        }   

    } catch (error) {     
        console.log(error);
    }
}

export const getTotalBalanceAction = ( token ) => async (dispatch) => {    
    try {
        if (token) {
            const response = await axiosInstance.get('/expenses/balance', {
                headers: {
                    Authorization: `Bearer ${token}`
                }  
            });           
            
            return dispatch(getTotalBalance(response.data));         
        }   

    } catch (error) {     
        console.log(error);
    }
}

export const getCategoryBalanceAction = ( category, token ) => async (dispatch) => {    
    try {
        if (token) {
            const response = await axiosInstance.get(`/expenses/balance-by-category/${category}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },               
                
            });           

            return dispatch(getCategoryBalance(response.data));         
        }   

    } catch (error) {     
        console.log(error);
    }
}

export const deleteExpenseAction = ( id, token ) => async (dispatch) => {    
    try {
        if (token) {
            const response = await axiosInstance.delete(`/expenses/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },               
                
            });           
            
            const notify = () => toast("✔️ Expense deleted");
            notify();
            return dispatch(deleteExpense(id));   

        }   

    } catch (error) {     
        console.log(error);
    }
}

export const updateExpenseAction = ( id, title, amount, category, token ) => async (dispatch) => {
    try {
        if (token) {
            const response = await axiosInstance.put(`/expenses/update/${id}`, { title, amount, category }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },               
                
            });           
            
            const notify = () => toast("✔️ Expense updated");
            notify();
            return dispatch(updateExpense(response.data));   

        }   

    } catch (error) {     
        console.log(error);
    }
}








