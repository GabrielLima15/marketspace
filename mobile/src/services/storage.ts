import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageKey = 'Stor:MarketSpace:'

export const SaveObject = async (key: string, value: any) => {
    return await SaveStorage(key, JSON.stringify(value))
}

export const ReadObject = async (key: string) => {
    const value = await ReadStorage(key)
    if (!value) return null
    return JSON.parse(value)
}

export const SaveStorage = async (key: string, value: string) => {
    return await AsyncStorage.setItem(`${storageKey}::${key}`, value)
} 

export const ReadStorage = async (key: string) => {
    return await AsyncStorage.getItem(`${ storageKey }::${ key }`)
}