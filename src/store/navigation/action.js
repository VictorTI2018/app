import * as ty from './types'

export const setDrawerLocked = (drawerLocked) => ({
    type: ty.SET_DRAWER_LOCKED,
    drawerLocked
})

export const setStackCount = (stackCount) => ({
    type: ty.SET_STACK_COUNT,
    stackCount
})