import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

// REDUCERS
export const expensesSlice = createSlice({
    name: "expenses",
    initialState: {
        expensesList: [],        
    },
    reducers: {
        showAllExpenses: (state, action) => {
            state.expensesList = action.payload;            
        },

    }
});

export const { showAllExpenses } = expensesSlice.actions;
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
            console.log(response.data);
        }   

    } catch (error) {     
        console.log(error);
    }
}

