import { IDetailedPackageInfo, IInvoice, ITariff } from "@/common/types/VodafoneObjects"

export namespace Vodafone.Responses.Tariffs.getPackageListWithDetail {
	export interface Success {
		result: {
			result: "SUCCESS"
			resultCode: string
			resultDesc: "İşleminiz başarıyla gerçekleştirilmiştir."
			friendlyErrorDesc: "İşleminiz başarıyla gerçekleştirilmiştir."
		}
		baseTariff: ""
		inquiryDate: string
		lastCdrDate: ""
		lastUpdateDate: ""
		showDelayMessage: false
		detailedPackageList: {
			detailedPackageInfo: IDetailedPackageInfo[]
		}
		currentTime: string
		tariffRenewalDateMsg: ""
		storyFeedParam: string //idk
	}
}

export namespace Vodafone.Responses.Tariffs.getTariffAndOptions {
	export interface Success {
		result: {
			result: "SUCCESS"
			resultCode: string
			resultDesc: "İşleminiz başarıyla gerçekleştirilmiştir."
		}
		tariff: ITariff
		options: [
			{
				id: string
				name: string
				description: string
				interfaceId: ""
				price: string // "X₺",
				isCancelable: boolean
				buttonText: "İptal et"
				recurringDescription: "Tek seferlik paket"
				bulletList: string
				iconText: ""
				iconColor: ""
				termsAndConditions: string
				endRefreshDateMsg: ""
				infoDescription: ""
				benefitListHolderRto: {}
				categoryName: "Aşım Planı" | string
				categoryDescription: string
			}[]
		]
		tariffErrDesc: ""
		optionErrDesc: ""
	}
}

export namespace Vodafone.Responses.Tariffs.getInvoice {
	export interface Success {
		result: {
			result: "SUCCESS"
			resultCode: "0"
			resultDesc: "Operation is successfull"
		}
		invoice: IInvoice
		currentTime: string
		storyFeedParam: string
		unpaidInvoiceInfo: {
			totalCount: 0
		}
	}
}
