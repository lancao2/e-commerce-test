import { create } from 'apisauce'
import  AsyncStorage from '@react-native-async-storage/async-storage'

const api = create({
    baseURL: 'http://192.168.0.103:3001',
    timeout: 5000,
    responseType: 'json',
    withCredentials: true,
})

api.addAsyncRequestTransform((response) => async() =>{
    const token = await AsyncStorage.getItem('@TOKEN');
    if(token){
        response.headers["Authorization"] = token;
    }
})

export default api