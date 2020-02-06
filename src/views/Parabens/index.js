import React, { useState, useEffect } from 'react'
import { Text } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

import { get } from 'lodash'

import {
    Container,
    CardPet,
    ContainerNome,
    NomePet,
    ContainerFoto,
    FotoPet,
    ContainerMessagem,
    Menssagem,
    SubMenssagem,
    ContainerUsuario,
    Detalhes,
    FotoUsuario,
    ContainerFotoUsuario,
    Submit,
    ContainerDetalhes,
    NomeUsuario
} from './styles'
import { retrieveStorage } from '../../helpers'

export default function Parabens({ navigation }) {

    const [pet, setPet] = useState()
    const [usuario, setUsuario] = useState()
    const [token, setToken] = useState()

    useEffect(() => {
        let pet = navigation.getParam('pet')
        setPet(pet)
    }, [])

    async function getUser() {
        const usuario = await AsyncStorage.getItem("usuario")
        setUsuario(usuario)
    }

    async function getToken() {
        const token = await AsyncStorage.getItem('token')
        setToken(token)
    }

    useEffect(() => {
        getToken()
        getUser()
    }, [])

    function actionBack() {
        navigation.pop()
    }

    function login() {
        navigation.push('Login')
    }

    function dashboard() {
        navigation.push('MainStack')
    }

    function renderParabens() {
        const nomePet = get(pet, 'nome', '')
        const nomeUsuario = get(usuario, 'nome')
        return (
            <CardPet>
                <ContainerNome>
                    <NomePet cor>{nomePet || 'Nome do Pet'}</NomePet>
                </ContainerNome>
                <ContainerFoto>
                    <FotoPet source={require("../../assets/cachorro1.png")} />
                </ContainerFoto>
                <ContainerMessagem>
                    <Menssagem>Parabéns</Menssagem>
                    <SubMenssagem>Seu pet está cadastrado!</SubMenssagem>
                </ContainerMessagem>
                <ContainerUsuario>
                    <FotoUsuario source={require("../../assets/mulher1.png")} />
                    <ContainerDetalhes>
                        <Detalhes>Pessoa / entidade</Detalhes>
                        <NomeUsuario>{nomeUsuario || 'Nome do Usuario'}</NomeUsuario>
                    </ContainerDetalhes>
                </ContainerUsuario>
            </CardPet>
        )
    }
    return (
        <Container>
            {renderParabens()}
            <Submit onPress={dashboard}>Pagina Inicial</Submit>
        </Container>
    )
}