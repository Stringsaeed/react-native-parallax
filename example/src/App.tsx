import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Parallax from 'react-native-parallax';

export default function App() {
  return (
    <Parallax.ScrollView style={styles.container}>
      <View style={styles.topView} />
      <Text>Test</Text>
      <Parallax.Image />
      <Parallax.Image />
      <Parallax.Image />
      <Parallax.Image />
    </Parallax.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: { width: 100, height: 100, backgroundColor: '#ea312a' },
});
