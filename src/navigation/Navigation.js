import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'


import theme from '../theme'

import Login from '../../src/views/Login'
import CadastroUsuario from '../../src/views/CadastroUsuario'
import CadastroEndereco from '../../src/views/CadastroEndereco'
import CadastroPet from '../../src/views/CadastroPet'
import GaleriaPet from '../views/GaleriaPet'
import Parabens from '../views/Parabens'
import MainStack from './MainStack'

export let navigator

export function Navigator() {

    const Screens = {
        Login,
        CadastroUsuario,
        CadastroEndereco,
        CadastroPet,
        MainStack,
        GaleriaPet,
        Parabens
    }

    const StackNavigator = createStackNavigator(Screens, {
        headerMode: 'none',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: theme.colors.primary,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }, initialRouteName: 'Login'
    })
    const AppContainer = createAppContainer(StackNavigator)
    return <AppContainer ref={ref => { navigator = ref }} />
}