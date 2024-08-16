import FontAwesome from "@expo/vector-icons/FontAwesome"
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import "react-native-reanimated"

import { useColorScheme } from "@/components/useColorScheme"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router"

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "(tabs)",
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		...FontAwesome.font,
	})

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error
	}, [error])

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
		}
	}, [loaded])

	if (!loaded) {
		return null
	}

	return <RootLayoutNav />
}
import * as Updates from "expo-updates"
const queryClient = new QueryClient({
	defaultOptions: { queries: { retry: 1 } },
})
function RootLayoutNav() {
	const colorScheme = useColorScheme()
	async function onFetchUpdateAsync() {
		try {
			const update = await Updates.checkForUpdateAsync()
			if (update.isAvailable) {
				alert("update")
				await Updates.fetchUpdateAsync()
				await Updates.reloadAsync()
			}
		} catch (error) {
			// You can also add an alert() to see the error message in case of an error when fetching updates.
			alert(`Error fetching latest Expo update: ${error}`)
		}
	}
	useEffect(() => {
		onFetchUpdateAsync()
	}, [])
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen name="auth/index" options={{ headerShown: false, title: "Authenticate" }} />
				</Stack>
			</ThemeProvider>
		</QueryClientProvider>
	)
}
