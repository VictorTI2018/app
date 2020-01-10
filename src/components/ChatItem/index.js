import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

export function ChatItem(props) {
    const [messages, setMessages] = useState([
        {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'GiftedChat',
                avatar: 'https://placeimg.com/140/140/any',
            },
        },
    ]);
    const onSend = (newMessages) =>
        setMessages(GiftedChat.append(messages, newMessages));
    return (
        <View style={styles.container}>
            <GiftedChat
                {...{ messages, onSend }}
                user={{
                    _id: 1,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
