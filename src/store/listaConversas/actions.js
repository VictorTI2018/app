import { LISTA_CONVESAS_PET } from './types'
import b64 from 'base-64'
import firebase from 'firebase'

export const conversasPetFetch = (pet) => {

    return dispatch => {
        const { id_pet } = pet
        const petIdB64 = b64.encode(id_pet)

        firebase.database().ref(`/pet_conversas/${petIdB64}`)
            .on("value", snapshot => {
                dispatch({
                    type: LISTA_CONVESAS_PET,
                    payload: snapshot.val()
                })
            })


    }
}