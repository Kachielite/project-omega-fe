import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import zustandStorage from '@/core/common/state';
import { router } from 'expo-router';

const Index = () => {
  return (
    <View style={styles.container}>
      <Text>This is a auth route</Text>
      <TouchableOpacity
        onPress={() => {
          zustandStorage.removeUser();
          zustandStorage.removeToken();
          router.push('/(app)/(public)');
        }}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
});

export default Index;
