import { useGetDetailedTariff, useGetSubscriber } from "@/common/hooks/UserHooks"
import { useVodafoneStore } from "@/common/stores/VodafoneStore"
import Container from "@/components/Container"
import { Text, View } from "@/components/Themed"
import Colors from "@/constants/Colors"
import { Styles } from "@/constants/Styles"
import { Feather, FontAwesome } from "@expo/vector-icons"
import { ScrollView, ViewStyle } from "react-native"

export default function AccountTab() {
	const { data, isLoading, isError, error } = useGetSubscriber()
	const { data: tariffData, isLoading: tariffIsLoading, isError: isTariffError, error: tariffError } = useGetDetailedTariff()
	if (isLoading) return <Text>loading...</Text>
	if (!data || !tariffData) return <Text>no user found</Text>
	const user = data?.subscriber
	return (
		<ScrollView
			contentContainerStyle={{
				paddingVertical: 4 * 4,
				alignItems: "center",
				rowGap: 4 * 4,
			}}
		>
			{tariffData?.detailedPackageList.detailedPackageInfo.map((tariff, i) => (
				<Container key={i}>
					<View style={{flex:1,flexDirection:"row",justifyContent:"space-between"}}>
						<Text style={{ fontSize: 16, opacity: 0.5, fontWeight: "600", }}>
							{tariff.description}
						</Text>
							<Text style={{opacity:0.5,fontSize:16 }}>
								{tariff.credits[0].value}/{tariff.initialCredits[0].value} {tariff.credits[0].unit}
							</Text>
					</View>
					<View style={{ backgroundColor: "#e9e9e9", height: 1 * 4, marginTop: 2 * 4, width: "100%" }}>
						<View
							style={{
								backgroundColor: Colors.light.tint,
								height: "100%",
								width: `${Math.floor((parseFloat(tariff.credits[0].value) / parseFloat(tariff.initialCredits[0].value)) * 100) || 0}%`,
							}}
						/>
					</View>
				</Container>
			))}
		</ScrollView>
	)
}
