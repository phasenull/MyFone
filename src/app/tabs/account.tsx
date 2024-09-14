import { ScrollView, StyleSheet, TouchableHighlight, TouchableOpacity } from "react-native"

import { Text, View } from "@/components/Themed"
import { Styles } from "@/constants/Styles"
import { useGetDetailedTariff, useGetInvoice, useGetSubscriber } from "@/common/hooks/UserHooks"
import Container from "@/components/Container"
import { FontAwesome } from "@expo/vector-icons"
import { Redirect } from "expo-router"
import Colors from "@/constants/Colors"
import { useVodafoneStore } from "@/common/stores/VodafoneStore"

export default function TabOneScreen() {
	const { data, isLoading } = useGetSubscriber()
	const { logout } = useVodafoneStore()
	const user = data?.subscriber
	if (!user) return <Redirect href={"/auth"} />
	const { data: invoice } = useGetInvoice()
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
				<Text>{JSON.stringify(invoice, undefined, 4)}</Text>
			</Container>
		</ScrollView>
	)
}
