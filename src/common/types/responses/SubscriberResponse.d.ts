import { ISubscriber } from "../VodafoneObjects"

export declare global {
	export namespace Vodafone.Responses.Subscriber {
		export interface Success {
			result: {
				result: "SUCCESS"
				resultCode: "0"
				resultDesc: "Operation is successfull"
			}
			currentTime: string
			subscriber: ISubscriber
		}
	}
}
