import { http } from '../../http'

export async function loadUsuario(id_usuario) {
    return http.get(`api/cliente/user/${id_usuario}`)
}

export async function loadUsuarios() {
    return http.get(`/api/cliente/users`)
}