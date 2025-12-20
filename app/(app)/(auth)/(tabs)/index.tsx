import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Auth Tabs Index</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
