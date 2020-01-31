import { http } from '../../http'

export async function getNotificacao(id_pet) {
    return http.get(`/api/notificacao/notificacoes/${id_pet}`)
}

export async function getNotificacaoId(id_pet) {
    return http.get(`/api/notificacao/pet/notificacao/${id_pet}`)
}