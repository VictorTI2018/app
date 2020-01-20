import React, { useState, Fragment } from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import { Icon } from 'native-base'
import ImagePicker from 'react-native-image-picker'

import { Topo } from '../../components'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { Container, ContainerFoto, ContainerRenderFoto, ContainerFlexWrap, ContainerFlexBasis, Submit } from './styles'
import theme from '../../theme'

const MAX_FOTOS = 12

export default function GaleriaPet(props) {

    const [fotos, setFotos] = useState([
        { id: Math.random(), fotos: '' }
    ])
    const [imagem, setImagem] = useState()

    function actionBack() {
        props.navigation.pop()
    }

    function pickImage() {
        ImagePicker.showImagePicker({
            title: 'Escolha a imagem',
            cancelButtonTitle: 'Cancelar',
            takePhotoButtonTitle: 'Tirar Foto',
            chooseFromLibraryButtonTitle: 'Escolher Foto',
            quality: 0.6,
            storageOptions: {
                noData: true
            },
            permissionDenied: {
                title: 'Permissão Negada',
                text: 'Para ser possivel selecionar fotos é necessário que seja dada as devidas permissões para o app',
                reTryTitle: 'Tentar novamente',
                okTitle: 'Tenho certeza'
            },
            maxHeight: 600,
            maxWidth: 800
        }, res => {
            if (!res.didCancel) {
                setFotos({ fotos: res.uri })
                setImagem({ uri: 'data:image/png;base64,' + res.data })
            }
        })
    }

    function renderFotos() {
        return (
            <ContainerRenderFoto>
                <ContainerFlexWrap>
                <ContainerFlexBasis>
                        <Fragment >
                            <TouchableOpacity style={styles.fotoWapper}>
                                <Image style={styles.foto} source={fotos} />
                            </TouchableOpacity>
                        </Fragment>

                    </ContainerFlexBasis>
                </ContainerFlexWrap>
            </ContainerRenderFoto>
        )
    }

    return (
        <Container>
            <Topo title="Album de Fotos" iconMenu iconName="md-menu" onPress={actionBack} perfil />
            <ScrollView>
                <ContainerFoto>
                    <View style={{ margin: 10 }}>
                        <Image style={{ height: 200, width: 200 }} source={require("../../assets/album-cachorros.png")} />
                    </View>
                </ContainerFoto>
                <Submit color={theme.colors.errors} iconLeft light name="add" type="MaterialIcons" onPress={pickImage}>

                    Adicionar Foto
                </Submit>
                {renderFotos()}
            </ScrollView>
        </Container>
    )
}

const styles = {
    fotoWapper: {
        backgroundColor: '#eee',
        borderColor: '#fff',
        margin: 1.5,
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fotoIconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    fotoItem: {

    },
    foto: {
        width: '100%',
        height: '100%',
        color: '#888',
        fontSize: 30,
        marginLeft: 5
    }
}