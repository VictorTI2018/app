import React, { useState, useEffect } from 'react'
import { Avatar } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/Ionicons'
import {
    SafeAreaView,
    StatusBar,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
import theme from '../../theme'

import styles, { Container } from './styles'

export function Topo(props) {
    const { iconBack, iconName, iconMenu, perfil, pet_perfil, } = props
    const [token, setToken] = useState()
    const stylesToken = !token ? {} : {}

    async function getToken() {
        let token = await AsyncStorage.getItem("token")
        setToken(token)
    }

    useEffect(() => {
        getToken()
    }, [])
    return (
        <>
            <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
            <Container style={!token ? { justifyContent: 'space-around' } : { justifyContent: 'space-between' }} >

                <View style={{ stylesToken }}>
                    {iconBack && (
                        <TouchableOpacity style={styles.colorIconBack} {...props}>
                            <Icon name={iconName} color="#000" size={30} />
                        </TouchableOpacity>
                    )}
                </View>
                {iconMenu && (
                    <TouchableOpacity style={[styles.iconMenu, stylesToken]} {...props}>
                        <Icon name={iconName} color="#000" size={40} style={{ marginRight: 15 }} />
                    </TouchableOpacity>
                )}


                <View style={[styles.logo, stylesToken]}>
                    <Image style={styles.imagem}
                        source={require('../../assets/logo.png')} />
                    <Text style={styles.title}>
                        {props.title}
                    </Text>
                </View>

                <TouchableOpacity {...props} style={[stylesToken, { marginRight: 30 }]}>
                    {token && perfil && <Avatar rounded source={{ uri: pet_perfil }} /> }
                    {}
                </TouchableOpacity>

            </Container>
        </>
    )
}




