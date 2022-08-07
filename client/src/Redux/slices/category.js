import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from 'react-toastify';

// REDUCERS
export const categorySlice = createSlice({
    name: "category",
    initialState: {
        categoriesList: [],        
    },
    reducers: {
        showAllCategories: (state, action) => {
            state.categoriesList = action.payload;            
        },

        addCategory: (state, action) => {            
            state.categoriesList.push(action.payload);                               
        },

        updateCategory: (state, action) => {                        
            return {
                ...state,
                categoriesList: state.categoriesList.map((category) => {
                    if (category.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return category;
                    }
                })
            }           
        },

        deleteCategory: (state, action) => {                                 
            const foundIndex = state.categoriesList.findIndex( category => category.id === action.payload);
            state.categoriesList.splice(foundIndex, 1);            
        },
    }
});

export const { showAllCategories, addCategory, deleteCategory, updateCategory } = categorySlice.actions;
export default categorySlice.reducer;


// ACTIONS
export const showAllCategoriesAction = () => async (dispatch) => {    
    try {       
        const response = await axiosInstance.get('/category/all');
        dispatch(showAllCategories(response.data));  
    } catch (error) {     
        console.log(error);
    }
}

export const addCategoryAction = ( token, title ) => async (dispatch) => {    
    try {
        if (token) {
            const response = await axiosInstance.post('/category/add',  { title }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
               
            });
            
            dispatch(addCategory(response.data));      
            const notify = () => toast("✔️ New Category added");
            notify();     
        }   

    } catch (error) {     
        console.log(error);
        const notify = () => toast("❌ Error adding category");
        notify();    
    }
}

export const deleteCategoryAction = ( id, token ) => async (dispatch) => {    
    try {
        if (token) {
            const response = await axiosInstance.delete(`/category/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },               
                
            });           
            
            const notify = () => toast("✔️ Category deleted");
            notify();
            return dispatch(deleteCategory(id));   

        }   

    } catch (error) {     
        console.log(error);
    }
}

export const updateCategoryAction = ( id, title, token ) => async (dispatch) => {    
    try {
        if (token) {
            const response = await axiosInstance.patch(`/category/edit/${id}`, { title }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },               
                
            });                       
            const notify = () => toast("✔️ Category updated");
            notify();
            return dispatch(updateCategory(response.data));
        }   

    } catch (error) {     
        console.log(error);
        const notify = () => toast("❌ Error updating category");
        notify();    
    }
}

