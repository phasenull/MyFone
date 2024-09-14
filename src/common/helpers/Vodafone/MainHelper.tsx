import { Vodafone } from "@/common/types"
import { API_SERVICE } from "@/constants/Services"

export async function getSubscriberAsync(sid: string) {
	const url = API_SERVICE
	const request = await fetch(
		`${url}?${new URLSearchParams({
			sid: sid,
			method: "getSubscriber",
		})}`,
		{ method: "POST" }
	)
	const result = await request.json()
	if (result.result === "FAIL") return
	return result as Vodafone.Responses.Subscriber.Success
}
export async function getTariffAndOptions(sid: string) {
	const url = API_SERVICE
	const request = await fetch(
		`${url}?${new URLSearchParams({
			sid: sid,
			method: "getTariffAndOptions",
		})}`,
		{ method: "POST" }
	)
	const result = await request.json()
	if (result.result === "FAIL") return
	return result as Vodafone.Responses.Tariffs.getTariffAndOptions.Success
}
export async function getInvoiceAsync(sid: string) {
	const url = API_SERVICE
	const request = await fetch(
		`${url}?${new URLSearchParams({
			sid: sid,
			method: "getInvoice",
		})}`,
		{ method: "POST" }
	)
	const result = await request.json()
	if (result.result === "FAIL") return
	return result as Vodafone.Responses.Tariffs.getInvoice.Success
}
export async function getPackageListWithDetail(sid: string) {
	const url = API_SERVICE
	const request = await fetch(
		`${url}?${new URLSearchParams({
			sid: sid,
			method: "getPackageListWithDetail",
		})}`,
		{ method: "POST" }
	)
	const result = await request.json()
	if (result.result === "FAIL") {
		console.warn("auth error")
		return
	}
	return result as Vodafone.Responses.Tariffs.getPackageListWithDetail.Success
}
