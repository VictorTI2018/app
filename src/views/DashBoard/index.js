import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react'
import { Dimensions, ScrollView, ActivityIndicator, Text } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import AsyncStorage from '@react-native-community/async-storage'

import Icon from 'react-native-vector-icons/MaterialIcons'
import Iconn from 'react-native-vector-icons/AntDesign'

import BuscarPet from '../BuscarPet'

import { toggleDrawer } from '../../navigation'

import { Topo } from '../../components'

import {
    Container,
    CardPet,
    ContainerCard,
    FotoPet,
    ContainerIcon,
    ContainerPet,
    NomePet,
    Submit,
    ContainerCarosel,
    ContainerPets,
    ContainerNome,
    Detalhes,
    RowContainer,
    FotoDono,
    ContainerDono,
    Row,
    ViewRow,
    SubmitChat
} from './styles'

import theme from '../../theme'
import { get } from 'lodash'

import { getPets } from '../../webservice/pet'
import { loadUsuario } from '../../webservice/usuario'



const horizontalMargin = 20
const slideWidth = 300

const sliderWidth = Dimensions.get('window').width
const itemWidth = slideWidth + horizontalMargin * 1
const itemHeight = 200

export default function DashBoard(props) {

    const _carousel = useRef(null)

    const [pet, setPet] = useState([])
    const [pets, setPets] = useState([])
    const [qtd_pets, setQtdPet] = useState(0)
    const [id_usuario, setIdUsuario] = useState()
    const [usuario, setUsuario] = useState([])
    const [loading, setLoading] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [nome_usuario, setNomeUsuario ] = useState()

    async function getIdUser() {
        const id_usuario = await AsyncStorage.getItem('id_usuario')
        let nome_usuario = await AsyncStorage.getItem("nome_usuario")
        setIdUsuario(id_usuario)
        setNomeUsuario(nome_usuario)
    }

    useEffect(() => {
        getIdUser()
    }, [])

    async function loadUser() {
        try {
            setLoading(true)
            const res = await loadUsuario(id_usuario)
            setUsuario(res.data)
            setPet(res.data.pets)
            setQtdPet(res.data.qtd_pets)
        } finally {
            setLoading(false)
        }
    }

    async function loadPets() {
        try {
            setLoading(true)
            const resp = await getPets()
            setPets(resp.data)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadPets()
    }, [])

    useEffect(() => {
        loadUser()
    }, [qtd_pets])


    function buscarPet() {
        props.navigation.navigate('BuscarPet')
    }

    function chat() {
        props.navigation.push('Chat')
    }

    function renderCarouselPets({ item }) {
        const nome = get(item, 'nome', '')
        const genero = get(item, 'sexo', '')
        const idade = get(item, 'idade', 0)
        const raca = get(item.raca, 'nome', '')
        return (
            <ContainerPets >
                <ContainerNome >
                    <NomePet cor>{nome || ''}</NomePet>
                </ContainerNome>
                <ContainerCard>
                    <ContainerIcon >
                        <Icon name='pets' size={40} color='#FFF' />
                    </ContainerIcon>
                    <ContainerPet>
                        <FotoPet source={require('../../assets/cachorro2.png')} />
                        <Detalhes>Saiba +</Detalhes>
                    </ContainerPet>
                    <ContainerIcon color={theme.colors.errors}>
                        <Iconn name='heart' size={40} color='#FFF' />
                    </ContainerIcon>
                </ContainerCard>
                <RowContainer>
                    <ContainerDono>
                        <FotoDono source={require('../../assets/mulher1.png')} />
                    </ContainerDono>
                    <ContainerDono>
                        <ViewRow>
                            <Row>Especie:  Cachorro</Row>
                        </ViewRow>
                        <ViewRow>
                            <Row>Gênero:  {genero || ''}</Row>
                        </ViewRow>
                        <ViewRow>
                            <Row>Raça:  {raca || ''}</Row>
                        </ViewRow>
                        <ViewRow>
                            <Row>Idade:  {idade || 0} anos</Row>
                        </ViewRow>
                    </ContainerDono>
                </RowContainer>
            </ContainerPets>
        )
    }


    function renderPet() {
        const nome_pet = ''
        return (
            <CardPet>
                <ContainerCard>
                    <SubmitChat onPress={chat}>
                        <Icon name='pets' size={40} color='#FFF' />
                    </SubmitChat>
                    <ContainerPet>
                        <FotoPet source={require('../../assets/cachorro1.png')} />
                        <NomePet>{nome_pet || 'Totozinho'}</NomePet>
                    </ContainerPet>
                    <SubmitChat color={theme.colors.errors}>
                        <Iconn name='heart' size={40} color='#FFF' />
                    </SubmitChat>
                </ContainerCard>
                <Submit colors={theme.colors.errors} onPress={() => { setIsVisible(true) }}>Achar um pet Ideal</Submit>
            </CardPet>
        )

    }

    function cadastrarPet() {
        props.navigation.navigate('CadastroPet')
    }

    function cadastrarPetDoar() {
        props.navigation.navigate('CadastroPet', { doar: true, usuario: usuario, id_usuario: id_usuario })
    }

    function renderButtons() {
        return (
            <>
                <Submit colors={theme.colors.errors} onPress={cadastrarPet}>Cadastrar meu Pet</Submit>
                <Submit colors={theme.colors.blue}>Quero adotar um Pet</Submit>
                <Submit colors={theme.colors.primary} onPress={cadastrarPetDoar}>Quero doar um Pet</Submit>
            </>
        )
    }

    function openDrawer() {
        props.navigation.toggleDrawer()
    }

    return (
        <>
            <Topo title={`Olá ${nome_usuario}, seja bem vindo(a)`} onPress={toggleDrawer} iconMenu iconName="md-menu" perfil />
            <BuscarPet isVisible={isVisible} onCancel={() => { setIsVisible(false) }} />
            <ScrollView>
                {loading ? <ActivityIndicator size="large" color={theme.colors.primary} /> : (
                    <Container>
                        {qtd_pets > 0 ? renderPet() : renderButtons()}
                        {/* {renderPet()} */}
                        <ContainerCarosel>
                            {pets.length ? (

                                <Carousel
                                    firstItem={1}
                                    data={pets}
                                    renderItem={renderCarouselPets}
                                    sliderWidth={sliderWidth}
                                    itemWidth={itemWidth} />
                            ) : (
                                    <Text style={{ fontSize: 23}}>Não há pets no momento!</Text>
                                )}

                        </ContainerCarosel>
                    </Container>
                )}
            </ScrollView>
        </>
    )
}