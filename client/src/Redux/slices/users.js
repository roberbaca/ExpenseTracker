import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

// REDUCERS
export const usersSlice = createSlice({
    name: "users",
    initialState: {        
        usersList: [],        
    },
    reducers: {
        showAllUsers: (state, action) => {            
            state.usersList = action.payload.map(user => {
                return {
                    ...user,                    
                }
            }
            );
        },  
    }
});

export const { showAllUsers } = usersSlice.actions;
export default usersSlice.reducer;


// ACTIONS
export const showAllUsersAction = ( token ) => async (dispatch) => {    
    try {
        if (token) {
            const response = await axiosInstance.get('/auth/admin/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }  
            });           

            dispatch(showAllUsers(response.data));           
        }   

    } catch (error) {     
        console.log(error);
    }
}