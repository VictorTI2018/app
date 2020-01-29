import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Avatar, Badge, Icon as IconPush } from 'react-native-elements'
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

import { getNotificacao } from '../../webservice/notificacao'


import styles, { Container } from './styles'

export function Topo(props) {
    const { iconBack, iconName, iconMenu, perfil, pet_perfil } = props

    const [token, setToken] = useState()
    const [ value, setValue ] = useState()

    const stylesToken = !token ? {} : {}
    const pet = props.usuario.pets

    async function getToken() {
        let token = await AsyncStorage.getItem("token")
        setToken(token)
    }

    async function notificacao() {
        const resp = await getNotificacao(pet.id_pet)
        setValue(resp.data.length)
    }

    useEffect(() => {
        getToken()
    }, [])

    useEffect(() => {
        if(pet.id_pet !== undefined) {
            notificacao()
        }
        
    }, [])

    let boasVindas = `Ola ${props.usuario.nome} seja bem vindo(a)`
    return (
        <>
            <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
            <Container style={!token ? { justifyContent: 'space-around' } : { justifyContent: 'space-between' }} >

                <View >
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
                    {!token ? (<Text style={styles.title}>
                        {props.title}
                    </Text>
                    ) : <Text style={styles.title}>
                            {boasVindas}
                        </Text>}
                </View>

                <TouchableOpacity {...props} style={[stylesToken, { marginRight: 30 }]}>
                    {token && perfil && (
                        <View >

                            <View style={{ flexDirection: 'row' }}>
                                <Avatar
                                    rounded
                                    source={{
                                        uri: pet.imagem,
                                    }}
                                />
                                <Badge
                                    status="error"
                                    value={value}
                                    containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                                />
                            </View>
                        </View>
                    )}

                </TouchableOpacity>

            </Container>
        </>
    )
}

const mapStateToProps = ({ usuario }) => {
    return {
        usuario: usuario
    }
}

export default connect(mapStateToProps, null)(Topo)



