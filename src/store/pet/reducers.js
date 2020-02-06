import {SET_PET } from './types'

const initialState = {
    pets: null
}

const reducers = (state = initialState, action) => {
    switch(action.type) {
        case SET_PET:
            return {
                ...state,
                pets: action.payload
            }
        default:
            return state
    }
}

export default reducers