import { configureStore } from '@reduxjs/toolkit';

// reducers
import authReducer from './slices/auth';
import expensesReducer from './slices/expenses';
import categoryReducer from './slices/category';
import usersReducer from './slices/users';

export default configureStore({
    reducer: {
        auth: authReducer,
        expenses: expensesReducer,
        category: categoryReducer,
        users: usersReducer,
    }
});