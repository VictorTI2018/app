import { http } from '../../http'

export async function addChat(model) {
    return http.post('/api/chat/chat', model)
}