declare global {
	export namespace Vodafone.Responses.Auth.Initial {
		export interface Success {
			status: true
			next_api: null
			next_to_api: "25"
			next_form: null
			next_to_form: "22"
			title: "Hata!"
			message: {
				message: "Vodafone Online Self Servis'e tek kullanımlık şifrenizle giriş yapabilirsiniz."
				process_id: null
				expires_in: "180"
			}
			redirect: false
			form_session_id: null
			show_next_form: true
			redirect_url: ""
			checkDataStatus: true
			code: {
				message: "Vodafone Online Self Servis'e tek kullanımlık şifrenizle giriş yapabilirsiniz."
				process_id: null
				expires_in: "180"
			}
			localStorageData: []
			customer_brand: {
				message: "Vodafone Online Self Servis'e tek kullanımlık şifrenizle giriş yapabilirsiniz."
				process_id: null
				expires_in: "180"
			}
			customer_type: {
				message: "Vodafone Online Self Servis'e tek kullanımlık şifrenizle giriş yapabilirsiniz."
				process_id: null
				expires_in: "180"
			}
			api_keys: {
				rememberMe: true
				username: string //tel no
				password: string //password
				grant_type: "urn:vodafone:params:oauth:grant-type:two-factor"
				context: "eyJtc2dQcmVmaXgiOiJPU1MiLCJyZW1lbWJlck1lIjp0cnVlfQ==" //base64 {"msgPrefix":"OSS","rememberMe":true}
			}
			customer_field: string
			remember_me: true
			show_types: false
			types: []
			utag: {
				page_name: "OSS login sayfasi"
				page_type: ""
				channel: "oss login"
				login_channel: "oss login"
				login_type: "oss"
				kurumsal_customer_type: "bireysel"
				login_status_1: "logged-in"
				pwa_homescreen_open: ""
				subscription_type: "payg"
				error_message: "Array"
				error_id: "Array"
				api_method: "twoFactorAuthenticationV2"
			}
		}
	}

	export namespace Vodafone.Responses.Auth.OTP {
		export interface Success {
			status: true
			next_api: null
			next_to_api: "0"
			next_form: null
			next_to_form: "0"
			title: "Hata!"
			message: ""
			redirect: true
			form_session_id: string //auth token to be used in query param "sid"
			show_next_form: false
			redirect_url: "https://online.vodafone.com.tr/yanimda/#/giris"
			checkDataStatus: true
			code: 200
			localStorageData: []
			customer_brand: "POSTPAID"
			customer_type: "PERSONAL"
			api_keys: {
				rememberMe: true
				code: string // otp code
				context: string // secret base64 encoded, {"clientVersion":"XX.X","platformName":"Android","langId":"tr_TR","otpCode":"string","rememberMe":true,"msisdn":"telno"}
				grant_type: "urn:vodafone:params:oauth:grant-type:two-factor"
				scope: "ALL"
				USER_AGENT: "web"
				channel: "oss"
			}
			customer_field: string //telno
			remember_me: true
			show_types: false
			types: []
			utag: {
				page_name: "OSS login sayfasi:ikinci onay"
				page_type: ""
				channel: "oss login"
				login_channel: "oss login"
				login_type: "oss"
				kurumsal_customer_type: "bireysel"
				login_status_1: "logged-in"
				pwa_homescreen_open: ""
				subscription_type: "paym"
				error_message: ""
				error_id: "200"
				api_method: "tokenUsing2FAV2"
			}
		}
	}
}
