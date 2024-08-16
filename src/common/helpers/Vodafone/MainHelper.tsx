import { API_SERVICE } from "@/constants/Services"

export async function getSubscriberAsync(sid: string) {
	const url = API_SERVICE
	const request = await fetch(`${url}?${new URLSearchParams({
		sid:sid,
		method:"getSubscriber"
	})}`,{method:"POST"})
	const result: Vodafone.Responses.Subscriber.Success = await request.json()
	return result
}

export async function getPackageListWithDetail(sid:string) {
	
	const url = API_SERVICE
	const request = await fetch(`${url}?${new URLSearchParams({
		sid:sid,
		method:"getPackageListWithDetail"
	})}`,{method:"POST"})
	const result: Vodafone.Responses.Tariffs.getPackageListWithDetail.Success = await request.json()
	return result
}