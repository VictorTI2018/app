import AsyncStorage from '@react-native-community/async-storage'

export async function retrieveStorage(item, callback = null) {
    try {
       return await AsyncStorage.getItem(`${item}`, callback)
    }catch(e) {

    }
}

export async function removeStorage(item, callback = null) {
    try {
        return await AsyncStorage.removeItem(`${item}`, callback)
    }catch(e) {

    }
}

export async function setStorage(item, data, callback = null) {
    try {
        return await AsyncStorage.setItem(item, data)
    }catch(e) {

    }
}