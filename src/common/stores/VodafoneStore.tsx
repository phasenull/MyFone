import { create } from "zustand"
import { persist, createJSONStorage, StateStorage } from "zustand/middleware"
import { AppDatabase } from "../databases"
import { loginAsync } from "../helpers/Vodafone/AuthHelper"

interface IVodafoneStore {
	sid?: string
	auth: (props: { username: string; password: string; otp?: string }) => Promise<string>
}

const storage: StateStorage = {
	getItem: async (name: string): Promise<string | null> => {
		const data = (await AppDatabase.get(`zustand.vodafone.${name}`)) || null
		return data
	},
	setItem: async (name: string, value: string): Promise<void> => {
		await AppDatabase.set(`zustand.vodafone.${name}`, value)
	},
	removeItem: async (name: string): Promise<void> => {
		await AppDatabase.removeItem(`zustand.vodafone.${name}`)
	},
}
export const useVodafoneStore = create<IVodafoneStore>()(
	persist(
		(set) => ({
			sid: undefined,
			auth: async (args) => {
				const login = await loginAsync(args)
				if (login.form_session_id) {
					if (typeof login.form_session_id === "string") {
						console.log("form sid",login.form_session_id)
						set({ sid: login.form_session_id })
					} else {
						throw new Error(login.message)
					}
				}
				console.log(`Login Result:`, login)
				if (args.otp) return login.form_session_id
				console.log(login.message)
				throw new Error("custom.otp")
			},
		}),
		{
			name: "vodafone-storage", // name of the item in the storage (must be unique)
			storage: createJSONStorage(() => storage), // (optional) by default, 'localStorage' is used
		}
	)
)
