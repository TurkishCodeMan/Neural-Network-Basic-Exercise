import Vue from "vue"
import axios from "axios"


export default () => {
    const axiosInstance = axios.create({
        baseURL: `/api`,
    });

    axiosInstance.defaults.withCredentials = true

    Vue.use(axiosInstance);
    return axiosInstance;
}