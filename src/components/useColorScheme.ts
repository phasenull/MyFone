import Colors from '@/constants/Colors';
import { useColorScheme as importedScheme } from 'react-native';
export function useColorScheme() {
	return "light" as keyof typeof Colors
}