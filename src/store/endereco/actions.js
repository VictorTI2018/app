import { SET_ENDERECO } from './types'

export const setEndereco = endereco => {
    return {
        type: SET_ENDERECO,
        payload: endereco
    }
}