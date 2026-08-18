import axios from "axios";

const privateAPI = axios.create({
  baseURL: "http://localhost:3000/api",
});

privateAPI.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }   

  return req;
}); 
const publicAPI = axios.create({
  baseURL: "http://localhost:3000/api",
});
export  {privateAPI, publicAPI};