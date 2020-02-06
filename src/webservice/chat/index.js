import { http } from '../../http'

export async function addConversa(model) {
    return http.post('/api/conversa/menssagem', model)
}