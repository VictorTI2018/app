import {
    USER_LOGGED_IN,
    USER_LOGGED_OUT
} from './types'

const initialState = {
    id_usuario: null,
    nome: null,
    sobrenome: null,
    email: null,
    imagem: null,
    qtd_pets: null,
    pets: {},
    endereco: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGGED_IN:
            return {
                ...state,
                id_usuario: action.payload.id_usuario,
                nome: action.payload.nome,
                sobrenome: action.payload.sobrenome,
                email: action.payload.email,
                imagem: action.payload.imagem,
                qtd_pets: action.payload.qtd_pets,
                pets: action.payload.pets,
                endereco: action.payload.endereco
            }
        case USER_LOGGED_OUT:
            return {
                ...initialState
            }

        default:
            return state
    }
}

export default reducer