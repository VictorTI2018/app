import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, Modal, Text, TouchableWithoutFeedback, StyleSheet, Image, FlatList } from 'react-native'
import theme from '../../theme'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Iconn from 'react-native-vector-icons/AntDesign'
import {
    FotoPet,
    SelectedChat,
    ContainerPetChat,
    List,
    NomePetChat,
    ContainerDadosChat
} from './styles'

import { getContatos } from '../../webservice/contatos'

const dados = [
    { id_pet: 1, nome: 'Bryan', imagem: require("../../assets/cachorro1.png") },
    { id_pet: 2, nome: 'Bryan', imagem: require("../../assets/cachorro1.png") },
    { id_pet: 3, nome: 'Bryan', imagem: require("../../assets/cachorro1.png") },
    { id_pet: 4, nome: 'Bryan', imagem: require("../../assets/cachorro1.png") },
    { id_pet: 5, nome: 'Bryan', imagem: require("../../assets/cachorro1.png") },
]

function Notificacao(props) {

    const [amizade, setAmizade] = useState()
    const [meet, setMeet] = useState()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    const { pets } = props.usuario

    async function notificaContatos() {
        const resp = await getContatos(pets.id_pet)
        console.log(resp.data)
        // let amizade = resp.data.filter(item => item.amizade === true)
        // let meet = resp.data.filter(item => item.meet)
        // setAmizade(amizade)
        // setMeet(meet)
        // setData(resp.data)
    }

    useEffect(() => {
        try {
            setLoading(true)
            if (pets && (pets.id_pet !== undefined)) {
                notificaContatos()
            }

        } finally {
            setLoading(false)
        }
    }, [])


    function renderRow({ item }) {
        // if (amizade) {
        //     return (
        //         <SelectedChat>
        //             <ContainerPetChat>
        //                 <FotoPet source={{ uri: item.imagem }} />
        //                 <ContainerDadosChat>
        //                     <NomePetChat>{item.nome}:</NomePetChat>
        //                     <Text style={styles.tipo}>Começou amizade com você</Text>
        //                     <View style={styles.img}>
        //                         <Icon name="pets" size={20} color="#FFF" />
        //                     </View>
        //                 </ContainerDadosChat>
        //             </ContainerPetChat>

        //         </SelectedChat>
        //     )
        // } else if (meet) {
        //     return (
        //         <SelectedChat>
        //             <ContainerPetChat>
        //                 <FotoPet source={{ uri: item.imagem }} />
        //                 <ContainerDadosChat>
        //                     <NomePetChat>{item.nome}:</NomePetChat>
        //                     <Text style={styles.tipo}>Deu meet em você</Text>
        //                     <View style={styles.img}>
        //                         <Iconn name="heart" size={20} color="#FFF" />
        //                     </View>
        //                 </ContainerDadosChat>
        //             </ContainerPetChat>

        //         </SelectedChat>

        //     )
        // }

        return (
            <>
                <View>
                    <Text>teste</Text>
                </View>
            </>
        )

    }

    return (
        <View>
            <Modal transparent={true}
                visible={props.isVisible}
                onRequestClose={props.onCancel}
                animationType='slide'>
                <TouchableWithoutFeedback onPress={props.onCancel}>
                    <View style={styles.background} />
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <FlatList data={data}
                        renderItem={renderRow}
                        keyExtractor={item => String(item.id_pet)}
                    />
                </View>
                <TouchableWithoutFeedback onPress={props.onCancel}>
                    <View style={styles.background} />
                </TouchableWithoutFeedback>
            </Modal>
        </View>

    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    container: {
        backgroundColor: '#FFF',
        flex: 7,
    },
    detalhes: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.primary
    },
    img: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 200,
        height: 30,
        width: 30,
        backgroundColor: theme.colors.primary,
        marginLeft: 10
    },
    tipo: {
        marginLeft: 10
    }
})

const mapStateToProps = ({ usuario }) => {
    return {
        usuario
    }
}

export default connect(mapStateToProps, null)(Notificacao)