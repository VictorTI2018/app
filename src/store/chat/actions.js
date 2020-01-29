import { SET_MENSAGEM } from './types'
import b64 from 'base-64'
import { http } from '../../http'

export const modificaMensagem = texto => {

    return {
        type: SET_MENSAGEM,
        payload: texto
    }
}

export const enviarMensagem = ({ usuario, nome, id_pet, mensagem, pet }) => {
    return dispatch => {

        //dados do contato => usuario, nome, id_pet, mensagem

        // dados do usuario autenticado
        const amigo_pet = nome
        const nome_pet = pet.nome
        const menssage = mensagem.mensagem
        const model = {
            amigo_pet,
            menssage,
            nome_pet,
            tipo: 'e'

        }
        http.post('/api/chat', model).then((res) => {
            console.log(res.data)
            dispatch ({
                type: 'xyz'
            })
        }).catch(err => {
            console.log(err)
        })
      
    }


}