import { ScrollView, StyleSheet, TouchableHighlight, TouchableOpacity } from "react-native"

import { Text, View } from "@/components/Themed"
import { Styles } from "@/constants/Styles"
import { useGetDetailedTariff, useGetInvoice, useGetSubscriber, useGetTariffAndOptions } from "@/common/hooks/UserHooks"
import Container from "@/components/Container"
import { EvilIcons, FontAwesome, Ionicons } from "@expo/vector-icons"
import { Redirect } from "expo-router"
import Colors from "@/constants/Colors"
import { useVodafoneStore } from "@/common/stores/VodafoneStore"

export default function TabOneScreen() {
	const { data, isLoading } = useGetSubscriber()
	const { data: tariffData } = useGetTariffAndOptions()
	const { logout } = useVodafoneStore()
	const user = data?.subscriber
	if (!user) return <Redirect href={"/auth"} />
	const { data: invoice } = useGetInvoice()
	const tariff = tariffData?.tariff
	return (
		<ScrollView
			contentContainerStyle={{
				paddingVertical: 4 * 4,
				alignItems: "center",
				rowGap: 4 * 4,
			}}
		>
			<Container>
				<Text style={[Styles.title, { color: Colors.light.textLight, columnGap: 5 }]}>
					<FontAwesome name="user" size={20} /> {user.name} {user.surname}
				</Text>
				<Text style={[Styles.title, { color: Colors.light.textLight, columnGap: 5 }]}>
					<FontAwesome name="phone" size={20} /> {user.msisdn}
				</Text>
				<View style={{ backgroundColor: Colors.light.tint, width: "100%", height: 1 * 4, marginTop: 1 * 4 }} />
			</Container>
			<TouchableOpacity onPress={logout} style={{ backgroundColor: Colors.light.tint, width: 32 * 4, height: 8 * 4, borderRadius: 2 * 4, alignSelf: "center", marginTop: 4 * 4 }}>
				<Text style={[Styles.title, { color: "#fff", textAlign: "center", columnGap: 5 }]}>
					<FontAwesome name="power-off" size={20} /> logout
				</Text>
			</TouchableOpacity>

			<Container>
				<View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between" }}>
					<Text style={[Styles.title, { color: Colors.light.text, columnGap: 5 }]}>
						<Ionicons name="document" size={20} /> Your Tariff
					</Text>
					<Text style={{ fontSize: 14, fontWeight: "600" }}>{tariff?.name}</Text>
				</View>
				<View style={{ backgroundColor: Colors.light.tint, width: "100%", height: 1 * 4, marginTop: 1 * 4 }} />
				<View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 4 * 4, marginBottom: 16 * 4 }}>
					{tariff?.benefits.benefit.map((benefit, i, arr) => {
						const percentage = i / (arr.length - 1)
						const calc = (x: number) => -((x - 0.5) ** 2) * 2
						return (
							<View
								key={`${benefit.amount.string} ${benefit.type}`}
								style={{
									bottom: calc(percentage) * 100,
									borderRadius: 10000,
									borderColor: Colors.light.tint,
									borderWidth: 1 * 4,
									justifyContent: "center",
									alignItems: "center",
									padding: 1 * 4,
									flex: 1,
									aspectRatio: 1,
								}}
							>
								<Text style={[Styles.title, { color: Colors.light.text, columnGap: 5, fontSize: 14, opacity: 0.7 }]}>
									{benefit.amount.string} {benefit.type}
								</Text>
							</View>
						)
					})}
				</View>
				{invoice?.invoice?.dueAmount && (
					<Text
						style={[
							Styles.title,
							{
								color: Colors.light.text,
								columnGap: 5,
								fontSize: 28,
								textAlign: "center",
								opacity: 0.7,
							},
						]}
					>
						{invoice?.invoice.dueAmount.value} TL <Text style={{fontSize:16}}>{invoice?.invoice?.infoMsg}</Text>
					</Text>
				)}
				{/* <Text>
					{JSON.stringify(tariffData?.options,undefined,4)}
				</Text> */}
				{tariffData?.options?.map((option) => (
					<TouchableOpacity style={{ marginTop: 2 * 4 }} onPress={() => alert(`${option.name}\n${option.description}\n\n${option.bulletList}`)}>
						<Text>
							+ {option.name} | {option.categoryName}
						</Text>
					</TouchableOpacity>
				))}
			</Container>
		</ScrollView>
	)
}
