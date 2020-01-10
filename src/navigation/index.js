import { NavigationActions, StackActions } from 'react-navigation'
import { navigator } from './Navigation'
import { DrawerActions } from 'react-navigation-drawer'


export function navigate(route, params) {
    navigator.dispatch(StackActions.reset({
        index: 0,
        actions: [ NavigationActions.navigate({ routeName: route, params })]
    }))
}

export function openDrawer() {
    navigator.dispatch(DrawerActions.openDrawer())
}

export function closeDrawer() {
    navigator.dispatch(DrawerActions.closeDrawer())
}

export function toggleDrawer() {
    navigator.dispatch(DrawerActions.toggleDrawer())
}