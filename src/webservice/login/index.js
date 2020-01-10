import { get } from 'lodash'
import { http } from '../../http'
import { showMessage } from 'react-native-flash-message'
import strings from '../../config/strings'
import { setStorage } from '../../helpers'

export async function login(model) {
    return http.post(`/api/login`, model)
    // .then(async (response) => {
    //     const token = get(response, 'data.token')
    //     const user = get(response, 'data.user')
    //     if(!token) {
    //         showMessage({
    //             message: strings.errorServer,
    //             description: JSON.stringify(response),
    //             type: 'danger',
    //             icon: 'auto',
    //             duration: 10000
    //         })
    //         return Promise.reject(strings.errorServer)
    //     }
    //     await setStorage('token', token)
    //     await setStorage('nome_usuario', user.nome)
    //     await setStorage('id_usuario', `${user.id_usuario}`)
    //     return response
    // })
}