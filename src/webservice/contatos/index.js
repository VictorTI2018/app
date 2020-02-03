import { http } from '../../http'

export async function addAmizade(model) {
    return http.post('/api/amigos/amizade', model)
}

export async function getAmigos(id_pet) {
    return http.get(`/api/amigos/amigos/${id_pet}`)
}

export async function addMeet(model) {
    return http.post('/api/petmeets/petmeet', model)
}

export async function getMeets(id_pet) {
    return http.get(`/api/petmeets/meets/${id_pet}`)
}

export async function getContatos(id_pet) {
    return http.get(`/api/pet/pet/contatos/${id_pet}`)
}