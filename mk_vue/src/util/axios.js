// import axios from "axios";

// // 导出包含axios配置的实例
// export const axios_instance = axios.create({
//     baseURL: "http://127.0.0.1:5050",
//     headers: {
//         "Content-Type": "application/x-www-form-urlencoded"
//     }
// })

import Axios from "axios";
import qs from "qs";
import store from "../store/index.js";

//导出包含axios配置的实例
const axios = Axios.create({
    baseURL: "http://127.0.0.1:5050",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
});

// 添加请求拦截器
axios.interceptors.request.use(
    config => {
        // console.log(config);
        // console.log(config.method);
        if (config.method == "post") config.data = qs.stringify(config.data);
        // if (localStorage.getItem("token"))
        //     config.headers.token = localStorage.getItem("token");
        // if (sessionStorage.getItem("token"))
        //     config.headers.token = sessionStorage.getItem("token");
        return config;
    },
    error => {
        console.log("===发送请求拦截器报错===");
        console.log(error);
        console.log("===end===");
        Promise.reject(error);
    }
);
// 添加响应拦截器
// axios.interceptors.response.use(
// response => {
// if (response.data.status == 403) {
//     localStorage.removeItem("token");
//     sessionStorage.removeItem("token");
//     store.commit("setIslogin", false);
// } else if (response.data.code == -1) {
//     store.commit("setIslogin", false);
// } else if (response.data.token) {
//     store.commit("setIslogin", true);
//     if (response.remember === "true") {
//         localStorage.setItem("token", response.data.token);
//     } else {
//         sessionStorage.setItem("token", response.data.token);
//     }
// }
// return response;
// },
//     error => {
//         return Promise.reject(error);
//     }
// );

export default axios;