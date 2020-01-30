import { LISTA_CONVERSA_PET } from './types'

const initialState = {

}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case LISTA_CONVERSA_PET:
            return action.payload
        default:
            return state
    }
}

export default reducer