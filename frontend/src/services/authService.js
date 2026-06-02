import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export const register = async (userData) => {
    const response = await axios.post(
        `${API_URL}/register/`,
        userData
    );

    return response.data;
};


export const login = async (userData) => {
    const response = await axios.post(
        `${API_URL}/login/`,
        userData
    );

    return response.data;
};


export const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
};