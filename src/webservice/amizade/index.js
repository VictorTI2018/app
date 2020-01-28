import { http } from '../../http'

export async function addPet(model) {
    return http.post('/api/amigos/amizade', model)
}

export async function listFriendPet(id_pet) {
    return http.get(`/api/amigos/amizade/${id_pet}`)
}