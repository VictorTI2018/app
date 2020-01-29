import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react'
import { Dimensions, ScrollView, ActivityIndicator, Text } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { connect } from 'react-redux'

import Icon from 'react-native-vector-icons/MaterialIcons'
import Iconn from 'react-native-vector-icons/AntDesign'

import {
    Container,
    CardPet,
    ContainerCard,
    ImagePet,
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
import { addPet } from '../../webservice/amizade'

const horizontalMargin = 20
const slideWidth = 300

const sliderWidth = Dimensions.get('window').width
const itemWidth = slideWidth + horizontalMargin * 1
const itemHeight = 200

function DashBoard(props) {

    const usuario = {
        nome: props.usuario.nome,
        pets: props.usuario.pets,
        qtd_pets: props.usuario.qtd_pets
    }

    const [pets, setPets] = useState([])
    const [loading, setLoading] = useState(false)

    async function loadPets() {
        try {
            setLoading(true)
            const resp = await getPets()
            let pets = resp.data.filter(item => item.id_pet !== usuario.pets.id_pet)
            setPets(pets)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadPets()
    }, [])

    async function handleFriend(pet_amigo_id) {
        let id_pet = usuario.pets.id_pet
        let model = {
            pet_amigo_id,
            id_pet
        }

        try {
            const resp = await addPet(model)
            console.log(resp.data)
        }catch(err) {

        }
    }


    function buscarPet() {
        props.navigation.navigate('BuscarPet')
    }

    function chat() {
        props.navigation.push('Chat')
    }

    function cadastrarPet() {
        props.navigation.navigate('CadastroPet')
    }

    function cadastrarPetDoar() {
        props.navigation.navigate('CadastroPet', { doar: true })
    }


    function renderCarouselPets({ item }) {
        const nome = get(item, 'nome', '')
        const genero = get(item, 'sexo', '')
        const idade = get(item, 'idade', 0)
        const raca = get(item.raca, 'nome', '')
        const imagem = get(item, 'imagem', '')
        return (
            <ContainerPets >
                <ContainerNome >
                    <NomePet cor>{nome || ''}</NomePet>
                </ContainerNome>
                <ContainerCard>
                    <ContainerIcon onPress={() => handleFriend(item.id_pet)}>
                        <Icon name='pets' size={40} color='#FFF' />
                    </ContainerIcon>
                    <ContainerPet>
                        <ImagePet source={{ uri : imagem }} />
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
        return (
            <CardPet>
                <ContainerCard>
                    <SubmitChat onPress={chat}>
                        <Icon name='pets' size={40} color='#FFF' />
                    </SubmitChat>
                    <ContainerPet>
                        <ImagePet source={{ uri: usuario.pets.imagem }} />
                        <NomePet>{usuario.pets.nome}</NomePet>
                    </ContainerPet>
                    <SubmitChat color={theme.colors.errors}>
                        <Iconn name='heart' size={40} color='#FFF' />
                    </SubmitChat>
                </ContainerCard>
                <Submit colors={theme.colors.errors} onPress={buscarPet}>Achar um pet Ideal</Submit>
            </CardPet>
        )

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

    

    return (
        <>
            <ScrollView>
                {loading ? <ActivityIndicator size="large" color={theme.colors.primary} /> : (
                    <Container>
                        {usuario.qtd_pets > 0 ? renderPet() : renderButtons()}
                        <ContainerCarosel>
                            {pets.length ? (

                                <Carousel
                                    firstItem={1}
                                    data={pets}
                                    renderItem={renderCarouselPets}
                                    sliderWidth={sliderWidth}
                                    itemWidth={itemWidth} />
                            ) : (
                                    <Text style={{ fontSize: 23 }}>Não há pets no momento!</Text>
                                )}

                        </ContainerCarosel>
                    </Container>
                )}
            </ScrollView>
        </>
    )
}

const mapStateToProps = ({ usuario }) => {
    return {
        usuario: usuario
    }
}

export default connect(mapStateToProps, null)(DashBoard)