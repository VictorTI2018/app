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
        const nome_amigo = amigo_pet.nome
        const nome = pet.nome
        const amigoNomeB64 = b64.encode(nome_amigo)
        const nomePetB4 = b64.encode(nome)

        firebase.database().ref(`/mensagem/${nomePetB4}/${amigoNomeB64}`)
            .push({ mensagem, tipo: 'e' })
            .then(() => {
                firebase.database().ref(`/mensagem/${amigoNomeB64}/${nomePetB4}`)
                    .push({ mensagem, tipo: 'r' })
                    .then(() => dispatch({ type: ENVIA_MENSAGEM_SUCESSO }))
            })
            .then(() => {
                firebase.database().ref(`/pet_conversas/${nomePetB4}/${amigoNomeB64}`)
                    .set({ nome: nome_amigo })
            }).then(() => {
                firebase.database().ref(`/pet_conversas/${amigoNomeB64}/${nomePetB4}`)
                    .set({ nome: nome })
            })

    }

}

export const conversaPetFetch = ({ nome_amigo, pet }) => {
    //compor os nome

    let nomePetB64 = b64.encode(pet.nome)
    let amigoNomeB64 = b64.encode(nome_amigo)
    return dispatch => {
        firebase.database().ref(`/mensagem/${nomePetB64}/${amigoNomeB64}`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_CONVERSA_PET, payload: snapshot.val() })
            })
    }
}