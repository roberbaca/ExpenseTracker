import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://expenses-tracker-nucba.herokuapp.com/api" // mi backend
});

export default axiosInstance;