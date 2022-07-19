import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

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
            state.expensesList = action.payload;            
        },

        addExpense: (state, action) => {
            state.expensesList = action.payload;            
        },

        updateExpense: (state, action) => {
            state.expensesList = action.payload;            
        },

        deleteExpense: (state, action) => {
            state.expensesList = action.payload;            
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
            
            dispatch(addExpense());         
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

            return dispatch(deleteExpense(response.data));         
        }   

    } catch (error) {     
        console.log(error);
    }
}







