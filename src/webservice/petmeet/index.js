import { http } from '../../http'

export async function addMeet(model) {
    return http.post('/api/petmeets/petmeet', model)
}