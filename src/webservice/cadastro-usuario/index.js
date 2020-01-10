import { http } from '../../http'

export async function createUsuario(model) {
    return http.post('/api/cliente/register', model)
}

export async function createPet(model) {
    return http.post('/api/pet/register', model)
}

export async function createEndereco(model) {
    return http.post('/api/endereco/register', model)
}

export async function updateUsuario(id_usuario, model) {
    return http.put(`/api/cliente/update/${id_usuario}`, model)
}

export async function updateEndereco(id_endereco, model) {
    return http.put(`/api/endereco/update/${id_endereco}`, model)
}   