import axios from 'axios'
import * as Updateds from 'expo-updates'

const api = axios.create({
    baseURL:"http://192.168.1.104:3333"
});

export default api;