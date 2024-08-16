import { Vodafone } from "@/common/types"
import { API_SERVICE, AUTH_SERVICE } from "@/constants/Services"

export async function loginAsync(props: { username: string; password: string; otp?: string }) {
	const targetURL = `${AUTH_SERVICE}`
	const formID = props.otp ? "22" : "23"
	const formKey = props.otp ? "25" : "26"
	console.log("loginAsync",formID,formKey)
	const body = new FormData()
	
	body.append(`data[${formKey}][form_id]`, formID)
	body.append(`data[${formKey}][username]`, props.username)
	body.append(`data[${formKey}][password]`, props.password)
	body.append(`data[${formKey}][remember_me]`, "true")
	body.append(`data[${formKey}][code]`, `${props.otp}`)
	
	console.log("body",targetURL,(body.toString()))
	const request = await fetch(targetURL, {
		method: "POST",
		headers: { contentType: "application/x-www-form-urlencoded; charset=UTF-8" },
		body: (body),
	})
	const result: typeof props.otp extends undefined ? Vodafone.Responses.Auth.Initial.Success : Vodafone.Responses.Auth.OTP.Success = await request.json()
	console.log(result)
	return result
}
