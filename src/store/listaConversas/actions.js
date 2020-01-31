import { LISTA_CONVESAS_PET } from './types'
import b64 from 'base-64'
import firebase from 'firebase'

export const conversasPetFetch = (pet) => {

    return dispatch => {
        const { nome } = pet
        const nomePetB64 = b64.encode(nome)

        firebase.database().ref(`/pet_conversas/${nomePetB64}`)
            .on("value", snapshot => {
                dispatch({
                    type: LISTA_CONVESAS_PET,
                    payload: snapshot.val()
                })
            })


    }
}