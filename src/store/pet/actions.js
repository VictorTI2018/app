import {  SET_PET } from './types'

export const setPet = pets => {
    return {
        type: SET_PET,
        payload: pets
    }
}