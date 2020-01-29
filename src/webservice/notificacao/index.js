import { http } from '../../http'

export async function getNotificacao(id_pet) {
    return http.get(`/api/notificacao/notificacoes/${id_pet}`)
}