import { http } from '../../http'

export async function addAmizade(model) {
    return http.post('/api/amigos/amizade', model)
}

export async function addMeet(model) {
    return http.post('/api/petmeets/petmeet', model)
}

export async function getContatos(id_pet) {
    return http.get(`/api/pet/pet/contatos/${id_pet}`)
}