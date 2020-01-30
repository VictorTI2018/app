import { StyleSheet } from 'react-native'
import theme from '../../theme'

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#BBDEFB'
    },
    listContainer: {
        flex: 1,
        paddingBottom: 20
    },
    sendContainer: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
    },
    input: {
        flex: 4,
        backgroundColor: '#FFF',
        fontSize: 20,
        borderRadius: 10,
        height: 50,
        marginRight: 5,
        paddingLeft: 10
    },
    mensagemLeft: {
        alignItems: 'flex-end',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 40
    },
    textMensagem: {
        fontSize: 18,
        color: '#000',
        padding: 10,
        backgroundColor: '#dbf5b4',
        elevation: 2
    },
    mensagemRigth: {
        alignItems: 'flex-start',
        marginTop: 5,
        marginBottom: 5,
        marginRight: 40
    },
    textMensagemRigth: {
        fontSize: 18,
        color: '#000',
        padding: 10,
        backgroundColor: '#f7f7f7',
        elevation: 2
    }
})