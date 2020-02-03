import { SET_MENSAGEM, ENVIA_MENSAGEM_SUCESSO } from './types'
import { LISTA_CONVERSA_PET } from '../listaConversa/types'
import b64 from 'base-64'
import firebase from 'firebase'

export const modificaMensagem = texto => {

    return {
        type: SET_MENSAGEM,
        payload: texto
    }
}

export const enviarMensagem = ({ amigo_pet, mensagem, pet }) => {
    return dispatch => {

        //dados do contato => usuario, nome, id_pet, mensagem
        const id_amigo = amigo_pet.id_pet
        const pet_id = pet.id_pet
        const amigoIdB64 = b64.encode(id_amigo)
        const petIdB4 = b64.encode(pet_id)

        firebase.database().ref(`/mensagem/${petIdB4}/${amigoIdB64}`)
            .push({ mensagem, tipo: 'e', nome: pet.nome, imagem: pet.imagem })
            .then(() => {
                firebase.database().ref(`/mensagem/${amigoIdB64}/${petIdB4}`)
                    .push({ mensagem, tipo: 'r', nome: amigo_pet.nome, imagem: amigo_pet.imagem })
                    .then(() => dispatch({ type: ENVIA_MENSAGEM_SUCESSO }))
            })
            .then(() => {
                firebase.database().ref(`/pet_conversas/${petIdB4}/${amigoIdB64}`)
                    .set({ nome: amigo_pet.nome, imagem: amigo_pet.imagem, id_pet: amigo_pet.id_pet })
            }).then(() => {
                firebase.database().ref(`/pet_conversas/${amigoIdB64}/${petIdB4}`)
                    .set({ nome: pet.nome, imagem: pet.imagem, id_pet: pet.id_pet })
            })

    }

}

export const conversaPetFetch = (model) => {
    //compor os nome
    const { amigo, pet } = model
    let petIdB4 = b64.encode(pet.id_pet)
    let amigoIdB64 = b64.encode(amigo.id_pet)
    return dispatch => {
        firebase.database().ref(`/mensagem/${petIdB4}/${amigoIdB64}`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_CONVERSA_PET, payload: snapshot.val() })
            })
    }
}