import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://expensetrackernucba.herokuapp.com/api" // mi backend
    //baseURL: "http://localhost:3100/api"                   // mi localhost
});

export default axiosInstance;