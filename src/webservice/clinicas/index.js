import { http } from '../../http'

export async function getClinicas() {
    return http.get('api/clinica/clinicas')
}