import { useVodafoneStore } from "@/common/stores/VodafoneStore"
import { Text, View } from "@/components/Themed"
import Colors from "@/constants/Colors"
import { Styles } from "@/constants/Styles"
import { useMutation } from "@tanstack/react-query"
import { Redirect, router } from "expo-router"
import { useState } from "react"
import { Button, InputModeOptions, TextInput, TouchableOpacity } from "react-native"

export default function AuthScreen() {
	const access_token = useVodafoneStore((state) => state.access_token)
	const [username, setUsername] = useState<undefined | string>(undefined)
	const [password, setPassword] = useState<undefined | string>(undefined)
	const [OTP, setOTP] = useState<undefined | string>(undefined)
	const { auth } = useVodafoneStore()
	const { data, isPending, isError, error, mutate } = useMutation({
		mutationKey: ["auth", username, password],
		mutationFn: async (args: { password?: string; username?: string; otp?: string }) => {
			if (!args.password) throw new Error("Password field cannot be empty!")
			if (!args.username) throw new Error("Username field cannot be empty!")
			return auth({ password: args.password, username: args.username, otp: args.otp })
		},
	})
	function Login() {
		mutate({
			password: password,
			username: username,
			otp: OTP,
		})
	}
	if (access_token) {
		return <Redirect href={{pathname:"/tabs"}} />
	}
	return (
		<View style={[Styles.container, { rowGap: 6 * 4 }]}>
			{/* <Text style={{ color: Colors.light.tint }}>Login using your phone no and password!</Text> */}
			<Input autoComplete="tel" inputMode="tel" value={username} placeholder="phone no" onTextChange={setUsername} />
			<Input autoComplete="password" inputMode="numeric" maxLength={8} value={password} placeholder="password no" onTextChange={setPassword} />

			<Input autoComplete="sms-otp" maxLength={4} inputMode="numeric" value={OTP} placeholder="OTP" onTextChange={setOTP} />
			{isError && error && error.message !== "custom.otp" ? <Text style={{ color: Colors.light.tint }}>Error: {error?.message}</Text> : null}
			<TouchableOpacity
				style={{
					backgroundColor: Colors.light.tint,
					paddingHorizontal: 7 * 4,
					paddingVertical: 2 * 4,
					borderRadius: 2 * 4,
				}}
				onPress={Login}
			>
				<Text style={{ color: Colors.light.background, fontSize: 28 }}>login</Text>
			</TouchableOpacity>
		</View>
	)
}

function Input(props: { hide?: boolean; autoComplete?: string; placeholder?: string; onTextChange?: (text: string) => void; value?: string; inputMode?: InputModeOptions; maxLength?: number }) {
	return (
		<TextInput
			autoComplete={props.autoComplete as any}
			secureTextEntry={props.hide}
			passwordRules={"required:digit;minlength:8;maxlength:8"}
			maxLength={props.maxLength}
			multiline={false}
			inputMode={props.inputMode}
			placeholder={props.placeholder}
			value={props.value}
			onChangeText={props.onTextChange}
			style={{
				fontSize: 5 * 4,
				backgroundColor: Colors.light.background,
				color: Colors.light.tint,
				borderColor: Colors.light.tint,
				borderRadius: 2 * 4,
				paddingHorizontal: 6 * 4,
				width: "80%",
				maxWidth: 80 * 4,
				paddingVertical: 4 * 4,
				borderWidth: 0.5 * 4,
			}}
		/>
	)
}
