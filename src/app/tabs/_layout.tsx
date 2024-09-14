import React from "react"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Link, Redirect, router, Tabs } from "expo-router"
import { Pressable } from "react-native"

import Colors from "@/constants/Colors"
import { useColorScheme } from "@/components/useColorScheme"
import { Feather } from "@expo/vector-icons"
import { useVodafoneStore } from "@/common/stores/VodafoneStore"
import AuthValidator from "@/components/validators/AuthValidator"

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

export default function TabLayout() {
	const colorScheme = useColorScheme()
	return (
		<AuthValidator else={<Redirect href={"/auth"}/>}>
			<Tabs
				sceneContainerStyle={{
					backgroundColor: "#e9e9e9",
				}}
				screenOptions={{
					tabBarActiveTintColor: Colors[colorScheme].tint,
				}}
				initialRouteName="home"
			>
				<Tabs.Screen
					name="home"
					
					options={{
						title: "Packages",
						tabBarIcon: ({ color }) => <Feather size={28} name="package" color={color} />,
					}}
				/>
				<Tabs.Screen
					name="account"
					options={{
						title: "Account",
						tabBarIcon: ({ color }) => <FontAwesome size={28} name="user-o" color={color} />,
					}}
				/>
			</Tabs>
		</AuthValidator>
	)
}
