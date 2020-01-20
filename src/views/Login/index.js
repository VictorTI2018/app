import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { View, Alert, NativeModules } from 'react-native'
import { showMessage } from 'react-native-flash-message'

import { get } from 'lodash'

import { Image, useForm, PasswordField, Topo } from '../../components'
import { Input, FormContainer, Submit, Anchor } from './styles'

import { setStorage } from '../../helpers'

import { login } from '../../webservice/login'

import { Rule } from '../../helpers'

function Login({ navigation }) {



    const initialValues = {
        email: ''
    }

    const [password, setPassword] = useState()

    const [loading, setLoading] = useState(false)

    const rules = {
        email: [Rule.required()]
    }

    const { getFieldProps } = useForm(initialValues, rules, handleSubmit, getModel)

    const [email] = getFieldProps('email')

    function getModel() {
        return {
            email: email.value,
            password
        }
    }

    useEffect(() => {
        load()
    }, [])

    async function load() {
        const token = await AsyncStorage.getItem('token')
        if(token) {
            navigation.replace('MainStack')
        }
    }

    function cadastrar() {
        navigation.push('CadastroUsuario')
    }

    async function handleSubmit() {
        try {
            if (email.value && password) {
                setLoading(true)
                const resp = await login(getModel())
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
                    if (token && user) {
                        await AsyncStorage.setItem('token', token)
                        await AsyncStorage.setItem('usuario', JSON.stringify(user))
                        await AsyncStorage.setItem('nome_usuario', user.nome)
                        await AsyncStorage.setItem('id_usuario', `${user.id_usuario}`)


                        showMessage({
                            message: 'Logado com sucesso',
                            type: 'success',
                            icon: 'auto',
                            duration: 1100
                        })
                        setTimeout(() => {
                            navigation.replace('MainStack')
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
            <Topo title="Login" />
            <View>
                <Image title="Seja Bem-Vindo!"
                    sub="Faça seu login ou cadastre-se gratuitamente"
                    img={require('../../assets/destaque-login.png')} />
            </View>
            <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                <Input placeholder='Email...' {...email} KeyboardType="email-address" />
                <PasswordField
                    returnKeyType="next"
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
Login.navigationOptions = () => ({
    title: 'Login'
})
export default Login