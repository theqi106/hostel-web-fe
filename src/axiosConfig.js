import axios from 'axios';

const instance = axios.create({
  //gắn token vào header
    baseURL: process.env.REACT_APP_SERVER_URL,
  });
  instance.interceptors.request.use(function(config){
    const token = localStorage.getItem('persist:auth');
    console.log(token)
    return config;
  },
  function(err){
    //refresh token
    console.log(err)
    return Promise.reject(err);
  }
)

  export default instance 