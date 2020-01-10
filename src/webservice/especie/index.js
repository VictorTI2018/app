import { http } from '../../http'

export async function getEspecies() {
    return http.get('/api/especie/especies')
}