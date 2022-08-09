import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from 'react-toastify';

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
            state.token = null;
            state.userInfo = {};
        },

        getUserInfo: (state, action) => {
            state.userInfo = action.payload;        
        },

        register: (state, action) => {
            state.user = action.payload;;        
        }
    }
});

export const { login, logout, getUserInfo, register } = authSlice.actions;
export default authSlice.reducer;


// ACTIONS
export const loginAction = ( email, password ) => async (dispatch) => {    
    const waitingNotify = () => toast("🕔 Please wait while we check your credentials...");
    waitingNotify(); 
    try {
        const response = await axiosInstance.post('/auth/login', { email, password });  // llamada al back y obtenemos el token       
        const token = response.data.accessToken;       
        dispatch(login(token));           
        //console.log(token);   
        const notify = () => toast("✔️ Login successful");
        notify();             

    } catch (error) {     
        const notify = () => toast("❌ Incorrect email or password");
        notify();
        console.log(error);
    }
}

export const logoutAction = ( ) => async (dispatch) => {    
    dispatch(logout(null));   
}

export const getUserInfoAction = (token)  => async (dispatch) => {    
    try {
        if (token) {
            const response = await axiosInstance.get('/auth/user/me', {
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

            dispatch(getUserInfo(response.data));          
            const notify = () => toast("👋 Welcome " + userInfo.name + " !" );
            notify();     
        }      

    } catch (error) {
        const notify = () => toast("❌ User not found");
        notify()
        console.log(error);
    }
}

export const registerAction = ( name, email, password, role ) => async (dispatch) => {    
    try {
        const response = await axiosInstance.post('/auth/register', { name, email, password, role });  // llamada al back y obtenemos el token               
        dispatch(register());  
        const notify = () => toast("✔️ Register successful, please Login");
        notify();                     

    } catch (error) {
        const notify = () => toast("❌ Error registering: " + error.response.data.message);
        notify()
        console.log(error);
    }
}
