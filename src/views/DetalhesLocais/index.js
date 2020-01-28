import React, { useState, useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'
import Topo from '../../components/Topo'

import {
    Container,
    ContainerTopo,
    ImageAbsolute,
    ImagePequena,
    Title,
    ContainerTitle,
    ContainerDescricao,
    Descricao,
    TitleDescricao,
    ContainerDados,
    Texto,
    Dados,
    ContainerEndereco,
    TextEndereco,
    Anchor,
    Submit
} from './styles'

import theme from '../../theme'

export default function DetalhesLocais({ navigation }) {


    const [loading, setLoading] = useState(false)
    const [data, setData] = useState()
    const [tipo, setTipo] = useState()

    useEffect(() => {
        try {
            setLoading(true)
            let data = navigation.getParam('data')
            let tipo = navigation.getParam('tipo')
            setData(data)
            setTipo(tipo)
        } finally {
            setLoading(false)
        }

    }, [])


    function renderFoto() {
        return (
            <ContainerTopo>
                <ImageAbsolute source={require('../../assets/petshop.png')} />
                <View >
                    <ImagePequena source={{ uri: data.imagem }} />
                </View>
            </ContainerTopo>
        )
    }


    function renderDados() {
        return (
            <>
                <ContainerTitle>
                    <Title>{data.nome || 'Nome'}</Title>
                </ContainerTitle>

                {/* <ContainerDescricao>
                    {descricao.map(item => {
                        return (
                            <Descricao key={item.id_descricao_locais}>
                                <TitleDescricao>{item.descricao}</TitleDescricao>
                            </Descricao>
                        )
                    })}

                </ContainerDescricao> */}

                <ContainerDados>
                    <Texto>Telefone: </Texto>
                    <Dados>{data.telefone || 'Telefone'}</Dados>
                </ContainerDados>
                <ContainerDados>
                    <Texto>WhatsApp: </Texto>
                    <Dados>{data.celular || 'Celular'}</Dados>
                </ContainerDados>
                <ContainerEndereco>
                    <TextEndereco>{data.logradouro || 'Endereco'}, {data.numero || 'Numero'}</TextEndereco>
                    <TextEndereco>{data.bairro || 'Bairro'}</TextEndereco>
                    <TextEndereco>{data.cidade || ''} - {data.uf || ''}</TextEndereco>
                </ContainerEndereco>
            </>
        )
    }

    function renderDetalhes() {
        return (
            <>
                {renderFoto()}
                {loading ? <ActivityIndicator size="large" color={theme.colors.primary} />
                    : renderDados()}
                <Anchor>www.vetcenter.com.br</Anchor>
                <Submit>Galeria de Fotos</Submit>
            </>
        )
    }

    function actionBack() {
        navigation.pop()
    }

    return (
        <Container>
            <Topo title={`Detalhes ${tipo}`} perfil iconBack iconName="md-arrow-back" onPress={actionBack} pet_perfil={usuario.pets.imagem}/>
            {data && (
                renderDetalhes()
            )}

        </Container>
    )
}

