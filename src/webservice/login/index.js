import { http } from '../../http'

export async function login(model) {
    return http.post(`/api/login`, model)
}