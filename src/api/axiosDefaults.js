import axios from "axios";

axios.defaults.baseURL = 'https://eduhub-drf-api-8e84adf897cc.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true