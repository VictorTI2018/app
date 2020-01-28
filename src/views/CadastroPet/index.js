import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux'
import RNPickerSelect from 'react-native-picker-select';
import { View, TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-picker'

import Topo from '../../components/Topo'
import { Logo, FormContainer, Input, Row, Check, Submit, RoundedSelect } from './styles'

import theme from '../../theme'
import { createPet } from '../../webservice/cadastro-usuario'
import { createPetNoToken } from '../../webservice/pet'
import { getRacas } from '../../webservice/raca'
import { getEspecies } from '../../webservice/especie'
import { showMessage } from 'react-native-flash-message';
import { retrieveStorage } from '../../helpers';


const dataSexo = [
    { label: 'Macho', value: "macho" },
    { label: 'Femea', value: "femea" }
]

const dataIdade = [
    { label: '1 ano', value: '1' },
    { label: '2 anos', value: '2' },
    { label: '3 anos', value: '3' },
    { label: '4 anos', value: '4' },
    { label: '5 anos', value: '5' },
    { label: '6 anos', value: '6' },
    { label: '7 ano', value: '7' },
    { label: '8 anos', value: '8' },
    { label: '9 anos', value: '9' },
    { label: '10 anos', value: '10' },
    { label: '11 anos', value: '11' },
    { label: '12 anos', value: '12' },
]

const placeholderEspecie =
    { label: "Qual especie é ?", value: null }

const placeholderRaca =
    { label: "Qual raça é ?", value: null }

const sexo = { label: 'Qual Sexo ? ', value: null }
const idade = { label: 'Qual Idade ?', value: null }

const MAX_FILE_SIZE = 3

function CadastroPet(props) {

    const [nome, setNome] = useState('')
    const [dataRaca, setDataRaca] = useState([
        { label: '', value: '', key: '' }
    ])
    const [dataEspecie, setDataEspecie] = useState([
        { label: '', value: '', key: '' }
    ])


    const pets = props.usuario.pets

    const [raca, setRaca] = useState()
    const [especie, setEspecie] = useState()
    const [sexos, setSexos] = useState('')
    const [idades, setIdades] = useState('')
    const [castrado, setCastrado] = useState(false)
    const [pedigree, setPedigree] = useState(false)
    const [termos, setTermos] = useState(false)
    const [foto, setFoto] = useState()
    const [id_usuario, setIdUsuario] = useState()
    const [doar, setDoar] = useState(props.navigation.getParam('doar'))
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(false)
    const [ong, setOng] = useState(false)
    const [nomeOng, setNomeOng] = useState('')
    const [imagem, setImagem] = useState()
    const [ id_pet, setIdPet ] = useState(0)

    function getModel() {
        return {
            nome,
            raca,
            especie,
            sexos,
            idades,
            castrado,
            pedigree,
            termos,
            id_usuario,
            doar,
            imagem,
            nomeOng
        }
    }

    useEffect(() => {
        let id_pet = props.navigation.getParam('id_pet')
        if(id_pet > 0) {
            console.log(pets)
            setNome(pets.nome)
            setEspecie(pets.especie.nome)
        }
    }, [])


    async function getToken() {
        const token = await AsyncStorage.getItem('token') || null
        let id_usuario = token ? props.usuario.id_usuario : props.navigation.getParam("id_usuario")
        setToken(token)
        setIdUsuario(id_usuario)
    }

    useEffect(() => {
        getToken()
    }, [])

    async function loadRaca() {
        const res = await getRacas()
        let data = []
        if (res.data.length) {
            data = res.data.map((item, index) => ({
                label: item.nome,
                value: item.id_raca,
                key: item.id_raca
            }))

        }
        setDataRaca(data)
        setRaca(res.data)

    }
    async function loadEspecie() {
        const res = await getEspecies()
        setEspecie(res.data)
        let data = res.data.map(item => ({
            label: item.nome,
            value: item.id_especie,
            key: item.id_especie
        }))
        setDataEspecie(data)
    }

    useEffect(() => {
        loadRaca()
        loadEspecie()
    }, [])


    async function handleSubmit() {
        if (termos) {
            if (nome && sexos) {
                try {
                    setLoading(true)
                    if (token) {
                        let res = await createPet(getModel())
                        if (res.data.status === 'sucesso') {
                            props.navigation.push('Parabens', { pet: getModel() })
                        }
                    } else {
                        let res = await createPetNoToken(getModel())
                        console.log(res.data)
                    }
                } finally {
                    setLoading(false)
                }
            } else {
                showMessage({
                    message: "ATENÇÃO",
                    description: "Por favor preencha todos os campos",
                    type: 'danger',
                    icons: 'auto',
                    duration: 2000
                })
            }
        } else {
            showMessage({
                message: "ATENÇÃO",
                description: "Por favor aceite os termos e condições",
                type: 'danger',
                icons: 'auto',
                duration: 2000
            })
        }
    }



    function galeriaFotos() {
        props.navigation.push('GaleriaPet')
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
                setImagem({ uri: 'data:image/png;base64,' + res.data })
            }
        })
    }

    function actionBack() {
        props.navigation.pop()
    }

    const title = doar ? 'Cadastro para adoção' : 'Cadastro do Pet'
    return (
        <>
            <Topo title={title} iconBack onPress={actionBack} iconName="md-arrow-back" />
            <FormContainer>

                <TouchableOpacity onPress={pickImage} style={{ flex: 1 }}>
                    {foto === undefined || foto.uri === undefined ?
                        <Logo source={require('../../assets/upload-image.png')} /> :
                        <Logo source={foto} />}
                </TouchableOpacity>
                <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                    <Input placeholder="Nome do seu pet" value={nome} onChangeText={(value) => setNome(value)} />
                    <RoundedSelect>
                        <RNPickerSelect items={dataEspecie}
                            itemKey="id_especie"
                            onValueChange={(especie) => setEspecie(especie)}
                            placeholder={placeholderEspecie} />
                    </RoundedSelect>
                    <RoundedSelect>
                        <RNPickerSelect items={dataRaca}
                            itemKey="id_raca"
                            onValueChange={(value) => setRaca(value)}
                            placeholder={placeholderRaca} />
                    </RoundedSelect>
                    <Row>
                        <RoundedSelect>
                            <RNPickerSelect items={dataSexo}
                                onValueChange={(value) => setSexos(value)}
                                placeholder={sexo} />
                        </RoundedSelect>
                        <RoundedSelect>
                            <RNPickerSelect items={dataIdade}
                                onValueChange={(value) => setIdades(value)}
                                placeholder={idade} />
                        </RoundedSelect>
                    </Row>
                    <Check title="Sim, ele é castrado" checked={castrado}
                        textStyle={{ color: theme.colors.placeholder }}
                        containerStyle={{ borderWidth: 0, backgroundColor: '#FFF' }}
                        onPress={() => setCastrado(!castrado)} checkedColor={theme.colors.primary} />

                    <Check title="Sim, o Pet tem pedigree" checked={pedigree}
                        containerStyle={{ borderWidth: 0, backgroundColor: '#FFF' }}
                        textStyle={{ color: theme.colors.placeholder }}
                        onPress={() => setPedigree(!pedigree)} checkedColor={theme.colors.primary} />
                    {doar && (
                        <Check title="Sim, faço parte de uma ONG?" checked={ong}
                            containerStyle={{ borderWidth: 0, backgroundColor: '#FFF' }}
                            textStyle={{ color: theme.colors.placeholder }}
                            onPress={() => setOng(!ong)} checkedColor={theme.colors.primary} />


                    )}
                    {ong && <Input placeholder="Nome da Ong" value={nomeOng} onChangeText={(value) => setNomeOng(value)} />}

                    <Submit onPress={galeriaFotos}>Criar galeria de fotos do pet</Submit>

                    <Check title="Li e aceito os termos de uso do aplicativo" checked={termos}
                        containerStyle={{ borderWidth: 0, backgroundColor: '#FFF' }}
                        textStyle={{ color: theme.colors.placeholder }}
                        onPress={() => setTermos(!termos)} checkedColor={theme.colors.primary} />

                    <Submit color={theme.colors.errors} onPress={handleSubmit} disabled={loading}>{loading ? 'Aguarde' : 'Cadastrar'}</Submit>
                </View>
            </FormContainer>
        </>
    )
}

const mapStateToProps = ({ usuario }) => {
    return {
        usuario: usuario
    }
}

export default connect(mapStateToProps, null)(CadastroPet)