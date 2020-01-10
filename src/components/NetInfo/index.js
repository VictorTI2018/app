import React, { createContext, useEffect, useRef, useState } from 'react'
import NetInfoCommunity from '@react-native-community/netinfo'
import FlashMessage from 'react-native-flash-message'
import { node } from 'prop-types'

import { ping } from '../../http'
import { BASE_URL } from '../../config/config'

import { Container } from './styles'

export const ConnectedContext = createContext({})

export function NetInfo({ children }) {
    const [connected, setConnected] = useState(true)
    const [serverConnected, setServerConnected] = useState(true)
    const [hasConnection, setHasConnection] = useState(true)
    const [connectingServer, setConnectingServer] = useState(false)
    const flashMessageRef = useRef(null)

    useEffect(isConnectedInterval, [])
    useEffect(isServerConnectedInterval, [])
    useEffect(() => {
        if (!connected) {
            flashMessageRef.current.showMessage({
                message: 'Não há conexão com a internet',
                description: 'As functionalidade de chat e mapa vão ficar desativa até que a conexão seja restabelicida...',
                type: 'danger',
                hideOnPress: false,
                icon: 'auto',
                duration: 6000
            })
            setHasConnection(false)
        } else if (connected && serverConnected) {
            flashMessageRef.current.hideMessage()
            setHasConnection(true)
        }
    }, [connected])

    useEffect(() => {
        if (connected && !serverConnected) {
            flashMessageRef.current.showMessage({
                message: 'Erro ao se comunicar com o servidor...',
                description: 'Tente novamente em alguns minutos...',
                type: 'danger',
                hideOnPress: false,
                icon: 'auto',
                duration: 5000
            })
        } else {
            flashMessageRef.current.hideMessage()
            setHasConnection(true)
        }
    }, [serverConnected])

    function isConnectedInterval() {
        const interval = setInterval(handleConnectivityChange, 30000)
        return () => {
            clearInterval(interval)
        }
    }

    function isServerConnectedInterval() {
        const interval = setInterval(handleConnectivityServerChange, 60000)
        return () => {
            clearInterval(interval)
        }
    }

    async function handleConnectivityChange() {
        const { isConnected } = await NetInfoCommunity.fetch()
        setConnected(isConnected)
    }

    async function handleConnectivityServerChange() {
        if (!connectingServer) {
            setConnectingServer(true)
            const isConnected = await ping(BASE_URL)
            setServerConnected(isConnected)
            setConnectingServer(false)
        }
    }

    return (
        <ConnectedContext.Provider value={hasConnection}>
            <Container>{children}</Container>
            <FlashMessage positio='top' ref={flashMessageRef} canRegisterAsDefault={false} />
        </ConnectedContext.Provider>
    )
}

NetInfo.protoTypes = {
    children: node
}