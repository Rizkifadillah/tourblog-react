import axios from "axios";

const API = axios.create({baseURL: "http://localhost:5000"});

API.interceptors.request.use((req) => {
    if(localStorage.getItem("profile")){
        req.headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("profile")).token
        }`;
    }
    return req;
})

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
export const googleLogin = (result) => API.post("/users/googleSignIn", result);

export const createTour = (tourData) => API.post("/tours", tourData);
export const getTours = () => API.get("/tours");