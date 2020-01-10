import { http } from '../../http'


export async function getPets() {
    return http.get('/api/pet/index')
}

export async function getPetId(id_usuario)
{
    return http.get(`/api/pet/${id_usuario}`)
}