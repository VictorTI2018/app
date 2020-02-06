import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { showMessage } from 'react-native-flash-message'
import { connect } from 'react-redux'
import { userLogged } from '../../store/user/action'
import { setPet } from '../../store/pet/actions'

import { View, Alert } from 'react-native'

import { Image, PasswordField } from '../../components'

import Topo from '../../components/Topo'

import { Input, FormContainer, Submit, Anchor } from './styles'

import { logar } from '../../webservice/login'

function Login(props) {

    const [password, setPassword] = useState()
    const [email, setEmail] = useState()
    const [ token, setToken ] = useState(null)

    const [loading, setLoading] = useState(false)

    function cadastrar() {
        props.navigation.push('CadastroUsuario')
    }

    function getModel() {
        return {
            email,
            password
        }
    }



    async function handleSubmit() {
        try {
            if (email && password) {
                setLoading(true)
                const resp = await logar(getModel())
                if (resp.data.errorEmail) {
                    showMessage({
                        message: 'ATENÇÃO',
                        description: 'E-mail incorreto',
                        type: 'danger',
                        icon: 'auto',
                        duration: 1800
                    })
                } else if (resp.data.errorPass) {
                    showMessage({
                        message: 'ATENÇÃO',
                        description: 'Senha incorreta',
                        type: 'danger',
                        icon: 'auto',
                        duration: 1800
                    })
                } else {
                    const token = resp.data.token
                    const user = resp.data.user
                    console.log(user.pets)
                    if (token && user) {
                        await AsyncStorage.setItem('token', token)
                        props.onLogin(user)
                        props.onPet(user.pets)
                        showMessage({
                            message: 'Logado com sucesso',
                            type: 'success',
                            icon: 'auto',
                            duration: 1100
                        })
                        setTimeout(() => {
                            props.navigation.replace('MainStack')
                        }, 1150)
                    }
                }

            } else {
                showMessage({
                    message: 'ATENÇÃO',
                    description: 'Por favor preencha todos os campos...',
                    type: 'danger',
                    icon: 'auto',
                    duration: 2000
                })
            }
        } catch (err) {
            Alert.alert(
                'ATENÇÃO',
                'Ocorreu um erro na requisição ?',
                [
                    { text: 'OK', onPress: () => { }, style: 'default' },
                ],
                { cancelable: false }
            )
        } finally {
            setLoading(false)
        }

    }

    return (
        <FormContainer >
            <Topo title="Login" perfil  />
            <View>
                <Image title="Seja Bem-Vindo!"
                    sub="Faça seu login ou cadastre-se gratuitamente"
                    img={require('../../assets/destaque-login.png')} />
            </View>
            <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                <Input placeholder='Email...'
                    value={email}
                    onChangeText={(value) => setEmail(value)} />
                <PasswordField
                    style={{ marginTop: 10, }}
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                    placeholder="Senha..." />
            </View>
            <Anchor onPress={cadastrar}>Quero me cadastrar</Anchor>
            <Submit disabled={loading} onPress={handleSubmit}>{loading ? 'Aguarde...' : 'Entrar'}</Submit>
        </FormContainer>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        onLogin: user => dispatch(userLogged(user)),
        onPet: pet => dispatch(setPet(pet))
    }
}


export default connect(null, mapDispatchToProps)(Login)