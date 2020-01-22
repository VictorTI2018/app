import React, { useEffect, useState } from 'react'
import { View, SafeAreaView, Text, FlatList, ActivityIndicator, Image } from 'react-native'

import { Topo } from '../../components'

import theme from '../../theme'

import styles, { Submit } from './styles'

import { getLocais } from '../../webservice/locais'

function Locais(props) {

    const [loading, setLoading] = useState(false)
    const [locais, setLocais] = useState()
    const [tipo, setTipo] = useState('')


    useEffect(() => {
        let tipo = props.navigation.getParam("tipo")
        setTipo(tipo)
    }, [ tipo ])

    useEffect(() => {
        loadLocais()
    }, [tipo])

    async function loadLocais() {
        try {
            setLoading(true)
            const resp = await getLocais()
            let local = resp.data.filter(item => item.tipo === tipo)
            setLocais(local)
        } finally {
            setLoading(false)
        }
    }


    function actionBack() {
        props.navigation.pop()
    }

    function detalhesLocais(item) {
        props.navigation.push('DetalhesLocais', { data: item })
    }

    function renderLocais({ item }) {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Image style={styles.image} source={{ uri: item.imagem }} />
                </View>
                <View style={styles.containerDescription}>
                    <Text style={styles.title}>{item.nome || 'Nome da Clinica'}</Text>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={styles.endereco}> {item.logradouro || 'Endereco'} , {item.numero || 'Numero'} - {item.bairro || 'Bairro'} </Text>
                        <Text style={styles.endereco}>{item.cidade || 'Cidade'}  - {item.uf || 'Estado'}</Text>
                    </View>
                    <Submit style={{ marginTop: 10, width: '75%' }} colors="#0D47A1"
                        onPress={() => { detalhesLocais(item) }}>Saiba mais +</Submit>
                </View>
            </SafeAreaView>
        )
    }

    return (
        <>
            <Topo title={`${tipo}`} perfil iconBack iconName="md-arrow-back" onPress={actionBack} />
            <View >
                <View style={styles.topo}>
                    <Submit>+ filtros</Submit>
                </View>
                {loading ? (
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color={theme.colors.primary} />
                    </View>
                ) :
                    <FlatList renderItem={renderLocais}
                        data={locais}
                        keyExtractor={item => String(item.id_local)}
                    />
                    // renderLocais()
                }
            </View>
        </>
    )

}

export default Locais