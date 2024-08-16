import AsyncStorage from "@react-native-async-storage/async-storage"

export default abstract class Database {
	public static async get(key: string) {
		try {
			const data = (await AsyncStorage.getItem(key)) as string
			if (!data) return null
			const jsondata = JSON.parse(data)

			return jsondata || null
		} catch (e: string | any) {
			// Logger.warning("Database.get",e)
			return null
		}
	}
	public static async set(key: string, value: any) {
		try {
			await AsyncStorage.setItem(key, JSON.stringify(value))
		} catch (e: string | any) {
			console.warn("Database.set", e)
		}
	}

	public static async removeItem(key: string) {
		try {
			await AsyncStorage.removeItem(key)
		} catch (e: string | any) {
			console.warn("Database.removeItem",e)
		}
	}
}