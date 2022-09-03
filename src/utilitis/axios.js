import axios from "axios";
const axiosInstance = axios.create({
    baseURL:'https://lwsserverwithmamun.herokuapp.com/'
});

export default axiosInstance;