import React from 'react'

import { Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'

import { Topo } from '../../components'

import {
    Container,
    ContainerImage,
    FotoPet,
    ContainerTitle,
    Title,
    SubTitle,
    Row,
    RoundedSelect,
    Select,
    ContainerSelect,
    Submit,
    Check,
    ContainerCheck
} from './styles'
import theme from '../../theme'

const estado = [
    { label: 'SP', value: '', key: '' }
]
const placeholderEstado =
    { label: "Estados", value: null }

const cidade = [
    { label: 'Sao Jose do Rio Preto', value: '', key: '' }
]
const placeholderCidade =
    { label: "Cidades", value: null }

const raca = [
    { label: 'Pitbull', value: '', key: '' }
]

const placeholderRaca = [
    { label : 'Qual raça ?', value: null }
]


const especie = [
    { label: 'Cachorro', value: '', key: '' }
]

const placeholderEspecie = [
    { label : 'Qual especie ?', value: null }
]

const sexo = [
    { label: 'macho', value: '', key: '' }
]

const placeholderSexo = [
    { label : 'Qual sexo?', value: null }
]

const idade = [
    { label: '1 ano', value: '', key: '' }
]

const placeholderIdade = [
    { label : 'Qual idade?', value: null }
]


export default function BuscarPet(props) {
    const { onCancel, isVisible, tipo, data } = props

    async function filter() {
        console.log(data)
    }

    return (
        <Modal onRequestClose={onCancel}
            visible={isVisible}
            animationType='slide'
        >
            <Topo title="Busca" iconBack iconName="md-arrow-back" perfil onPress={onCancel} />
            <Container>
                <ContainerImage>
                    <FotoPet source={require("../../assets/pesquisa-cachorro.png")} />
                </ContainerImage>
                <ContainerTitle>
                    <Title>Filtre o Pet Ideal</Title>
                    <SubTitle>Escolha os itens que deseja filtrar</SubTitle>
                </ContainerTitle>
                <Row>
                    <RoundedSelect>
                        <Select items={estado} placeholder={placeholderEstado} />
                    </RoundedSelect>
                    <RoundedSelect>
                        <Select items={cidade} placeholder={placeholderCidade} />
                    </RoundedSelect>
                </Row>
                <ContainerSelect>
                    <Select items={especie} placeholder={placeholderEspecie} />
                </ContainerSelect>
                <ContainerSelect>
                    <Select items={raca} placeholder={placeholderRaca} />
                </ContainerSelect>
                <Row>
                    <RoundedSelect>
                        <Select items={sexo} placeholder={placeholderSexo} />
                    </RoundedSelect>
                    <RoundedSelect>
                        <Select items={idade} placeholder={placeholderIdade} />
                    </RoundedSelect>
                </Row>
                <ContainerCheck>
                    <Check title="Procurar um pet castrado." textStyle={{ color: theme.colors.placeholder }}
                        containerStyle={{ borderWidth: 0, backgroundColor: '#FFF' }}
                        checkedColor={theme.colors.primary} />
                    <Check title="Procurar um pet com pedigree?." textStyle={{ color: theme.colors.placeholder }}
                        containerStyle={{ borderWidth: 0, backgroundColor: '#FFF' }}
                        checkedColor={theme.colors.primary} />
                </ContainerCheck>
                <Submit colors={theme.colors.errors}>Achar o pet ideal!</Submit>
            </Container>
            <TouchableWithoutFeedback onPress={onCancel}>
                <View style={styles.offset}></View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    offset: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
    }
})
