import React from "react"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Link, Redirect, router, Tabs } from "expo-router"
import { Pressable } from "react-native"

import Colors from "@/constants/Colors"
import { useColorScheme } from "@/components/useColorScheme"
import { Feather } from "@expo/vector-icons"
import { useVodafoneStore } from "@/common/stores/VodafoneStore"

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

export default function TabLayout() {
	const colorScheme = useColorScheme()

	const sid = useVodafoneStore((state) => state.sid)
	if (!sid) {
		return <Redirect href={"/auth"}/>
	}
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				// Disable the static render of the header on web
				// to prevent a hydration error in React Navigation v6.
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Tab One",
					tabBarIcon: ({ color }) => <Feather size={28} name="package" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="account/index"
				options={{
					title: "Account",
					tabBarIcon: ({ color }) => <FontAwesome size={28} name="user-o" color={color} />,
				}}
			/>
		</Tabs>
	)
}
