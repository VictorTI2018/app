import React from 'react'
import { connect } from 'react-redux'
import { modificaMensagem } from '../../store/chat/actions'
import { View, TextInput } from 'react-native'

import { Button } from 'react-native-elements'

import styles from './styles'

function ChatItem(props) {
    
    const [ mensagem, setMensagem ] = useState('')

    function handleChange () {
        modificaMensagem(mensagem)
    }
    return (
        <View style={styles.container}>
            <View style={styles.listContainer}></View>
            <View style={styles.sendContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua mensagemn..."
                    value={mensagem}
                    onChangeText={handleChange}/>

                <Button title="Enviar" buttonStyle={{ borderRadius: 10, height: 50 }} />
            </View>
        </View>
    )
}



const mapDispatchProps = dispatch => {
    return {
        onChange: mensagem => dispatch(modificaMensagem(mensagem))
    }
}

export default connect(null, mapDispatchProps)(ChatItem)