import { http } from '../../http'

export async function addMeet(model) {
    return http.post('/api/petmeets/petmeet', model)
}

export async function listMeetPet(id_pet) {
    return http.get(`/api/petmeets/petmeets/${id_pet}`)
}