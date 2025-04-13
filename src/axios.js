import axios from "axios";
import { cookie } from "./Lib/cookie";

export const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER
})

api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${cookie.get()}`
    return config
})