import axios from "axios";
const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URI,
});

// Thêm một bộ đón chặn request
instance.interceptors.request.use(function (config) {
    // Do something before the request is sent
    let localStorageData = window.localStorage.getItem('persist:shop/user');
    if (localStorageData && typeof localStorageData === 'string') {
        localStorageData = JSON.parse(localStorageData)
        const accessToken = JSON.parse(localStorageData.token)
        config.headers = { authorization: `Bearer ${accessToken}` }
        return config
    } else {
        return config;  
    }
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


// Thêm một bộ đón chặn response
instance.interceptors.response.use(function (response) {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    // Làm gì đó với dữ liệu response
    return response.data;
}, function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    return error.response.data;
});
export default instance