import { configureStore } from '@reduxjs/toolkit';
// reducers
import authReducer from './slices/auth';
import expensesReducer from './slices/expenses';

export default configureStore({
    reducer: {
        auth: authReducer,
        expenses: expensesReducer,
    }
});