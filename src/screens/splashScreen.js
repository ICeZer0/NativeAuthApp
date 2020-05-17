import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const SplashScreen = () => {
  return (
    <View style={styles}>
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
});
