import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createStackNavigator } from 'react-navigation-stack'
import { isDrawerLocker } from '../helpers'

import SlideMenu from '../views/SlideMenu'


import DashBoard from '../views/DashBoard'

import GaleriaPet from '../views/GaleriaPet'

import Chat from '../views/Chat'
import ChatAmizade from '../views/ChatAmizade'

import BuscarPet from '../views/BuscarPet'
import CadastroPet from '../views/CadastroPet'

import Locais from '../views/Locais'
import DetalhesLocais from '../views/DetalhesLocais'

import Adocao from '../views/Adocao'

const Screens = {
    DashBoard,
    GaleriaPet,
    BuscarPet,
    CadastroPet,
    Chat,
    ChatAmizade,
    Adocao,
    Locais,
    DetalhesLocais
}

const stackOptions = {
    headerMode: 'none',
    initialRouteName: 'DashBoard',
    navigationOptions: () => ({
        drawerLockMode: isDrawerLocker() ? 'locked-closed' : 'unlocked'
    })
}

const DrawerStack = createStackNavigator(Screens, stackOptions)

const DrawerNavigation = createDrawerNavigator({ DrawerStack }, { contentComponent: SlideMenu })


export default createAppContainer(DrawerNavigation)
