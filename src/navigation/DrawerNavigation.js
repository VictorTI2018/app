import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createStackNavigator } from 'react-navigation-stack'
import { isDrawerLocker } from '../helpers'

import SlideMenu from '../views/SlideMenu'

import PetShops from '../views/PetShops'
import DashBoard from '../views/DashBoard'
import Clinicas from '../views/Clinicas'

import GaleriaPet from '../views/GaleriaPet'
import DetalhesPetShop from '../views/DetalhesPetShop'

import DetalhesClinica from '../views/DetalhesClinica'

import Chat from '../views/Chat'
import ChatAmizade from '../views/ChatAmizade'

import BuscarPet from '../views/BuscarPet'
import CadastroPet from '../views/CadastroPet'

import Adocao from '../views/Adocao'

const Screens = {
    DashBoard,
    PetShops,
    Clinicas,
    GaleriaPet,
    DetalhesPetShop,
    BuscarPet,
    CadastroPet,
    DetalhesClinica,
    Chat,
    ChatAmizade,
    Adocao
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
