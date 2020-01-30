import { SET_MENSAGEM, ENVIA_MENSAGEM_SUCESSO } from './types'

const initialState = {
    mensagem: ''
}

const reducers = (state = initialState, action) => {
    if (action.type === SET_MENSAGEM) {
        return { ...state, mensagem: action.payload }
    }
    if (action.type === ENVIA_MENSAGEM_SUCESSO) {
        return { ...state, mensagem: '' }
    }
    return state
}

export default reducers