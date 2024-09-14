import { create } from "zustand"
import { persist, createJSONStorage, StateStorage } from "zustand/middleware"
import { AppDatabase } from "../databases"
import { loginAsync, tokenExchangeAsync } from "../helpers/Vodafone/AuthHelper"
import { IExchangeTokenContext } from "../types/VodafoneObjects"

interface IVodafoneStore {
	access_token?: string
	refresh_token?: string
	logout: () => void
	auth: (props: { username: string; password: string; otp?: string }) => Promise<string>
	fetchAccessToken: (props?: { sid: string }) => Promise<[false, string] | [string]>
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
		(set, get) => ({
			ssid: undefined,
			refresh_token: undefined,
			auth: async (args) => {
				const login = await loginAsync(args)
				if (login.form_session_id) {
					if (typeof login.form_session_id === "string") {
						console.log("form sid", login.form_session_id)
						set({ refresh_token: login.form_session_id,access_token:login.form_session_id})
					} else {
						throw new Error(login.message)
					}
				}
				console.log(`Login Result:`, login)
				if (args.otp) return login.form_session_id
				console.log(login.message)
				throw new Error("custom.otp")
			},
			logout: () => {
				set({ refresh_token: undefined, access_token: undefined })
			},

			fetchAccessToken: async (args) => {
				const sid = args?.sid || get().refresh_token
				if (!sid) {
					console.log("store.fetchAccessToken sid is null")
					// set({ status: undefined, sid: undefined })
					return [false, "not logged in"]
				}
				const result = await tokenExchangeAsync({ sid: sid })
				console.log("token exchante with refresh_token",sid)
				const access_token = result.access_token
				if (!access_token) {
					console.log("result",result)
					console.log("store.fetchAccessToken access_token is null")

					set({ refresh_token: undefined, access_token: undefined })
					return [false, "auth error (server did not return access token)"]
				}
				const [_, jwtContext, __] = access_token.split(".")
				if (!jwtContext) return [false, "jwtContent is null"]
				const jwtPayload = JSON.parse(atob(`${jwtContext}==`)) as IExchangeTokenContext
				set({ access_token: jwtPayload.sessionId })
				return [jwtPayload.sessionId]
			},
		}),
		{
			name: "vodafone-storage", // name of the item in the storage (must be unique)
			storage: createJSONStorage(() => storage), // (optional) by default, 'localStorage' is used
		}
	)
)
