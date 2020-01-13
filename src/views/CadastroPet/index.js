import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import RNPickerSelect from 'react-native-picker-select';
import { View, TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-picker'

import { Topo } from '../../components'
import { Logo, FormContainer, Input, Row, Check, Submit, RoundedSelect } from './styles'

import theme from '../../theme'
import { createPet } from '../../webservice/cadastro-usuario'
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
    { label: '6 anos', value: '6' }
]

const placeholderEspecie =
    { label: "Qual especie é ?", value: null }

const placeholderRaca =
    { label: "Qual raça é ?", value: null }

const sexo = { label: 'Qual Sexo ? ', value: null }
const idade = { label: 'Qual Idade ?', value: null }

const MAX_FILE_SIZE = 3

function CadastroPet({ navigation }) {

    const [nome, setNome] = useState('')
    const [dataRaca, setDataRaca] = useState([
        { label: '', value: '', key: '' }
    ])
    const [dataEspecie, setDataEspecie] = useState([
        { label: '', value: '', key: '' }
    ])
    const [raca, setRaca] = useState()
    const [especie, setEspecie] = useState()
    const [sexos, setSexos] = useState('')
    const [idades, setIdades] = useState('')
    const [castrado, setCastrado] = useState(false)
    const [pedigree, setPedigree] = useState(false)
    const [termos, setTermos] = useState(false)
    const [foto, setFoto] = useState()
    const [id_usuario, setIdUsuario] = useState()
    const [doar, setDoar] = useState(false)
    const [token, setToken] = useState()
    const [loading, setLoading] = useState(false)
    const [ ong, setOng ] = useState(false)

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
            foto,
            id_usuario,
            doar
        }
    }
    useEffect(() => {
        let doar = navigation.getParam('doar')
        setDoar(doar)
    }, [ doar ])



    async function getToken() {
        const token = await AsyncStorage.getItem('token')
        let id_usuario = token ? await AsyncStorage.getItem('id_usuario') : navigation.getParam("id_usuario")
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

    useEffect(() => {
        async function getPet() {
            const resp = await getPetId(id_usuario)
        }
    })

    async function handleSubmit() {
        try {
            setLoading(true)
            const res = await createPet(getModel())
            if (res.data.status === 'sucesso') {
                if (token) {
                    navigation.push('Parabens', { pet: getModel() })
                } else {
                    showMessage({
                        message: "SUCESSO",
                        description: "Cadastro efetuado com sucesso...",
                        type: 'success',
                        icon: 'auto',
                        duration: 2000
                    })
                }


            }
        } finally {
            setLoading(false)
        }
    }

    function addFoto() {
        showImagePicker().then(({ uri, didCancel }) => {
            if (didCancel) return
            console.log(uri)
        })
    }

    function galeriaFotos() {
        navigation.push('GaleriaPet')
    }

    function showImagePicker() {
        return new Promise((resolve, reject) => {
            const options = {
                title: null,
                cancelButtonTitle: 'Cancelar',
                takePhotoButtonTitle: 'Tirar Foto',
                chooseFromLibraryButtonTitle: 'Escolher Foto',
                quality: 0.6,
                storageOptions: {
                    noData: true
                },
                permissionDenied: {
                    title: 'Permissão negada',
                    text: 'Para ser possível selecionar fotos é necessário que seja dada as devidas permissões para o app',
                    reTryTitle: 'Tentar novamente',
                    okTitle: 'Tenho certeza'
                }
            }
            ImagePicker.showImagePicker(options, (response) => {
                const { fileSize, error } = response
                if (fileSize / 100000 > MAX_FILE_SIZE) {
                    reject(Error(`A foto não pode ultrapassar ${MAX_FILE_SIZE} MB`))
                } else if (error) {
                    reject(Error(error))
                } else {
                    let source = { uri: response.uri }
                    setFoto(source)
                }
            })
        })
    }

    function actionBack() {
        navigation.pop()
    }

    const title = doar ? 'Cadastro para adpção' : 'Cadastro do Pet'
    return (
        <>
            <Topo title={title} iconBack onPress={actionBack} iconName="md-arrow-back" perfil />
            <FormContainer>

                <TouchableOpacity onPress={addFoto}>
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

export default CadastroPet