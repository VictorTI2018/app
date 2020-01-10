import { http } from '../../http'

export async function getRacas()
{
    return http.get('/api/raca/racas')
}