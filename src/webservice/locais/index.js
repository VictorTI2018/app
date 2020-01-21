import {http} from '../../http'

export async function getLocais() {
    return http.get('/api/locais/locais')
} 