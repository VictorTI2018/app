import { http } from '../../http'

export async function logar(model) {
    return http.post(`/api/login`, model)
}