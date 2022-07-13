import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

// REDUCERS
export const categorySlice = createSlice({
    name: "category",
    initialState: {
        categoriesList: [],        
    },
    reducers: {
        showAllCategories: (state, action) => {
            state.categoriesList = action.payload;            
        }
    }
});

export const { showAllCategories } = categorySlice.actions;
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



//router.post("/add", isAdmin, categoryController.create);
