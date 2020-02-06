import { SET_ENDERECO } from './types'

const initialState = {
    endereco: null
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case SET_ENDERECO:
            return {
                ...state,
                endereco: action.payload
            }
        default:
            return state
    }
}

export default reducers