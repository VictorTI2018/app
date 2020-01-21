import React, { useState, useEffect } from 'react'
import { Icon } from 'native-base'
import { View, TouchableOpacity, Text, ScrollView, Image, Alert, SafeAreaView } from 'react-native'
import { removeStorage } from '../../helpers'
import theme from '../../theme'

import { Submit, Nome } from './styles'
import AsyncStorage from '@react-native-community/async-storage';
import { loadUsuario } from '../../webservice/usuario'
import { getLocais } from '../../webservice/locais'

import { toggleDrawer, openDrawer } from '../../navigation'


export default function SlideMenu(props) {

    const [id_usuario, setIdUsuario] = useState()
    const [qtd_pets, setQtdPets] = useState()
    const [model, setModel] = useState(null)
    const [loading, setLoading] = useState(false)
    const [nomeUsuario, setNomeUsuario] = useState()

    let listItems = [
        {
            name: 'Dashboard',
            action: () => props.navigation.navigate('DashBoard'),
            icon: {
                name: 'home',
                type: 'MaterialIcons'
            }
        },
        {
            name: 'Adotar ou Doar um Pet',
            action: () => props.navigation.navigate('Adocao'),
            icon: {
                name: 'home',
                type: 'MaterialIcons'
            }
        },
        {
            name: 'Sair',
            action: () => logout(),
            icon: {
                name: 'power-off',
                type: 'FontAwesome'
            }
        },
    ]

    const [lista, setLista] = useState(listItems)

    async function loadUser() {
        try {
            setLoading(true)
            const resp = await loadUsuario(id_usuario)
            setModel(resp.data)
            setQtdPets(resp.data.qtd_pets)
        } finally {
            setLoading(false)
        }
    }

    async function userLogged() {
        let id_usuario = await AsyncStorage.getItem("id_usuario")
        let nome_usuario = await AsyncStorage.getItem("nome_usuario")
        setNomeUsuario(nome_usuario)
        setIdUsuario(id_usuario)
    }

    useEffect(() => {
        userLogged()
    }, [id_usuario])

    useEffect(() => {
        loadUser()
    }, [id_usuario])

    useEffect(() => {
        loadLocais()
    }, [])


    async function removeStore() {
        await removeStorage('token')
        await removeStorage('nome_usuario')
        await removeStorage('id_usuario')
        props.navigation.push('Login')
    }


    function logout() {
        Alert.alert(
            'ATENÇÃO',
            'Tem certeza que deseja sair ?',
            [
                { text: 'Sim', onPress: async () => await removeStore() },
                { text: 'Não', onPress: () => { }, style: 'cancel' }
            ],
            { cancelable: false }
        )
    }

    function cadastrarPet() {

        props.navigation.push('CadastroPet')
    }

    function editarCliente() {
        props.navigation.push('CadastroUsuario', { id_usuario: id_usuario, model: model })
    }

    async function loadLocais() {
        const resp = await getLocais()
        let local = resp.data.map(element => element);
        console.log(local[0].nome)
        let locais =
        {
            name: local[0].nome,
            action: () => props.navigation.navigate('DashBoard'),
            icon: {
                name: 'home',
                type: 'MaterialIcons'
            }
        }
        lista.push(locais)
    }

    let nome_pet = ''
    let imagem = model ? model.imagem : null
    let imagePet = ''
    return (
        <View style={styles.menu}>
            <View style={{ borderBottomColor: '#FFF', borderBottomWidth: 1 }}>
                <View style={{ justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../../assets/menu-min.png')} style={{ height: 50, width: 170 }} />
                    <TouchableOpacity onPress={toggleDrawer}>
                        <Icon type='MaterialIcons' name={openDrawer && 'keyboard-arrow-left'} style={{ fontSize: 40, color: theme.colors.primary }} />
                    </TouchableOpacity>
                </View>

                <View style={styles.rowImage}>
                    <View style={{ paddingHorizontal: 10, alignItems: 'center' }}>
                        {imagem
                            ? <Image style={styles.rounded} source={{ uri: imagem }} />
                            : <Image style={styles.rounded} source={require('../../assets/mulher1.png')} />}
                        <Submit onPress={editarCliente}>Editar Perfil</Submit>
                        <Nome>{nomeUsuario || 'Nome do Cliente'}</Nome>
                    </View>
                    <View style={{ paddingHorizontal: 10, alignItems: 'center' }}>
                        {imagePet !== ''
                            ? <Image style={styles.roundedDog} source={{ uri: imagePet }} />
                            : <Image style={styles.roundedDog} source={require('../../assets/cachorro1.png')} />}
                        <Submit>Editar Perfil</Submit>
                        <Nome>{nome_pet || 'Nome Pet'}</Nome>
                    </View>
                </View>
                <SafeAreaView style={{
                    height: 'auto',
                    width: 'auto',
                    margin: 10,
                    borderRadius: 20, backgroundColor: '#EF5350'
                }}>
                    <View style={{
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexDirection: 'row'
                    }}>
                        <Text style={{ color: '#FFF', fontSize: 17 }}>Pets Cadastrado: {qtd_pets || 0}</Text>
                        <Submit textColor="#000" colors="#FF8A80">Trocar de pet</Submit>
                    </View>
                </SafeAreaView>
                <View style={{ margin: 10 }}>
                    <Submit tamanho="40" size="20" textColor="#000" colors={theme.colors.primary}
                        onPress={cadastrarPet}>+ Cadastrar novo Pet</Submit>
                </View>
            </View>
            <ScrollView>
                <View style={{ flexDirection: 'column' }}>
                    {
                        lista.map(item =>
                            <TouchableOpacity onPress={item.action} style={styles.listItemRows} key={item.name}>
                                <View style={styles.listItem}>

                                    <Icon name={item.icon.name} type={item.icon.type} style={styles.icon} />
                                    <Text style={styles.listText}>{item.name}</Text>


                                </View>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </ScrollView>
        </View>
    )

}

const styles = {
    menu: {
        height: '100%',
        backgroundColor: theme.colors.errors,
        color: '#333'
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        height: 70,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.3)'
    },
    listItemRow: {
        alignItems: 'center',
    },
    listText: {
        color: '#FFF',
        fontSize: 21
    },
    rowImage: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    icon: {
        marginLeft: 8,
        marginRight: 8,
        color: '#FFF',
        fontSize: 21
    },

    rounded: {
        height: 90,
        width: 90,
        borderRadius: 50,
    },

    roundedDog: {
        height: 90,
        width: 90,
        borderRadius: 50
    },
}
