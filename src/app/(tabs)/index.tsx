import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { styles } from '@/constants/Styles';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, phasenull</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}
