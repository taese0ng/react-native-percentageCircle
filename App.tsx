import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import PercentageCircle from "./src/Components/PercentageCircle";

export default function App() {
  const [percentage] = useState(80);

  return (
    <View style={styles.container}>
      <PercentageCircle size={200} percentage={percentage} borderWidth={15}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
