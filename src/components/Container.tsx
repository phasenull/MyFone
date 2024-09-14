import Colors from "@/constants/Colors";
import { View } from "./Themed";
import { ViewStyle } from "react-native";

export default function Container(props: { children?: any; style?: ViewStyle }) {
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
