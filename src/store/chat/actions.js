import { SET_MENSAGEM } from './types'

export const modificaMensagem = texto => {
    console.log(mensagem)
    return {
        type: SET_MENSAGEM,
        payload: texto
    }
}