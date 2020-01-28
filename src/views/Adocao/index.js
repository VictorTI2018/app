import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react'
import { Dimensions, ScrollView, ActivityIndicator, Text } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import AsyncStorage from '@react-native-community/async-storage'

import Icon from 'react-native-vector-icons/MaterialIcons'
import Iconn from 'react-native-vector-icons/AntDesign'

import BuscarPet from '../BuscarPet'

import { toggleDrawer } from '../../navigation'

import Topo from '../../components/Topo'

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
    ContainerButtons,
    ContainerButton,
    DadosDono,
    Texto,
    Div,
    DivRow
} from './styles'

import theme from '../../theme'
import { get } from 'lodash'

import { getPets } from '../../webservice/pet'
import { loadUsuarios } from '../../webservice/usuario'



const horizontalMargin = 20
const slideWidth = 300

const sliderWidth = Dimensions.get('window').width
const itemWidth = slideWidth + horizontalMargin * 1
const itemHeight = 200

export default function Adocao(props) {

    const _carousel = useRef(null)
    const [pets, setPets] = useState([])
    const [loading, setLoading] = useState(false)
    const [isVisible, setIsVisible] = useState(false)


    async function loadPets() {
        try {
            setLoading(true)
            const resp = await getPets()
            let pets = resp.data.filter(item => item.status === 'adoção')

        } finally {
            setLoading(false)
        }
    }

    async function loadUsuariosWithPets() {
        const resp = await loadUsuarios()
        let pets = resp.data.map(item => item.pets)
        let pet = pets.filter(item => item.status === 'adoção')
        setPets(pet)
    }

    useEffect(() => {
        loadPets()
        loadUsuariosWithPets()
    }, [])


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
                    <ContainerPet>
                        <FotoPet source={require('../../assets/cachorro2.png')} />
                        <Detalhes>Saiba +</Detalhes>
                    </ContainerPet>
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
                </ContainerCard>
                <RowContainer>
                    <ContainerDono>
                        <DivRow>
                            <FotoDono source={require('../../assets/mulher1.png')} />
                        </DivRow>
                    </ContainerDono>

                    <ContainerDono>
                        <Div>
                            <ContainerIcon color={theme.colors.errors}>
                                <Iconn name='heart' size={60} color='#FF80AB' />
                            </ContainerIcon>
                            <Texto colors={theme.colors.errors}>Quero Adotar</Texto>
                        </Div>
                    </ContainerDono>

                </RowContainer>
            </ContainerPets>
        )
    }

    function cadastrarPetDoar() {
        props.navigation.push('CadastroPet', { doar: true })
    }

    function renderPet() {
        const nome_pet = ''
        return (
            <CardPet>
                <ContainerCard>
                    <ContainerPet>
                        <FotoPet source={require('../../assets/pesquisa-cachorro.png')} />
                    </ContainerPet>

                </ContainerCard>
                <ContainerButtons>
                    <ContainerButton>
                        <Submit style={{ width: '100%' }} colors="#0D47A1" onPress={cadastrarPetDoar}>Quero doar um pet</Submit>
                    </ContainerButton>
                    <ContainerButton>
                        <Submit colors={theme.colors.errors} style={{ width: '75%' }} onPress={() => { setIsVisible(true) }}>Adotar um pet</Submit>
                    </ContainerButton>
                </ContainerButtons>
                <Submit colors={theme.colors.primary}>Minha lista de interesses</Submit>
            </CardPet>
        )

    }

    return (
        <>
            <Topo title="Adoção" onPress={toggleDrawer} iconMenu iconName="md-menu" perfil />
            <BuscarPet isVisible={isVisible} onCancel={() => { setIsVisible(false) }} data={pets} />
            <ScrollView>
                <Container>
                    {renderPet()}
                    <ContainerCarosel>
                        <Carousel
                            firstItem={1}
                            data={pets}
                            renderItem={renderCarouselPets}
                            sliderWidth={sliderWidth}
                            itemWidth={itemWidth} />
                    </ContainerCarosel>
                </Container>
            </ScrollView>
        </>
    )
}