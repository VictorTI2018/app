import React, { useState, useEffect } from 'react'
import { Badge } from 'react-native-elements'
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
import { addMeet } from '../../webservice/petmeet'

import { getNotificacao } from '../../webservice/notificacao'

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
    const [amizade, setAmizade] = useState()
    const [meet, setMeet] = useState()

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

    async function notificacao() {
        try {
            const resp = await getNotificacao(usuario.pets.id_pet)
            let amizade = resp.data.filter(item => item.amizade)
            let meet = resp.data.filter(item => item.petmeet)
            setAmizade(amizade.length)
            setMeet(meet.length)
        } catch (err) {

        }
    }

    useEffect(() => {
        if (usuario.pets) {
            if (usuario.pets.id_pet !== undefined) {
                notificacao()
            }
        }
    }, [])

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
            await addPet(model)
        } catch (err) {

        }
    }

    async function handleMeet(pet_petmeet_id) {
        let id_pet = usuario.pets.id_pet
        let model = {
            pet_petmeet_id,
            id_pet
        }
        try {
            await addMeet(model)
        } catch (err) {

        }
    }




    function buscarPet() {
        props.navigation.navigate('BuscarPet')
    }

    function chatAmizade() {
        props.navigation.push('Chat', { tipo: 'amizade' })
    }

    function chatMeet() {
        props.navigation.push('Chat', { tipo: 'meet' })
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
        const usuario = get(item, 'usuario', '')
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
                        <ImagePet source={{ uri: imagem }} />
                        <Detalhes>Saiba +</Detalhes>
                    </ContainerPet>
                    <ContainerIcon color={theme.colors.errors} onPress={() => handleMeet(item.id_pet)}>
                        <Iconn name='heart' size={40} color='#FFF' />
                    </ContainerIcon>
                </ContainerCard>
                <RowContainer>
                    <ContainerDono>
                        <FotoDono source={{ uri: usuario.imagem }} />
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
                    <SubmitChat onPress={chatAmizade}>
                        <Icon name='pets' size={40} color='#FFF' />
                        <Badge value={amizade} status="primary" containerStyle={{
                            position: 'absolute',
                            top: -4,
                            right: -4
                        }} />
                    </SubmitChat>
                    <ContainerPet  >
                        <ImagePet source={{ uri: usuario.pets.imagem }} />
                        <NomePet>{usuario.pets.nome}</NomePet>
                    </ContainerPet>
                    <SubmitChat color={theme.colors.errors} onPress={chat}>
                        <Iconn name='heart' size={40} color='#FFF' />
                        <Badge value={meet} status="error" containerStyle={{
                            position: 'absolute',
                            top: -4,
                            right: -4
                        }} />
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