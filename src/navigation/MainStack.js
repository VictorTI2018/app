import React, { useState, useRef } from 'react'
import { toggleDrawer } from '../navigation'
import { createStackNavigator } from 'react-navigation-stack'


import DrawerNavigator from '../navigation/DrawerNavigation'

import Topo from '../components/Topo'

export default createStackNavigator(

    {
        DrawerNavigator
    },
    {
        defaultNavigationOptions: {
            header:  () => <Topo  onPress={toggleDrawer} iconMenu iconName="md-menu" perfil />
        }

    }
)