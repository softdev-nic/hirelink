import axios from "axios";
import { meta } from "eslint-plugin-react-hooks";

const BASEURL = import.meta.env.VITE_BASEURL || "http://localhost:3000/api";

const privateAPI = axios.create({
  baseURL: BASEURL,
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
  baseURL: BASEURL,
});
export  {privateAPI, publicAPI};