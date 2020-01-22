import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Image, SafeAreaView, ActivityIndicator } from 'react-native'

import { Topo } from '../../components'

import { getClinicas } from '../../webservice/clinicas'
import { get } from 'lodash'

import { Submit } from './styles'
import theme from '../../theme'

export default function Clinica({ navigation }) {


    function renderLocais() {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Image style={styles.image} source={require('../../assets/cachorro2.png')} />
                </View>
                <View style={styles.containerDescription}>
                    <Text style={styles.title}>{'Nome da Clinica'}</Text>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={styles.endereco}> {'Endereco'} , {'Numero'} - {'Bairro'} </Text>
                        <Text style={styles.endereco}>{'Cidade'}  - {'Estado'}</Text>
                    </View>
                    <Submit style={{ marginTop: 10, width: '75%' }} colors="#0D47A1"
                    >Saiba mais +</Submit>
                </View>
            </SafeAreaView>
        )
    }

    return (
        <>
            <Topo title="Clinicas" perfil iconBack iconName="md-arrow-back" onPress={actionBack} />
            <View >
                <View style={styles.topo}>
                    <Submit>+ filtros</Submit>
                </View>
                {loading ? (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 100 }}>
                        <ActivityIndicator size="large" color={theme.colors.primary} />
                    </View>
                ) :
                    <FlatList renderItem={renderClinicas}
                        data={clinicas}
                        keyExtractor={item => String(item.id_clinica)}
                    />
                }
            </View>
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
        padding: 10
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
        paddingRight: 40,
        width: '80%'
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