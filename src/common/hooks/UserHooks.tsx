import { useQuery } from "@tanstack/react-query";
import { useVodafoneStore } from "../stores/VodafoneStore";
import { getInvoiceAsync, getPackageListWithDetail, getSubscriberAsync } from "../helpers/Vodafone/MainHelper";

export function useGetSubscriber() {
	const sid = useVodafoneStore((state)=>state.access_token)
	return useQuery({queryKey:["getSubscriber",sid],queryFn:async ()=>{
		console.info("useGetSubscriber")
		if (!sid) throw new Error("not logged in")
		return await getSubscriberAsync(sid)
	},staleTime:60*1000})
}

export function useGetDetailedTariff() {
	const sid = useVodafoneStore((state)=>state.access_token)
	return useQuery({queryKey:["getDetailedTariff",sid],queryFn:async ()=>{
		console.info("useGetDetailedTariff")
		if (!sid) throw new Error("not logged in")
		return await getPackageListWithDetail(sid)
	},staleTime:60*1000})
}

export function useGetInvoice() {
	const sid = useVodafoneStore((state)=>state.access_token)
	return useQuery({queryKey:["getInvoice",sid],queryFn:async ()=>{
		console.info("useGetInvoice")
		if (!sid) throw new Error("not logged in")
		return await getInvoiceAsync(sid)
	},staleTime:60*1000})

}