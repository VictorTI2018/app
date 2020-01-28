import React, { useState, useEffect } from 'react'
import { Icon } from 'native-base'
import { connect } from 'react-redux'
import { logout } from '../../store/user/action'
import { View, TouchableOpacity, Text, ScrollView, Image, Alert, SafeAreaView } from 'react-native'
import { removeStorage } from '../../helpers'
import theme from '../../theme'

import { Submit, Nome } from './styles'

import { getLocais } from '../../webservice/locais'

import { toggleDrawer, openDrawer } from '../../navigation'


function SlideMenu(props) {


    const usuario = {
        id_usuario: props.usuario.id_usuario,
        nome: props.usuario.nome,
        imagem: props.usuario.imagem,
        qtd_pets: props.usuario.qtd_pets,
        pets: props.usuario.pets
    }



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
            action: () => sair(),
            icon: {
                name: 'power-off',
                type: 'FontAwesome'
            }
        },
    ]

    const [lista, setLista] = useState(listItems)



    useEffect(() => {
        loadLocais()
    }, [])


    async function removeStore() {
        props.onLogout()
        await removeStorage('token')
        props.navigation.push('Login')
    }


    function sair() {
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

    function editarPet() {
        props.navigation.push('CadastroPet', { id_pet: usuario.pets.id_pet })
    }

    function editarCliente() {
        props.navigation.push('CadastroUsuario', { id_usuario: usuario.id_usuario })
    }

    async function loadLocais() {
        const resp = await getLocais()
        let local = resp.data
        if (local.length) {
            for (let k = 0; k < local.length; k++) {
                let items =
                {
                    name: local[k].nome,
                    action: () => props.navigation.push('Locais', { tipo: local[k].tipo }),
                    icon: {
                        name: 'home',
                        type: 'MaterialIcons'
                    }
                }
                lista.push(items)
            }

        }

    }

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
                        <Image style={styles.rounded} source={{ uri: usuario.imagem }} />
                        <Submit onPress={editarCliente}>Editar Perfil</Submit>
                        <Nome>{usuario.nome}</Nome>
                    </View>

                    <View style={{ paddingHorizontal: 10, alignItems: 'center' }}>
                        {usuario.pets &&
                            <>
                                <Image style={styles.roundedDog} source={{ uri: usuario.pets.imagem }} />
                                <Submit onPress={editarPet}>Editar Perfil</Submit>
                                <Nome>{usuario.pets.nome}</Nome>
                            </>
                        }
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
                        <Text style={{ color: '#FFF', fontSize: 17 }}>Pets Cadastrado: {usuario.qtd_pets || 0}</Text>
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
                        lista.map((item, index) =>
                            <TouchableOpacity onPress={item.action} style={styles.listItemRows} key={index}>
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
const mapStateToProps = ({ usuario }) => {
    return {
        usuario: usuario
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SlideMenu)