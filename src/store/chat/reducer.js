import { SET_MENSAGEM, ENVIA_MENSAGEM_SUCESSO, NOTIFICACAO_CONVERSA } from './types'

const initialState = {
    mensagem: ''
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case SET_MENSAGEM:
            return { ...state, mensagem: action.payload }
        case ENVIA_MENSAGEM_SUCESSO:
            return { 
                ...initialState
            }
        
        default:
            return state
    }
}

export default reducers