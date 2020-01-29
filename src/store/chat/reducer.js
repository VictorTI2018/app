import { SET_MENSAGEM } from './types'

const initialState = {
    mensagem: 'teste'
}

const reducers = (state = initialState, action) => {
    console.log(action)
    switch(action.type) {
        case SET_MENSAGEM:
            return {
                ...state,
                mensagem: action.payload.mensagem
            }
        default:
            state
    }
}

export default reducers