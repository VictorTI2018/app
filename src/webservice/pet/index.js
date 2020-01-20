import { http } from '../../http'


export async function createPetNoToken(model) {
    return http.post('/api/pet/register/pet', model)
}

export async function getPets() {
    return http.get('/api/pet/index')
}

export async function getPetId(id_usuario)
{
    return http.get(`/api/pet/${id_usuario}`)
}