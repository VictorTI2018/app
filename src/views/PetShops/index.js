import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Image, SafeAreaView, ActivityIndicator } from 'react-native'


import { Topo } from '../../components'

import { getPetShops } from '../../webservice/petshops'
import { get } from 'lodash'

import { Submit } from './styles'
import theme from '../../theme'

export default function PetShop({ navigation }) {

    const [petshops, setPetShops] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadPetShop()
    }, [])


    async function loadPetShop() {
        try {
            setLoading(true)
            const response = await getPetShops()
            setPetShops(response.data)
        } finally {
            setLoading(false)
        }
    }

    async function detalhesPetShop(item) {
        navigation.push('DetalhesPetShop', { petshop: item })
    }

    function actionBack() {
        navigation.pop()
    }

    function renderPetShop(item) {
        const data = get(item, 'item')
        const nome = get(data, 'nome', '')
        const endereco = get(data, 'logradouro', '')
        const bairro = get(data, 'bairro', '')
        const numero = get(data, 'numero', 0)
        const cidade = get(data, 'cidade', '')
        const uf = get(data, 'uf', '')

        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Image style={styles.image} source={require('../../assets/cachorro2.png')} />
                </View>
                <View style={styles.containerDescription}>
                    <Text style={styles.title}>{nome}</Text>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={styles.endereco}> {endereco} , {numero} - {bairro} </Text>
                        <Text style={styles.endereco}>{cidade}  - {uf}</Text>
                    </View>
                    <Submit style={{ marginTop: 10, width: '75%' }} colors="#0D47A1"
                        onPress={() => { detalhesPetShop(data) }}>Saiba mais +</Submit>
                </View>
            </SafeAreaView>
        )
    }

    return (
        <>
            <Topo title="Clinicas" perfil iconBack iconName="md-arrow-back" onPress={actionBack} />
            {petshops.length ? (
                <View >
                    <View style={styles.topo}>
                        <Submit>+ filtros</Submit>
                    </View>
                    {loading ? (
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 100 }}>
                            <ActivityIndicator size="large" color={theme.colors.primary} />
                        </View>
                    ) :
                        <FlatList renderItem={renderPetShop}
                            data={petshops}
                            keyExtractor={item => String(item.id_petshop)}
                        />
                    }
                </View>
            ) : (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Não há dados no momento</Text>
                    </View>
                )}
        </>
    )
}

const styles = {
    container: {
        height: 'auto',
        marginTop: 40,
        borderTopWidth: 0.8,
        borderBottomWidth: 0.8,
        borderColor: '#222',
        flexDirection: 'row',
        padding: 10,
        padding: 10,
    },
    topo: {
        height: 50,
        width: '100%',
        backgroundColor: '#0D47A1',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        marginBottom: 5,
        height: 150,
        width: 130,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.colors.primary
    },
    containerDescription: {
        paddingLeft: 20,
        width: '80%',
        paddingRight: 40,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 25
    },
    endereco: {
        marginTop: 6,
        fontSize: 15
    }
}