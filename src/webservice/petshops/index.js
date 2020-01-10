import { http } from '../../http'

export async function getPetShops() {
    return http.get('/api/petshop/petshops')
}

export async function getPetShop(id) {
    return http.get(`/api/petshop/petshop/${id}`)
}