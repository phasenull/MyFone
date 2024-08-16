import { useGetDetailedTariff, useGetSubscriber } from "@/common/hooks/UserHooks"
import { useVodafoneStore } from "@/common/stores/VodafoneStore"
import { Text, View } from "@/components/Themed"
import Colors from "@/constants/Colors"
import { Styles } from "@/constants/Styles"
import { Feather, FontAwesome } from "@expo/vector-icons"
import { ScrollView, ViewStyle } from "react-native"

export default function AccountTab() {
	const sid = useVodafoneStore((state) => state.sid)
	const { data, isLoading, isError, error } = useGetSubscriber()
	const { data: tariffData, isLoading: tariffIsLoading, isError: isTariffError, error: tariffError } = useGetDetailedTariff()
	if (isLoading) return <Text>loading...</Text>
	if (!data) return <Text>no user found</Text>
	const user = data?.subscriber
	return (
		<ScrollView
			style={{
				backgroundColor: "#e9e9e9",
			}}
			contentContainerStyle={{
				paddingVertical: 4 * 4,
				alignItems: "center",
				rowGap: 4 * 4,
			}}
		>
			<Container style={{ marginBottom: 4 * 4, height: 30 * 4, justifyContent: "center" }}>
				<Text style={[Styles.title, { color: Colors.light.textLight, columnGap: 5 }]}>
					<FontAwesome name="user" size={20} /> {user.name} {user.surname}
				</Text>
				<Text style={[Styles.title, { color: Colors.light.textLight, columnGap: 5 }]}>
					<FontAwesome name="phone" size={20} /> {user.msisdn}
				</Text>
				<View style={{ backgroundColor: Colors.light.tint, width: "100%", height: 1 * 4, marginTop: 1 * 4 }} />
			</Container>
			<Text style={[Styles.title]}>My Tariffs</Text>
			{tariffData?.detailedPackageList.detailedPackageInfo.map((tariff, i) => (
				<Container key={i}>
					<Text style={{ fontSize: 16, opacity: 0.5, fontWeight: "600" }}>
						{tariff.description}
						{tariff.credits[0].value}/{tariff.initialCredits[0].value} {tariff.credits[0].unit}
					</Text>
					<View style={{ backgroundColor: "#e9e9e9", height: 1 * 4, marginTop: 2 * 4, width: "100%" }}>
						<View
							style={{
								backgroundColor: Colors.light.tint,
								height: "100%",
								width: `${Math.floor((parseFloat(tariff.credits[0].value) / parseFloat(tariff.initialCredits[0].value)) * 100) || 0}%`,
							}}
						></View>
					</View>
				</Container>
			))}
		</ScrollView>
	)
}

function Container(props: { children: any; style?: ViewStyle }) {
	return (
		<View
			style={[
				{
					paddingVertical: 4 * 4,
					width: "90%",
					borderRadius: 2 * 4,
					paddingHorizontal: 4 * 4,
					maxWidth: 90 * 4,
					backgroundColor: Colors.light.background,
				},
				props.style,
			]}
		>
			{props.children}
		</View>
	)
}
