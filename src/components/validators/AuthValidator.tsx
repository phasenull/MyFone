import { useVodafoneStore } from "@/common/stores/VodafoneStore";
import { useEffect } from "react";

export default function AuthValidator(props?:{else?:any,children:any}) {
	
	const sid = useVodafoneStore((state)=>state.access_token)
	if (!sid) return props?.else
	return props?.children
}