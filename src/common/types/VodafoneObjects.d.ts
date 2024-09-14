export interface IInvoice {
	dueAmount: {
		unit: "TL"
		value: string
		string: string
	}
	dueDate: string
	invoiceAmount: {
		unit: string
		value: string
		string: string
	}
	invoiceDate: string
	invoiceNo: string
	invoicePeriod: string
	invoiceStatus: "Y"
	invoiceTypeId: "NORMAL_DEBIT"
	paymentDate: string
	promiseToPayAvailable: boolean
	promiseToPayDesc: ""
	msisdn: string
	invoiceTypeIdOutput: "NORMAL_DEBIT"
	infoMsg: string
	infoColorCode: "#009900"
	moduleVisibility: boolean
	statusMsg: "Ödendi"
	amountColorCode: "#000000"
	lastInvoiceFlag: "Y"
	installmentCount: "0"
}
type Benefit =
	| {
			amount: {
				unit: "GB"
				value: string
				string: string
				description: ""
			}
			type: "DATA"
	  }
	| {
			amount: {
				unit: "Dk"
				value: string
				string: string
				description: ""
			}
			type: "VOICE"
	  }
	| {
			amount: {
				unit: "Adet"
				value: string
				string: string
				description: ""
			}
			type: "SMS"
	  }
export interface ITariff {
	id: string
	name: string
	tariffDescription: string
	tariffListViewIconURL: ""
	tariffListViewIconDescription: ""
	tariffListDescription: ""
	listButtonText: ""
	detailButtonText: ""
	tariffType: "UYUMLU"
	benefits: {
		benefit: Benefit[]
	}
	price: string
	priceAmount: {
		unit: string
		value: string
		string: string
	}
	options: {
		title: ""
		selectable: false
		minChoosableOption: 0
		maxChoosableOption: 0
	}
	isReloadable: false
	campaignIds: string[]
}
type Credit = {
	unit: "GB" | "Dk" | "Adet"
	value: string
}
export interface IDetailedPackageInfo {
	productId: string
	bundleStartDate: string
	credit: {
		unit: string
		value: string
	}
	credits: Credit[]
	initialCredit: {
		unit: string
		value: string
	}
	initialCredits: Credit[]
	description: string //"Yurt İçi İnternet"
	endDate: string
	usageRatio: number
	packageType: "PACKAGE"
	trafficDirection: string // "Yurt İçi"
	trafficDirectionCode: "NATION"
	trafficType: "DATA"
	type: ""
	creditDescription: ""
	isUnlimited: boolean
}

interface ISubscriber {
	brand: "POSTPAID"
	customerType: "PERSONAL"
	gender: ""
	msisdn: string
	name: string
	status: ""
	surname: string
	virtualBrand: "POST"
	isRoaming: boolean
	customerSource: string
	email: string
	birthDate: string
	isAuthorized: boolean
	packageId: string
	isNewUser: boolean
	isCosbyMember: boolean
	isCosbyLeader: boolean
	isEiqCustomer: boolean
	marketingId: string
	segmentList: ["POSTPAID"]
	userBirthDate: ""
	preferredLanguage: ""
	productList: string[]
	clusterId: string
	billingAccountId: ""
	customerId: ""
	nationality: ""
	subscriberStartDate: string
	birthdayWeek: boolean
	anniversaryWeek: boolean
	anniversaryCount: number
	dashboardIconType: 0
	subSegment: ""
	zebro: boolean
	authorizerMsisdn: ""
}

export interface IExchangeTokenContext {
	sub: string
	user_info: {
		email_verified: boolean
		phone_number_verified: boolean
		sub: string
	}
	sessionId: string
	exp: number
	iat: number
}
