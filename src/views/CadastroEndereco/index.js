import React, { useState, useEffect } from 'react'
import { TouchableOpacity, ActivityIndicator, View } from 'react-native'

import { Topo } from '../../components'
import { FormContainer, Input, Submit, Logo, Title, ButtonContainer } from './styles'

import theme from '../../theme'
import axios from 'axios'

import { createEndereco, updateEndereco } from '../../webservice/cadastro-usuario'
import { showMessage } from 'react-native-flash-message'

const MAX_FILE_SIZE = 3

export default function CadastroEndereco({ navigation }) {

    const [loading, setLoading] = useState(false)
    const [cep, setCep] = useState()
    const [logradouro, setLogradouro] = useState()
    const [bairro, setBairro] = useState()
    const [cidade, setCidade] = useState()
    const [uf, setUf] = useState()
    const [foto, setFoto] = useState()
    const [id_usuario, setIdUsuario] = useState()
    const [data, setData] = useState([])
    const [id_cidade, setIdCidade] = useState()
    const [id_endereco, setIdEndereco] = useState()
    const [imagem, setImagem] = useState()

    useEffect(() => {
        let id_usuario = navigation.getParam('id_usuario')
        let data = navigation.getParam('usuario')
        setIdUsuario(id_usuario)
        setData(data)
    }, [])

    useEffect(() => {
        let id_endereco = navigation.getParam('id_endereco') || 0
        let update = navigation.getParam('update')
        if (id_endereco > 0 && update) {
            let model = navigation.getParam('endereco')
            setCep(model.cep)
            setLogradouro(model.logradouro)
            setBairro(model.bairro)
            setCidade(model.cidade.cidade)
            setUf(model.cidade.uf)
            setIdCidade(model.cidade.id_cidade)
        }
        setIdEndereco(id_endereco)
    }, [])

    function getModel() {
        return {
            cep: cep,
            logradouro,
            bairro,
            cidade,
            uf,
            id_usuario,
            id_cidade,
            imagem
        }
    }

    async function register() {
        try {
            setLoading(true)
            const res = await createEndereco(getModel())
            if (res.data.status === "sucesso") {
                showMessage({
                    message: 'SUCESSO',
                    description: 'Endereco Cadastrado com sucesso...',
                    type: 'success',
                    icon: 'auto',
                    duration: 1500
                })
            }
        } finally {
            setLoading(false)
        }
    }

    async function update(id_endereco) {
        try {
            setLoading(true)
            const resp = await updateEndereco(id_endereco, getModel())
            if (resp.data.status === "sucesso") {
                showMessage({
                    message: "SUCESSO",
                    description: "Endereco Atualizado com sucesso",
                    type: "success",
                    icon: 'auto',
                    duration: 1500
                })
            }
        } finally {
            setLoading(false)
        }
    }

    async function handleSubmit() {
        try {
            if (id_endereco > 0) {
                await update(id_endereco)
            } else {
                await register()
            }
        } finally {
            setLoading(false)
        }
    }

    async function getEndereco() {
        if (cep) {
            setLoading(true)
            await axios.get(`https://viacep.com.br/ws/${cep}/json/`).then(async (res) => {
                setLogradouro(res.data.logradouro)
                setBairro(res.data.bairro)
                setCidade(res.data.localidade)
                setUf(res.data.uf)
            }).finally(() => {
                setLoading(false)
            })
        }
    }


    function cadastroPet() {
        navigation.push('CadastroPet', { id_usuario: id_usuario, usuario: data })
    }

    function actionBack() {
        navigation.pop()
    }

    function doarPet() {
        navigation.push('CadastroPet', { doar: true, usuario: data, id_usuario: id_usuario })
    }

    let title = id_endereco > 0 ? 'Atualizar Endereço' : 'Cadastrar Endereço'

    return (
        <FormContainer>
            <Topo title={title} iconBack onPress={actionBack} iconName="md-arrow-back" />
            <TouchableOpacity >
                <Logo source={require('../../assets/upload-image.png')} />
            </TouchableOpacity>
            <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                <Input placeholder="CEP" value={cep} onChangeText={(value) => setCep(value)} onBlur={getEndereco} />
            </View>
            {loading ? <ActivityIndicator size="large" color={theme.colors.primary} />
                : <View>
                    <Title>{logradouro || ''}</Title>
                    <Title>{bairro || ''}</Title>
                    <Title>{cidade || ''} - {uf || ''}</Title>

                </View>}
            {logradouro && <Submit disabled={loading} onPress={handleSubmit} color="#00C853">{loading ? 'Aguarde...' : 'Finalizar'}</Submit>}

            <ButtonContainer>
                <Submit onPress={cadastroPet}>Cadastrar meu Pet</Submit>
                <Submit color="blue">Quero adotar um Pet</Submit>
                <Submit color={theme.colors.primary} onPress={doarPet}>Quero doar um Pet</Submit>
            </ButtonContainer>
        </FormContainer>
    )
}