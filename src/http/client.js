import axios from 'axios'
import { navigate } from '../navigation'
import { showMessage } from 'react-native-flash-message'
import { BASE_URL } from '../config/config'
import AsyncStorage from '@react-native-community/async-storage'

const client = axios.create({
    baseURL: 'http://192.168.0.124:8000'
})
const timeOut = 30000


client.interceptors.request.use(async (config) => {
    // Seta o token para poder cancelar requisições do axios
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()
    const token = await AsyncStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    config.cancelToken = source.token

    setTimeout(() => {
        source.cancel('timeout')
    }, timeOut)

    return config
}, error => {
    return Promise.reject(error)
})

client.interceptors.response.use((response) => {

    let token = response.headers['authorization']
    if (token) {
      store.dispatch(setToken(token.replace(/^(Bearer )/, '')))
    }

    return response
}, error => {
    return Promise.reject(error)
})

export const http = client