import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { PasswordField, useForm, Background, Topo } from '../../components'
import { FormContainer, Input, Submit, Logo, Container } from './styles'

import { showMessage } from 'react-native-flash-message'
import { createUsuario, updateUsuario } from '../../webservice/cadastro-usuario'

function CadastroUsuario({ navigation }) {


    const [senha, setSenha] = useState()
    const [confirme_senha, setConfirmeSenha] = useState()
    const [nome, setNome] = useState()
    const [email, setEmail] = useState()
    const [sobrenome, setSobreNome] = useState()
    const [id_usuario, setIdUsuario] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let id_usuario = navigation.getParam('id_usuario')
        console.log(id_usuario)
        if (id_usuario > 0) {
            let model = navigation.getParam('model')
            console.log(model)
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
            senha
        }
    }

    function actionBack() {
        navigation.pop()
    }

    async function register() {
        try {
            setLoading(true)
            const resp = await createUsuario(getModel())
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
        if (nome.value || email.value || senha) {
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


    const title = id_usuario > 0 ? `Editar Usuario` : 'Cadastro Usuario'
    return (
        <FormContainer>
            <Topo title={title} iconBack onPress={actionBack} iconName="md-arrow-back" />
            <View>
                <Logo source={require('../../assets/cadastro-usuario.png')} />
            </View>
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