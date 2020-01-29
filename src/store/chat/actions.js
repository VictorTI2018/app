import { SET_MENSAGEM } from './types'
import b64 from 'base-64'
import { http } from '../../http'

export const modificaMensagem = texto => {

    return {
        type: SET_MENSAGEM,
        payload: texto
    }
}

export const enviarMensagem = ({ id_pet, mensagem, pet }) => {
    return dispatch => {

        //dados do contato => usuario, nome, id_pet, mensagem

        // dados do usuario autenticado
        const amigo_id = id_pet
        const pet_id   = pet.id_pet
        const menssages = mensagem.mensagem
        const model = {
            amigo_id,
            pet_id,
            menssages,
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