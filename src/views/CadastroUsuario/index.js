import React, { useState, useEffect } from 'react'
import ImagePicker from 'react-native-image-picker'
import { View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { PasswordField, Topo } from '../../components'
import { FormContainer, Input, Submit, Logo, Container } from './styles'

import { showMessage } from 'react-native-flash-message'
import { createUsuario, updateUsuario } from '../../webservice/cadastro-usuario'


import RNFetchBlob from 'react-native-fetch-blob'
import AsyncStorage from '@react-native-community/async-storage'

const MAX_FILE_SIZE = 3

function CadastroUsuario({ navigation }) {


    const [senha, setSenha] = useState()
    const [confirme_senha, setConfirmeSenha] = useState()
    const [nome, setNome] = useState()
    const [email, setEmail] = useState()
    const [sobrenome, setSobreNome] = useState()
    const [id_usuario, setIdUsuario] = useState()
    const [loading, setLoading] = useState(false)
    const [ imagem, setImagem ] = useState()
    const [foto, setFoto] = useState()

    useEffect(() => {
        let id_usuario = navigation.getParam('id_usuario')
        if (id_usuario > 0) {
            let model = navigation.getParam('model')
            setNome(model.nome)
            setEmail(model.email)
            setSobreNome(model.sobrenome)
        }
        setIdUsuario(id_usuario)
    }, [id_usuario])


    function getModel() {
        return {
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            senha,
            imagem
        }
    }

    function actionBack() {
        navigation.pop()
    }

    async function register() {
        try {
            setLoading(true)

            const resp = await createUsuario(getModel())
            console.log(resp.data)
            if (resp.data.status) {
                const id_usuario = resp.data.id_usuario
                navigation.push('CadastroEndereco', { id_usuario: id_usuario, usuario: resp.data })
            } else if (resp.data.email) {
                showMessage({
                    message: "ATENÇÃO",
                    description: `${resp.data.message}`,
                    type: "danger",
                    icon: "auto",
                    duration: 3000
                })
            }
        } finally {
            setLoading(false)
        }

    }

    async function update(id_usuario) {
        try {
            setLoading(true)
            const resp = await updateUsuario(id_usuario, getModel())
            if (resp.status === 200) {
                let endereco = resp.data.endereco
                navigation.push('CadastroEndereco', { id_usuario: id_usuario, endereco: endereco, usuario: resp.data, id_endereco: endereco.id_endereco, update: true })
            }
        } finally {
            setLoading(false)
        }
    }

    async function handleSubmit() {
        if (nome || email || senha) {
            if (senha === confirme_senha) {

                if (id_usuario > 0) {
                    await update(id_usuario)
                } else {
                    await register()
                }

            } else {
                showMessage({
                    message: 'ATENÇÃO',
                    description: 'As senhas não conhecidem...',
                    type: 'warning',
                    icon: 'auto',
                    duration: 3000
                })
            }

        } else {
            showMessage({
                message: 'ATENÇÃO',
                description: 'Por favor preencha todos os campos...',
                type: 'danger',
                icon: 'auto',
                duration: 3000
            })
        }

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
                setFoto({ uri: res.uri })
                setImagem({ uri: 'data:image/png;base64,' + res.data})
            }
        })
    }


    const title = id_usuario > 0 ? `Editar Usuario` : 'Cadastro Usuario'
    return (
        <FormContainer>
            <Topo title={title} iconBack onPress={actionBack} iconName="md-arrow-back" />
            <TouchableOpacity onPress={pickImage} style={{ borderRadius: 100, }}>
                {foto === undefined || foto.uri === undefined ?
                    <Logo source={require('../../assets/upload-image.png')} /> :
                    <Logo source={foto} />}
            </TouchableOpacity>
            <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                <Input placeholder="Nome"
                    value={nome}
                    onChangeText={(value) => setNome(value)}
                    returnKeyType="next" />

                <Input placeholder="Sobrenome"
                    value={sobrenome}
                    onChangeText={(value) => setSobreNome(value)}
                    returnKeyType="next" />
                <Input placeholder="Email"
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                    returnKeyType="next" />
                <PasswordField placeholder="Senha"
                    returnKeyType="next"
                    value={senha}
                    onChangeText={(value) => setSenha(value)}
                    style={{ marginTop: 10, }} />
                <PasswordField placeholder="Confirmar Senha"
                    value={confirme_senha}
                    style={{ marginTop: 10, }}
                    onChangeText={(value) => setConfirmeSenha(value)} />
            </View>

            <Submit onPress={handleSubmit}>
                {loading ? 'Aguarde...' : 'Avançar'}
                <Icon
                    name="arrowright"
                    size={15}
                    color="white"
                />
            </Submit>
        </FormContainer>
    )
}

export default CadastroUsuario