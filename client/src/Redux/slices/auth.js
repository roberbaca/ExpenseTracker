import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

// REDUCERS
export const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        userInfo: {},
    },
    reducers: {
        login: (state, action) => {
            state.token = action.payload;            
        },

        logout: (state, action) => {
            state.token = action.payload;;        
        },

        getUserInfo: (state, action) => {
            state.userInfo = action.payload;;        
        }
    }
});

export const { login, logout, getUserInfo } = authSlice.actions;
export default authSlice.reducer;


// ACTIONS
export const loginAction = ( email, password ) => async (dispatch) => {    
    try {
        const response = await axiosInstance.post('/auth/login', { email, password });  // llamada al back y obtenemos el token       
        const token = response.data.accessToken;           
    
        dispatch(login(token));         
        console.log(token);
        //localStorage.setItem('token', token);

    } catch (error) {
        alert("Incorrect email or password");
        console.log(error);
    }
}

export const logoutAction = ( ) => async (dispatch) => {    
    dispatch(logout(null));   
}

export const getUserInfoAction = (token)  => async (dispatch) => {    
    try {
        if (token) {
            const response = await axiosInstance.get('/auth//user/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }  
            });  

            const userInfo = {
                name: response.data.name,
                email: response.data.email,
                role: response.data.role,
                id: response.data.userId
            }

            dispatch(getUserInfo(userInfo));         
            console.log(userInfo);
        } 
               
        
        //localStorage.setItem('token', token);

    } catch (error) {
        alert("User not found");
        console.log(error);
    }
}