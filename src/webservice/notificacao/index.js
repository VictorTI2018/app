import { http } from '../../http'

export async function getNotificacao(id_pet) {
    return http.get(`/api/notificacao/notificoes/${id_pet}`)
}