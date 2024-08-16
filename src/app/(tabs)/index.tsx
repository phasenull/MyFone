import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { Styles } from '@/constants/Styles';

export default function TabOneScreen() {
  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>Hello, phasenull</Text>
      <View style={Styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}
