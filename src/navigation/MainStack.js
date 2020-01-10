import React, { useState } from 'react'
import { toggleDrawer } from '../navigation'
import { createStackNavigator } from 'react-navigation-stack'

import DrawerNavigator from '../navigation/DrawerNavigation'
import { Topo } from '../components'

export default createStackNavigator(

    {
        DrawerNavigator
    },
    {
        defaultNavigationOptions: {
            header: null
        }
    }
)