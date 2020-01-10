import React, { useState } from 'react'
import { View, Text } from 'react-native'

import { Topo } from '../../components'

export default function GaleriaPet(props) {

    const [ fotos, setFotos ] = useState([])

    function actionBack() {
        props.navigation.pop()
    }

    return (
        <View>
            <Topo title="Album de Fotos" iconMenu iconName="md-menu" onPress={actionBack}/>
        </View>
    )
}