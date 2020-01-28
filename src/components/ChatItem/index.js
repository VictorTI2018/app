import React from 'react'
import { Text, View, StyleSheet } from 'react-native';

export function ChatItem(props) {

    return (
        <View style={{ flex: 1, marginTop: 50, backgroundColor: '#eee4dc', padding: 10 }}>
        <View style={{ flex: 1, paddingBottom: 20 }}>

            
        </View>

        <View style={{ flexDirection: 'row', height: 60}}>
            <TextInput 
                style={{ flex: 4, backgroundColor: '#fff', fontSize: 18 }}
            />

            <TouchableHighlight  underlayColor="#fff">
                <Image source={require('../../assets/enviar_mensagem.png')} />
            </TouchableHighlight>

        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
