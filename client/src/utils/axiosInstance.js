import axios from "axios";

const axiosInstance = axios.create({
    //baseURL: "https://expenses-tracker-nucba.herokuapp.com/api" // mi backend
    baseURL: "http://localhost:3100/api"
});

export default axiosInstance;