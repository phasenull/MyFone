import AuthValidator from "@/components/validators/AuthValidator"
import { Redirect } from "expo-router"

export default function IndexPage() {
	return <Redirect href={"/auth"}/>
}