import { SET_MENSAGEM } from './types'

const initialState = {
    mensagem: null
}

const reducers = (state = initialState, action) => {
    if (action.type === SET_MENSAGEM) {
        return { ...state, mensagem: action.payload }
    }
    return state
}

export default reducers