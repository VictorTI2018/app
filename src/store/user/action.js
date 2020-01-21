import * as types from './types'

export const setToken = ( token ) => ({
    type: types.SET_API_TOKEN,
    token
})

export const setUsuario = (usuario) => ({
    type: types.SET_USUARIO,
    usuario
})