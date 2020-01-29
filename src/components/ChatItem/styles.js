import { StyleSheet } from 'react-native'
import theme from '../../theme'

export default StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
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
        marginRight: 5
    }
})